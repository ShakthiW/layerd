"use client";

import { useState } from "react";
import { StoriesHero } from "@/components/stories/stories-hero";
import { FeaturedArticle } from "@/components/stories/featured-article";
import { StoriesFilters } from "@/components/stories/stories-filters";
import { ArticleGrid } from "@/components/stories/article-grid";
import { Footer } from "@/components/home/footer";

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Hero */}
        <StoriesHero />

        {/* Section 2: Featured Article */}
        <FeaturedArticle />

        {/* Section 3: Filters */}
        <StoriesFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Section 4: Article Grid */}
        <ArticleGrid activeCategory={activeCategory} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
