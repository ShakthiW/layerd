"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function OurJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const timelineHeight = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["0%", "100%"],
  );

  const journeySteps = [
    {
      year: "The Spark",
      title: "Recognizing the Gap",
      description:
        "It started with a simple observation: the local market was flooded with generic, overpriced imports. Products that lacked soul or true craftsmanship were being sold at staggering markups.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
    },
    {
      year: "The Prototype",
      title: "A New Medium",
      description:
        "We turned to 3D printing not as a gimmick, but as a serious manufacturing tool. The goal was simple: design locally, print locally, and deliver unparalleled quality directly to the consumer.",
      image:
        "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      year: "Today",
      title: "Layerd",
      description:
        "Today, Layerd bridges technology and art. We create premium, tactile products that feel as good as they look. No international shipping fees, no unjustified markups, just pure design.",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl font-light text-white sm:text-4xl md:text-5xl"
          >
            How It <span className="text-warm-gold italic">Started</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400"
          >
            A journey born out of frustration with the ordinary and a relentless
            pursuit of the extraordinary.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Animated Timeline Line */}
          <div className="absolute left-[20px] top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div
              style={{ height: timelineHeight }}
              className="w-full bg-warm-gold/50"
            />
          </div>

          <div className="space-y-32">
            {journeySteps.map((step, index) => (
              <TimelineItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  step,
  index,
}: {
  step: { year: string; title: string; description: string; image: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative flex flex-col gap-8 md:flex-row md:gap-16 lg:gap-24"
    >
      {/* Timeline Dot (Desktop) */}
      <div className="absolute left-[20px] top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-warm-gold bg-black md:block" />

      {/* Content Side */}
      <div className="md:ml-12 md:w-1/2">
        <div className="mb-4 inline-block rounded-full border border-warm-gold/20 bg-warm-gold/5 px-4 py-1 text-sm font-medium tracking-wide text-warm-gold">
          {step.year}
        </div>
        <h3 className="mb-4 font-display text-2xl font-light text-white md:text-3xl">
          {step.title}
        </h3>
        <p className="leading-relaxed text-zinc-400">{step.description}</p>
      </div>

      {/* Image Side */}
      <div className="md:w-1/2">
        <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-white/5">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-warm-gold/30" />
        </div>
      </div>
    </motion.div>
  );
}
