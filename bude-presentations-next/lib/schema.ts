import { z } from "zod";

/**
 * Schema philosophy
 * -----------------
 * The source JSONs were authored over months by many contributors. They
 * contain a long tail of slide types beyond the 8 documented ones
 * (comparison, imageText, diagram, code, matrix, timeline, demo, video…),
 * and several optional fields that show up inconsistently.
 *
 * We therefore validate STRUCTURE (presentation → topics → slides), not
 * the full content shape of every slide variant. Each slide is required
 * to have a `type` string and is allowed to carry anything else.
 *
 * The renderer dispatches on `slide.type` and falls back to a generic
 * card for unknown types — so adding a new type later is purely additive.
 */

export const KNOWN_SLIDE_TYPES = [
  "title",
  "presenter",
  "topic-title",
  "content",
  "quiz",
  "chart",
  "qa",
  "thank-you",
  // discovered in the corpus, treated as first-class:
  "comparison",
  "imageText",
  "diagram",
  "code",
  "matrix",
  "timeline",
  "demo",
  "video",
  "history",
  "evolution",
  "ecosystem",
  "architecture",
  "patterns",
  "anti_patterns",
  "best_practices",
  "checklist",
  "usecases",
  "performance",
  "security",
  "scaling",
  "migration",
  "monitoring",
  "integration",
  "core_concept",
  "paradigm_shift",
  "decision_tree",
  "keynote",
  "detailed",
] as const;

export type KnownSlideType = (typeof KNOWN_SLIDE_TYPES)[number];

export function isKnownSlideType(t: string): t is KnownSlideType {
  return (KNOWN_SLIDE_TYPES as readonly string[]).includes(t);
}

/* ---------- Atomic shapes ---------- */

export const ListItemSchema = z.union([
  z.string(),
  z
    .object({
      emoji: z.string().optional(),
      icon: z.string().optional(),
      text: z.string().optional(),
      title: z.string().optional(),
      content: z.string().optional(),
    })
    .passthrough(),
]);

export const BoxSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
    code: z.string().optional(),
    language: z.string().optional(),
    list: z.array(ListItemSchema).optional(),
  })
  .passthrough();

/* ---------- Slide (lenient) ----------
 * One schema for all slide variants. `type` is required and free-form;
 * other fields are optional. `.passthrough()` keeps unknown keys so the
 * renderer can read them.
 */
export const SlideSchema = z
  .object({
    type: z.string(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    emoji: z.string().optional(),
    topic: z.string().optional(),

    // presenter
    name: z.string().optional(),
    experience: z.string().optional(),
    oss_experience: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    avatar: z.string().optional(),

    // content / generic
    box: BoxSchema.optional(),

    // quiz
    question: z.string().optional(),
    options: z.array(z.unknown()).optional(),
    correct: z.union([z.number(), z.string()]).optional(),
    answer: z.string().optional(),
    explanation: z.string().optional(),

    // chart
    chartType: z.string().optional(),
    data: z.array(z.unknown()).optional(),

    // thank-you
    message: z.string().optional(),
  })
  .passthrough();

/* ---------- Topic + Presentation ---------- */

export const TopicSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    slides: z.array(SlideSchema).min(1),
  })
  .passthrough();

export const PresentationFileSchema = z
  .object({
    presentation: z.object({
      topics: z.array(TopicSchema).min(1),
    }),
  })
  .passthrough();

/* ---------- Catalog metadata ---------- */

export const DifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

export const CatalogEntrySchema = z.object({
  file: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  category: z.array(z.string()).min(1),
  difficulty: DifficultySchema,
});
