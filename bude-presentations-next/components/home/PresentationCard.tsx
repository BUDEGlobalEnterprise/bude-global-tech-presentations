"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";

import { categoryMeta } from "@/lib/category-meta";
import { cn } from "@/lib/utils";
import type { CatalogEntry, Difficulty } from "@/types/presentation";

const DIFFICULTY_STYLE: Record<Difficulty, { dot: string; label: string }> = {
  beginner: { dot: "bg-emerald-500", label: "text-emerald-500" },
  intermediate: { dot: "bg-amber-500", label: "text-amber-500" },
  advanced: { dot: "bg-rose-500", label: "text-rose-500" },
};

interface PresentationCardProps {
  entry: CatalogEntry;
}

export function PresentationCard({ entry }: PresentationCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const primaryCategory = categoryMeta(entry.category[0]);
  const PrimaryIcon = primaryCategory.icon;
  const difficulty = DIFFICULTY_STYLE[entry.difficulty];

  // Spotlight that follows the cursor.
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(111, 66, 193, 0.18), transparent 60%)`;

  return (
    <Link
      href={`/p/${entry.slug}/`}
      onMouseMove={onMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-bude-purple/10"
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Top row: icon + difficulty */}
      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            primaryCategory.hue,
          )}
        >
          <PrimaryIcon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
            difficulty.label,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", difficulty.dot)} />
          {entry.difficulty}
        </span>
      </div>

      {/* Title + description */}
      <div className="relative mt-4 flex-1">
        <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-bude-primary md:text-lg">
          {entry.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {entry.description}
        </p>
      </div>

      {/* Bottom row: tags + cta */}
      <div className="relative mt-4 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {entry.keywords.filter(Boolean).slice(0, 3).map((k) => (
            <span
              key={k}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {k}
            </span>
          ))}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-bude-primary">
          Open
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
