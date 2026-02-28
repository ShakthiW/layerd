"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Layers } from "lucide-react";

export function FeaturedDrop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Featured Drop
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-warm-gold/5 via-white/2 to-transparent">
              {/* Geometric placeholder art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Primary shape */}
                  <div className="h-40 w-40 rounded-3xl border border-warm-gold/15 bg-warm-gold/5 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-105 sm:h-52 sm:w-52" />
                  {/* Secondary shape */}
                  <div className="absolute left-8 top-8 h-40 w-40 rounded-3xl border border-white/8 bg-white/3 transition-transform duration-1000 group-hover:-rotate-6 sm:h-52 sm:w-52" />
                  {/* Accent dot */}
                  <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-warm-gold/20 blur-sm" />
                  <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-warm-gold/10 blur-sm" />
                </div>
              </div>

              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,168,83,0.08)_0%,transparent_60%)]" />
            </div>
          </motion.div>

          {/* Right — Editorial text */}
          <div className="flex flex-col gap-6">
            {/* Limited Edition badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-2.5"
            >
              <div className="pulse-gold flex items-center gap-1.5 rounded-full border border-warm-gold/25 bg-warm-gold/5 px-3.5 py-1.5">
                <Clock className="h-3 w-3 text-warm-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-warm-gold">
                  Limited Edition
                </span>
              </div>
              <span className="text-[11px] tracking-wider text-zinc-600">
                Only 50 pieces
              </span>
            </motion.div>

            {/* Product name */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-3xl font-light text-white sm:text-4xl md:text-5xl"
            >
              The <span className="italic text-warm-gold">Meridian</span>{" "}
              Sculpture
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md text-sm leading-relaxed text-zinc-400"
            >
              A bold geometric statement piece inspired by the intersection of
              technology and organic form. Precision-printed over 72 hours with
              a matte obsidian finish and warm-gold accent detailing. Each piece
              is individually numbered.
            </motion.p>

            {/* Details row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-warm-gold/60" />
                <span className="text-xs text-zinc-500">2,847 layers</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-xs text-zinc-500">
                Interior & Lifestyle
              </span>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <span className="font-display text-2xl font-light text-warm-gold sm:text-3xl">
                LKR 12,500
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button className="group/btn flex items-center gap-3 rounded-full border border-warm-gold/30 bg-warm-gold/5 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-warm-gold transition-all duration-500 hover:border-warm-gold/60 hover:bg-warm-gold/10 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]">
                View Object
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
