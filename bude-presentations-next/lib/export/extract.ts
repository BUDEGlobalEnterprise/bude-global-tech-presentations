import type { LoadedPresentation, ListItem, Slide } from "@/types/presentation";

/**
 * A flat, plain-text-friendly representation of a deck, used by the PDF /
 * Word / PowerPoint exporters. Pure (no DOM), so it can run server-side and
 * be passed as props to the client download menu.
 */
export interface ExportSlide {
  kind: string;
  heading: string;
  subheading?: string;
  body: string[];
  bullets: string[];
  code?: string;
}

export interface ExportDeck {
  slug: string;
  title: string;
  description: string;
  slides: ExportSlide[];
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|ul|ol)\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function listItemText(item: ListItem): string {
  if (typeof item === "string") return stripHtml(item);
  const head = item.title ? `${item.title}: ` : "";
  return stripHtml(`${head}${item.text ?? item.content ?? ""}`).trim();
}

function strArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => (typeof x === "string" ? stripHtml(x) : "")).filter(Boolean);
}

function noteText(slide: Slide): string | undefined {
  const note = (slide as Record<string, unknown>).note;
  if (typeof note === "string") return note;
  if (note && typeof note === "object" && "text" in note) {
    return String((note as { text: unknown }).text);
  }
  return undefined;
}

function extractSlide(slide: Slide): ExportSlide {
  const s = slide as Record<string, unknown>;
  const base: ExportSlide = {
    kind: slide.type,
    heading: slide.title ?? "",
    subheading: slide.subtitle,
    body: [],
    bullets: [],
  };

  switch (slide.type) {
    case "presenter":
      base.heading = slide.name ?? slide.title ?? "Presenter";
      base.subheading = slide.title;
      base.bullets = [slide.experience, slide.oss_experience]
        .filter(Boolean)
        .map((t) => stripHtml(t as string));
      break;

    case "comparison": {
      base.bullets = [
        ...(s.leftTitle ? [`${s.leftTitle as string}`] : []),
        ...strArray(s.leftPoints).map((p) => `  ${p}`),
        ...(s.rightTitle ? [`${s.rightTitle as string}`] : []),
        ...strArray(s.rightPoints).map((p) => `  ${p}`),
      ];
      const note = noteText(slide);
      if (note) base.body.push(note);
      break;
    }

    case "quiz": {
      base.heading = slide.question ?? slide.title ?? "Question";
      const opts = (slide.options ?? []) as unknown[];
      const correct =
        typeof slide.correct === "number"
          ? slide.correct
          : typeof (s.correctAnswer as number) === "number"
            ? (s.correctAnswer as number)
            : -1;
      base.bullets = opts.map((o, i) => {
        const text = typeof o === "string" ? o : String((o as { text?: string })?.text ?? o);
        return `${i === correct ? "✓ " : ""}${text}`;
      });
      if (slide.explanation) base.body.push(stripHtml(slide.explanation));
      break;
    }

    case "diagram":
      base.code = (s.content as string) ?? slide.box?.code;
      if (noteText(slide)) base.body.push(noteText(slide)!);
      break;

    case "thank-you":
      if (slide.message) base.body.push(stripHtml(slide.message));
      break;

    default: {
      // content + generic
      if (slide.box?.title) base.subheading = slide.box.title;
      if (slide.box?.content) base.body.push(stripHtml(slide.box.content));
      if (slide.box?.list) base.bullets = slide.box.list.map(listItemText).filter(Boolean);
      if (slide.box?.code) base.code = slide.box.code;
      // generic slide: pull a top-level `content` string if present
      if (!base.body.length && typeof s.content === "string") {
        base.body.push(stripHtml(s.content as string));
      }
    }
  }

  if (slide.emoji && base.heading) base.heading = `${slide.emoji}  ${base.heading}`;
  return base;
}

export function extractDeck(p: LoadedPresentation): ExportDeck {
  const slides: ExportSlide[] = [];
  for (const topic of p.data.presentation.topics) {
    for (const slide of topic.slides) {
      slides.push(extractSlide(slide));
    }
  }
  return {
    slug: p.slug,
    title: p.meta.title,
    description: p.meta.description,
    slides,
  };
}
