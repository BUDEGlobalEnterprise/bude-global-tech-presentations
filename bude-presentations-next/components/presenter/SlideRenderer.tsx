import type { Slide } from "@/types/presentation";

import { ComparisonSlide } from "./slides/ComparisonSlide";
import { ContentSlide } from "./slides/ContentSlide";
import { DiagramSlide } from "./slides/DiagramSlide";
import { GenericSlide } from "./slides/GenericSlide";
import { PresenterSlide } from "./slides/PresenterSlide";
import { QASlide } from "./slides/QASlide";
import { QuizSlide } from "./slides/QuizSlide";
import { ThankYouSlide } from "./slides/ThankYouSlide";
import { TitleSlide } from "./slides/TitleSlide";
import { TopicTitleSlide } from "./slides/TopicTitleSlide";

interface Props {
  slide: Slide;
}

export function SlideRenderer({ slide }: Props) {
  switch (slide.type) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "presenter":
      return <PresenterSlide slide={slide} />;
    case "topic-title":
      return <TopicTitleSlide slide={slide} />;
    case "content":
      return <ContentSlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    case "diagram":
      return <DiagramSlide slide={slide} />;
    case "quiz":
      return <QuizSlide slide={slide} />;
    case "qa":
      return <QASlide slide={slide} />;
    case "thank-you":
      return <ThankYouSlide slide={slide} />;
    default:
      return <GenericSlide slide={slide} />;
  }
}
