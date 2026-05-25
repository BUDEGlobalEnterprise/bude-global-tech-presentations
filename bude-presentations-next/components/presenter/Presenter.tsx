"use client";

import { useDrag } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { clampIndex } from "@/lib/presentation-flow";
import type { FlatSlide } from "@/types/presentation";

import { PresenterChrome } from "./PresenterChrome";
import { SlideRenderer } from "./SlideRenderer";

interface Props {
  slides: FlatSlide[];
  presentationTitle: string;
  exitHref: string;
}

const transitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function Presenter({ slides, presentationTitle, exitHref }: Props) {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  // Skip the first run of the hash-sync effect so a deep-link (#15) isn't
  // briefly clobbered to #1 before the init effect's setCurrent lands.
  const skipFirstSync = useRef(true);

  // Init from URL hash on mount.
  useEffect(() => {
    const fromHash = parseInt(window.location.hash.replace("#", ""), 10);
    if (!Number.isNaN(fromHash) && fromHash >= 1 && fromHash <= total) {
      setCurrent(fromHash - 1);
    }
  }, [total]);

  // Persist current slide to the URL hash (after the initial mount).
  useEffect(() => {
    if (skipFirstSync.current) {
      skipFirstSync.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    const next = `#${current + 1}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [current]);

  const go = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? 1 : -1);
      setCurrent((c) => clampIndex(c + delta, total));
    },
    [total],
  );

  const jumpTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(clampIndex(idx, total));
    },
    [current, total],
  );

  const toggleFullscreen = useCallback(async () => {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        await stageRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // Fullscreen unavailable; ignore.
    }
  }, []);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Keyboard navigation.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          jumpTo(0);
          break;
        case "End":
          e.preventDefault();
          jumpTo(total - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jumpTo, total, toggleFullscreen]);

  // Touch swipe.
  const bind = useDrag(
    ({ swipe: [sx] }) => {
      if (sx === 1) go(-1);
      else if (sx === -1) go(1);
    },
    { axis: "x", filterTaps: true },
  );

  const flat = slides[current];

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-background"
      {...bind()}
    >
      <PresenterChrome
        current={current}
        total={total}
        topicTitle={flat?.topicTitle}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        presentationTitle={presentationTitle}
        exitHref={exitHref}
      />

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={transitionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center pt-16 pb-20"
          >
            {flat && <SlideRenderer slide={flat.slide} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Announce slide changes to screen readers. */}
      <div className="sr-only" aria-live="polite" role="status">
        {flat
          ? `Slide ${current + 1} of ${total}${
              flat.slide.title ? `: ${flat.slide.title}` : ""
            }`
          : ""}
      </div>
    </div>
  );
}
