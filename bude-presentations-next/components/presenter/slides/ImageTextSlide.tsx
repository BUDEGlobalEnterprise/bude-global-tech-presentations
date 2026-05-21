import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";
import { cn } from "@/lib/utils";

interface ImageTextSlideData extends Slide {
  image?: string;
  imageUrl?: string;
  layout?: string;
  imageAlt?: string;
  caption?: string;
  content?: string;
  box?: {
    content?: string;
  };
}

interface Props {
  slide: Slide;
}

export function ImageTextSlide({ slide }: Props) {
  const s = slide as ImageTextSlideData;
  const imageUrl = s.image ?? s.imageUrl;
  const layout = s.layout ?? "left-image"; // Default to image on the left
  const imageAlt = s.imageAlt ?? s.title ?? "Slide image";
  const caption = s.caption;
  const content = s.content;

  const isLeft = layout === "left-image";

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12">
      {slide.title && (
        <header className="mb-6 flex items-start gap-4 md:mb-8">
          {slide.emoji && (
            <span className="shrink-0 text-4xl md:text-5xl leading-none">
              {slide.emoji}
            </span>
          )}
          <div>
            <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                {slide.subtitle}
              </p>
            )}
          </div>
        </header>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2 md:gap-10 items-center">
        {/* Image Column */}
        <div className={cn("flex flex-col gap-2 w-full", isLeft ? "md:order-1" : "md:order-2")}>
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-border/55 shadow-lg bg-muted/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover max-h-[300px] md:max-h-[420px] transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          )}
          {caption && (
            <p className="text-center text-xs italic text-muted-foreground md:text-sm">
              {caption}
            </p>
          )}
        </div>

        {/* Text/Content Column */}
        <div className={cn("flex flex-col gap-4 w-full pr-1", isLeft ? "md:order-2" : "md:order-1")}>
          {content && (
            <SafeHTML
              as="div"
              html={content}
              className="prose-content text-base text-foreground/90 md:text-lg leading-relaxed 
                [&_strong]:text-foreground [&_strong]:font-semibold 
                [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-bude-primary [&_h4]:mb-2 [&_h4]:mt-0
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mt-2
                [&_p]:mb-3 [&_p]:last:mb-0"
            />
          )}
          {s.box?.content && (
            <SafeHTML
              as="div"
              html={s.box.content}
              className="text-sm text-foreground/85 md:text-base leading-relaxed"
            />
          )}
        </div>
      </div>
    </div>
  );
}
