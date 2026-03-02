"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  overlay?: string;
}

export function ParallaxImage({ src, alt, overlay }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative my-16 overflow-hidden rounded-2xl md:my-24 md:rounded-3xl"
      style={{ height: "70vh", minHeight: "400px", maxHeight: "700px" }}
    >
      {/* Image with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

      {/* Optional text overlay */}
      {overlay && (
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
        >
          <p className="max-w-lg font-display text-xl font-light italic text-white/90 md:text-2xl">
            {overlay}
          </p>
        </motion.div>
      )}

      {/* Subtle border */}
      <div className="absolute inset-0 rounded-2xl border border-white/6 md:rounded-3xl" />
    </div>
  );
}
