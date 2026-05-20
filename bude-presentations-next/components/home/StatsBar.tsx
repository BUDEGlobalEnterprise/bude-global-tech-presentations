interface StatsBarProps {
  totalPresentations: number;
  totalCategories: number;
  totalTopics: number;
}

export function StatsBar({
  totalPresentations,
  totalCategories,
  totalTopics,
}: StatsBarProps) {
  const stats = [
    { value: totalPresentations, label: "Presentations", accent: "text-bude-primary" },
    { value: totalCategories, label: "Categories", accent: "text-bude-purple" },
    { value: totalTopics.toLocaleString(), label: "Topics", accent: "text-bude-pink" },
  ];

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 px-4 md:gap-6 md:px-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 px-4 py-5 text-center backdrop-blur-sm transition-all hover:border-border hover:bg-card md:px-6 md:py-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-bude-purple/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
          <div className={`text-3xl font-bold tabular-nums md:text-4xl ${s.accent}`}>
            {s.value}
          </div>
          <div className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
