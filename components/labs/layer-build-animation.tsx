"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

export function LayerBuildAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll to a 0-1 progress value for the video
  // Start at ~90% of viewport (section just entering), finish at ~10-15% from top
  const videoProgress = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);

  // Scrub video currentTime based on scroll
  useMotionValueEvent(videoProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;
    // Clamp to valid range
    const clamped = Math.max(0, Math.min(1, latest));
    video.currentTime = clamped * video.duration;
  });

  // Ensure video is ready for scrubbing
  const handleVideoLoad = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-black py-32 md:py-48"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.03)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-warm-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
              The Build Process
            </span>
            <span className="h-px w-8 bg-warm-gold/50" />
          </div>

          <h2 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Built <span className="italic text-warm-gold">Layer</span> by{" "}
            <span className="italic text-warm-gold">Layer</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-500">
            Watch how an object comes to life — each layer fusing into the next,
            building something extraordinary from nothing.
          </p>
        </div>

        {/* Video + details */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          {/* Scroll-driven video */}
          <div className="relative w-full max-w-xl flex-1">
            {/* Ambient glow behind video */}
            <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_70%)] blur-xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-zinc-950 shadow-2xl">
              <video
                ref={videoRef}
                src="/videos/3d-print-timelapse.mp4"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={handleVideoLoad}
                className="aspect-video w-full object-cover"
              />

              {/* Overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-zinc-950/80 to-transparent" />

              {/* "Scroll to play" hint */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 backdrop-blur-sm"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="h-3 w-3 rounded-full border border-warm-gold/50"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="m-auto mt-0.5 h-1 w-1 rounded-full bg-warm-gold/80" />
                </motion.div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Scroll to build
                </span>
              </motion.div>
            </div>
          </div>

          {/* Progress info */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            {/* Progress bar */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-600">
                Build Progress
              </p>
              <div className="w-48 mx-auto md:mx-0">
                <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    className="h-full rounded-full bg-warm-gold/60"
                    style={{ scaleX: videoProgress, transformOrigin: "left" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-zinc-700">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
              </div>
            </div>

            {/* Detail points */}
            <div className="space-y-3 mt-2">
              {[
                { label: "Layer Height", value: "0.2mm" },
                { label: "Infill Pattern", value: "Gyroid" },
                { label: "Nozzle Temp", value: "210°C" },
                { label: "Print Speed", value: "60mm/s" },
              ].map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center justify-center gap-3 text-sm md:justify-start"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-warm-gold/40" />
                  <span className="text-zinc-600">{detail.label}</span>
                  <span className="text-zinc-400">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
