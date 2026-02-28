"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { Product } from "@/lib/products";

export function ProductReviews({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-20 md:py-28"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)]" />

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
            Reviews
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 font-display text-3xl font-light text-white sm:text-4xl"
        >
          What collectors <span className="italic text-warm-gold">say</span>
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
          {/* Left — Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6 text-center">
              <p className="font-display text-5xl font-light text-warm-gold">
                {product.rating}
              </p>
              <div className="mt-2 flex items-center justify-center gap-1">
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
              <p className="mt-3 text-xs text-zinc-500">
                Based on {product.reviews} reviews
              </p>
              <div className="section-divider my-5" />
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 py-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400 transition-all duration-300 hover:border-warm-gold/20 hover:text-white">
                <MessageSquare className="h-3.5 w-3.5" />
                Write a Review
              </button>
            </div>
          </motion.div>

          {/* Right — Review cards */}
          <div className="space-y-5 lg:col-span-3">
            {product.reviewList.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="group overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6 transition-all duration-300 hover:border-white/10"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      {/* Avatar circle */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-warm-gold/20 to-warm-amber/10 text-sm font-semibold text-warm-gold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-zinc-600">
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3.5 w-3.5 ${
                          j < review.rating
                            ? "fill-warm-gold text-warm-gold"
                            : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">
                  &ldquo;{review.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
