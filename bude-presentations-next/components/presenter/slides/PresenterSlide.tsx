import { Github, Globe, Linkedin, Twitter, User } from "lucide-react";

import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
}

export function PresenterSlide({ slide }: Props) {
  const links = [
    slide.github && { href: slide.github, icon: Github, label: "GitHub" },
    slide.website && { href: slide.website, icon: Globe, label: "Website" },
    slide.linkedin && { href: slide.linkedin, icon: Linkedin, label: "LinkedIn" },
    slide.twitter && { href: slide.twitter, icon: Twitter, label: "Twitter" },
  ].filter(Boolean) as { href: string; icon: typeof Github; label: string }[];

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border/60 bg-card/60 p-10 backdrop-blur-xl md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-bude-gradient opacity-20 blur-xl"
        />
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-bude-gradient text-white shadow-xl">
            <User className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-bold md:text-5xl">{slide.name}</h2>
          {slide.title && (
            <p className="mt-2 text-base font-medium text-bude-primary md:text-xl">
              {slide.title}
            </p>
          )}
          {slide.experience && (
            <p className="mt-4 text-sm text-muted-foreground md:text-lg">
              {slide.experience}
            </p>
          )}
          {slide.oss_experience && (
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {slide.oss_experience}
            </p>
          )}
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {links.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
