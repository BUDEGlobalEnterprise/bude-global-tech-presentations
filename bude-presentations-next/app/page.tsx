import { HeroHeader } from "@/components/home/HeroHeader";
import { PresentationsBrowser } from "@/components/home/PresentationsBrowser";
import { StatsBar } from "@/components/home/StatsBar";
import { CATALOG } from "@/lib/catalog";
import { getAllPresentations } from "@/lib/presentations";

export default async function Home() {
  // Build-time aggregate stats (counts the actual loaded JSONs).
  const loaded = await getAllPresentations();
  const totalTopics = loaded.reduce(
    (n, p) => n + p.data.presentation.topics.length,
    0,
  );
  const totalCategories = new Set(loaded.flatMap((p) => p.meta.category)).size;

  return (
    <>
      <HeroHeader />

      <div className="space-y-8 pb-12">
        <StatsBar
          totalPresentations={loaded.length}
          totalCategories={totalCategories}
          totalTopics={totalTopics}
        />

        <PresentationsBrowser entries={CATALOG} />
      </div>
    </>
  );
}
