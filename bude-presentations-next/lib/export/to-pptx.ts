import type { ExportDeck } from "./extract";

const BRAND = "0060A0";
const PURPLE = "6F42C1";

export async function exportPptx(deck: ExportDeck) {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.author = "Bude Global Tech Presentations";
  pptx.company = "Bude Global";
  pptx.title = deck.title;
  pptx.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 in

  // Cover slide
  const cover = pptx.addSlide();
  cover.background = { color: "0A0F1F" };
  cover.addText(deck.title, {
    x: 0.6, y: 2.4, w: 12.1, h: 1.6,
    fontSize: 40, bold: true, color: "FFFFFF", align: "center",
  });
  cover.addText(deck.description, {
    x: 0.6, y: 4.0, w: 12.1, h: 1.0,
    fontSize: 18, color: "B0B8C8", align: "center", italic: true,
  });

  for (const s of deck.slides) {
    const slide = pptx.addSlide();
    slide.addText(s.heading || "", {
      x: 0.6, y: 0.4, w: 12.1, h: 0.9,
      fontSize: 26, bold: true, color: BRAND,
    });
    let y = 1.5;
    if (s.subheading) {
      slide.addText(s.subheading, {
        x: 0.6, y, w: 12.1, h: 0.5, fontSize: 16, italic: true, color: PURPLE,
      });
      y += 0.6;
    }
    if (s.body.length) {
      slide.addText(s.body.join("\n\n"), {
        x: 0.6, y, w: 12.1, h: 1.6, fontSize: 14, color: "333333", valign: "top",
      });
      y += Math.min(2, 0.4 + s.body.length * 0.5);
    }
    if (s.bullets.length) {
      slide.addText(
        s.bullets.map((t) => ({ text: t, options: { bullet: true } })),
        { x: 0.6, y, w: 12.1, h: 7.5 - y - 0.4, fontSize: 14, color: "222222", valign: "top" },
      );
    } else if (s.code) {
      slide.addText(s.code, {
        x: 0.6, y, w: 12.1, h: 7.5 - y - 0.4,
        fontSize: 11, fontFace: "Courier New", color: "E6E6E6",
        fill: { color: "1E1E1E" }, valign: "top",
      });
    }
  }

  await pptx.writeFile({ fileName: `${deck.slug}.pptx` });
}
