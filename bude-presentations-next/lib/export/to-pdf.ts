import type { jsPDF } from "jspdf";

import type { ExportDeck, ExportSlide } from "./extract";

export async function exportPdf(deck: ExportDeck) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - margin * 2;

  // Cover
  doc.setFillColor(10, 15, 31);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text(doc.splitTextToSize(deck.title, maxW), pageW / 2, pageH / 2 - 20, {
    align: "center",
  });
  doc.setFont("helvetica", "italic");
  doc.setFontSize(13);
  doc.setTextColor(176, 184, 200);
  doc.text(doc.splitTextToSize(deck.description, maxW), pageW / 2, pageH / 2 + 24, {
    align: "center",
  });

  for (const s of deck.slides) {
    doc.addPage();
    renderSlide(doc, s, { margin, maxW, pageH });
  }

  doc.save(`${deck.slug}.pdf`);
}

function renderSlide(
  doc: jsPDF,
  s: ExportSlide,
  { margin, maxW, pageH }: { margin: number; maxW: number; pageH: number },
) {
  let y = margin + 8;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin + 8;
    }
  };

  const write = (
    text: string,
    opts: { size: number; style?: "normal" | "bold" | "italic"; color?: [number, number, number]; font?: string; gap?: number },
  ) => {
    doc.setFont(opts.font ?? "helvetica", opts.style ?? "normal");
    doc.setFontSize(opts.size);
    doc.setTextColor(...(opts.color ?? [34, 34, 34]));
    const lines = doc.splitTextToSize(text, maxW) as string[];
    const lineH = opts.size * 1.35;
    for (const line of lines) {
      ensureSpace(lineH);
      doc.text(line, margin, y);
      y += lineH;
    }
    y += opts.gap ?? 4;
  };

  if (s.heading) write(s.heading, { size: 20, style: "bold", color: [0, 96, 160], gap: 6 });
  if (s.subheading) write(s.subheading, { size: 13, style: "italic", color: [111, 66, 193], gap: 8 });
  for (const b of s.body) write(b, { size: 12, gap: 8 });
  for (const bullet of s.bullets) write(`•  ${bullet}`, { size: 12, gap: 2 });
  if (s.code) {
    y += 6;
    write(s.code, { size: 10, font: "courier", color: [60, 60, 60] });
  }
}
