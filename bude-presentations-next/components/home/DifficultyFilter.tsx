"use client";

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/presentation";

const FILTERS: { value: Difficulty | "all"; label: string; dotClass: string }[] = [
  { value: "all", label: "All", dotClass: "bg-gradient-to-br from-bude-primary to-bude-pink" },
  { value: "beginner", label: "Beginner", dotClass: "bg-emerald-500" },
  { value: "intermediate", label: "Intermediate", dotClass: "bg-amber-500" },
  { value: "advanced", label: "Advanced", dotClass: "bg-rose-500" },
];

interface DifficultyFilterProps {
  value: Difficulty | "all";
  onChange: (next: Difficulty | "all") => void;
  counts: Record<Difficulty | "all", number>;
}

export function DifficultyFilter({ value, onChange, counts }: DifficultyFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4">
      {FILTERS.map((f) => {
        const active = value === f.value;
        return (
          <button
            key={f.value}
            type="button"
            onClick={() => onChange(f.value)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              active
                ? "border-foreground/30 bg-foreground text-background shadow-sm"
                : "border-border bg-card/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", f.dotClass)} />
            {f.label}
            <span
              className={cn(
                "tabular-nums",
                active ? "text-background/70" : "text-muted-foreground/60",
              )}
            >
              {counts[f.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
