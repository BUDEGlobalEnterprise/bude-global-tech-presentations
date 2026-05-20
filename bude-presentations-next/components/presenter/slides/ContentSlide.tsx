import { SafeHTML } from "@/lib/safe-html";
import type { ListItem, Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

function isObj(li: ListItem): li is Exclude<ListItem, string> {
  return typeof li !== "string";
}

export function ContentSlide({ slide }: Props) {
  const box = slide.box;
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-8 md:px-12 md:py-12">
      <header className="mb-6 flex items-start gap-4">
        {slide.emoji && (
          <span className="shrink-0 text-4xl md:text-5xl leading-none">
            {slide.emoji}
          </span>
        )}
        <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
          {slide.title}
        </h2>
      </header>

      {box && (
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-2">
          {box.title && (
            <h3 className="text-lg font-semibold text-bude-primary md:text-2xl">
              {box.title}
            </h3>
          )}
          {box.content && (
            <SafeHTML
              as="div"
              html={box.content}
              className="prose-content text-base text-foreground/90 md:text-lg leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold"
            />
          )}
          {box.list && box.list.length > 0 && (
            <ul className="space-y-3 md:space-y-4">
              {box.list.map((item, i) => {
                const emoji = isObj(item) ? item.emoji : undefined;
                const text = isObj(item) ? (item.text ?? item.content ?? "") : item;
                const itemTitle = isObj(item) ? item.title : undefined;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-3.5 md:gap-4 md:p-4"
                  >
                    {emoji && (
                      <span className="shrink-0 text-xl md:text-2xl leading-none">
                        {emoji}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      {itemTitle && (
                        <div className="text-sm font-semibold text-foreground md:text-base">
                          {itemTitle}
                        </div>
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
    </div>
  );
}
