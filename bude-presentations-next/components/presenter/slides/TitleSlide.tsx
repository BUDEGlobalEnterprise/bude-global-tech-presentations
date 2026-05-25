import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

export function TitleSlide({ slide }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      {slide.emoji && (
        <div className="mb-8 text-6xl md:text-8xl drop-shadow-lg">
          {slide.emoji}
        </div>
      )}
      <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
        <SafeHTML as="span" html={slide.title ?? ""} className="text-bude-gradient" />
      </h1>
      {slide.subtitle && (
        <SafeHTML
          as="p"
          html={slide.subtitle}
          className="mt-6 text-pretty text-base text-muted-foreground md:text-2xl max-w-3xl leading-relaxed"
        />
      )}
      <div className="mt-12 h-1 w-24 rounded-full bg-bude-gradient" />
    </div>
  );
}
