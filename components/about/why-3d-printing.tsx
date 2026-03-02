"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Why3DPrinting() {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Complexity Without Cost",
      desc: "Traditional manufacturing penalizes complexity. Injection molding requires expensive tooling for intricate designs. 3D printing sets design free. If we can imagine it, we can create it, layer by layer.",
    },
    {
      title: "On-Demand Precision",
      desc: "No massive warehouses of unsold inventory. Every piece is created purposefully when it is needed. This reduces waste and ensures each product receives the attention it deserves.",
    },
    {
      title: "The Aesthetics of Making",
      desc: "We don't hide the layer lines; we celebrate them. The subtle texture of a 3D printed object is a testament to its creation process—a modern digital craftsmanship that looks and feels distinct.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-950 py-32 md:py-48"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Side: Images */}
          <div className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-white/5">
              <Image
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
                alt="3D Printing Process Details"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating smaller image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 aspect-square w-48 overflow-hidden rounded-2xl border-4 border-zinc-950 shadow-2xl hidden md:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2670&auto=format&fit=crop"
                alt="Close up texture"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 font-display text-4xl font-light text-white md:text-5xl lg:text-6xl">
                Why <span className="text-warm-gold italic">3D Printing?</span>
              </h2>
              <p className="mb-12 text-lg leading-relaxed text-zinc-400">
                It is more than just a method; it is a profound shift in how
                things are made. We leverage additive manufacturing to bypass
                the limitations of traditional industry.
              </p>
            </motion.div>

            <div className="space-y-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-1.5 h-full w-[2px] bg-white/10">
                    <div className="h-1/3 w-full bg-warm-gold/50" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-light text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-400">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
