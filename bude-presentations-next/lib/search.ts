import Fuse, { type IFuseOptions } from "fuse.js";
import type { CatalogEntry } from "@/types/presentation";

const FUSE_OPTIONS: IFuseOptions<CatalogEntry> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "keywords", weight: 0.3 },
    { name: "description", weight: 0.15 },
    { name: "category", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: false,
  minMatchCharLength: 2,
};

export function buildSearchIndex(entries: CatalogEntry[]) {
  return new Fuse(entries, FUSE_OPTIONS);
}

export function searchEntries(
  index: Fuse<CatalogEntry>,
  query: string,
): CatalogEntry[] {
  const q = query.trim();
  if (!q) return [];
  return index.search(q).map((r) => r.item);
}
