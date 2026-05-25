import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { SlideRenderer } from "@/components/presenter/SlideRenderer";
import type { FlatSlide } from "@/types/presentation";

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

export interface CapturedDeck {
  images: string[]; // PNG data URLs, 16:9
  width: number;
  height: number;
}

/**
 * Renders each slide off-screen at 1280×720 (16:9) using the real slide
 * components, then snapshots it to a PNG with modern-screenshot (SVG
 * foreignObject — so Tailwind v4 oklch colors, gradients and fonts render
 * exactly as the browser shows them). Sequential by necessity (single stage).
 */
export async function captureSlides(
  slides: FlatSlide[],
  onProgress?: (done: number, total: number) => void,
): Promise<CapturedDeck> {
  const { domToPng } = await import("modern-screenshot");

  const stage = document.createElement("div");
  stage.setAttribute("aria-hidden", "true");
  Object.assign(stage.style, {
    position: "fixed",
    left: "-100000px",
    top: "0",
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    zIndex: "-1",
    pointerEvents: "none",
  });

  // Mirror the presenter stage so backgrounds/theme resolve identically.
  const frame = document.createElement("div");
  frame.className = "bg-background text-foreground";
  Object.assign(frame.style, {
    width: `${SLIDE_W}px`,
    height: `${SLIDE_H}px`,
    overflow: "hidden",
    position: "relative",
  });
  stage.appendChild(frame);
  document.body.appendChild(stage);

  const root = createRoot(frame);
  const images: string[] = [];
  const bg = getComputedStyle(document.body).backgroundColor || "#0a0f1f";

  try {
    if (document.fonts?.ready) await document.fonts.ready;

    for (let i = 0; i < slides.length; i++) {
      await renderOne(root, slides[i]);
      await nextPaint();
      try {
        const png = await domToPng(frame, {
          width: SLIDE_W,
          height: SLIDE_H,
          scale: 2,
          backgroundColor: bg,
        });
        images.push(png);
      } catch (err) {
        console.error(`[capture] slide ${i + 1} failed`, err);
        images.push(blankPng(bg));
      }
      onProgress?.(i + 1, slides.length);
    }
  } finally {
    root.unmount();
    stage.remove();
  }

  return { images, width: SLIDE_W, height: SLIDE_H };
}

function renderOne(root: ReturnType<typeof createRoot>, flat: FlatSlide) {
  return new Promise<void>((resolve) => {
    root.render(
      createElement(
        "div",
        {
          className:
            "absolute inset-0 flex items-center justify-center overflow-hidden",
        },
        createElement(SlideRenderer, { slide: flat.slide }),
      ),
    );
    // Give React a tick to commit before we wait for paint.
    setTimeout(resolve, 40);
  });
}

function nextPaint() {
  return new Promise<void>((r) =>
    requestAnimationFrame(() => requestAnimationFrame(() => r())),
  );
}

function blankPng(color: string): string {
  const c = document.createElement("canvas");
  c.width = SLIDE_W;
  c.height = SLIDE_H;
  const ctx = c.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);
  }
  return c.toDataURL("image/png");
}
