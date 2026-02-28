"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Ruler,
  Weight,
  Layers,
  Clock,
  Paintbrush,
  Box,
  Hexagon,
} from "lucide-react";
import { Product } from "@/lib/products";

const specIconMap: Record<string, React.ReactNode> = {
  dimensions: <Ruler className="h-4 w-4" />,
  weight: <Weight className="h-4 w-4" />,
  material: <Box className="h-4 w-4" />,
  printTime: <Clock className="h-4 w-4" />,
  layerCount: <Layers className="h-4 w-4" />,
  finish: <Paintbrush className="h-4 w-4" />,
  infill: <Hexagon className="h-4 w-4" />,
};

const specLabelMap: Record<string, string> = {
  dimensions: "Dimensions",
  weight: "Weight",
  material: "Material",
  printTime: "Print Time",
  layerCount: "Layer Count",
  finish: "Finish",
  infill: "Infill Pattern",
};

export function ProductSpecs({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const specs = product.specs;
  const specEntries = Object.entries(specs).filter(
    ([, v]) => v !== undefined && v !== "",
  ) as [string, string][];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-20 md:py-28"
    >
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_70%)]" />

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
            Specifications
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 font-display text-3xl font-light text-white sm:text-4xl"
        >
          The <span className="italic text-warm-gold">blueprint</span>
        </motion.h2>

        {/* Specs card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-white/6 bg-white/2"
        >
          {/* Gold accent bar */}
          <div className="h-0.5 bg-linear-to-r from-transparent via-warm-gold/40 to-transparent" />

          {/* Spec items grid */}
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {specEntries.map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="group flex items-start gap-4 bg-zinc-950 p-6 transition-colors duration-300 hover:bg-white/2"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-white/3 text-warm-gold/60 transition-colors duration-300 group-hover:border-warm-gold/20 group-hover:text-warm-gold">
                  {specIconMap[key] || <Box className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    {specLabelMap[key] || key}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-200">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
