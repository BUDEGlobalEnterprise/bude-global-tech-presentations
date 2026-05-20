import { categoryMeta } from "@/lib/category-meta";
import { cn } from "@/lib/utils";
import type { CatalogEntry } from "@/types/presentation";

import { PresentationCard } from "./PresentationCard";

interface CategorySectionProps {
  categoryKey: string;
  entries: CatalogEntry[];
}

export function CategorySection({ categoryKey, entries }: CategorySectionProps) {
  if (entries.length === 0) return null;
  const meta = categoryMeta(categoryKey);
  const Icon = meta.icon;

  return (
    <section className="scroll-mt-20" id={`cat-${categoryKey}`}>
      <div className="mb-5 flex items-center gap-3">
        <div
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
            meta.hue,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          {meta.label}
        </h2>
        <span className="text-xs text-muted-foreground tabular-nums">
          {entries.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map((e) => (
          <PresentationCard key={e.slug} entry={e} />
        ))}
      </div>
    </section>
  );
}
