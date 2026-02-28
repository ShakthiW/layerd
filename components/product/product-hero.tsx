"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Clock,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export function ProductHero({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

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
          className="mb-8 flex items-center gap-2 text-xs text-zinc-500"
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
          {/* Left — Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative"
          >
            <div
              className={`relative aspect-4/5 overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br ${product.gradient} transition-all duration-700`}
            >
              {/* Geometric placeholder art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-44 w-44 rounded-3xl border border-warm-gold/15 bg-warm-gold/5 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-105 sm:h-56 sm:w-56" />
                  <div className="absolute left-8 top-8 h-44 w-44 rounded-3xl border border-white/8 bg-white/3 transition-transform duration-1000 group-hover:-rotate-6 sm:h-56 sm:w-56" />
                  <div className="absolute -right-4 -top-4 h-10 w-10 rounded-full bg-warm-gold/20 blur-sm" />
                  <div className="absolute -bottom-3 -left-3 h-7 w-7 rounded-full bg-warm-gold/10 blur-sm" />
                </div>
              </div>

              {/* Inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,168,83,0.08)_0%,transparent_60%)]" />

              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="absolute left-4 top-4 flex flex-col gap-2">
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
          </motion.div>

          {/* Right — Product info */}
          <div className="flex flex-col gap-5">
            {/* Category */}
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

            {/* Product name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-display text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl"
            >
              {product.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="max-w-md text-sm italic leading-relaxed text-zinc-400"
            >
              &ldquo;{product.tagline}&rdquo;
            </motion.p>

            {/* Rating */}
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

            {/* Detail pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-warm-gold/60" />
                <span className="text-xs text-zinc-400">
                  {product.specs.printTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                <Layers className="h-3.5 w-3.5 text-warm-gold/60" />
                <span className="text-xs text-zinc-400">
                  {product.specs.layerCount} layers
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                <span className="text-xs text-zinc-400">
                  {product.specs.material}
                </span>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="section-divider my-1"
            />

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <span className="font-display text-3xl font-light text-warm-gold sm:text-4xl">
                {formatPrice(product.price)}
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group/btn flex items-center gap-3 rounded-full border border-warm-gold/40 bg-warm-gold/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-warm-gold transition-all duration-500 hover:border-warm-gold/70 hover:bg-warm-gold/20 hover:shadow-[0_0_30px_rgba(212,168,83,0.15)]">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
              <button className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-zinc-400 transition-all duration-300 hover:border-white/25 hover:text-white">
                Save for Later
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-zinc-600"
            >
              <span>✦ Free shipping island-wide</span>
              <span>✦ 7-day quality guarantee</span>
              <span>✦ Handcrafted in Sri Lanka</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
