import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { CATALOG, findCatalogEntry } from "@/lib/catalog";
import { parsePresentationSource } from "@/lib/parse-presentation";
import { PresentationFileSchema } from "@/lib/schema";
import type { LoadedPresentation, PresentationFile } from "@/types/presentation";

const CONTENT_DIR = path.join(process.cwd(), "content", "presentations");

let memoryCache: Map<string, LoadedPresentation> | null = null;

async function readAndValidate(file: string): Promise<PresentationFile> {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(filePath, "utf8");
  const json = parsePresentationSource(raw);
  const result = PresentationFileSchema.safeParse(json);
  if (!result.success) {
    const issues = result.error.issues
      .slice(0, 5)
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `[presentations] Invalid JSON in ${file}:\n${issues}` +
        (result.error.issues.length > 5
          ? `\n  ... and ${result.error.issues.length - 5} more`
          : ""),
    );
  }
  return result.data;
}

async function buildCache() {
  const cache = new Map<string, LoadedPresentation>();
  for (const meta of CATALOG) {
    try {
      const data = await readAndValidate(meta.file);
      cache.set(meta.slug, { slug: meta.slug, meta, data });
    } catch (err) {
      console.warn(
        `[presentations] Skipping ${meta.slug}: ${(err as Error).message}`,
      );
    }
  }
  return cache;
}

async function getCache() {
  // In dev, always rebuild so edits to JSON files show up on next reload.
  // (HMR doesn't track files read via fs.readFile.)
  if (process.env.NODE_ENV !== "production") {
    return buildCache();
  }
  if (!memoryCache) memoryCache = await buildCache();
  return memoryCache;
}

export async function getAllPresentations(): Promise<LoadedPresentation[]> {
  const cache = await getCache();
  return Array.from(cache.values());
}

export async function getPresentationBySlug(
  slug: string,
): Promise<LoadedPresentation | undefined> {
  const cache = await getCache();
  return cache.get(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const cache = await getCache();
  return Array.from(cache.keys());
}

export { CATALOG, findCatalogEntry };
