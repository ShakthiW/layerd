"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function LabsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-black pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />

      {/* Radial glow — slightly green-tinted for a lab / tech vibe */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_70%)]" />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(100,200,150,0.03)_0%,transparent_70%)]" />

      {/* Grid pattern — tighter grid for a technical feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-warm-gold/30"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

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
            The Lab
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
          Where Ideas Become <br className="hidden sm:block" />
          <span className="italic text-warm-gold">Layers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-500"
        >
          A space to explore how objects are designed, tested, and brought to
          life through layers. Not just what we make — but how we think, test,
          and build.
        </motion.p>

        {/* Lab stats / badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { label: "Experiments", value: "120+" },
            { label: "Materials Tested", value: "15+" },
            { label: "Print Hours", value: "4,000+" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl font-light text-warm-gold">
                {stat.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-600">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
