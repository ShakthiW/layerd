"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Type, Image, Palette, Sparkles } from "lucide-react";
import { Product } from "@/lib/products";

export function ProductCustomizer({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [customText, setCustomText] = useState("");
  const [selectedCustomColor, setSelectedCustomColor] = useState(0);

  if (!product.isCustomizable || !product.customization) return null;

  const cust = product.customization;

  // Use the product's color options for custom color selection, or a default palette
  const colorPalette = product.options?.colors || [
    { name: "Black", hex: "#1a1a1a" },
    { name: "White", hex: "#f0f0f0" },
    { name: "Gold", hex: "#d4a853" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-20 md:py-28"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

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
            Personalize
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-display text-3xl font-light text-white sm:text-4xl"
        >
          Make it <span className="italic text-warm-gold">uniquely yours</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 max-w-lg text-sm leading-relaxed text-zinc-500"
        >
          {cust.description}
        </motion.p>

        {/* Customization card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="overflow-hidden rounded-3xl border border-warm-gold/15 bg-warm-gold/2"
        >
          {/* Premium banner */}
          <div className="flex items-center gap-2 border-b border-warm-gold/10 bg-warm-gold/5 px-6 py-3">
            <Sparkles className="h-4 w-4 text-warm-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider text-warm-gold">
              Custom Creation
            </span>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
            {/* Left — Customization inputs */}
            <div className="space-y-6">
              {/* Custom text input */}
              {cust.allowCustomText && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-warm-gold/60" />
                    <label className="text-sm font-medium text-white">
                      Custom Text
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder={cust.allowCustomText.placeholder}
                      maxLength={cust.allowCustomText.maxLength}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/40 focus:ring-1 focus:ring-warm-gold/20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-600">
                      {customText.length}/{cust.allowCustomText.maxLength}
                    </span>
                  </div>
                </div>
              )}

              {/* Custom image upload */}
              {cust.allowCustomImage && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-warm-gold/60" />
                    <label className="text-sm font-medium text-white">
                      Upload Image
                    </label>
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/2 px-6 py-8 transition-all duration-300 hover:border-warm-gold/30 hover:bg-warm-gold/5">
                    <div className="text-center">
                      <Image className="mx-auto mb-2 h-8 w-8 text-zinc-600" />
                      <p className="text-xs text-zinc-500">
                        Drop your image here or{" "}
                        <span className="text-warm-gold/70 underline">
                          browse
                        </span>
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-700">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom colors */}
              {cust.allowCustomColors && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-warm-gold/60" />
                    <label className="text-sm font-medium text-white">
                      Custom Color
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colorPalette.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedCustomColor(i)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          selectedCustomColor === i
                            ? "border-warm-gold scale-110 shadow-[0_0_12px_rgba(212,168,83,0.25)]"
                            : "border-white/10 hover:border-white/30"
                        }`}
                        title={color.name}
                      >
                        <div
                          className="h-6 w-6 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Live preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Live Preview
              </h4>
              <div
                className={`relative aspect-4/3 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br ${product.gradient}`}
              >
                {/* Geometric placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="h-28 w-28 rounded-2xl border border-warm-gold/15 bg-warm-gold/5 sm:h-36 sm:w-36" />
                    <div className="absolute left-5 top-5 h-28 w-28 rounded-2xl border border-white/8 bg-white/3 sm:h-36 sm:w-36" />
                  </div>
                </div>

                {/* Preview of custom text */}
                {customText && (
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4">
                    <p
                      className="text-center font-display text-lg font-medium"
                      style={{
                        color: cust.allowCustomColors
                          ? colorPalette[selectedCustomColor]?.hex
                          : "#d4a853",
                      }}
                    >
                      {customText}
                    </p>
                  </div>
                )}

                {/* Empty state */}
                {!customText && (
                  <div className="absolute inset-0 flex items-end justify-center pb-6">
                    <p className="text-xs italic text-zinc-600">
                      Your customization will appear here...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
