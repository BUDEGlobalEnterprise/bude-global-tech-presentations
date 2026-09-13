"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

/** A slide image that opens full-screen on click, with a click-to-toggle
 * native-size zoom (pan via scroll) inside the overlay. */
export function ZoomableImage({ src, alt, className }: Props) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    setZoomed(false);
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(className, "cursor-zoom-in")}
        role="button"
        tabIndex={0}
        aria-label={`Zoom in on ${alt}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={close}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className={cn(
                "max-h-[92vh] max-w-[92vw]",
                zoomed ? "overflow-auto" : "flex items-center justify-center",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onClick={() => setZoomed((z) => !z)}
                className={
                  zoomed
                    ? "max-w-none cursor-zoom-out"
                    : "max-h-[92vh] max-w-[92vw] cursor-zoom-in object-contain"
                }
              />
            </div>
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
              Click image to {zoomed ? "fit to screen" : "zoom in"} &middot; Esc to close
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
