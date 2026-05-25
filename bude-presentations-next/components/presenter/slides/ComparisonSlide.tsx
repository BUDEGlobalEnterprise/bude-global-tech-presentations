import { SafeHTML } from "@/lib/safe-html";
import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((it) =>
      typeof it === "string"
        ? it
        : it && typeof it === "object" && "text" in it
          ? String((it as { text: unknown }).text)
          : "",
    )
    .filter(Boolean);
}

function getNoteText(slide: Slide): string | undefined {
  const note = (slide as Record<string, unknown>).note;
  if (typeof note === "string") return note;
  if (note && typeof note === "object" && "text" in note) {
    return String((note as { text: unknown }).text);
  }
  return undefined;
}

export function ComparisonSlide({ slide }: Props) {
  const s = slide as Record<string, unknown>;
  const leftTitle = (s.leftTitle as string) ?? "Option A";
  const rightTitle = (s.rightTitle as string) ?? "Option B";
  const leftPoints = asStringArray(s.leftPoints);
  const rightPoints = asStringArray(s.rightPoints);
  const note = getNoteText(slide);

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12">
      {slide.title && (
        <header className="mb-6 flex items-start gap-4 md:mb-8">
          {slide.emoji && (
            <span className="shrink-0 text-4xl md:text-5xl leading-none">
              {slide.emoji}
            </span>
          )}
          <SafeHTML
            as="h2"
            html={slide.title ?? ""}
            className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl"
          />
        </header>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 md:gap-6">
        <Column
          title={leftTitle}
          points={leftPoints}
          tone="from-sky-500/15 via-transparent border-sky-500/30"
          badgeClass="bg-sky-500/15 text-sky-500 border-sky-500/30"
          badge="A"
        />
        <Column
          title={rightTitle}
          points={rightPoints}
          tone="from-bude-purple/15 via-transparent border-bude-purple/30"
          badgeClass="bg-bude-purple/15 text-bude-purple border-bude-purple/30"
          badge="B"
        />
      </div>

      {note && (
        <div className="mt-5 rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-center text-sm italic text-muted-foreground md:mt-6 md:text-base">
          {note}
        </div>
      )}
    </div>
  );
}

function Column({
  title,
  points,
  tone,
  badgeClass,
  badge,
}: {
  title: string;
  points: string[];
  tone: string;
  badgeClass: string;
  badge: string;
}) {
  return (
    <section
      className={`relative flex min-h-0 flex-col overflow-hidden rounded-2xl border bg-gradient-to-b p-5 md:p-6 ${tone}`}
    >
      <header className="mb-4 flex items-center gap-3">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold ${badgeClass}`}
        >
          {badge}
        </span>
        <h3 className="flex-1 text-balance text-lg font-semibold leading-tight tracking-tight md:text-xl">
          {title}
        </h3>
      </header>
      <ul className="space-y-2 overflow-y-auto pr-1 md:space-y-2.5">
        {points.map((p, i) => (
          <li
            key={i}
            className="rounded-lg border border-border/40 bg-background/40 p-3 text-sm leading-relaxed md:text-base"
          >
            <SafeHTML
              html={p}
              className="text-foreground/90 [&_strong]:text-foreground [&_strong]:font-semibold"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
