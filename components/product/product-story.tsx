"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Clock, Layers, Paintbrush, Quote } from "lucide-react";
import { Product } from "@/lib/products";

export function ProductStory({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-20 md:py-28"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_70%)]" />

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
            The Story
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 font-display text-3xl font-light text-white sm:text-4xl"
        >
          This wasn&apos;t bought.{" "}
          <span className="italic text-warm-gold">It was built.</span>
        </motion.h2>

        {/* Two-column content */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — Narrative (3 cols) */}
          <div className="space-y-8 lg:col-span-3">
            {/* Story headline */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-2xl font-light text-white/90"
            >
              {product.story.headline}
            </motion.h3>

            {/* Story paragraphs */}
            {product.story.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="text-sm leading-[1.8] text-zinc-400"
              >
                {p}
              </motion.p>
            ))}

            {/* Design Inspiration pull-quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-warm-gold/15 bg-warm-gold/5 p-6"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-warm-gold/10" />
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warm-gold/70" />
                <span className="text-xs font-semibold uppercase tracking-wider text-warm-gold/70">
                  Design Inspiration
                </span>
              </div>
              <p className="text-sm italic leading-relaxed text-warm-gold-light/80">
                &ldquo;{product.story.designInspo}&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right — The Journey card (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/6 bg-white/2">
              {/* Card header */}
              <div className="border-b border-white/6 px-6 py-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gold/70">
                  The Print Journey
                </h4>
              </div>

              {/* Journey content */}
              <div className="p-6">
                <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                  {product.story.printJourney}
                </p>

                {/* Journey stats */}
                <div className="space-y-5">
                  <JourneyStat
                    icon={<Clock className="h-4 w-4" />}
                    label="Print Time"
                    value={product.specs.printTime}
                  />
                  <JourneyStat
                    icon={<Layers className="h-4 w-4" />}
                    label="Layers"
                    value={product.specs.layerCount}
                  />
                  <JourneyStat
                    icon={<Paintbrush className="h-4 w-4" />}
                    label="Finish"
                    value={product.specs.finish}
                  />
                  <JourneyStat
                    icon={
                      <span className="flex h-4 w-4 items-center justify-center text-xs">
                        ◆
                      </span>
                    }
                    label="Material"
                    value={product.specs.material}
                  />
                  {product.specs.infill && (
                    <JourneyStat
                      icon={
                        <span className="flex h-4 w-4 items-center justify-center text-xs">
                          ⬡
                        </span>
                      }
                      label="Infill"
                      value={product.specs.infill}
                    />
                  )}
                </div>
              </div>

              {/* Card footer accent */}
              <div className="h-0.5 bg-linear-to-r from-transparent via-warm-gold/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function JourneyStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/6 bg-white/3 text-warm-gold/60">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
          {label}
        </p>
        <p className="text-sm text-zinc-300">{value}</p>
      </div>
    </div>
  );
}
