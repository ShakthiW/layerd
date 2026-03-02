"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { articles } from "@/components/stories/article-grid";
import { Footer } from "@/components/home/footer";

/* ── Article body content (placeholder paragraphs per slug) ── */
const articleContent: Record<string, string[]> = {
  "why-layerd-exists": [
    "It started in a small garage in Colombo, with one 3D printer humming through the night. We weren't trying to build a brand — we were trying to answer a question that wouldn't leave us alone: why does nobody in Sri Lanka make beautiful, everyday objects using 3D printing?",
    "The technology had been around for decades, but it was trapped in engineering labs and prototyping workshops. Nobody was using it to create things people actually wanted to own — objects that felt premium, intentional, and worth keeping on your desk or shelf.",
    "We spent six months printing failures. Warped vases. Brittle phone stands. Models that looked perfect on screen and disastrous in real life. Each failure taught us something about materials, temperatures, layer heights, and the invisible physics of additive manufacturing.",
    "Then one day, a desk organizer came off the print bed and it was right. The layers caught the light in a way that felt deliberate. The weight was satisfying. The geometry was clean. We put it on a desk, stepped back, and realised — this is what we'd been looking for.",
    "That's why Layerd exists. Not to sell 3D prints, but to prove that technology and craft aren't opposites. That a machine can produce something with soul. That every layer deposited with care is an act of creation, not just manufacturing.",
    "Today, every product we make carries that original spirit. We obsess over materials. We test relentlessly. We print slowly when we need to, because the surface finish matters more than the deadline. And we believe that Sri Lanka can build brands that compete on the world stage — not on price, but on design, intention, and story.",
  ],
  "how-a-lamp-is-built-layer-by-layer": [
    "Our signature desk lamp starts as a sketch — rough lines on a tablet, capturing the curve of light and shadow we want to achieve. The first version never survives contact with physics.",
    "The design moves into CAD software where we model every millimetre. Wall thickness, structural integrity, light diffusion angles — each parameter affects the final product. We typically go through 8 to 12 iterations before a design is print-ready.",
    "Slicing is where the magic happens. The 3D model is divided into thousands of horizontal layers — our desk lamp needs approximately 3,200 layers at 0.12mm height. The slicer generates a path for the print head that will take 14 hours to complete.",
    "The print runs overnight. Temperature stability is crucial — a 2-degree fluctuation can cause layer separation. We monitor remotely, watching the time-lapse build up layer by layer, each one only slightly thicker than a human hair.",
    "Post-processing takes almost as long as the print itself. Removing support structures, sanding contact points, testing the electrical components, and applying the final finish. Every lamp is inspected under magnification before it earns the Layerd mark.",
    "The result is an object that couldn't exist without 3D printing — geometries that are impossible to mould, surfaces that play with light in ways that feel organic despite being mathematically precise. That's the beauty of building layer by layer.",
  ],
  "from-idea-to-object": [
    "Every Layerd product begins the same way: someone on the team notices a gap. A frustration. A moment where they think, 'this should exist, and it should be beautiful.'",
    "We keep a running list of ideas — some practical, some purely artistic. During our weekly design reviews, we pick one and spend an hour sketching possibilities. No screens yet. Just paper, markers, and debate.",
    "The winning concepts move to digital prototyping. We use parametric design tools that let us adjust dimensions fluidly — changing a single parameter can reshape the entire object. This is where 3D printing shines: there are no tooling costs, so we can experiment freely.",
    "Physical prototyping is where most ideas break. An object that looks perfect on screen might feel wrong in your hand. Too light. Too sharp at the edges. We print test pieces in draft quality — fast, rough prints that tell us whether the form factor works before we invest in a final print.",
    "The jump from prototype to product involves material selection, finish testing, and packaging design. We test each product in real conditions for at least two weeks before launch. Does the pen holder actually hold pens well? Does the coaster feel premium when you set down a glass?",
    "By the time a product reaches you, it's been through dozens of iterations, hundreds of hours of testing, and thousands of layers of refinement. That's what 'from idea to object' really means.",
  ],
  "print-failures-and-lessons": [
    "Let's talk about the elephant in the room: 3D printing fails. A lot. And when it fails, it fails spectacularly — spaghetti-like tangles of filament, delaminated layers, and objects that look like they melted in the sun.",
    "Our first major production failure was a batch of geometric planters. We'd tested the design five times successfully, but when we scaled to 20 pieces for a launch, overnight temperature drops caused 14 of them to crack. Lost three days of print time and a lot of filament.",
    "That failure taught us about environmental control. We now monitor ambient temperature and humidity continuously. Our print room maintains a stable 24°C ± 1°, and we track conditions for every single print run.",
    "Another memorable failure: a custom chess set where the knight's head kept breaking off during support removal. The geometry was too delicate for FDM printing at that scale. We redesigned the model three times before finding a version where the support structures didn't compromise the detail.",
    "We've learned that failure isn't the opposite of quality — it's the path to it. Every failed print teaches us something about materials science, mechanical engineering, and the limits of our technology. We now keep a 'failure log' that documents every significant failure and the lesson it taught us.",
    "The products you see in our shop have survived this gauntlet. They work because dozens of earlier versions didn't. And we wouldn't have it any other way.",
  ],
  "your-first-10-products-journey": [
    "When we shipped our first 10 orders, we were terrified. Would the packaging survive transit? Would the products match expectations? Would anyone actually care about what we'd built?",
    "Customer #1 was a designer in Kandy who ordered a minimal desk organizer. She messaged us a photo of it on her desk, in golden afternoon light, with the caption: 'This is exactly what I didn't know I needed.' We printed that message and pinned it to our workshop wall.",
    "Customer #4 returned his order. The surface finish on one side had visible layer lines that didn't match the product photos. He was right. It was a quality control gap that we'd missed. We refunded immediately, reprinted at a finer layer height, and shipped a replacement with a handwritten apology.",
    "That return was the most valuable feedback we've ever received. It led us to implement a multi-stage QC process: visual inspection, dimensional checks, surface finish grading, and a 'desk test' where we place every product in a real environment before shipping.",
    "By customer #10, we had learned more about running a product business than any course could teach. We learned that packaging is part of the product. That unboxing creates an emotional first impression. That follow-up messages matter. That every single interaction is a chance to build trust.",
    "Today, we're well past our first 10, but we still treat every order like it's the first. Because for that customer, it is.",
  ],
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles.find((a) => a.slug === slug);
  const content = articleContent[slug] || [];

  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-40px" });
  const suggestedInView = useInView(suggestedRef, {
    once: true,
    margin: "-40px",
  });

  if (!article) {
    return (
      <div className="grain-overlay">
        <main className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="font-display text-3xl font-light text-white">
              Story not found
            </h1>
            <Link
              href="/stories"
              className="mt-6 inline-flex items-center gap-2 text-sm text-warm-gold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Suggest up to 3 other articles
  const suggested = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="grain-overlay">
      <main>
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-black pt-32 pb-20 md:pt-40 md:pb-28"
        >
          {/* Ambient bg */}
          <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/stories"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-warm-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Stories
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-warm-gold/25 bg-warm-gold/5 px-3.5 py-1.5">
                <BookOpen className="h-3 w-3 text-warm-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-warm-gold">
                  {article.category}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
            >
              {article.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex items-center gap-5"
            >
              <span className="text-xs text-zinc-500">{article.author}</span>
              <div className="h-3.5 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-zinc-600" />
                <span className="text-xs text-zinc-500">
                  {article.readTime} read
                </span>
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <span className="text-xs text-zinc-500">{article.date}</span>
            </motion.div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="section-divider" />

        {/* ── Article Body ── */}
        <section ref={bodyRef} className="relative bg-zinc-950 py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            {content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="mb-6 text-base leading-[1.85] text-zinc-400 last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="section-divider" />

        {/* ── Suggested Articles ── */}
        <section
          ref={suggestedRef}
          className="relative bg-black py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={suggestedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-warm-gold/50" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
                Continue Reading
              </span>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggested.map((sa, i) => (
                <motion.div
                  key={sa.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={suggestedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={`/stories/${sa.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6 transition-all duration-500 hover:border-warm-gold/20 hover:bg-white/4"
                  >
                    {/* Category */}
                    <span className="mb-3 inline-block rounded-full border border-warm-gold/20 bg-warm-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gold">
                      {sa.category}
                    </span>

                    {/* Title */}
                    <h3 className="mb-2 font-display text-lg font-light text-white transition-colors duration-300 group-hover:text-warm-gold">
                      {sa.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                      {sa.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-zinc-600" />
                        <span className="text-[11px] text-zinc-600">
                          {sa.readTime}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-all duration-300 group-hover:text-warm-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
