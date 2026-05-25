"use client";

import { GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";

const REPO = "BUDEGlobalEnterprise/bude-global-tech-presentations";
const CACHE_KEY = "gh-stats";
const TTL_MS = 60 * 60 * 1000; // 1 hour

interface Stats {
  stars: number | null;
  forks: number | null;
}

interface Cached extends Stats {
  ts: number;
}

function readCache(): Cached | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (Date.now() - parsed.ts > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function fmt(n: number | null) {
  if (n == null) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function GitHubStats() {
  const [stats, setStats] = useState<Stats>({ stars: null, forks: null });

  useEffect(() => {
    // Static export has no server runtime, so fetch live from the client.
    // Cache in localStorage for an hour to stay well under GitHub's
    // unauthenticated rate limit.
    const cached = readCache();
    if (cached) {
      setStats({ stars: cached.stars, forks: cached.forks });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`);
        if (!res.ok) return;
        const data = await res.json();
        const next: Stats = {
          stars: data.stargazers_count ?? null,
          forks: data.forks_count ?? null,
        };
        if (cancelled) return;
        setStats(next);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ...next, ts: Date.now() } satisfies Cached),
          );
        } catch {
          // localStorage unavailable (private mode) — ignore.
        }
      } catch {
        // Network/rate-limit error — leave placeholders.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://github.com/${REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm transition-colors hover:bg-accent"
      >
        <Star className="h-3.5 w-3.5" />
        <span className="font-medium tabular-nums">{fmt(stats.stars)}</span>
      </a>
      <a
        href={`https://github.com/${REPO}/network/members`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm transition-colors hover:bg-accent"
      >
        <GitFork className="h-3.5 w-3.5" />
        <span className="font-medium tabular-nums">{fmt(stats.forks)}</span>
      </a>
    </div>
  );
}
