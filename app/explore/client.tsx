"use client";

import { useState } from "react";
import { ExploreHero } from "@/components/explore/explore-hero";
import { FeaturedDrop } from "@/components/explore/featured-drop";
import { ExploreFilters } from "@/components/explore/explore-filters";
import { ProductGrid } from "@/components/explore/product-grid";
import { Footer } from "@/components/home/footer";

export default function ExploreClient({ products, categories }: { products: any[]; categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("newest");

  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Explore Hero */}
        <ExploreHero />

        {/* Section 2: Featured Drop */}
        <FeaturedDrop />

        {/* Section 3: Filters & Sort */}
        <ExploreFilters
          categories={["All", ...categories.map(c => c.name)]}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />

        {/* Section 4: Product Grid */}
        <ProductGrid 
          products={products}
          activeCategory={activeCategory} 
          activeSort={activeSort} 
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
