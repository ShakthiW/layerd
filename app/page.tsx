import { HeroSection } from "@/components/home/hero-section";
import { BrandStory } from "@/components/home/brand-story";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ProcessSection } from "@/components/home/process-section";
import { SocialProof } from "@/components/home/social-proof";
import { NewsletterCTA } from "@/components/home/newsletter-cta";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="grain-overlay">
      <main>
        {/* Section 1: Cinematic Hero */}
        <HeroSection />

        {/* Section 2: Brand Story */}
        <BrandStory />

        {/* Section 3: Product Categories */}
        <CategoryGrid />

        {/* Section 4: Featured Products */}
        <FeaturedProducts />

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
