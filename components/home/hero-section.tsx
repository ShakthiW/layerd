"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection({
  headline = "Where Imagination Takes Form",
  subheadline = "Sri Lanka's first premium 3D printed lifestyle brand. Every layer tells a story. Every print is a masterpiece.",
}: {
  headline?: string;
  subheadline?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.08,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const brandName = "LAYERD";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100dvh-60px)] items-center justify-center overflow-hidden"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/60" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/80">
            Est. 2024 • Sri Lanka
          </span>
          <span className="h-px w-8 bg-warm-gold/60" />
        </motion.div>

        {/* Main title — letter by letter */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {brandName.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-6xl font-bold tracking-wide text-white sm:text-8xl md:text-9xl lg:text-[10rem]"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="text-shimmer font-display text-xl font-light italic sm:text-2xl md:text-3xl"
        >
          {headline}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          {subheadline}
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          onClick={() => {
            document
              .getElementById("brand-story")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group mt-4 flex items-center gap-2 rounded-full border border-warm-gold/30 bg-warm-gold/5 px-8 py-3 text-sm font-medium uppercase tracking-widest text-warm-gold transition-all duration-500 hover:border-warm-gold/60 hover:bg-warm-gold/10 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]"
        >
          Explore Our World
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </motion.button>

        {/* Scroll indicator — inside content flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mt-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Scroll
            </span>
            <div className="h-8 w-px bg-linear-to-b from-warm-gold/40 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
