import { Github, Globe, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const SOCIAL = [
  { href: "https://blog.budeglobal.in", icon: Globe, label: "Blog" },
  { href: "https://github.com/budeglobalenterprise", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/company/budeglobal", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.youtube.com/@BudeGlobalEnterprise", icon: Youtube, label: "YouTube" },
  { href: "https://x.com/budeglobalerp", icon: Twitter, label: "X" },
  { href: "https://www.instagram.com/budeglobal", icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/40">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <a
            href="https://budeglobal.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Image
              src="/assets/images/budeglobal_logo.png"
              alt="Bude Global"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span>budeglobal.in</span>
          </a>

          <div className="flex items-center gap-1">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; 2026 Bude Global Enterprise &middot; Built with ❤
          </p>
        </div>
      </div>
    </footer>
  );
}
