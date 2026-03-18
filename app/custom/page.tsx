"use client";

import { useState } from "react";
import { CustomHero } from "@/components/custom/custom-hero";
import {
  CreationMethods,
  type CreationData,
} from "@/components/custom/creation-methods";
import { PricingCalculator } from "@/components/custom/pricing-calculator";
import {
  CustomerDetails,
  type CustomerData,
} from "@/components/custom/customer-details";
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

  // Customer details
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Basic validation
    if (!customerData.name || !customerData.email) {
      setSubmitError("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Build FormData so the file goes as multipart/form-data
    const formData = new FormData();

    // Attach file if present (STL or image)
    if (creationData.file) {
      formData.append("file", creationData.file);
    }

    // All other data as a JSON string
    formData.append(
      "formData",
      JSON.stringify({
        customerDetails: customerData,
        creationData: {
          method: creationData.method,
          description: creationData.description,
          dimensions: creationData.dimensions,
          notes: creationData.notes,
          material: creationData.material,
          finish: creationData.finish,
          quantity: creationData.quantity,
          fileAttached: !!creationData.file,
          imageAttached: !!creationData.imagePreview,
        },
        pricingData: {
          weightGrams,
          printTimeHours,
        },
      }),
    );

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        // No Content-Type header — browser sets multipart boundary automatically
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send quotation request");
      }

      // Success handled by CustomCTA state internally for visual feedback
    } catch (err) {
      setSubmitError("Failed to submit request. Please try again later.");
      throw err; // Important to throw so CustomCTA knows it failed
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Section 4: Customer Details */}
        <CustomerDetails data={customerData} onChange={setCustomerData} />

        {/* Error message display if any */}
        {submitError && (
          <div className="bg-black py-4 text-center text-red-500">
            {submitError}
          </div>
        )}

        {/* Section 5: Submit CTA */}
        <CustomCTA onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
