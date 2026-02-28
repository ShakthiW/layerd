"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { Product } from "@/lib/products";

const contextIcons = ["🏠", "💻", "☕", "🎨", "🎮", "📚", "🌿", "🎵"];

export function ProductGallery({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-20 md:py-28"
    >
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Gentle background glow */}
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Where It Belongs
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-display text-3xl font-light text-white sm:text-4xl"
        >
          See it in <span className="italic text-warm-gold">context</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 max-w-lg text-sm leading-relaxed text-zinc-500"
        >
          This isn&apos;t just a product photo. This is where it lives,
          breathes, and becomes part of your story.
        </motion.p>

        {/* Context cards — horizontal scroll on mobile, grid on desktop */}
        <div className="scrollbar-hide -mx-6 flex gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {product.lifestyleContexts.map((context, i) => (
            <motion.div
              key={context}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.25 + i * 0.1,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group shrink-0 cursor-pointer md:shrink"
            >
              <div className="relative aspect-3/4 w-64 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-b from-white/4 to-transparent transition-all duration-500 group-hover:border-warm-gold/20 group-hover:shadow-[0_8px_40px_rgba(212,168,83,0.06)] md:w-full">
                {/* Background gradient variation per card */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${product.gradient} opacity-60`}
                />

                {/* Subtle geometric elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="h-24 w-24 rounded-2xl border border-white/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                </div>

                {/* Context icon */}
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-lg backdrop-blur-sm">
                  {contextIcons[i % contextIcons.length]}
                </div>

                {/* Context text overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-5 pt-16">
                  <div className="mb-2 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-warm-gold/60" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-warm-gold/60">
                      Context {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-white">
                    {context}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,83,0.06)_0%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
