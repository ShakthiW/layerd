"use client";

import { useState } from "react";
import { CustomHero } from "@/components/custom/custom-hero";
import {
  CreationMethods,
  type CreationData,
} from "@/components/custom/creation-methods";
import { PricingCalculator } from "@/components/custom/pricing-calculator";
import { CustomCTA } from "@/components/custom/custom-cta";
import { Footer } from "@/components/home/footer";

export default function CustomPage() {
  // Shared creation state
  const [creationData, setCreationData] = useState<CreationData>({
    method: "stl",
    file: null,
    imagePreview: null,
    description: "",
    dimensions: "",
    notes: "",
    material: "PLA",
    finish: "Standard",
    quantity: 1,
  });

  // Pricing sliders
  const [weightGrams, setWeightGrams] = useState(100);
  const [printTimeHours, setPrintTimeHours] = useState(4);

  const handleSubmit = () => {
    // Future: send data to backend
    console.log("Quote requested:", {
      ...creationData,
      weightGrams,
      printTimeHours,
    });
  };

  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Hero */}
        <CustomHero />

        {/* Section 2: Choose creation method + preferences */}
        <CreationMethods data={creationData} onChange={setCreationData} />

        {/* Section 3: Pricing calculator */}
        <PricingCalculator
          weightGrams={weightGrams}
          printTimeHours={printTimeHours}
          material={creationData.material}
          finish={creationData.finish}
          quantity={creationData.quantity}
          onWeightChange={setWeightGrams}
          onPrintTimeChange={setPrintTimeHours}
        />

        {/* Section 4: Submit CTA */}
        <CustomCTA onSubmit={handleSubmit} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
