"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const words = [
    "Every",
    "layer",
    "tells",
    "a",
    "story.",
    "Every",
    "print",
    "is",
    "a",
    "masterpiece.",
  ];

  return (
    <section
      id="brand-story"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-32 md:py-48"
    >
      {/* Subtle side glow */}
      <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.05)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
          {/* Left — Large statement */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-12 bg-warm-gold/50" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
                Our Craft
              </span>
            </motion.div>

            {/* Word-by-word reveal */}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`font-display text-3xl font-light leading-snug sm:text-4xl md:text-5xl ${
                    word === "layer" ||
                    word === "story." ||
                    word === "masterpiece."
                      ? "italic text-warm-gold"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.7, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="max-w-md text-base leading-relaxed text-zinc-400"
            >
              We bridge the worlds of technology and art, using state-of-the-art
              3D printing to craft products that transform everyday spaces into
              extraordinary experiences.
            </motion.p>
          </div>

          {/* Right — Visual / Feature cards */}
          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "Precision Engineering",
                desc: "Layer-by-layer perfection with sub-millimeter accuracy, creating products that feel as good as they look.",
              },
              {
                number: "02",
                title: "Premium Materials",
                desc: "Carefully selected materials that ensure durability, aesthetics, and a premium tactile experience.",
              },
              {
                number: "03",
                title: "Unique Designs",
                desc: "Original creations that blend form and function — pieces you won't find anywhere else.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                className="group flex gap-5 rounded-2xl border border-white/5 bg-white/2 p-6 backdrop-blur-sm transition-all duration-500 hover:border-warm-gold/20 hover:bg-white/4"
              >
                <span className="font-display text-3xl font-light text-warm-gold/30 transition-colors duration-500 group-hover:text-warm-gold/60">
                  {item.number}
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
