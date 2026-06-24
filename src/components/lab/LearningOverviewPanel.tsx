import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Clock3,
  ExternalLink,
  GraduationCap,
  Layers,
  Lightbulb,
  ListOrdered,
  Shield,
  Target,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { getTeachingSequenceForModule, TEACHER_VIEW_RECOMMENDED_STEPS } from "@/lib/teacherView";
import { LearningContextEnrichment } from "@/components/LearningContextEnrichment";
import { LearningWorkflowSteps } from "./LearningWorkflowSteps";
import {
  DIFFICULTY_STEPS,
  getCognitiveLoad,
  getDifficultyIndex,
  getLearningContext,
  getSkillDomains,
} from "./LearningWorkflowState";

type LearningOverviewPanelProps = {
  lab: LabModule;
  onLaunch: () => void;
  focusOnMount?: boolean;
  teacherView?: boolean;
  teacherViewToggle?: ReactNode;
};

function LearningObjectivesSection({ lab }: { lab: LabModule }) {
  if (!lab.learningObjectives?.length) return null;

  return (
    <section aria-labelledby="objectives-heading" className="space-y-3">
      <h2
        id="objectives-heading"
        className="flex items-center gap-2 font-display text-base font-semibold md:text-lg"
      >
        <Target className="size-4 text-primary" aria-hidden="true" />
        Learning objectives
      </h2>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {lab.learningObjectives.map((objective) => (
          <li key={objective} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{objective}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TeachingSequenceSection({ lab }: { lab: LabModule }) {
  const sequence = getTeachingSequenceForModule(lab);
  if (!sequence) return null;

  return (
    <section
      aria-labelledby="teaching-sequence-heading"
      className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4 md:p-5"
    >
      <h2
        id="teaching-sequence-heading"
        className="flex items-center gap-2 font-display text-base font-semibold"
      >
        <ListOrdered className="size-4 text-primary" aria-hidden="true" />
        Recommended teaching sequence
      </h2>
      <p className="text-xs text-muted-foreground">{sequence.pathTitle}</p>
      <ol className="space-y-2 text-sm leading-relaxed">
        {sequence.modules.map((module, index) => (
          <li
            key={module.slug}
            className={[
              "rounded-md border px-3 py-2",
              index === sequence.currentIndex
                ? "border-primary/30 bg-primary/5 font-medium text-foreground"
                : "border-border/50 text-muted-foreground",
            ].join(" ")}
          >
            <span className="mr-2 text-xs text-muted-foreground">{index + 1}.</span>
            {module.title}
          </li>
        ))}
      </ol>
      <ul className="space-y-1.5 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
        {TEACHER_VIEW_RECOMMENDED_STEPS.map((step) => (
          <li key={step} className="flex gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LearningOverviewPanel({
  lab,
  onLaunch,
  focusOnMount,
  teacherView = false,
  teacherViewToggle,
}: LearningOverviewPanelProps) {
  const launchRef = useRef<HTMLButtonElement>(null);
  const context = getLearningContext(lab);
  const cognitiveLoad = getCognitiveLoad(lab);
  const skillDomains = getSkillDomains(lab);
  const difficultyIndex = getDifficultyIndex(lab.difficulty);
  const description = lab.summary ?? lab.seoDescription;

  useEffect(() => {
    if (focusOnMount) launchRef.current?.focus();
  }, [focusOnMount, lab.slug]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border/80 bg-card/40">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-4 md:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="shrink-0">
              <Link to="/" aria-label="Back to all simulations">
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">All Simulations</span>
              </Link>
            </Button>
            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{lab.category}</p>
            {teacherViewToggle}
          </div>
          {!teacherView && <LearningWorkflowSteps current="understand" />}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 rounded-xl border border-border/60 bg-muted/10 px-4 py-3 md:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            {teacherView ? "Teacher view · Instructional overview" : "Reading phase · Overview"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {teacherView
              ? "Review learning objectives and the recommended teaching sequence before class use."
              : "Review standards-aligned learning context before entering the classroom-ready simulation workspace."}
          </p>
        </div>

        {!teacherView && <LearningContextEnrichment lab={lab} />}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-7">
            {teacherView && <LearningObjectivesSection lab={lab} />}

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

            {!teacherView && <LearningObjectivesSection lab={lab} />}
            {teacherView && <TeachingSequenceSection lab={lab} />}

            <section
              aria-labelledby="learning-context-heading"
              className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-4 md:p-5"
            >
              <h2
                id="learning-context-heading"
                className="flex items-center gap-2 font-display text-base font-semibold"
              >
                <Lightbulb className="size-4 text-primary" aria-hidden="true" />
                Concept explanation
              </h2>
              <dl className="space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Instructional purpose
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{context.purpose}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Conceptual understanding goals
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{context.understanding}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Standards-aligned relevance
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{context.relevance}</dd>
                </div>
              </dl>
            </section>

            {!teacherView && (
              <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/15">
                <img
                  src={lab.image}
                  alt=""
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            )}

            {!teacherView && skillDomains.length > 0 && (
              <section aria-labelledby="skill-domains-heading" className="space-y-3">
                <h2
                  id="skill-domains-heading"
                  className="flex items-center gap-2 font-display text-base font-semibold md:text-lg"
                >
                  <Brain className="size-4 text-primary" aria-hidden="true" />
                  Skills mapping
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {skillDomains.map((domain) => (
                    <li
                      key={domain}
                      className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1 text-xs text-foreground"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!teacherView && (lab.skills?.length ?? 0) > 0 && (
              <section aria-labelledby="skills-heading" className="space-y-3">
                <h2 id="skills-heading" className="font-display text-base font-semibold md:text-lg">
                  Module skills
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {lab.skills!.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <aside
              aria-label="Module safety information"
              className="flex gap-3 rounded-xl border border-border/60 bg-muted/10 p-4"
            >
              <Shield className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">Safety & environment note</p>
                <p>
                  This classroom-ready simulation runs inside a sandboxed workspace. Network
                  policies, browser settings, or publisher restrictions may affect availability.
                </p>
              </div>
            </aside>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <section
              aria-labelledby="path-indicators-heading"
              className="space-y-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm"
            >
              <h2
                id="path-indicators-heading"
                className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {teacherView ? "Module metadata" : "Learning path"}
              </h2>

              {!teacherView && (
                <>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Difficulty progression
                    </p>
                    <div className="flex items-center gap-1">
                      {DIFFICULTY_STEPS.map((step, index) => (
                        <div key={step} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                          <div
                            className={[
                              "h-1.5 w-full rounded-full",
                              index <= difficultyIndex ? "bg-primary" : "bg-muted",
                            ].join(" ")}
                          />
                          <span
                            className={[
                              "truncate text-[9px]",
                              index === difficultyIndex
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground",
                            ].join(" ")}
                          >
                            {step === "Introductory"
                              ? "Intro"
                              : step === "Intermediate"
                                ? "Mid"
                                : "Adv"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Estimated cognitive load
                    </p>
                    <p className="mt-0.5 text-sm font-medium">{cognitiveLoad}</p>
                  </div>
                </>
              )}

              <div className="grid gap-2 border-t border-border/60 pt-3">
                {lab.subject && (
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{lab.subject}</span>
                  </div>
                )}
                {lab.gradeBand && (
                  <div className="flex items-center gap-2 text-xs">
                    <GraduationCap className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{lab.gradeBand}</span>
                  </div>
                )}
                {lab.difficulty && (
                  <div className="flex items-center gap-2 text-xs">
                    <Layers className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{lab.difficulty}</span>
                  </div>
                )}
                {lab.estimatedMinutes != null && (
                  <div className="flex items-center gap-2 text-xs">
                    <Clock3 className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{lab.estimatedMinutes} minutes</span>
                  </div>
                )}
              </div>

              {lab.publisher && (
                <p className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  Publisher: <span className="font-medium text-foreground">{lab.publisher}</span>
                </p>
              )}
            </section>

            <section
              aria-labelledby="launch-heading"
              className="rounded-xl border border-primary/20 bg-card p-4 shadow-sm"
            >
              <h2 id="launch-heading" className="sr-only">
                Launch interactive workspace
              </h2>
              <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                Stage 2 · Learn — enter the classroom-ready simulation when students are prepared to
                investigate.
              </p>
              <Button
                ref={launchRef}
                type="button"
                size="lg"
                className="w-full"
                aria-label={`Launch ${lab.title} simulation`}
                onClick={onLaunch}
              >
                Launch Simulation
              </Button>
              {lab.sourceUrl && (
                <Button asChild variant="outline" size="sm" className="mt-2 w-full">
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
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
