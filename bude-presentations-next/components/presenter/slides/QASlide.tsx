import { MessageCircleQuestion } from "lucide-react";

import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

export function QASlide({ slide }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(203,108,230,0.15),_transparent_60%)]"
      />
      <div className="mb-10 inline-flex h-32 w-32 items-center justify-center rounded-full bg-bude-gradient text-white shadow-2xl md:h-40 md:w-40">
        <MessageCircleQuestion className="h-16 w-16 md:h-20 md:w-20" />
      </div>
      <h2 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
        <span className="text-bude-gradient">{slide.title ?? "Questions?"}</span>
      </h2>
      <p className="mt-6 text-base text-muted-foreground md:text-xl">
        Let&apos;s discuss.
      </p>
    </div>
  );
}
