"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function OurTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  const specs = [
    { label: "Precision", value: "Sub-millimeter Tolerance" },
    { label: "Speed", value: "500mm/s CoreXY Engine" },
    { label: "Material", value: "Multi-Filament Capability" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-zinc-950 py-32 md:py-48 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 font-display text-4xl font-light text-white md:text-5xl lg:text-5xl">
                Powered by the <br />
                <span className="text-white font-medium">Bambu Lab P2S</span>
              </h2>
              <p className="mb-12 text-lg leading-relaxed text-zinc-400">
                True premium quality requires state-of-the-art tools. We rely on
                the Bambu Lab P2S, a high-speed, high-precision instrument that
                pushes the boundaries of additive manufacturing. It allows us to
                achieve injection-mold-like quality, ensuring every piece meets
                our exacting standards.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-warm-gold/70">
                    {spec.label}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="order-1 lg:order-2 relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-black border border-white/5">
            <motion.div
              style={{ scale }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="https://3d.nice-cdn.com/upload/image/product/large/default/bambu-lab-p2s-combo-1168147-en.png"
                alt="High-tech 3D Printer"
                fill
                className="object-cover opacity-60"
              />
              {/* Synthetic Tech Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,rgba(212,168,83,0.1)_50%,transparent_51%,transparent_100%)] bg-size-[100%_4px] mix-blend-screen opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-tr from-zinc-950/80 to-transparent" />
            </motion.div>

            {/* Glowing Accent */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warm-gold/20 blur-[100px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
