import type { ExportDeck } from "./extract";

/**
 * One PowerPoint slide per captured PNG, image filling the whole 16:9
 * slide. Editable container, visually identical to the web deck.
 */
export async function exportPptx(deck: ExportDeck, images: string[]) {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.author = "Bude Global Tech Presentations";
  pptx.company = "Bude Global";
  pptx.title = deck.title;

  const W = 13.333;
  const H = 7.5;
  pptx.defineLayout({ name: "BUDE_16x9", width: W, height: H });
  pptx.layout = "BUDE_16x9";

  if (!images.length) {
    const s = pptx.addSlide();
    s.background = { color: "0A0F1F" };
    s.addText("No slides could be rendered.", {
      x: 0.6, y: 3.2, w: W - 1.2, h: 1, fontSize: 24, color: "FFFFFF", align: "center",
    });
  }

  for (const png of images) {
    const slide = pptx.addSlide();
    slide.background = { color: "0A0F1F" };
    slide.addImage({ data: png, x: 0, y: 0, w: W, h: H });
  }

  await pptx.writeFile({ fileName: `${deck.slug}.pptx` });
}
