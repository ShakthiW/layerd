"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Layers, Truck } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Design",
    subtitle: "From Concept to Blueprint",
    description:
      "Every creation begins with an idea. Our designers craft each product with precision, ensuring every detail is intentional — from aesthetics to functionality.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Print",
    subtitle: "Layer by Layer Perfection",
    description:
      "Using state-of-the-art 3D printers and premium materials, we bring designs to life one layer at a time. Each print undergoes rigorous quality checks.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Deliver",
    subtitle: "To Your Doorstep",
    description:
      "Carefully packaged and delivered across Sri Lanka. Every product arrives ready to elevate your space — unbox, place, and enjoy.",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-32 md:py-40"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-warm-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
              How We Create
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            The <span className="italic text-warm-gold">Process</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-linear-to-b from-warm-gold/20 via-warm-gold/10 to-transparent md:left-1/2 md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.25,
                    duration: 0.7,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`relative flex flex-col items-start gap-8 md:flex-row md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content side */}
                  <div
                    className={`flex-1 ${
                      isEven
                        ? "md:text-right md:pr-16"
                        : "md:text-left md:pl-16"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-display text-4xl font-light text-warm-gold/20">
                        {step.step}
                      </span>
                      <span className="h-px w-8 bg-warm-gold/20" />
                    </div>
                    <h3 className="mb-1 text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mb-3 font-display text-sm italic text-warm-gold/60">
                      {step.subtitle}
                    </p>
                    <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-warm-gold/20 bg-zinc-950">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-gold/5">
                      <Icon className="h-5 w-5 text-warm-gold" />
                    </div>
                  </div>

                  {/* Empty side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
