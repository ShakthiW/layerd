import { HeroSection } from "@/components/home/hero-section";
import { BrandStory } from "@/components/home/brand-story";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ProcessSection } from "@/components/home/process-section";
import { SocialProof } from "@/components/home/social-proof";
import { NewsletterCTA } from "@/components/home/newsletter-cta";
import { Footer } from "@/components/home/footer";

import { getAllProducts, getSiteContent } from "@/lib/db-helpers";

export default async function Home() {
  const products = await getAllProducts();
  // Safe serialization for Client Components
  const serializedProducts = JSON.parse(JSON.stringify(products));

  const contentArray = await getSiteContent("home");
  const content = contentArray.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Cinematic Hero */}
        <HeroSection 
          headline={content.hero_headline} 
          subheadline={content.hero_subheadline} 
        />

        {/* Section 2: Brand Story */}
        <BrandStory 
          headline={content.brand_story_headline}
          body={content.brand_story_body}
        />

        {/* Section 3: Product Categories */}
        <CategoryGrid />

        {/* Section 4: Featured Products */}
        <FeaturedProducts products={serializedProducts} />

        {/* Section 5: The Process */}
        <ProcessSection />

        {/* Section 6: Social Proof */}
        <SocialProof />

        {/* Section 7: Newsletter CTA */}
        <NewsletterCTA />
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </div>
  );
}
