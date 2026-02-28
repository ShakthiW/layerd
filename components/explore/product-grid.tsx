"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { allProducts, formatPrice } from "@/lib/products";

export function ProductGrid({
  activeCategory,
  activeSort,
}: {
  activeCategory: string;
  activeSort: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [showAll, setShowAll] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let items = [...allProducts];

    // Filter
    if (activeCategory !== "All") {
      items = items.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case "popular":
        items.sort((a, b) => b.reviews - a.reviews);
        break;
      case "price_asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
    }

    return items;
  }, [activeCategory, activeSort]);

  const visible = showAll ? filteredAndSorted : filteredAndSorted.slice(0, 9);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black pb-24 md:pb-32"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-xs tracking-wider text-zinc-600"
        >
          {filteredAndSorted.length} OBJECT
          {filteredAndSorted.length !== 1 ? "S" : ""} FOUND
        </motion.p>

        {/* Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.08,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.slug}`}>
                {/* Product image */}
                <div
                  className={`relative mb-5 aspect-4/5 overflow-hidden rounded-2xl border border-white/6 bg-linear-to-br ${product.gradient} transition-all duration-700 group-hover:border-warm-gold/20 group-hover:shadow-[0_8px_40px_rgba(212,168,83,0.06)]`}
                >
                  {/* Geometric placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/3 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                      <div className="absolute left-4 top-4 h-20 w-20 rounded-2xl border border-white/6 bg-white/2 transition-transform duration-700 group-hover:-rotate-6" />
                    </div>
                  </div>

                  {/* Quick add */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/90 py-2.5 text-xs font-semibold uppercase tracking-wider text-black backdrop-blur-sm transition-colors hover:bg-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                      View Object
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-1.5 px-0.5">
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

        {/* Load More */}
        {!showAll && filteredAndSorted.length > 9 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-xs font-medium uppercase tracking-wider text-zinc-400 transition-all duration-300 hover:border-warm-gold/30 hover:text-white"
            >
              Load More Objects
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
