"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

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

  // Autoplay props:
  isPlaying: boolean;
  onTogglePlay: () => void;
  autoplayDuration: number;
  onChangeDuration: (dur: number) => void;
  loop: boolean;
  onToggleLoop: () => void;
  pauseOnHover: boolean;
  onTogglePauseOnHover: () => void;
  pauseOnInteractive: boolean;
  onTogglePauseOnInteractive: () => void;
  progress: number;
  isAutoplaySuspended: boolean;
  suspendedReason: "hover" | "interactive" | null;
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
  isPlaying,
  onTogglePlay,
  autoplayDuration,
  onChangeDuration,
  loop,
  onToggleLoop,
  pauseOnHover,
  onTogglePauseOnHover,
  pauseOnInteractive,
  onTogglePauseOnInteractive,
  progress,
  isAutoplaySuspended,
  suspendedReason,
}: Props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
            <span className="text-xs tabular-nums text-muted-foreground">
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

      {/* Settings popover backdrop click-outside */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-35 bg-transparent cursor-default pointer-events-auto"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Floating Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute bottom-20 left-1/2 -translate-x-1/2 z-40 w-72 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="text-sm font-semibold">Autoplay Settings</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {"Press 'A'"}
                </span>
              </div>

              {/* Slide duration slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Slide Duration</span>
                  <span className="font-semibold tabular-nums text-primary">{autoplayDuration}s</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={30}
                  step={1}
                  value={autoplayDuration}
                  onChange={(e) => onChangeDuration(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/80">
                  <span>2s</span>
                  <span>15s</span>
                  <span>30s</span>
                </div>
              </div>

              {/* Toggles list */}
              <div className="space-y-3 pt-1">
                {/* Loop toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium">Loop Slideshow</div>
                    <div className="text-[10px] text-muted-foreground/80">Restart from start at the end</div>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleLoop}
                    aria-label="Toggle loop slideshow"
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      loop ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                        loop ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Pause on Hover toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium">Pause on Hover</div>
                    <div className="text-[10px] text-muted-foreground/80">Suspend timer when mouse is over slide</div>
                  </div>
                  <button
                    type="button"
                    onClick={onTogglePauseOnHover}
                    aria-label="Toggle pause on hover"
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      pauseOnHover ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                        pauseOnHover ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                {/* Pause on Interactive toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium">Pause on Quiz / Q&A</div>
                    <div className="text-[10px] text-muted-foreground/80">Wait for user input on interaction slides</div>
                  </div>
                  <button
                    type="button"
                    onClick={onTogglePauseOnInteractive}
                    aria-label="Toggle pause on interactive slides"
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      pauseOnInteractive ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                        pauseOnInteractive ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Autoplay Suspension Badge */}
      <AnimatePresence>
        {isPlaying && isAutoplaySuspended && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/20 px-3.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 backdrop-blur-md shadow-lg shadow-amber-500/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>
              {suspendedReason === "hover"
                ? "Autoplay paused (hovering)"
                : "Autoplay paused (interactive slide)"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom: prev / next buttons + autoplay controls */}
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

        {/* Center Pill: Autoplay Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border bg-background/75 p-1 backdrop-blur-md shadow-md">
          {/* Autoplay Play/Pause button with circular progress */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 -rotate-90" width="44" height="44" viewBox="0 0 44 44">
              <defs>
                <linearGradient id="autoplay-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-bude-primary, #0060a0)" />
                  <stop offset="50%" stopColor="var(--color-bude-purple, #6f42c1)" />
                  <stop offset="100%" stopColor="var(--color-bude-pink, #cb6ce6)" />
                </linearGradient>
              </defs>
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-muted-foreground/15"
                strokeWidth="2.5"
                fill="transparent"
              />
              {isPlaying && (
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  stroke={isAutoplaySuspended ? "#f59e0b" : "url(#autoplay-grad)"}
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={113.1}
                  strokeDashoffset={113.1 - (progress / 100) * 113.1}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-linear"
                />
              )}
            </svg>

            {/* Play/Pause Icons */}
            {isPlaying ? (
              isAutoplaySuspended ? (
                <Pause className="relative z-10 h-4.5 w-4.5 text-amber-500 animate-pulse" />
              ) : (
                <Pause className="relative z-10 h-4.5 w-4.5 text-foreground fill-foreground" />
              )
            ) : (
              <Play className="relative z-10 h-4.5 w-4.5 ml-0.5 text-muted-foreground hover:text-foreground fill-muted-foreground hover:fill-foreground transition-colors" />
            )}
          </button>

          {/* Vertical Separator */}
          <div className="h-4 w-px bg-border/80" />

          {/* Settings button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            aria-label="Autoplay settings"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
              isSettingsOpen && "bg-accent text-foreground"
            )}
          >
            <Settings className={cn("h-4.5 w-4.5 transition-transform duration-300", isSettingsOpen && "rotate-45")} />
          </button>
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
