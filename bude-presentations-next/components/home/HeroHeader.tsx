import Image from "next/image";

export function HeroHeader() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient background gradient — subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(111,66,193,0.12),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(203,108,230,0.10),_transparent_50%)]"
      />

      <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center md:px-6 md:pt-24 md:pb-14">
        <Image
          src="/assets/images/budeglobal_logo.png"
          alt="Bude Global"
          width={64}
          height={64}
          className="mx-auto mb-6 rounded-xl shadow-lg shadow-bude-purple/10"
        />

        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-bude-gradient">Tech Presentations</span>
          <span className="block text-foreground/90 mt-2 text-2xl md:text-3xl font-medium tracking-normal">
            for the modern engineer
          </span>
        </h1>

        <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
          A growing, open-source library of slide decks covering languages,
          frameworks, databases, devops, and the tools that actually ship
          software.
        </p>
      </div>
    </section>
  );
}
