"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, FlaskConical, PenTool, Settings2 } from "lucide-react";

const experiments = [
  {
    icon: PenTool,
    title: "Design Engineering",
    tagline: "From Sketch to CAD",
    description:
      "Parametric modeling, organic sculpting, and precision engineering — every object starts as a digital blueprint refined through countless iterations.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderColor: "hover:border-cyan-500/30",
    accentColor: "text-cyan-400",
    bgAccent: "group-hover:bg-cyan-500/5",
  },
  {
    icon: Cpu,
    title: "Prototyping",
    tagline: "Rapid Iteration",
    description:
      "Fast-fail, learn fast. We print rough prototypes within hours — testing form, fit, and feel before committing to a final design.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    borderColor: "hover:border-violet-500/30",
    accentColor: "text-violet-400",
    bgAccent: "group-hover:bg-violet-500/5",
  },
  {
    icon: FlaskConical,
    title: "Material Testing",
    tagline: "Stress & Performance",
    description:
      "Every filament is stress-tested for durability, heat resistance, surface finish, and visual quality before it enters production.",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    borderColor: "hover:border-emerald-500/30",
    accentColor: "text-emerald-400",
    bgAccent: "group-hover:bg-emerald-500/5",
  },
  {
    icon: Settings2,
    title: "Print Optimization",
    tagline: "Dialing In Perfection",
    description:
      "Layer height, print speed, temperature curves, support strategies — we obsess over settings so every print comes out flawless.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderColor: "hover:border-amber-500/30",
    accentColor: "text-amber-400",
    bgAccent: "group-hover:bg-amber-500/5",
  },
];

export function ExperimentTypes() {
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
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

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
              What We Explore
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            The <span className="italic text-warm-gold">Experiments</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-base text-zinc-500"
          >
            Every product passes through four pillars of exploration before it
            earns the Layerd name.
          </motion.p>
        </div>

        {/* Card grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {experiments.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-8 transition-all duration-700 ${exp.borderColor} ${exp.bgAccent} hover:shadow-2xl`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${exp.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`mb-6 inline-flex rounded-xl border border-white/10 bg-white/3 p-3 ${exp.accentColor} transition-colors duration-500`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 text-xl font-semibold text-white">
                      {exp.title}
                    </h3>

                    {/* Tagline */}
                    <p
                      className={`mb-3 font-display text-sm italic ${exp.accentColor} opacity-80`}
                    >
                      {exp.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
