import { downloadBlob } from "./download";
import type { ExportDeck } from "./extract";

export async function exportDocx(deck: ExportDeck) {
  const { Document, Packer, Paragraph, HeadingLevel, TextRun } = await import("docx");

  const children: InstanceType<typeof Paragraph>[] = [
    new Paragraph({ text: deck.title, heading: HeadingLevel.TITLE }),
    new Paragraph({
      children: [new TextRun({ text: deck.description, italics: true, color: "666666" })],
    }),
    new Paragraph({ text: "" }),
  ];

  for (const s of deck.slides) {
    if (s.heading) {
      children.push(new Paragraph({ text: s.heading, heading: HeadingLevel.HEADING_1 }));
    }
    if (s.subheading) {
      children.push(
        new Paragraph({ children: [new TextRun({ text: s.subheading, italics: true })] }),
      );
    }
    for (const b of s.body) {
      // Split multi-line bodies into separate paragraphs.
      for (const line of b.split("\n")) {
        children.push(new Paragraph({ text: line }));
      }
    }
    for (const bullet of s.bullets) {
      children.push(new Paragraph({ text: bullet, bullet: { level: 0 } }));
    }
    if (s.code) {
      for (const line of s.code.split("\n")) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: line, font: "Consolas", size: 18 })],
          }),
        );
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${deck.slug}.docx`);
}
