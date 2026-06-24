import { BookOpen, GraduationCap, Shield, Smartphone } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: BookOpen,
    title: "Standards Aligned",
    description: "Designed for structured K-12 learning",
  },
  {
    icon: GraduationCap,
    title: "Classroom Ready",
    description: "Teacher-friendly module organization",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "No account required for public modules",
  },
  {
    icon: Smartphone,
    title: "Accessible",
    description: "Responsive across common classroom devices",
  },
] as const;

export function EducationalTrustFooter() {
  return (
    <section
      id="trust-footer"
      aria-labelledby="trust-footer-heading"
      className="homepage-panel scroll-mt-24 p-5 md:p-6"
    >
      <h2
        id="trust-footer-heading"
        className="homepage-section-title mb-4 text-center text-base md:text-lg"
      >
        Built for Educational Environments
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-border/60 bg-white/60 p-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
