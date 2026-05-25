import { HeroHeader } from "@/components/home/HeroHeader";
import { PresentationsBrowser } from "@/components/home/PresentationsBrowser";
import { StatsBar } from "@/components/home/StatsBar";
import { getAllPresentations } from "@/lib/presentations";

export default async function Home() {
  // Source the home list from decks that actually loaded, so cards and
  // generated pages can never diverge (a card always has a page behind it).
  const loaded = await getAllPresentations();
  const entries = loaded.map((p) => p.meta);

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

        <PresentationsBrowser entries={entries} />
      </div>
    </>
  );
}
