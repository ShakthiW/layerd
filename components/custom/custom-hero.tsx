"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";

export function CustomHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden bg-black pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_60%)]" />

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
            Custom Creations
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
          Bring Your <span className="italic text-warm-gold">Vision</span>
          <br className="hidden sm:block" />
          to Life
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg"
        >
          Upload a 3D file, share an image, or just describe your idea —
          we&apos;ll craft it layer by layer into a premium 3D printed reality.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Layers, text: "Precision Printing" },
            { icon: Sparkles, text: "Expert Finishing" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-sm text-zinc-400"
            >
              <item.icon className="h-4 w-4 text-warm-gold/70" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
