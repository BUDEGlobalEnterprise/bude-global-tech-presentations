import { notFound } from "next/navigation";

import { Presenter } from "@/components/presenter/Presenter";
import { flattenSlides } from "@/lib/presentation-flow";
import { getAllSlugs, getPresentationBySlug } from "@/lib/presentations";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const presentation = await getPresentationBySlug(slug);
  return {
    title: presentation ? `${presentation.meta.title} — Present` : "Present",
  };
}

export default async function PresentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const presentation = await getPresentationBySlug(slug);
  if (!presentation) notFound();

  const slides = flattenSlides(presentation);

  return (
    <Presenter
      slides={slides}
      presentationTitle={presentation.meta.title}
      exitHref={`/p/${presentation.slug}/`}
    />
  );
}
