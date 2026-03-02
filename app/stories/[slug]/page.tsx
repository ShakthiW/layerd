"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { articles } from "@/components/stories/article-grid";
import { articleBlocks } from "@/components/stories/article-content";
import { ReadingProgress } from "@/components/stories/reading-progress";
import { WordReveal } from "@/components/stories/word-reveal";
import { ParallaxImage } from "@/components/stories/parallax-image";
import { PullQuote } from "@/components/stories/pull-quote";
import { Footer } from "@/components/home/footer";

/* ─────────────────────── Animated paragraph ─────────────────────── */

function AnimatedParagraph({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-8 text-base leading-[1.9] text-zinc-400 md:text-lg md:leading-loose"
    >
      {children}
    </motion.p>
  );
}

/* ─────────────────────── Animated heading ─────────────────────── */

function AnimatedHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-6 mt-16 font-display text-2xl font-light text-white first:mt-0 sm:text-3xl md:text-4xl"
    >
      {children}
    </motion.h2>
  );
}

/* ─────────────────────── Section divider ─────────────────────── */

function AnimatedDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="my-16 md:my-20"
    >
      <div className="section-divider" />
    </motion.div>
  );
}

/* ═══════════════════════ Main Page ═══════════════════════ */

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles.find((a) => a.slug === slug);
  const blocks = articleBlocks[slug] || [];

  const heroRef = useRef<HTMLDivElement>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);

  const suggestedInView = useInView(suggestedRef, {
    once: true,
    margin: "-40px",
  });

  /* Parallax transforms for the hero */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTitleY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroBgScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  /* ── 404 ── */
  if (!article) {
    return (
      <div className="grain-overlay">
        <main className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="font-display text-3xl font-light text-white">
              Story not found
            </h1>
            <Link
              href="/stories"
              className="mt-6 inline-flex items-center gap-2 text-sm text-warm-gold hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* Find the first pullquote for the WordReveal opening */
  const openingQuote = blocks.find((b) => b.type === "pullquote");

  /* Suggested articles */
  const suggested = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="grain-overlay">
      {/* Reading progress bar */}
      <ReadingProgress />

      <main>
        {/* ═══════════════ Cinematic Hero ═══════════════ */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
        >
          {/* Animated background */}
          <motion.div
            style={{ scale: heroBgScale }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />
            <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
            <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </motion.div>

          {/* Hero content — parallax drift */}
          <motion.div
            style={{ y: heroTitleY, opacity: heroOpacity }}
            className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12"
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <Link
                href="/stories"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-warm-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Stories
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-warm-gold/25 bg-warm-gold/5 px-3.5 py-1.5">
                <BookOpen className="h-3 w-3 text-warm-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-warm-gold">
                  {article.category}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {article.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-5"
            >
              <span className="text-xs text-zinc-500">{article.author}</span>
              <div className="h-3.5 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-zinc-600" />
                <span className="text-xs text-zinc-500">
                  {article.readTime} read
                </span>
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <span className="text-xs text-zinc-500">{article.date}</span>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="mx-auto flex flex-col items-center gap-2"
              >
                <div className="h-8 w-px bg-linear-to-b from-transparent to-warm-gold/40" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Scroll to read
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ Word Reveal Opening ═══════════════ */}
        {openingQuote?.content && (
          <section className="relative bg-black py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 md:px-12">
              <WordReveal text={openingQuote.content} />
            </div>
          </section>
        )}

        {/* ═══════════════ Article Body ═══════════════ */}
        <section className="relative bg-zinc-950 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            {blocks.map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <AnimatedParagraph key={i}>
                      {block.content!}
                    </AnimatedParagraph>
                  );
                case "heading":
                  return (
                    <AnimatedHeading key={i}>{block.content!}</AnimatedHeading>
                  );
                case "pullquote":
                  return <PullQuote key={i} text={block.content!} />;
                case "image":
                  return (
                    <ParallaxImage key={i} src={block.src!} alt={block.alt!} />
                  );
                case "divider":
                  return <AnimatedDivider key={i} />;
                default:
                  return null;
              }
            })}
          </div>
        </section>

        {/* ═══════════════ Suggested Articles ═══════════════ */}
        <section
          ref={suggestedRef}
          className="relative bg-black py-20 md:py-28"
        >
          {/* Divider */}
          <div className="section-divider absolute top-0 left-0 right-0" />

          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={suggestedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12 flex items-center gap-3"
            >
              <span className="h-px w-12 bg-warm-gold/50" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
                Continue Reading
              </span>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggested.map((sa, i) => (
                <motion.div
                  key={sa.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={suggestedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={`/stories/${sa.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6 transition-all duration-500 hover:border-warm-gold/20 hover:bg-white/4"
                  >
                    {/* Category */}
                    <span className="mb-3 inline-block rounded-full border border-warm-gold/20 bg-warm-gold/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gold">
                      {sa.category}
                    </span>

                    {/* Title */}
                    <h3 className="mb-2 font-display text-lg font-light text-white transition-colors duration-300 group-hover:text-warm-gold">
                      {sa.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                      {sa.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-zinc-600" />
                        <span className="text-[11px] text-zinc-600">
                          {sa.readTime}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-700 transition-all duration-300 group-hover:text-warm-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
