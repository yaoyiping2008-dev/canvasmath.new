import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  ExternalLink,
  GraduationCap,
  Layers,
  Shield,
} from "lucide-react";
import { useEffect, useRef, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";

type ModuleOverviewProps = {
  lab: LabModule;
  onLaunch: () => void;
  focusOnMount?: boolean;
};

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-card/60 px-3 py-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function ModuleOverview({ lab, onLaunch, focusOnMount }: ModuleOverviewProps) {
  const launchRef = useRef<HTMLButtonElement>(null);
  const description = lab.summary ?? lab.seoDescription;

  useEffect(() => {
    if (focusOnMount) {
      launchRef.current?.focus();
    }
  }, [focusOnMount, lab.slug]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border/80 bg-card/40">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 md:px-6">
          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <Link to="/" aria-label="Back to all simulations">
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">All Simulations</span>
            </Link>
          </Button>
          <p className="truncate text-xs text-muted-foreground">{lab.category}</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <div className="min-w-0 space-y-6">
            <div className="space-y-3">
              <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {lab.title}
              </h1>
              {description && (
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {description}
                </p>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/20">
              <img
                src={lab.image}
                alt=""
                width={960}
                height={540}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            {(lab.learningObjectives?.length ?? 0) > 0 && (
              <section aria-labelledby="objectives-heading" className="space-y-3">
                <h2
                  id="objectives-heading"
                  className="font-display text-base font-semibold md:text-lg"
                >
                  Learning objectives
                </h2>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {lab.learningObjectives!.map((objective) => (
                    <li key={objective} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(lab.skills?.length ?? 0) > 0 && (
              <section aria-labelledby="skills-heading" className="space-y-3">
                <h2 id="skills-heading" className="font-display text-base font-semibold md:text-lg">
                  Skills practiced
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {lab.skills!.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <aside
              aria-label="Module safety information"
              className="flex gap-3 rounded-xl border border-border/60 bg-muted/15 p-4"
            >
              <Shield className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">Safety & environment note</p>
                <p>
                  This module runs inside a sandboxed simulation workspace. Network policies,
                  browser settings, or publisher restrictions may affect availability. No personal
                  account is required to begin.
                </p>
              </div>
            </aside>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-2.5 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Module details
              </h2>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {lab.subject && <MetaItem icon={BookOpen} label="Subject" value={lab.subject} />}
                {lab.gradeBand && (
                  <MetaItem icon={GraduationCap} label="Grade band" value={lab.gradeBand} />
                )}
                {lab.difficulty && (
                  <MetaItem icon={Layers} label="Difficulty" value={lab.difficulty} />
                )}
                {lab.estimatedMinutes != null && (
                  <MetaItem
                    icon={Clock3}
                    label="Estimated duration"
                    value={`${lab.estimatedMinutes} minutes`}
                  />
                )}
              </div>

              {lab.publisher && (
                <p className="pt-1 text-xs text-muted-foreground">
                  Source publisher:{" "}
                  <span className="font-medium text-foreground">{lab.publisher}</span>
                </p>
              )}

              <Button
                ref={launchRef}
                type="button"
                size="lg"
                className="mt-2 w-full"
                aria-label={`Launch ${lab.title} simulation`}
                onClick={onLaunch}
              >
                Launch Simulation
              </Button>

              {lab.sourceUrl && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a
                    href={lab.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${lab.title} external source page`}
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    View external source
                  </a>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
