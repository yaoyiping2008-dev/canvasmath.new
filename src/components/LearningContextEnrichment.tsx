import type { LabModule } from "@/lib/labs-data";
import { getPathSuggestion, getRelatedConcepts } from "@/lib/learningRecommendations";

type LearningContextEnrichmentProps = {
  lab: LabModule;
};

export function LearningContextEnrichment({ lab }: LearningContextEnrichmentProps) {
  const relatedConcepts = getRelatedConcepts(lab);
  const pathSuggestion = getPathSuggestion(lab);
  const subjectArea = lab.subject ?? lab.category;

  return (
    <section
      aria-labelledby="continuity-heading"
      className="mb-6 space-y-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 md:px-5"
    >
      <h2 id="continuity-heading" className="sr-only">
        Learning continuity
      </h2>
      <p className="text-sm leading-relaxed text-foreground">
        <span className="font-medium">You are currently learning:</span>{" "}
        <span className="text-muted-foreground">{subjectArea}</span>
      </p>
      {relatedConcepts.length > 0 && (
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-medium">This module connects to:</span>{" "}
          <span className="text-muted-foreground">{relatedConcepts.join(" · ")}</span>
        </p>
      )}
      <p className="text-sm leading-relaxed text-foreground">
        <span className="font-medium">Next recommended direction:</span>{" "}
        <span className="text-muted-foreground">{pathSuggestion}</span>
      </p>
    </section>
  );
}
