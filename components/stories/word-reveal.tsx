"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
}

export function WordReveal({ text, className = "" }: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <p className="font-display text-2xl font-light leading-[1.6] text-zinc-700 sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.4]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, [
    "rgb(63 63 70)", // zinc-700
    "rgb(244 244 245)", // zinc-100
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] inline-block transition-none"
    >
      {children}
    </motion.span>
  );
}
