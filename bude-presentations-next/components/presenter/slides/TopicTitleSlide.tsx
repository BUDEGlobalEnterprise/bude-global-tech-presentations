import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

export function TopicTitleSlide({ slide }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(111,66,193,0.2),_transparent_60%)]"
      />
      {slide.emoji && (
        <div className="mb-10 text-7xl md:text-9xl drop-shadow-2xl">
          {slide.emoji}
        </div>
      )}
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-bude-pink">
        Section
      </div>
      <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-7xl">
        <SafeHTML as="span" html={slide.title ?? ""} className="text-bude-gradient" />
      </h2>
      {slide.subtitle && (
        <SafeHTML
          as="p"
          html={slide.subtitle}
          className="mt-6 max-w-2xl text-base text-muted-foreground md:text-xl"
        />
      )}
    </div>
  );
}
