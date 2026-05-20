"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  resultCount?: number;
  totalCount: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl + K focuses search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange]);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 md:px-6">
      <div className="group relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-2xl bg-bude-gradient opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-30"
        />
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search presentations, languages, tools…"
          className="h-14 w-full rounded-2xl border border-border bg-card/80 pl-12 pr-24 text-base shadow-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/70 focus:border-bude-primary/50 focus:bg-card focus:shadow-lg focus:shadow-bude-purple/10"
          aria-label="Search presentations"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Clear search"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden h-6 select-none items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      {value && (
        <div className="mt-3 text-center text-xs text-muted-foreground">
          {resultCount === 0
            ? `No matches for "${value}"`
            : `Showing ${resultCount} of ${totalCount} presentations`}
        </div>
      )}
    </div>
  );
}
