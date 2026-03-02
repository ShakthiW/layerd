import { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { OurJourney } from "@/components/about/our-journey";
import { Why3DPrinting } from "@/components/about/why-3d-printing";
import { WhySriLanka } from "@/components/about/why-sri-lanka";
import { OurTech } from "@/components/about/our-tech";
import { Footer } from "@/components/home/footer";

export const metadata: Metadata = {
  title: "About Us | Layerd",
  description:
    "Learn about the Layerd mission, our 3D printing philosophy, and our dedication to providing premium craftsmanship in Sri Lanka.",
};

export default function AboutPage() {
  return (
    <div className="bg-black mix-blend-normal">
      <main>
        {/* Section 1: Cinematic Intro */}
        <AboutHero />

        {/* Section 2: Timeline / Story */}
        <OurJourney />

        {/* Section 3: The local angle and market mission */}
        <WhySriLanka />

        {/* Section 4: Philosophy and Craftsmanship */}
        <Why3DPrinting />

        {/* Section 5: The Tech - Bambu Lab P2S */}
        <OurTech />
      </main>

      <Footer />
    </div>
  );
}
