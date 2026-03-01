"use client";

import { LabsHero } from "@/components/labs/labs-hero";
import { ExperimentTypes } from "@/components/labs/experiment-types";
import { LayerBuildAnimation } from "@/components/labs/layer-build-animation";
import { TimelapseGallery } from "@/components/labs/timelapse-gallery";
import { MaterialsShowcase } from "@/components/labs/materials-showcase";
import { Footer } from "@/components/home/footer";

export default function LabsPage() {
  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Labs Hero */}
        <LabsHero />

        {/* Section 2: Experiment Types */}
        <ExperimentTypes />

        {/* Section 3: Layer-by-Layer Build Animation */}
        <LayerBuildAnimation />

        {/* Section 4: Timelapse Gallery */}
        <TimelapseGallery />

        {/* Section 5: Materials Showcase */}
        <MaterialsShowcase />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
