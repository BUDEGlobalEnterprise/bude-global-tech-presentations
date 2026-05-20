"use client";

import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from "lucide-react";
import Link from "next/link";

interface Props {
  current: number;
  total: number;
  topicTitle?: string;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  presentationTitle: string;
  exitHref: string;
}

export function PresenterChrome({
  current,
  total,
  topicTitle,
  onPrev,
  onNext,
  onToggleFullscreen,
  isFullscreen,
  presentationTitle,
  exitHref,
}: Props) {
  const progressPct = total === 0 ? 0 : ((current + 1) / total) * 100;
  return (
    <>
      {/* Top: progress bar + title */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col">
        <div className="h-1 w-full bg-border/40">
          <div
            className="h-full bg-bude-gradient transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="pointer-events-auto flex items-center justify-between gap-4 bg-gradient-to-b from-background/80 to-transparent px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={exitHref}
              aria-label="Exit presentation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold md:text-base">
                {presentationTitle}
              </div>
              {topicTitle && (
                <div className="truncate text-xs text-muted-foreground">
                  {topicTitle}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
              {current + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: prev / next buttons */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 bg-gradient-to-t from-background/80 to-transparent px-4 py-4 md:px-6 md:py-5">
        <button
          type="button"
          onClick={onPrev}
          disabled={current === 0}
          aria-label="Previous slide"
          className="pointer-events-auto inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-background/70 px-4 text-sm font-medium backdrop-blur transition-all hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="pointer-events-auto rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs tabular-nums text-muted-foreground backdrop-blur sm:hidden">
          {current + 1} / {total}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={current >= total - 1}
          aria-label="Next slide"
          className="pointer-events-auto inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-background/70 px-4 text-sm font-medium backdrop-blur transition-all hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
