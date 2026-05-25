import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

/**
 * Fallback renderer for any slide type the dedicated dispatcher doesn't yet
 * recognise. It surfaces all the common fields it can find so authored
 * content still renders, even if not as polished as a bespoke component.
 */
export function GenericSlide({ slide }: Props) {
  // Best-effort extraction of "lists of things" that authors tend to attach
  // under various keys (sections, points, items, etc.).
  const arrays = Object.entries(slide).filter(
    ([k, v]) =>
      Array.isArray(v) &&
      v.length > 0 &&
      !["data", "options"].includes(k) &&
      k !== "list",
  ) as [string, unknown[]][];

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-8 md:px-12 md:py-12">
      <header className="mb-6 flex items-start gap-4">
        {slide.emoji && (
          <span className="shrink-0 text-4xl md:text-5xl leading-none">
            {slide.emoji}
          </span>
        )}
        <div>
          {slide.type && (
            <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {slide.type.replace(/[-_]/g, " ")}
            </div>
          )}
          <SafeHTML
            as="h2"
            html={slide.title ?? slide.subtitle ?? "Content"}
            className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl"
          />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-2 text-sm md:text-base">
        {slide.subtitle && slide.title && (
          <SafeHTML
            as="p"
            html={slide.subtitle}
            className="text-muted-foreground md:text-lg"
          />
        )}
        {slide.box?.content && (
          <SafeHTML
            as="div"
            html={slide.box.content}
            className="text-foreground/90 leading-relaxed"
          />
        )}
        {slide.box?.code && (
          <pre className="overflow-x-auto rounded-xl border border-border bg-zinc-950 p-4 text-xs text-zinc-100 md:p-5 md:text-sm">
            <code>{slide.box.code}</code>
          </pre>
        )}

        {/* Tabular dump of array-valued fields, so authored content
            (timeline, comparison, etc.) is still visible.  */}
        {arrays.map(([key, items]) => (
          <section key={key}>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {key.replace(/[-_]/g, " ")}
            </h3>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {items.slice(0, 8).map((item, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-border/40 bg-card/40 p-3 text-sm"
                >
                  {typeof item === "string" ? (
                    <SafeHTML html={item} className="text-foreground/85" />
                  ) : item && typeof item === "object" ? (
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-muted-foreground">
                      {previewObject(item)}
                    </pre>
                  ) : (
                    String(item)
                  )}
                </li>
              ))}
              {items.length > 8 && (
                <li className="rounded-lg border border-dashed border-border/40 p-3 text-xs text-muted-foreground">
                  +{items.length - 8} more
                </li>
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function previewObject(item: object): string {
  return Object.entries(item)
    .filter(([, v]) => v != null && typeof v !== "object")
    .slice(0, 4)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
