"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Product } from "@/lib/products";

export function ProductOptions({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);

  const opts = product.options;
  if (!opts) return null;

  const hasAnyOption =
    opts.colors || opts.sizes || opts.materials || opts.finishes;
  if (!hasAnyOption) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-20 md:py-28"
    >
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

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
            Configure
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 font-display text-3xl font-light text-white sm:text-4xl"
        >
          Make it <span className="italic text-warm-gold">yours</span>
        </motion.h2>

        {/* Options grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Colors */}
          {opts.colors && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6"
            >
              <h3 className="mb-1 text-sm font-medium text-white">Color</h3>
              <p className="mb-5 text-xs text-zinc-500">
                Choose your preferred colorway
              </p>
              <div className="flex flex-wrap gap-3">
                {opts.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    className="group/swatch flex flex-col items-center gap-2"
                    title={color.name}
                  >
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        selectedColor === i
                          ? "border-warm-gold shadow-[0_0_16px_rgba(212,168,83,0.2)]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor === i && (
                        <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-warm-gold">
                          <Check className="h-2.5 w-2.5 text-black" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] transition-colors ${
                        selectedColor === i
                          ? "text-warm-gold"
                          : "text-zinc-600 group-hover/swatch:text-zinc-400"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sizes */}
          {opts.sizes && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6"
            >
              <h3 className="mb-1 text-sm font-medium text-white">Size</h3>
              <p className="mb-5 text-xs text-zinc-500">
                Select the right size for your space
              </p>
              <div className="flex flex-wrap gap-3">
                {opts.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`rounded-xl border px-5 py-3 text-left transition-all duration-300 ${
                      selectedSize === i
                        ? "border-warm-gold/40 bg-warm-gold/10 shadow-[0_0_16px_rgba(212,168,83,0.08)]"
                        : "border-white/8 bg-white/2 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        selectedSize === i ? "text-warm-gold" : "text-white"
                      }`}
                    >
                      {size.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-zinc-500">
                      {size.dimensions}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Materials */}
          {opts.materials && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6"
            >
              <h3 className="mb-1 text-sm font-medium text-white">Material</h3>
              <p className="mb-5 text-xs text-zinc-500">
                Each material has a unique feel and durability
              </p>
              <div className="space-y-3">
                {opts.materials.map((mat, i) => (
                  <button
                    key={mat.name}
                    onClick={() => setSelectedMaterial(i)}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      selectedMaterial === i
                        ? "border-warm-gold/40 bg-warm-gold/10"
                        : "border-white/6 bg-white/1 hover:border-white/15"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selectedMaterial === i
                          ? "border-warm-gold bg-warm-gold"
                          : "border-white/20"
                      }`}
                    >
                      {selectedMaterial === i && (
                        <Check className="h-3 w-3 text-black" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`block text-sm font-medium ${
                          selectedMaterial === i
                            ? "text-warm-gold"
                            : "text-white"
                        }`}
                      >
                        {mat.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {mat.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Finishes */}
          {opts.finishes && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6"
            >
              <h3 className="mb-1 text-sm font-medium text-white">Finish</h3>
              <p className="mb-5 text-xs text-zinc-500">
                The final touch that defines the look
              </p>
              <div className="space-y-3">
                {opts.finishes.map((fin, i) => (
                  <button
                    key={fin.name}
                    onClick={() => setSelectedFinish(i)}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      selectedFinish === i
                        ? "border-warm-gold/40 bg-warm-gold/10"
                        : "border-white/6 bg-white/1 hover:border-white/15"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selectedFinish === i
                          ? "border-warm-gold bg-warm-gold"
                          : "border-white/20"
                      }`}
                    >
                      {selectedFinish === i && (
                        <Check className="h-3 w-3 text-black" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`block text-sm font-medium ${
                          selectedFinish === i ? "text-warm-gold" : "text-white"
                        }`}
                      >
                        {fin.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {fin.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
