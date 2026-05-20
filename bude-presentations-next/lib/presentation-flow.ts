import type { FlatSlide, LoadedPresentation } from "@/types/presentation";

export function flattenSlides(p: LoadedPresentation): FlatSlide[] {
  const out: FlatSlide[] = [];
  let g = 0;
  p.data.presentation.topics.forEach((topic, ti) => {
    topic.slides.forEach((slide, si) => {
      out.push({
        slide,
        topicIndex: ti,
        slideIndexInTopic: si,
        topicTitle: topic.title,
        globalIndex: g++,
      });
    });
  });
  return out;
}

export function clampIndex(idx: number, total: number) {
  if (total <= 0) return 0;
  if (idx < 0) return 0;
  if (idx >= total) return total - 1;
  return idx;
}
