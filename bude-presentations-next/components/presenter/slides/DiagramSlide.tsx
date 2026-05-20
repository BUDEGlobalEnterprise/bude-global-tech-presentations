import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

function getDiagramContent(slide: Slide): string | undefined {
  // ASCII diagrams typically live in `content` at the slide root, not under `box`.
  const direct = (slide as Record<string, unknown>).content;
  if (typeof direct === "string") return direct;
  if (slide.box?.content) return slide.box.content;
  if (slide.box?.code) return slide.box.code;
  return undefined;
}

function getNoteText(slide: Slide): string | undefined {
  const note = (slide as Record<string, unknown>).note;
  if (typeof note === "string") return note;
  if (note && typeof note === "object" && "text" in note) {
    return String((note as { text: unknown }).text);
  }
  return undefined;
}

export function DiagramSlide({ slide }: Props) {
  const content = getDiagramContent(slide);
  const note = getNoteText(slide);

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12">
      {slide.title && (
        <header className="mb-5 flex items-start gap-4">
          {slide.emoji && (
            <span className="shrink-0 text-4xl md:text-5xl leading-none">
              {slide.emoji}
            </span>
          )}
          <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            {slide.title}
          </h2>
        </header>
      )}

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-zinc-950 shadow-inner">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bude-purple/60 to-transparent"
        />
        {content ? (
          <pre className="h-full overflow-auto p-4 font-mono text-[10px] leading-[1.5] text-zinc-100 sm:text-xs md:p-6 md:text-[13px] md:leading-[1.55]">
            <code className="whitespace-pre">{content}</code>
          </pre>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            (no diagram content)
          </div>
        )}
      </div>

      {note && (
        <div className="mt-4 rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-center text-sm italic text-muted-foreground md:text-base">
          {note}
        </div>
      )}
    </div>
  );
}
