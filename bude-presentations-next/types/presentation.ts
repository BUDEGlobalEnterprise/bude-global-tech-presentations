import type { z } from "zod";
import type {
  BoxSchema,
  CatalogEntrySchema,
  ListItemSchema,
  PresentationFileSchema,
  SlideSchema,
  TopicSchema,
} from "@/lib/schema";

export type ListItem = z.infer<typeof ListItemSchema>;
export type SlideBox = z.infer<typeof BoxSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type Topic = z.infer<typeof TopicSchema>;
export type PresentationFile = z.infer<typeof PresentationFileSchema>;
export type CatalogEntry = z.infer<typeof CatalogEntrySchema>;

export type SlideType = Slide["type"];

export type Difficulty = CatalogEntry["difficulty"];

export interface LoadedPresentation {
  slug: string;
  meta: CatalogEntry;
  data: PresentationFile;
}

export interface FlatSlide {
  slide: Slide;
  topicIndex: number;
  slideIndexInTopic: number;
  topicTitle: string | undefined;
  globalIndex: number;
}
