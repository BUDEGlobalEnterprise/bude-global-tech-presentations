import { Film, Heart } from "lucide-react";

import { SafeHTML } from "@/lib/safe-html";
import { cn } from "@/lib/utils";
import type { Slide } from "@/types/presentation";

interface Recommendation {
  title: string;
  subtitle?: string;
  image?: string;
  url?: string;
  tag?: string;
}

interface ThankYouSlideData extends Slide {
  recommendations?: Recommendation[];
}

interface Props {
  slide: Slide;
}

export function ThankYouSlide({ slide }: Props) {
  const s = slide as ThankYouSlideData;
  const recommendations = s.recommendations ?? [];
  const hasRecs = recommendations.length > 0;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center px-6 text-center overflow-y-auto",
        hasRecs ? "py-8 md:py-10" : "py-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,96,160,0.18),_transparent_55%)]"
      />
      <Heart
        className={cn(
          "text-bude-pink animate-pulse",
          hasRecs
            ? "mb-2 h-9 w-9 md:h-11 md:w-11"
            : "mb-6 h-16 w-16 md:h-20 md:w-20",
        )}
      />
      <h2
        className={cn(
          "text-balance font-extrabold tracking-tight",
          hasRecs
            ? "text-3xl md:text-5xl lg:text-6xl"
            : "text-6xl md:text-8xl lg:text-9xl",
        )}
      >
        <SafeHTML
          as="span"
          html={slide.title ?? "Thank you"}
          className="text-bude-gradient"
        />
      </h2>
      {slide.message && (
        <div
          className={cn(
            "text-pretty text-muted-foreground leading-relaxed",
            hasRecs
              ? "mt-2.5 max-w-2xl text-xs md:text-base"
              : "mt-8 max-w-2xl text-base md:text-2xl",
          )}
        >
          <SafeHTML html={slide.message} />
        </div>
      )}

      {hasRecs && (
        <div className="mt-6 w-full max-w-3xl">
          <div className="mb-3.5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <Film className="h-4 w-4 text-bude-blue" />
            <span>Recommended Watch</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4 text-left">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col sm:flex-row items-center gap-3.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 hover:bg-zinc-800/60 transition-all shadow-xl backdrop-blur-md overflow-hidden"
              >
                {rec.image && (
                  <div className="relative w-full sm:w-28 md:w-32 h-36 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-black/50 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
                  {rec.tag && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-bude-blue mb-1">
                      {rec.tag}
                    </span>
                  )}
                  <h4 className="font-bold text-white text-sm md:text-base leading-snug group-hover:text-bude-blue transition-colors line-clamp-2">
                    {rec.title}
                  </h4>
                  {rec.subtitle && (
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {rec.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
