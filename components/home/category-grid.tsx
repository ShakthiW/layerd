"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Monitor, Sparkles, Flag, Lamp, Flame, Gift } from "lucide-react";

const categories = [
  {
    title: "Desk & Organization",
    tagline: "Elevate Your Workspace",
    description:
      "Premium 3D printed accessories that transform your desk into a statement of style and efficiency.",
    href: "/category/desk-organization",
    icon: Monitor,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    borderColor: "hover:border-blue-500/30",
    accentColor: "text-blue-400",
    bgAccent: "group-hover:bg-blue-500/5",
  },
  {
    title: "Anime Inspired",
    tagline: "Your Fandom, Reimagined",
    description:
      "Bring your favorite characters to life with meticulously detailed anime-inspired 3D prints.",
    href: "/category/anime",
    icon: Sparkles,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderColor: "hover:border-purple-500/30",
    accentColor: "text-purple-400",
    bgAccent: "group-hover:bg-purple-500/5",
  },
  {
    title: "F1 Designs",
    tagline: "Speed Meets Precision",
    description:
      "Race-inspired collectibles and décor for the Formula 1 enthusiast. Feel the adrenaline.",
    href: "/category/f1",
    icon: Flag,
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    borderColor: "hover:border-red-500/30",
    accentColor: "text-red-400",
    bgAccent: "group-hover:bg-red-500/5",
  },
  {
    title: "Interior & Lifestyle",
    tagline: "Design Your Space",
    description:
      "Curated décor pieces that add a layer of sophistication to your living spaces.",
    href: "/category/interior-lifestyle",
    icon: Lamp,
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderColor: "hover:border-amber-500/30",
    accentColor: "text-amber-400",
    bgAccent: "group-hover:bg-amber-500/5",
  },
  {
    title: "Trending Now",
    tagline: "What's Hot Right Now",
    description:
      "Viral sensations and social media favorites — the prints everyone's talking about.",
    href: "/category/trending",
    icon: Flame,
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    borderColor: "hover:border-orange-500/30",
    accentColor: "text-orange-400",
    bgAccent: "group-hover:bg-orange-500/5",
  },
  {
    title: "Customizable Prints",
    tagline: "Made Just For You",
    description:
      "Personalized creations perfect for gifts, memorials, and souvenirs. Add your personal touch.",
    href: "/category/custom",
    icon: Gift,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "hover:border-emerald-500/30",
    accentColor: "text-emerald-400",
    bgAccent: "group-hover:bg-emerald-500/5",
  },
];

export function CategoryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-32 md:py-40"
    >
      {/* Background accents */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.04)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-warm-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
              Collections
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl"
          >
            Explore Our{" "}
            <span className="italic text-warm-gold">Collections</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-4 max-w-lg text-base text-zinc-500"
          >
            Six distinct worlds, each crafted with precision. Find the perfect
            piece that speaks to your style.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <Link href={cat.href} className="block">
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-8 transition-all duration-700 ${cat.borderColor} ${cat.bgAccent} hover:shadow-2xl`}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`mb-6 inline-flex rounded-xl border border-white/10 bg-white/3 p-3 ${cat.accentColor} transition-colors duration-500`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Category name */}
                      <h3 className="mb-1 text-xl font-semibold text-white">
                        {cat.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        className={`mb-3 font-display text-sm italic ${cat.accentColor} opacity-80`}
                      >
                        {cat.tagline}
                      </p>

                      {/* Description */}
                      <p className="mb-6 text-sm leading-relaxed text-zinc-500 transition-colors duration-500 group-hover:text-zinc-400">
                        {cat.description}
                      </p>

                      {/* Arrow link */}
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-600 transition-colors duration-500 group-hover:text-white">
                        <span>Explore</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
