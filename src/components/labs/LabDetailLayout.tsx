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
import { useHomepageScrollLock } from "@/hooks/useHomepageScrollLock";

type LabDetailLayoutProps = {
  lab: LabModule;
};

export function LabDetailLayout({ lab }: LabDetailLayoutProps) {
  const router = useRouter();
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const { containerRef, handleFullscreen } = useLabSimulationContainer();
  const { reloadKey, handleLoad, retry, isLoading, hasError } = useIframeReliability(
    lab.moduleEndpoint,
  );

  useHomepageScrollLock();

  const rightRecommendations = useMemo(() => getRightRecommendations(lab, 8), [lab]);
  const bottomRecommendations = useMemo(
    () => getBottomRecommendations(lab, rightRecommendations, 16),
    [lab, rightRecommendations],
  );

  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [lab.slug]);

  const handleSidebarNavigate = (sectionId: string) => {
    router.navigate({ to: "/", hash: sectionId });
  };

  return (
    <div className="homepage-shell">
      <div className="homepage-atmosphere homepage-background-layer" aria-hidden="true" />

      <HomepageSidebar onNavigate={handleSidebarNavigate} />

      <div ref={mainScrollRef} className="homepage-main-scroll">
        <div className="homepage-floating-stack homepage-floating-stack--lab">
          <section className="homepage-floating-section overflow-visible">
            <LabPageHeader lab={lab} onReload={retry} onFullscreen={handleFullscreen} />

            <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
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
          </section>
        </div>
      </div>
    </div>
  );
}
