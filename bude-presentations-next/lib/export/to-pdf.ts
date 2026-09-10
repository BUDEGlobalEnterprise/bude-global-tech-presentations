import type { ExportDeck } from "./extract";

/**
 * One landscape 16:9 page per slide, each a full-bleed PNG of the real
 * rendered slide. `images` are PNG data URLs from captureSlides().
 */
export async function exportPdf(deck: ExportDeck, images: string[]) {
  const { jsPDF } = await import("jspdf");

  const W = 1280;
  const H = 720;
  const doc = new jsPDF({ unit: "px", format: [W, H], orientation: "landscape" });

  if (!images.length) {
    doc.setFontSize(18);
    doc.text("No slides could be rendered.", 40, 60);
  }

  images.forEach((png, i) => {
    if (i > 0) doc.addPage([W, H], "landscape");
    try {
      doc.addImage(png, "PNG", 0, 0, W, H, undefined, "FAST");
    } catch {
      doc.setFontSize(14);
      doc.text(`Slide ${i + 1} could not be rendered.`, 40, 60);
    }
  });

  doc.save(`${deck.slug}.pdf`);
}
