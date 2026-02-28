"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Clock,
  Layers,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

// Helper to determine what to show in the gallery
type VisualType =
  | { type: "image"; src: string }
  | { type: "gradient"; angle: number; label: string };

export function ProductHero({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  // ——— Gallery State ———
  // If product had real images, we'd use them. Otherwise, we simulate different angles/views.
  const visuals: VisualType[] = (product as any).images?.length
    ? (product as any).images.map((img: string) => ({
        type: "image",
        src: img,
      }))
    : [
        { type: "gradient", angle: 12, label: "Front View" },
        { type: "gradient", angle: 45, label: "Angle View" },
        { type: "gradient", angle: -15, label: "Side View" },
        { type: "gradient", angle: 90, label: "Detail View" },
      ];

  const [activeVisualIdx, setActiveVisualIdx] = useState(0);
  const activeVisual = visuals[activeVisualIdx];

  // ——— Options State (moved from product-options) ———
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);

  const opts = product.options;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-8 pb-20 md:pb-28"
    >
      {/* Background glows */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-xs text-zinc-500 relative z-10"
        >
          <Link href="/" className="transition-colors hover:text-warm-gold">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href="/explore"
            className="transition-colors hover:text-warm-gold"
          >
            Explore
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-warm-gold/70">{product.name}</span>
        </motion.nav>

        {/* Two-column hero */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Product Visual Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative flex flex-col gap-4"
          >
            {/* Main Visual */}
            <div
              className={`relative aspect-4/5 overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br ${product.gradient} transition-all duration-700`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVisualIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {activeVisual.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeVisual.src}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <div
                        className="h-44 w-44 rounded-3xl border border-warm-gold/15 bg-warm-gold/5 transition-transform duration-1000 group-hover:scale-105 sm:h-56 sm:w-56"
                        style={{
                          transform: `rotate(${activeVisual.angle}deg)`,
                        }}
                      />
                      <div
                        className="absolute left-8 top-8 h-44 w-44 rounded-3xl border border-white/8 bg-white/3 transition-transform duration-1000 sm:h-56 sm:w-56"
                        style={{
                          transform: `rotate(${-activeVisual.angle / 2}deg)`,
                        }}
                      />
                      <div className="absolute -right-4 -top-4 h-10 w-10 rounded-full bg-warm-gold/20 blur-sm" />
                      <div className="absolute -bottom-3 -left-3 h-7 w-7 rounded-full bg-warm-gold/10 blur-sm" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,168,83,0.08)_0%,transparent_60%)] pointer-events-none" />

              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="absolute left-4 top-4 flex flex-col gap-2 pointer-events-none z-10">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="pulse-gold flex items-center gap-1.5 rounded-full border border-warm-gold/25 bg-warm-gold/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-warm-gold backdrop-blur-sm"
                    >
                      <Sparkles className="h-3 w-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {visuals.map((vis, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVisualIdx(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all duration-300 ${
                    activeVisualIdx === idx
                      ? "border-warm-gold shadow-[0_0_15px_rgba(212,168,83,0.15)]"
                      : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  {vis.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={vis.src}
                      alt={`${product.name} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-linear-to-br ${product.gradient} flex items-center justify-center opacity-80`}
                    >
                      <div
                        className="h-6 w-6 rounded-md border border-white/20 bg-white/10"
                        style={{ transform: `rotate(${vis.angle}deg)` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Product Info & Configuration */}
          <div className="flex flex-col gap-6 relative z-10">
            {/* Header section */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 bg-warm-gold/40" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-gold/60">
                  {product.category}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="font-display text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl"
              >
                {product.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-warm-gold text-warm-gold"
                          : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  {product.rating}{" "}
                  <span className="text-zinc-600">
                    ({product.reviews} reviews)
                  </span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <span className="font-display text-3xl font-light text-warm-gold sm:text-4xl">
                  {formatPrice(product.price)}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm italic leading-relaxed text-zinc-400"
              >
                &ldquo;{product.tagline}&rdquo;
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="section-divider my-2"
            />

            {/* ——— CONFIGURATION OPTIONS ——— */}
            {opts && Object.keys(opts).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col gap-6"
              >
                {/* Colors */}
                {opts.colors && (
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Color
                      </span>
                      <span className="text-xs text-warm-gold">
                        {opts.colors[selectedColor]?.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {opts.colors.map((color, i) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(i)}
                          className="group/swatch relative flex items-center justify-center p-1"
                          title={color.name}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              selectedColor === i
                                ? "border-warm-gold shadow-[0_0_16px_rgba(212,168,83,0.3)] scale-110"
                                : "border-transparent hover:border-white/30"
                            }`}
                          >
                            <div
                              className="h-8 w-8 rounded-full border border-white/10"
                              style={{ backgroundColor: color.hex }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Sizes */}
                  {opts.sizes && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                          Size
                        </span>
                        <span className="text-xs text-warm-gold">
                          {opts.sizes[selectedSize]?.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {opts.sizes.map((size, i) => (
                          <button
                            key={size.label}
                            onClick={() => setSelectedSize(i)}
                            className={`rounded-xl border px-3 py-2.5 text-center transition-all duration-300 ${
                              selectedSize === i
                                ? "border-warm-gold/50 bg-warm-gold/10 shadow-[0_0_16px_rgba(212,168,83,0.1)]"
                                : "border-white/10 bg-white/2 hover:border-white/30"
                            }`}
                          >
                            <span
                              className={`block text-xs font-medium ${selectedSize === i ? "text-warm-gold" : "text-white"}`}
                            >
                              {size.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {opts.sizes[selectedSize]?.dimensions && (
                        <p className="text-[11px] text-zinc-500">
                          {opts.sizes[selectedSize].dimensions}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Materials or Finishes (showing Finish if Material not present, to save space, or can stack them) */}
                  {/* Let's stack them vertically for compact UX or use select dropdowns. Radio buttons are great: */}
                  {opts.finishes && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                          Finish
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 mb-2">
                        {opts.finishes.map((fin, i) => (
                          <button
                            key={fin.name}
                            onClick={() => setSelectedFinish(i)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all duration-300 ${
                              selectedFinish === i
                                ? "border-warm-gold/50 bg-warm-gold/10"
                                : "border-white/10 bg-white/2 hover:border-white/30"
                            }`}
                          >
                            <div
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                selectedFinish === i
                                  ? "border-warm-gold bg-warm-gold"
                                  : "border-white/20"
                              }`}
                            >
                              {selectedFinish === i && (
                                <Check className="h-2.5 w-2.5 text-black" />
                              )}
                            </div>
                            <span
                              className={`text-xs font-medium ${selectedFinish === i ? "text-warm-gold" : "text-white"}`}
                            >
                              {fin.name}
                            </span>
                          </button>
                        ))}
                      </div>
                      {opts.finishes[selectedFinish]?.description && (
                        <p className="text-[11px] text-zinc-500">
                          {opts.finishes[selectedFinish].description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="section-divider my-2"
            />

            {/* Print Process Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 text-xs text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {product.specs.printTime}
              </div>
              <span className="text-zinc-700">|</span>
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> {product.specs.layerCount}{" "}
                layers
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-3 sm:flex-row mt-2"
            >
              <button className="group/btn flex-1 flex items-center justify-center gap-3 rounded-full border border-warm-gold/40 bg-warm-gold/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-warm-gold transition-all duration-500 hover:border-warm-gold hover:bg-warm-gold hover:text-black hover:shadow-[0_0_30px_rgba(212,168,83,0.3)]">
                <ShoppingBag className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                Add to Cart
              </button>
              <button className="flex items-center justify-center rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-zinc-400 transition-all duration-300 hover:border-white/30 hover:text-white bg-white/2 hover:bg-white/5">
                Save
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-zinc-500"
            >
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-warm-gold" /> Free shipping
                island-wide
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-warm-gold" /> 7-day quality
                guarantee
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
