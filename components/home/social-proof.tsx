"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Package, Users, Heart } from "lucide-react";

const stats = [
  { icon: Package, value: "1,200+", label: "Prints Delivered" },
  { icon: Users, value: "500+", label: "Happy Customers" },
  { icon: Star, value: "4.9", label: "Avg. Rating" },
  { icon: Heart, value: "50+", label: "Unique Designs" },
];

const testimonials = [
  {
    text: "The quality is unreal. My anime figure looks like it was injection molded, not 3D printed. Absolutely premium.",
    name: "Kavith R.",
    location: "Colombo",
    rating: 5,
  },
  {
    text: "I got a custom desk organizer for my setup and it's perfect. Clean lines, solid build, and it arrived so fast!",
    name: "Dinusha P.",
    location: "Kandy",
    rating: 5,
  },
  {
    text: "The F1 helmet stand is incredible — got one as a gift for my friend and he couldn't believe the detail. 10/10.",
    name: "Tharusha M.",
    location: "Galle",
    rating: 5,
  },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-32 md:py-40"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-6xl px-6 md:px-12">
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
              Community
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            Loved by <span className="italic text-warm-gold">Many</span>
          </motion.h2>
        </div>

        {/* Stats row */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/6 bg-white/2">
                  <Icon className="h-5 w-5 text-warm-gold/70" />
                </div>
                <div className="font-display text-3xl font-light text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-600">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.6 + i * 0.15,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group rounded-2xl border border-white/6 bg-white/2 p-6 transition-all duration-500 hover:border-warm-gold/15 hover:bg-white/3"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="h-3.5 w-3.5 fill-warm-gold text-warm-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-sm leading-relaxed text-zinc-400 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-warm-gold/20 to-warm-amber/10 text-sm font-semibold text-warm-gold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-zinc-600">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
