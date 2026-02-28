"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "Desk & Organization",
  "Anime Inspired",
  "F1 Designs",
  "Interior & Lifestyle",
  "Trending",
  "Custom",
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
];

export function ExploreFilters({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-40px" });

  const activeSortLabel =
    sortOptions.find((s) => s.value === activeSort)?.label ?? "Newest";

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative bg-black py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <SlidersHorizontal className="mr-1 h-3.5 w-3.5 shrink-0 text-zinc-600" />
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className="relative shrink-0"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-full border border-warm-gold/40 bg-warm-gold/8"
                    />
                  )}
                  <span
                    className={`relative z-10 block rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isActive
                        ? "text-warm-gold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              Sort: {activeSortLabel}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-20 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSortChange(opt.value);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3.5 py-2.5 text-left text-xs transition-colors duration-150 ${
                        opt.value === activeSort
                          ? "bg-warm-gold/10 font-semibold text-warm-gold"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
