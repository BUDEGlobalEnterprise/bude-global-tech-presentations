import { Heart } from "lucide-react";

import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

export function ThankYouSlide({ slide }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,96,160,0.18),_transparent_55%)]"
      />
      <Heart className="mb-6 h-16 w-16 text-bude-pink animate-pulse md:h-20 md:w-20" />
      <h2 className="text-balance text-6xl font-extrabold tracking-tight md:text-8xl lg:text-9xl">
        <span className="text-bude-gradient">
          {slide.title ?? "Thank you"}
        </span>
      </h2>
      {slide.message && (
        <p className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground md:text-2xl">
          {slide.message}
        </p>
      )}
    </div>
  );
}
