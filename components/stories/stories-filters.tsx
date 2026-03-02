"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  "All",
  "Design",
  "Process",
  "Behind the Scenes",
  "Customers",
];

export function StoriesFilters({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative bg-black py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
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
                    layoutId="activeStoryCategory"
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
      </div>
    </motion.div>
  );
}
