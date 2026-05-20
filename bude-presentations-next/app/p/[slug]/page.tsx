import { ArrowLeft, Clock, Layers, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { categoryMeta } from "@/lib/category-meta";
import { CATALOG } from "@/lib/catalog";
import { getAllSlugs, getPresentationBySlug } from "@/lib/presentations";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/presentation";

const DIFFICULTY_STYLE: Record<Difficulty, { dot: string; label: string }> = {
  beginner: { dot: "bg-emerald-500", label: "text-emerald-500" },
  intermediate: { dot: "bg-amber-500", label: "text-amber-500" },
  advanced: { dot: "bg-rose-500", label: "text-rose-500" },
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = CATALOG.find((c) => c.slug === slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "article",
    },
  };
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const presentation = await getPresentationBySlug(slug);
  if (!presentation) notFound();

  const { meta, data } = presentation;
  const topics = data.presentation.topics;
  const totalSlides = topics.reduce((n, t) => n + t.slides.length, 0);
  const difficulty = DIFFICULTY_STYLE[meta.difficulty];
  const primaryCategory = categoryMeta(meta.category[0]);
  const PrimaryIcon = primaryCategory.icon;

  // Rough reading-time estimate (45 sec/slide is a comfortable presenting pace).
  const estimatedMinutes = Math.max(5, Math.round((totalSlides * 45) / 60));

  return (
    <>
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(111,66,193,0.18),_transparent_60%)]"
      />

      <article className="mx-auto max-w-5xl px-4 pt-10 pb-20 md:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all presentations
        </Link>

        <header className="mt-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-gradient-to-br px-3 py-1 text-xs font-medium text-white",
                primaryCategory.hue,
              )}
            >
              <PrimaryIcon className="h-3.5 w-3.5" />
              {primaryCategory.label}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider",
                difficulty.label,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", difficulty.dot)} />
              {meta.difficulty}
            </span>
            {meta.category.slice(1).map((c) => {
              const m = categoryMeta(c);
              return (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {m.label}
                </span>
              );
            })}
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            <span className="text-bude-gradient">{meta.title}</span>
          </h1>

          <p className="text-pretty text-base text-muted-foreground md:text-lg max-w-3xl">
            {meta.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              {topics.length} {topics.length === 1 ? "topic" : "topics"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PlayCircle className="h-4 w-4" />
              {totalSlides} slides
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              ~{estimatedMinutes} min
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/p/${meta.slug}/present/`}
              className="group inline-flex items-center gap-2 rounded-full bg-bude-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-bude-purple/20 transition-transform hover:scale-[1.03] hover:shadow-xl hover:shadow-bude-purple/30"
            >
              <PlayCircle className="h-4 w-4" />
              Start presentation
            </Link>
            <span className="self-center text-xs text-muted-foreground">
              Arrow keys ←/→ to navigate · F for fullscreen · Esc to exit
            </span>
          </div>
        </header>

        {/* Topic list */}
        <section className="mt-14">
          <h2 className="mb-5 text-lg font-semibold tracking-tight">
            Contents
          </h2>
          <ol className="space-y-2">
            {topics.map((topic, i) => (
              <li
                key={topic.id ?? `${i}-${topic.title ?? "topic"}`}
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-4 transition-colors hover:bg-card"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {topic.title ?? `Topic ${i + 1}`}
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {topic.slides.length}
                  <span className="ml-1 hidden sm:inline">slides</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Keywords */}
        {meta.keywords.filter(Boolean).length > 0 && (
          <section className="mt-12">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {meta.keywords
                .filter(Boolean)
                .map((k) => (
                  <span
                    key={k}
                    className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {k}
                  </span>
                ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
