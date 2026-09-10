import { SafeHTML } from "@/lib/safe-html";
import { cn } from "@/lib/utils";
import type { Slide } from "@/types/presentation";

interface TitleSlideData extends Slide {
  image?: string;
  backgroundImage?: string;
}

interface Props {
  slide: Slide;
}

export function TitleSlide({ slide }: Props) {
  const s = slide as TitleSlideData;
  const bg = s.image ?? s.backgroundImage;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
      {bg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.16]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(2,6,23,0.82)_0%,_rgba(2,6,23,0.96)_75%)]"
          />
        </>
      )}
      {slide.emoji && (
        <div className="mb-8 text-6xl md:text-8xl drop-shadow-lg">
          {slide.emoji}
        </div>
      )}
      <h1
        className={cn(
          "text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl",
          bg && "text-white drop-shadow-2xl",
        )}
      >
        <SafeHTML
          as="span"
          html={slide.title ?? ""}
          className={bg ? undefined : "text-bude-gradient"}
        />
      </h1>
      {slide.subtitle && (
        <SafeHTML
          as="p"
          html={slide.subtitle}
          className={cn(
            "mt-6 text-pretty text-base md:text-2xl max-w-3xl leading-relaxed",
            bg ? "text-zinc-200" : "text-muted-foreground",
          )}
        />
      )}
      <div className="mt-12 h-1 w-24 rounded-full bg-bude-gradient" />
    </div>
  );
}
