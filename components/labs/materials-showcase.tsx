"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Shield, Sparkles } from "lucide-react";

const materials = [
  {
    name: "PLA",
    fullName: "Polylactic Acid",
    icon: Leaf,
    description:
      "Our go-to for display pieces and decorative objects. PLA is plant-based, eco-friendly, and delivers a smooth, matte finish that photographs beautifully.",
    properties: [
      "Biodegradable",
      "Smooth Finish",
      "Vibrant Colors",
      "Low Warp",
      "Odorless",
    ],
    accentColor: "text-emerald-400",
    borderAccent: "hover:border-emerald-500/30",
    bgAccent: "group-hover:bg-emerald-500/5",
    gradient: "from-emerald-500/15 via-green-500/8 to-transparent",
    barColor: "bg-emerald-500/50",
    stats: { strength: 65, detail: 90, eco: 95 },
  },
  {
    name: "PETG",
    fullName: "Polyethylene Terephthalate Glycol",
    icon: Shield,
    description:
      "When durability matters. PETG is our choice for functional prints — it's impact-resistant, heat-tolerant, and has a subtle glossy finish that exudes quality.",
    properties: [
      "Impact Resistant",
      "Heat Tolerant",
      "Glossy Finish",
      "Food Safe",
      "UV Resistant",
    ],
    accentColor: "text-blue-400",
    borderAccent: "hover:border-blue-500/30",
    bgAccent: "group-hover:bg-blue-500/5",
    gradient: "from-blue-500/15 via-cyan-500/8 to-transparent",
    barColor: "bg-blue-500/50",
    stats: { strength: 90, detail: 75, eco: 70 },
  },
  {
    name: "Specialty",
    fullName: "Premium Filament Blends",
    icon: Sparkles,
    description:
      "For objects that demand the extraordinary. Silk finishes, wood-fill textures, carbon fiber strength, glow-in-the-dark magic — these filaments push the boundary of what 3D printing can be.",
    properties: [
      "Silk Finish",
      "Wood Fill",
      "Carbon Fiber",
      "Glow in Dark",
      "Marble Effect",
    ],
    accentColor: "text-amber-400",
    borderAccent: "hover:border-amber-500/30",
    bgAccent: "group-hover:bg-amber-500/5",
    gradient: "from-amber-500/15 via-yellow-500/8 to-transparent",
    barColor: "bg-amber-500/50",
    stats: { strength: 80, detail: 85, eco: 60 },
  },
];

export function MaterialsShowcase() {
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
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

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
              Our Raw Ingredients
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            The <span className="italic text-warm-gold">Materials</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-base text-zinc-500"
          >
            Every filament is selected for a purpose. The right material can
            transform a good design into an exceptional object.
          </motion.p>
        </div>

        {/* Material cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {materials.map((mat, i) => {
            const Icon = mat.icon;
            return (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.15,
                  duration: 0.7,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`group relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-8 transition-all duration-700 ${mat.borderAccent} ${mat.bgAccent} hover:shadow-2xl`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${mat.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon + name */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`inline-flex rounded-xl border border-white/10 bg-white/3 p-3 ${mat.accentColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {mat.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                        {mat.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
                    {mat.description}
                  </p>

                  {/* Stat bars */}
                  <div className="mb-6 space-y-3">
                    {(
                      [
                        ["Strength", mat.stats.strength],
                        ["Detail", mat.stats.detail],
                        ["Eco Score", mat.stats.eco],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider">
                          <span className="text-zinc-600">{label}</span>
                          <span className="text-zinc-500">{value}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                          <motion.div
                            className={`h-full rounded-full ${mat.barColor}`}
                            initial={{ scaleX: 0 }}
                            animate={
                              isInView ? { scaleX: value / 100 } : { scaleX: 0 }
                            }
                            transition={{
                              delay: 0.8 + i * 0.15,
                              duration: 1,
                              ease: [0.215, 0.61, 0.355, 1],
                            }}
                            style={{ transformOrigin: "left" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Property tags */}
                  <div className="flex flex-wrap gap-2">
                    {mat.properties.map((prop) => (
                      <span
                        key={prop}
                        className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400"
                      >
                        {prop}
                      </span>
                    ))}
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
