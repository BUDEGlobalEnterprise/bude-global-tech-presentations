import { ContentIcon, hasContentIcon } from "@/lib/content-icons";
import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";

interface TopicTitleSlideData extends Slide {
  icon?: string;
  image?: string;
  eyebrow?: string;
}

interface Props {
  slide: Slide;
}

export function TopicTitleSlide({ slide }: Props) {
  const s = slide as TopicTitleSlideData;
  const showIcon = hasContentIcon(s.icon);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
      {s.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(9,9,11,0.35),_rgba(9,9,11,0.85))]"
          />
        </>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(111,66,193,0.2),_transparent_60%)]"
      />
      {showIcon ? (
        <span className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-bude-gradient text-white shadow-2xl md:h-24 md:w-24">
          <ContentIcon name={s.icon} className="h-10 w-10 md:h-12 md:w-12" />
        </span>
      ) : slide.emoji ? (
        <div className="mb-10 text-7xl md:text-9xl drop-shadow-2xl">
          {slide.emoji}
        </div>
      ) : null}
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-bude-pink">
        {s.eyebrow ?? "Section"}
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
