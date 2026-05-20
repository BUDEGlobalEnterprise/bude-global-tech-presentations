import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { GitHubStats } from "./GitHubStats";
import { ThemeToggle } from "./ThemeToggle";

export function GlobalHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/assets/images/budeglobal_logo.png"
            alt="Bude Global"
            width={32}
            height={32}
            className="rounded-md transition-transform group-hover:scale-110"
          />
          <span className="text-sm font-semibold tracking-tight">
            Bude <span className="text-bude-gradient">Tech Docs</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Repository
          </Link>
          <Link
            href="https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Issues
          </Link>
          <Link
            href="https://github.com/BUDEGlobalEnterprise/bude-global-tech-presentations/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Discuss
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Suspense
              fallback={
                <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
              }
            >
              <GitHubStats />
            </Suspense>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
