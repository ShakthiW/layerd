"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PullQuoteProps {
  text: string;
}

export function PullQuote({ text }: PullQuoteProps) {
  const quoteRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "end start"],
  });

  // Parallax: quote moves at 0.5× speed of scroll
  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={quoteRef} className="relative my-16 py-12 md:my-20 md:py-16">
      {/* Decorative lines */}
      <div className="section-divider mb-10" />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-3xl px-6 text-center md:px-12"
      >
        {/* Quote mark */}
        <span className="mb-4 block font-display text-5xl text-warm-gold/30 md:text-6xl">
          &ldquo;
        </span>

        <p className="font-display text-2xl font-light italic leading-relaxed text-white/80 sm:text-3xl md:text-4xl md:leading-relaxed">
          {text}
        </p>

        {/* Gold accent dot */}
        <div className="mx-auto mt-8 h-1.5 w-1.5 rounded-full bg-warm-gold/50" />
      </motion.div>

      <div className="section-divider mt-10" />
    </div>
  );
}
