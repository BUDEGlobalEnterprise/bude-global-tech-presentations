#!/usr/bin/env node
// tools/export-deck.js
// Usage: node tools/export-deck.js [port]
// Installs required packages: puppeteer, express, pdf-lib

const express = require('express');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

async function startServer(root, port = 3000) {
  const app = express();
  app.use(express.static(root));
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    server.on('error', reject);
  });
}

async function main() {
  const port = parseInt(process.argv[2], 10) || 3000;
  const root = path.resolve(__dirname, '..');
  console.log('Serving', root, 'on port', port);

  const server = await startServer(root, port);
  const url = `http://localhost:${port}/index.html`;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Increase default timeout
  page.setDefaultNavigationTimeout(60000);

  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for Reveal to initialize - at least wait for slides to be present
  await page.waitForSelector('.reveal .slides section', { timeout: 15000 });

  // Build mapping of slides (h/v)
  const mapping = await page.evaluate(() => {
    const hSections = Array.from(document.querySelectorAll('.reveal .slides > section'));
    const map = [];
    hSections.forEach((hEl, hIdx) => {
      const vSections = hEl.querySelectorAll(':scope > section');
      if (vSections.length) {
        vSections.forEach((vEl, vIdx) => map.push({ h: hIdx, v: vIdx }));
      } else {
        map.push({ h: hIdx, v: 0 });
      }
    });
    return map;
  });

  console.log('Found', mapping.length, 'slides');

  const images = [];

  // Bring page to a standard viewport size for consistent captures
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });

  for (let i = 0; i < mapping.length; i++) {
    const { h, v } = mapping[i];
    console.log(`Navigating to slide ${i + 1}/${mapping.length}: h=${h} v=${v}`);
    await page.evaluate((hh, vv) => Reveal.slide(hh, vv), h, v);
    // Wait for reveal to reflect the change
    await page.waitForTimeout(500);
    // extra wait to ensure images/fonts finish
    await page.waitForTimeout(400);

    // Hide UI elements that may cover the slide by adding a class (mirrors CSS in project)
    await page.evaluate(() => document.documentElement.classList.add('exporting'));
    await page.waitForTimeout(80);

    const slideEl = await page.$('.reveal');
    if (!slideEl) {
      console.warn('No .reveal element found, skipping slide');
      continue;
    }

    const clip = await slideEl.boundingBox();
    if (!clip || clip.width === 0 || clip.height === 0) {
      console.warn('Empty bounding box for slide, skipping');
      await page.evaluate(() => document.documentElement.classList.remove('exporting'));
      continue;
    }

    const screenshotBuffer = await page.screenshot({ clip, type: 'jpeg', quality: 90 });
    images.push({ buf: screenshotBuffer, width: Math.round(clip.width), height: Math.round(clip.height) });

    // remove the exporting class so the page UI can be visible while we progress (optional)
    await page.evaluate(() => document.documentElement.classList.remove('exporting'));
    await page.waitForTimeout(80);
  }

  if (images.length === 0) {
    console.error('No images captured, aborting');
    await browser.close();
    server.close();
    process.exit(2);
  }

  console.log('Assembling PDF with', images.length, 'pages');
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < images.length; i++) {
    const { buf, width, height } = images[i];
    const jpgImage = await pdfDoc.embedJpg(buf);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(jpgImage, { x: 0, y: 0, width: width, height: height });
  }

  const pdfBytes = await pdfDoc.save();
  const outPath = path.resolve(process.cwd(), `exported-deck-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`);
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Saved PDF to', outPath);

  await browser.close();
  server.close();
  process.exit(0);
}

main().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
