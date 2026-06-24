import { DecorativeShapes } from "./DecorativeShapes";

type HomepageHeroProps = {
  moduleCount: number;
};

export function HomepageHero({ moduleCount }: HomepageHeroProps) {
  return (
    <section
      aria-labelledby="homepage-hero-heading"
      className="homepage-hero-bg relative overflow-hidden rounded-2xl px-5 py-8 md:px-8 md:py-10"
    >
      <DecorativeShapes />
      <div className="relative z-[1] mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Interactive Math Labs
        </p>
        <h1
          id="homepage-hero-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.65rem]"
        >
          Explore. Learn. Understand.
        </h1>
        <p className="homepage-section-subtitle mx-auto mt-3 max-w-2xl text-sm md:text-base">
          High-quality interactive mathematics simulations for students and teachers.
        </p>
        <p className="mt-4 inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-medium text-primary shadow-sm">
          {moduleCount} classroom-ready modules
        </p>
      </div>
    </section>
  );
}
