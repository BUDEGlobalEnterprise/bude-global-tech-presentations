"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { sortCategories } from "@/lib/category-meta";
import { buildSearchIndex, searchEntries } from "@/lib/search";
import type { CatalogEntry, Difficulty } from "@/types/presentation";

import { CategorySection } from "./CategorySection";
import { DifficultyFilter } from "./DifficultyFilter";
import { EmptyState } from "./EmptyState";
import { PresentationCard } from "./PresentationCard";
import { SearchBar } from "./SearchBar";

interface PresentationsBrowserProps {
  entries: CatalogEntry[];
}

export function PresentationsBrowser({ entries }: PresentationsBrowserProps) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const fuse = useMemo(() => buildSearchIndex(entries), [entries]);

  const counts = useMemo(() => {
    const c: Record<Difficulty | "all", number> = {
      all: entries.length,
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    for (const e of entries) c[e.difficulty]++;
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    const byDifficulty =
      difficulty === "all"
        ? entries
        : entries.filter((e) => e.difficulty === difficulty);
    if (!query.trim()) return byDifficulty;
    const matched = searchEntries(fuse, query);
    if (difficulty === "all") return matched;
    return matched.filter((e) => e.difficulty === difficulty);
  }, [entries, difficulty, query, fuse]);

  const grouped = useMemo(() => {
    if (query.trim()) return null;
    const buckets = new Map<string, CatalogEntry[]>();
    for (const e of filtered) {
      const primary = e.category[0] ?? "other";
      const key = primary.toLowerCase();
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key)!.push(e);
    }
    const orderedKeys = sortCategories([...buckets.keys()]);
    return orderedKeys.map((k) => [k, buckets.get(k)!] as const);
  }, [filtered, query]);

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
          totalCount={entries.length}
        />
        <DifficultyFilter
          value={difficulty}
          onChange={setDifficulty}
          counts={counts}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {filtered.length === 0 ? (
          <EmptyState query={query} onClear={() => setQuery("")} />
        ) : grouped ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            {grouped.map(([cat, items]) => (
              <CategorySection key={cat} categoryKey={cat} entries={items} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((e) => (
                <PresentationCard key={e.slug} entry={e} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
