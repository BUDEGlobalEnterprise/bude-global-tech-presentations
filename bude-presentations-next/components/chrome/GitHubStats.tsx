import { GitFork, Star } from "lucide-react";

const REPO = "BUDEGlobalEnterprise/bude-global-tech-presentations";

async function fetchStats() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { stars: null, forks: null };
    const data = await res.json();
    return {
      stars: data.stargazers_count as number,
      forks: data.forks_count as number,
    };
  } catch {
    return { stars: null, forks: null };
  }
}

function fmt(n: number | null) {
  if (n == null) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export async function GitHubStats() {
  const { stars, forks } = await fetchStats();
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://github.com/${REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm transition-colors hover:bg-accent"
      >
        <Star className="h-3.5 w-3.5" />
        <span className="font-medium tabular-nums">{fmt(stars)}</span>
      </a>
      <a
        href={`https://github.com/${REPO}/network/members`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm transition-colors hover:bg-accent"
      >
        <GitFork className="h-3.5 w-3.5" />
        <span className="font-medium tabular-nums">{fmt(forks)}</span>
      </a>
    </div>
  );
}
