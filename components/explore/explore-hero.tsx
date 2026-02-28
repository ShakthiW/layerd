"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ExploreHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-black pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Explore Objects
          </span>
          <span className="h-px w-8 bg-warm-gold/50" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Discover creations built <br className="hidden sm:block" />
          <span className="italic text-warm-gold">layer</span> by{" "}
          <span className="italic text-warm-gold">layer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-500"
        >
          Browse our full library of 3D printed objects — from desk essentials
          to collector&apos;s items. Every piece is precision-engineered and
          built to inspire.
        </motion.p>
      </div>
    </section>
  );
}
