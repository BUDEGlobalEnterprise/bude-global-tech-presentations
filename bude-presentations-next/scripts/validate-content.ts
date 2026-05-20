/**
 * Standalone content validator. Run with: npm run validate-content
 *
 * Reads every catalog entry, parses its JSON, validates against the Zod
 * schema, and prints a per-file pass/fail report. Exits 1 on any failure
 * so it can be wired into CI later.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

import { CATALOG } from "../lib/catalog";
import { parsePresentationSource } from "../lib/parse-presentation";
import { PresentationFileSchema, isKnownSlideType } from "../lib/schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "presentations");

async function main() {
  let failed = 0;
  const slugs = new Set<string>();

  for (const entry of CATALOG) {
    if (slugs.has(entry.slug)) {
      console.error(`✗ DUPLICATE slug: ${entry.slug}`);
      failed++;
      continue;
    }
    slugs.add(entry.slug);

    const filePath = path.join(CONTENT_DIR, entry.file);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const json = parsePresentationSource(raw);
      const result = PresentationFileSchema.safeParse(json);
      if (!result.success) {
        failed++;
        console.error(`✗ ${entry.slug} (${entry.file})`);
        for (const issue of result.error.issues.slice(0, 3)) {
          console.error(`    ${issue.path.join(".")}: ${issue.message}`);
        }
        if (result.error.issues.length > 3) {
          console.error(`    ... ${result.error.issues.length - 3} more`);
        }
      } else {
        const topics = result.data.presentation.topics.length;
        const slides = result.data.presentation.topics.reduce(
          (n, t) => n + t.slides.length,
          0,
        );
        // Tally any unknown slide types so we can spot ones to add to the renderer.
        const unknownTypes = new Set<string>();
        for (const t of result.data.presentation.topics) {
          for (const s of t.slides) {
            if (!isKnownSlideType(s.type)) unknownTypes.add(s.type);
          }
        }
        const note = unknownTypes.size
          ? `  [unknown types: ${[...unknownTypes].join(", ")}]`
          : "";
        console.log(`✓ ${entry.slug}  (${topics} topics, ${slides} slides)${note}`);
      }
    } catch (err) {
      failed++;
      console.error(`✗ ${entry.slug} — ${(err as Error).message}`);
    }
  }

  console.log("");
  console.log(
    `Result: ${CATALOG.length - failed}/${CATALOG.length} OK` +
      (failed ? `  (${failed} failed)` : ""),
  );
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
