import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import type { LabModule } from "@/lib/labs-data";
import { getBottomRecommendations, getRightRecommendations } from "@/lib/relatedSimulations";
import { HomepageSidebar } from "@/components/homepage/HomepageSidebar";
import {
  EmbeddedSimulationWorkspace,
  useLabSimulationContainer,
} from "@/components/labs/EmbeddedSimulationWorkspace";
import { LabPageHeader } from "@/components/labs/LabPageHeader";
import { RelatedSimulationGrid } from "@/components/labs/RelatedSimulationGrid";
import { useIframeReliability } from "@/components/lab/useModuleState";

type LabDetailLayoutProps = {
  lab: LabModule;
};

export function LabDetailLayout({ lab }: LabDetailLayoutProps) {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const { containerRef, handleFullscreen } = useLabSimulationContainer();
  const { reloadKey, handleLoad, retry, isLoading, hasError } = useIframeReliability(
    lab.moduleEndpoint,
  );

  const rightRecommendations = useMemo(() => getRightRecommendations(lab, 8), [lab]);
  const bottomRecommendations = useMemo(
    () => getBottomRecommendations(lab, rightRecommendations, 16),
    [lab, rightRecommendations],
  );

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [lab.slug]);

  const handleSidebarNavigate = (sectionId: string) => {
    router.navigate({ to: "/", hash: sectionId });
  };

  return (
    <div className="homepage-shell min-h-screen overflow-x-hidden">
      <div
        className="homepage-atmosphere pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      <HomepageSidebar onNavigate={handleSidebarNavigate} />

      <div className="relative z-[1] flex min-w-0 flex-col md:ml-52">
        <main
          ref={mainRef}
          className="mx-auto w-full max-w-[1600px] flex-1 overflow-x-hidden px-3 pb-8 pt-14 md:px-5 md:pt-5"
        >
          <LabPageHeader lab={lab} onReload={retry} onFullscreen={handleFullscreen} />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
            <EmbeddedSimulationWorkspace
              lab={lab}
              containerRef={containerRef}
              reloadKey={reloadKey}
              handleLoad={handleLoad}
              retry={retry}
              isLoading={isLoading}
              hasError={hasError}
            />

            {rightRecommendations.length > 0 && (
              <RelatedSimulationGrid
                title="Related Simulations"
                labs={rightRecommendations}
                layout="sidebar"
                className="xl:min-w-0"
              />
            )}
          </div>

          {bottomRecommendations.length > 0 && (
            <RelatedSimulationGrid
              title="More Simulations"
              labs={bottomRecommendations}
              layout="bottom"
              className="mt-8"
            />
          )}
        </main>
      </div>
    </div>
  );
}
