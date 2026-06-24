import {
  academicHero,
  academicHeroContent,
  headingDisplay,
  textEyebrow,
  textSubtitle,
} from "@/lib/designSystem";

type AcademicHeroProps = {
  moduleCount: number;
};

export function AcademicHero({ moduleCount }: AcademicHeroProps) {
  return (
    <section aria-labelledby="academic-hero-heading" className={academicHero}>
      <div className={academicHeroContent}>
        <p className={textEyebrow}>Standards-Aligned · Classroom-Ready</p>
        <h2 id="academic-hero-heading" className={`${headingDisplay} mt-2 text-xl md:text-2xl`}>
          Visual Mathematics Learning for K-12 Classrooms
        </h2>
        <p className={`${textSubtitle} mt-3 max-w-3xl text-sm md:text-base`}>
          CanvasMath provides {moduleCount} classroom-ready interactive simulations designed to
          strengthen conceptual understanding through structured visual mathematics learning. Each
          module supports teacher-guided instruction and independent student investigation.
        </p>
      </div>
    </section>
  );
}
