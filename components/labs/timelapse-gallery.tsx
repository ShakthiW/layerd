"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Clock, Palette, Wrench } from "lucide-react";

const timelapses = [
  {
    title: "Desk Organizer Build",
    tag: "Print Timelapse",
    duration: "4h 22m",
    icon: Clock,
    gradient: "from-warm-gold/30 via-amber-900/20 to-zinc-950",
    accent: "bg-warm-gold/20 text-warm-gold",
  },
  {
    title: "Vase Design Process",
    tag: "Design Process",
    duration: "2h 15m",
    icon: Palette,
    gradient: "from-cyan-500/20 via-blue-900/15 to-zinc-950",
    accent: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "PETG Stress Test",
    tag: "Material Test",
    duration: "1h 30m",
    icon: Wrench,
    gradient: "from-emerald-500/20 via-green-900/15 to-zinc-950",
    accent: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "Anime Figure Print",
    tag: "Print Timelapse",
    duration: "8h 45m",
    icon: Clock,
    gradient: "from-purple-500/20 via-violet-900/15 to-zinc-950",
    accent: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Support Removal",
    tag: "Post Processing",
    duration: "0h 45m",
    icon: Wrench,
    gradient: "from-rose-500/20 via-red-900/15 to-zinc-950",
    accent: "bg-rose-500/20 text-rose-400",
  },
];

export function TimelapseGallery() {
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
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-warm-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
              Behind the Scenes
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            Behind the <span className="italic text-warm-gold">Print</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-base text-zinc-500"
          >
            Time-compressed glimpses into our printing, designing, and testing
            sessions. Hours of work, distilled into moments.
          </motion.p>
        </div>

        {/* Horizontal scroll gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="scrollbar-hide -mx-6 flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:-mx-12 md:px-12"
        >
          {timelapses.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.6 + i * 0.1,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="group relative w-72 shrink-0 snap-start cursor-pointer sm:w-80"
              >
                {/* Card */}
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/6 bg-zinc-950">
                  {/* Gradient thumbnail placeholder */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${item.gradient}`}
                  />

                  {/* Grid pattern on card */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-warm-gold/40 group-hover:bg-black/70">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-zinc-300 backdrop-blur-sm">
                    <Clock className="h-3 w-3" />
                    {item.duration}
                  </div>

                  {/* Tag badge */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm ${item.accent}`}
                    >
                      <Icon className="h-3 w-3" />
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Title below card */}
                <p className="mt-3 text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-zinc-700 md:hidden">
          <span>Swipe to explore</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
