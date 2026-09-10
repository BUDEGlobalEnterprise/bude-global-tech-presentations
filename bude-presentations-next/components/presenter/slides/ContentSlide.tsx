import { ContentIcon, hasContentIcon } from "@/lib/content-icons";
import { SafeHTML } from "@/lib/safe-html";
import { cn } from "@/lib/utils";
import type { ListItem, Slide } from "@/types/presentation";

interface ContentSlideData extends Slide {
  icon?: string;
  image?: string;
  imageAlt?: string;
  imageLayout?: string;
  caption?: string;
}

interface Props {
  slide: Slide;
}

function isObj(li: ListItem): li is Exclude<ListItem, string> {
  return typeof li !== "string";
}

function noteText(slide: Slide): string | undefined {
  const note = (slide as Record<string, unknown>).note;
  if (typeof note === "string") return note;
  if (note && typeof note === "object" && "text" in note) {
    return String((note as { text: unknown }).text);
  }
  return undefined;
}

export function ContentSlide({ slide }: Props) {
  const s = slide as ContentSlideData;
  const box = slide.box;
  const note = noteText(slide);
  const headerIcon = hasContentIcon(s.icon);
  const image = s.image;
  const imageOnLeft = s.imageLayout === "left-image";

  const body = (
    <>
      {box && (
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-2">
          {box.title && (
            <SafeHTML
              as="h3"
              html={box.title}
              className="text-lg font-semibold text-bude-primary md:text-2xl"
            />
          )}
          {box.content && (
            <SafeHTML
              as="div"
              html={box.content}
              className="prose-content text-base text-foreground/90 md:text-lg leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-bude-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_p]:mb-3 [&_p]:last:mb-0"
            />
          )}
          {box.list && box.list.length > 0 && (
            <ul className="space-y-3 md:space-y-4">
              {box.list.map((item, i) => {
                const emoji = isObj(item) ? item.emoji : undefined;
                const iconName = isObj(item)
                  ? (item as { icon?: string }).icon
                  : undefined;
                const text = isObj(item) ? (item.text ?? item.content ?? "") : item;
                const itemTitle = isObj(item) ? item.title : undefined;
                const showIcon = hasContentIcon(iconName);
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-3.5 md:gap-4 md:p-4"
                  >
                    {showIcon ? (
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-bude-primary">
                        <ContentIcon name={iconName} className="h-[18px] w-[18px]" />
                      </span>
                    ) : emoji ? (
                      <span className="shrink-0 text-xl md:text-2xl leading-none">
                        {emoji}
                      </span>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      {itemTitle && (
                        <SafeHTML
                          as="div"
                          html={itemTitle}
                          className="text-sm font-semibold text-foreground md:text-base"
                        />
                      )}
                      <SafeHTML
                        as="div"
                        html={text}
                        className="text-sm leading-relaxed text-foreground/85 md:text-base [&_strong]:text-foreground [&_strong]:font-semibold"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {box.code && (
            <pre className="overflow-x-auto rounded-xl border border-border bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-100 shadow-inner md:p-5 md:text-sm">
              <code>{box.code}</code>
            </pre>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-8 md:px-12 md:py-12">
      <header className="mb-6 flex items-start gap-4">
        {headerIcon ? (
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bude-gradient text-white shadow-lg md:h-12 md:w-12">
            <ContentIcon name={s.icon} className="h-6 w-6" />
          </span>
        ) : slide.emoji ? (
          <span className="shrink-0 text-4xl md:text-5xl leading-none">
            {slide.emoji}
          </span>
        ) : null}
        {slide.title && (
          <SafeHTML
            as="h2"
            html={slide.title}
            className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl"
          />
        )}
      </header>

      {image ? (
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 md:gap-10 md:items-start">
          <div className={cn("flex min-h-0 flex-col", imageOnLeft && "md:order-2")}>
            {body}
          </div>
          <figure className={cn("flex flex-col gap-2", imageOnLeft && "md:order-1")}>
            <div className="overflow-hidden rounded-2xl border border-border/55 bg-muted/30 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={s.imageAlt ?? slide.title ?? "Slide image"}
                className="h-full w-full object-cover max-h-[260px] md:max-h-[380px]"
              />
            </div>
            {s.caption && (
              <figcaption className="text-center text-xs italic text-muted-foreground md:text-sm">
                {s.caption}
              </figcaption>
            )}
          </figure>
        </div>
      ) : (
        body
      )}

      {note && (
        <SafeHTML
          as="div"
          html={note}
          className="mt-5 shrink-0 rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-sm italic text-muted-foreground [&_strong]:font-semibold [&_strong]:not-italic [&_strong]:text-foreground"
        />
      )}
    </div>
  );
}
