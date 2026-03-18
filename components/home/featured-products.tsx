"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";

export function FeaturedProducts({ products: allProducts }: { products: any[] }) {
  const products = allProducts.slice(0, 4);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-32 md:py-40"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-warm-gold/50" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
                Spotlight
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl font-light text-white sm:text-5xl"
            >
              Featured <span className="italic text-warm-gold">Prints</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/explore"
              className="rounded-full border border-white/10 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400 transition-all duration-300 hover:border-warm-gold/30 hover:text-white"
            >
              View All Products
            </Link>
          </motion.div>
        </div>

        {/* Product cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.12,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.slug}`}>
                {/* Product image placeholder */}
                <div
                  className={`relative mb-4 aspect-square overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br ${product.gradient} transition-all duration-700 group-hover:border-warm-gold/20 group-hover:shadow-lg`}
                >
                  {/* Placeholder visual — geometric pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/3 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                      <div className="absolute left-4 top-4 h-20 w-20 rounded-2xl border border-white/6 bg-white/2 transition-transform duration-700 group-hover:-rotate-6" />
                    </div>
                  </div>

                  {/* View product button */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/90 py-2.5 text-xs font-semibold uppercase tracking-wider text-black backdrop-blur-sm transition-colors hover:bg-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                      View Object
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-medium text-white transition-colors group-hover:text-warm-gold">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-warm-gold">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warm-gold text-warm-gold" />
                      <span className="text-xs text-zinc-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
