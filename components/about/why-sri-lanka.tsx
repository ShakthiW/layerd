"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function WhySriLanka() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-32 md:py-48 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-warm-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-warm-gold">
              Our Mission in Sri Lanka
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Challenging the <br />
            <span className="text-warm-gold italic">Import Markup.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* The Problem */}
          <motion.div
            style={{ y: y1 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500/50 to-transparent" />
            <h3 className="font-display text-2xl text-white mb-6">
              The Old Way
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              For years, the local market has been saturated with mass-produced
              imports. These generic items are brought in for pennies on the
              dollar, yet reach Sri Lankan consumers at double or triple their
              international value.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We pay premium prices for non-premium goods, inflating the
              perceived value simply because it was shipped across an ocean.
            </p>
          </motion.div>

          {/* The Solution */}
          <motion.div
            style={{ y: y2 }}
            className="rounded-3xl border border-warm-gold/20 bg-warm-gold/5 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden mt-12 md:mt-0"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-warm-gold to-transparent" />
            <h3 className="font-display text-2xl text-warm-gold mb-6">
              The Layerd Approach
            </h3>
            <p className="text-zinc-300 leading-relaxed mb-6">
              We saw an opportunity to disrupt this cycle. By leveraging
              advanced manufacturing right here in Sri Lanka, we eliminate the
              unjustified overhead, international shipping fees, and arbitrary
              markups.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              World-class design. Uncompromising quality. Crafted locally. We
              deliver the true value of a product directly to you, making
              premium design accessible without the import tax.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
