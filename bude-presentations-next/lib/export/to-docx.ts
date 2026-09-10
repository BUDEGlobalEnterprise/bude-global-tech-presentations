import { downloadBlob } from "./download";
import type { ExportDeck } from "./extract";

/**
 * A landscape Word document, one full-width slide image per page — a
 * printable handout of the real deck rather than a text outline.
 */
export async function exportDocx(deck: ExportDeck, images: string[]) {
  const { Document, Packer, Paragraph, ImageRun, PageOrientation, TextRun } =
    await import("docx");

  // Usable width on an 11in landscape page with 1in margins ≈ 9in @ 96dpi.
  const IMG_W = 864;
  const IMG_H = Math.round((IMG_W * 9) / 16);

  const children: InstanceType<typeof Paragraph>[] = [];

  if (!images.length) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "No slides could be rendered.", bold: true })],
      }),
    );
  }

  images.forEach((png, i) => {
    const base64 = png.slice(png.indexOf(",") + 1);
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    children.push(
      new Paragraph({
        pageBreakBefore: i > 0,
        children: [
          new ImageRun({
            type: "png",
            data: bytes,
            transformation: { width: IMG_W, height: IMG_H },
          }),
        ],
      }),
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: { size: { orientation: PageOrientation.LANDSCAPE } },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${deck.slug}.docx`);
}
