"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export function ProductRelated({ 
  product, 
  relatedProducts 
}: { 
  product: Product;
  relatedProducts: Product[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  if (relatedProducts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-20 md:py-28"
    >
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-warm-gold/50" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
                Continue Exploring
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-3xl font-light text-white sm:text-4xl"
            >
              You might also <span className="italic text-warm-gold">love</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/explore"
              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400 transition-all duration-300 hover:border-warm-gold/30 hover:text-white"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Related products grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <Link href={`/product/${item.slug}`} className="group block">
                {/* Product image */}
                <div
                  className={`relative mb-5 aspect-4/5 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br ${item.gradient} transition-all duration-700 group-hover:border-warm-gold/20 group-hover:shadow-[0_8px_40px_rgba(212,168,83,0.06)]`}
                >
                  {item.images && item.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    /* Geometric placeholder */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/3 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                        <div className="absolute left-4 top-4 h-20 w-20 rounded-2xl border border-white/6 bg-white/2 transition-transform duration-700 group-hover:-rotate-6" />
                      </div>
                    </div>
                  )}

                  {/* View Product overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/90 py-2.5 text-xs font-semibold uppercase tracking-wider text-black backdrop-blur-sm">
                      <ArrowRight className="h-3.5 w-3.5" />
                      View Object
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-1.5 px-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium text-white transition-colors group-hover:text-warm-gold">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-warm-gold">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warm-gold text-warm-gold" />
                      <span className="text-xs text-zinc-500">
                        {item.rating} ({item.reviews})
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
