"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    slug: "why-layerd-exists",
    title: "Why Layerd exists",
    excerpt:
      "It started with a question — what happens when you combine Sri Lankan craftsmanship with cutting-edge 3D printing technology?",
    category: "Behind the Scenes",
    author: "Layerd Team",
    date: "Feb 15, 2026",
    readTime: "8 min",
  },
  {
    slug: "how-a-lamp-is-built-layer-by-layer",
    title: "How a lamp is built layer by layer",
    excerpt:
      "Follow the journey of our signature desk lamp from filament spool to finished product — 14 hours, 3,200 layers, zero compromises.",
    category: "Process",
    author: "Layerd Team",
    date: "Feb 8, 2026",
    readTime: "6 min",
  },
  {
    slug: "from-idea-to-object",
    title: "From idea to object",
    excerpt:
      "The design process behind every Layerd product — how a rough sketch becomes a precision-engineered 3D model ready for print.",
    category: "Design",
    author: "Layerd Team",
    date: "Jan 28, 2026",
    readTime: "7 min",
  },
  {
    slug: "print-failures-and-lessons",
    title: "Print failures and lessons",
    excerpt:
      "Not every print succeeds. Here are our biggest disasters, what went wrong, and the hard-earned lessons we carry forward.",
    category: "Behind the Scenes",
    author: "Layerd Team",
    date: "Jan 18, 2026",
    readTime: "5 min",
  },
  {
    slug: "your-first-10-products-journey",
    title: "Your first 10 products journey",
    excerpt:
      "We asked our earliest customers to share their experience — unboxing, living with, and falling in love with 3D printed objects.",
    category: "Customers",
    author: "Layerd Team",
    date: "Jan 5, 2026",
    readTime: "10 min",
  },
];

// Geometric placeholder shapes per card for visual variety
const cardShapes = [
  // Circles
  <div key="s1" className="relative">
    <div className="h-20 w-20 rounded-full border border-warm-gold/15 bg-warm-gold/5 transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute left-5 top-5 h-20 w-20 rounded-full border border-white/8 bg-white/3 transition-transform duration-700 group-hover:scale-105" />
  </div>,
  // Stacked bars
  <div key="s2" className="flex flex-col gap-2">
    {[56, 44, 32].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded-full border border-warm-gold/10 bg-warm-gold/5 transition-all duration-700 group-hover:opacity-80"
        style={{ width: `${w * 1.5}px` }}
      />
    ))}
  </div>,
  // Diamond
  <div key="s3" className="relative">
    <div className="h-24 w-24 rotate-45 rounded-xl border border-warm-gold/15 bg-warm-gold/5 transition-transform duration-700 group-hover:rotate-50 group-hover:scale-105" />
    <div className="absolute left-3 top-3 h-18 w-18 rotate-45 rounded-xl border border-white/8 bg-white/3" />
  </div>,
  // Dots grid
  <div key="s4" className="grid grid-cols-4 gap-2">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className={`h-3 w-3 rounded-full transition-all duration-500 group-hover:scale-110 ${
          i % 3 === 0
            ? "bg-warm-gold/20"
            : i % 3 === 1
              ? "bg-white/8"
              : "bg-warm-gold/8"
        }`}
        style={{ transitionDelay: `${i * 30}ms` }}
      />
    ))}
  </div>,
  // Concentric rectangles
  <div key="s5" className="relative flex items-center justify-center">
    <div className="h-24 w-36 rounded-2xl border border-warm-gold/10 transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute h-16 w-28 rounded-xl border border-warm-gold/15 bg-warm-gold/3 transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute h-8 w-16 rounded-lg border border-white/10 bg-white/3" />
  </div>,
];

export function ArticleGrid({ activeCategory }: { activeCategory: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-40px" });

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section ref={gridRef} className="relative bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            All Stories
          </span>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-sm text-zinc-600"
          >
            No stories in this category yet. Check back soon.
          </motion.p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => {
              const shapeIndex = articles.findIndex(
                (a) => a.slug === article.slug,
              );
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={`/stories/${article.slug}`}
                    className="group block"
                  >
                    {/* Card */}
                    <div className="overflow-hidden rounded-2xl border border-white/6 bg-white/2 transition-all duration-500 hover:border-warm-gold/20 hover:bg-white/4 hover:shadow-[0_0_40px_rgba(212,168,83,0.04)]">
                      {/* Image area */}
                      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-linear-to-br from-zinc-900/80 to-zinc-950">
                        {cardShapes[shapeIndex % cardShapes.length]}
                        {/* Subtle glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,83,0.04)_0%,transparent_70%)]" />
                      </div>

                      {/* Text content */}
                      <div className="p-6">
                        {/* Category & read time */}
                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-full border border-warm-gold/20 bg-warm-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gold">
                            {article.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-zinc-600" />
                            <span className="text-[11px] text-zinc-600">
                              {article.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 font-display text-lg font-light text-white transition-colors duration-300 group-hover:text-warm-gold">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                          {article.excerpt}
                        </p>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-zinc-600">
                              {article.author}
                            </span>
                            <div className="h-3 w-px bg-white/8" />
                            <span className="text-[11px] text-zinc-600">
                              {article.date}
                            </span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-all duration-300 group-hover:text-warm-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
