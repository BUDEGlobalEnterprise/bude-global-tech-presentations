"use client";

import { ChevronDown, Download, FileText, Loader2, Presentation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { ExportDeck } from "@/lib/export/extract";
import { cn } from "@/lib/utils";
import type { Slide } from "@/types/presentation";

type Format = "pdf" | "docx" | "pptx";

interface Props {
  deck: ExportDeck;
  slides: Slide[];
}

const ITEMS: { format: Format; label: string; icon: typeof FileText; hint: string }[] = [
  { format: "pdf", label: "PDF", icon: FileText, hint: "One slide per page" },
  { format: "pptx", label: "PowerPoint", icon: Presentation, hint: "Editable .pptx deck" },
  { format: "docx", label: "Word", icon: FileText, hint: "Landscape handout" },
];

export function DownloadMenu({ deck, slides }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<Format | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"" | "render" | "build">("");
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  async function run(format: Format) {
    if (busy) return;
    setBusy(format);
    setError(null);
    setProgress(0);
    setPhase("render");
    try {
      const { captureSlides } = await import("@/lib/export/capture");
      const { images } = await captureSlides(slides, (done, total) =>
        setProgress(Math.round((done / total) * 100)),
      );

      setPhase("build");
      if (format === "pdf") {
        const { exportPdf } = await import("@/lib/export/to-pdf");
        await exportPdf(deck, images);
      } else if (format === "docx") {
        const { exportDocx } = await import("@/lib/export/to-docx");
        await exportDocx(deck, images);
      } else {
        const { exportPptx } = await import("@/lib/export/to-pptx");
        await exportPptx(deck, images);
      }
      setOpen(false);
    } catch (err) {
      setError(`Couldn't generate the ${format.toUpperCase()}. Try again.`);
      console.error("[export]", err);
    } finally {
      setBusy(null);
      setPhase("");
      setProgress(0);
    }
  }

  const busyLabel =
    phase === "render"
      ? `Rendering slides ${progress}%`
      : phase === "build"
        ? "Building file"
        : "Download";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={busy !== null}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busyLabel}
        {!busy && (
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        )}
      </button>

      {open && !busy && (
        <div
          role="menu"
          className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur"
        >
          {ITEMS.map(({ format, label, icon: Icon, hint }) => (
            <button
              key={format}
              type="button"
              role="menuitem"
              onClick={() => run(format)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{label}</span>
                <span className="block text-xs text-muted-foreground">{hint}</span>
              </span>
            </button>
          ))}
          <p className="px-3 pb-1 pt-2 text-[11px] leading-snug text-muted-foreground">
            Renders every slide exactly as shown. A large deck can take a minute.
          </p>
          {error && <p className="px-3 py-2 text-xs text-rose-500">{error}</p>}
        </div>
      )}

      {error && !open && (
        <p className="absolute left-0 mt-2 text-xs text-rose-500">{error}</p>
      )}
    </div>
  );
}
