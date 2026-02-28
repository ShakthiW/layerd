"use client";

import { Product } from "@/lib/products";
import { ProductHero } from "@/components/product/product-hero";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductStory } from "@/components/product/product-story";
import { ProductOptions } from "@/components/product/product-options";
import { ProductCustomizer } from "@/components/product/product-customizer";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductRelated } from "@/components/product/product-related";
import { Footer } from "@/components/home/footer";

export function ProductPage({ product }: { product: Product }) {
  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Cinematic Hero */}
        <ProductHero product={product} />

        {/* Section 2: Lifestyle Gallery — "Where It Belongs" */}
        <ProductGallery product={product} />

        {/* Section 3: Editorial Story — "This wasn't bought. It was built." */}
        <ProductStory product={product} />

        {/* Section 4: Options — "Make It Yours" */}
        <ProductOptions product={product} />

        {/* Section 5: Customizer (only for customizable products) */}
        <ProductCustomizer product={product} />

        {/* Section 6: Specs — "The Blueprint" */}
        <ProductSpecs product={product} />

        {/* Section 7: Reviews — "What Collectors Say" */}
        <ProductReviews product={product} />

        {/* Section 8: Related Products — "Continue Exploring" */}
        <ProductRelated product={product} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
