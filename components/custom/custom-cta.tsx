"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Check, Shield, Clock, MessageCircle } from "lucide-react";

interface CustomCTAProps {
  onSubmit: () => void;
}

export function CustomCTA({ onSubmit }: CustomCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    setSubmitted(true);
    onSubmit();
    setTimeout(() => setSubmitted(false), 4000);
  };

  const assurances = [
    { icon: Shield, text: "No obligation — it's just a quote" },
    { icon: Clock, text: "We respond within 24 hours" },
    { icon: MessageCircle, text: "Direct chat with our design team" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Ready?
          </span>
          <span className="h-px w-8 bg-warm-gold/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-display text-3xl font-light text-white sm:text-4xl md:text-5xl"
        >
          Let&apos;s make it <span className="italic text-warm-gold">real</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-zinc-500"
        >
          Submit your request and our design team will review it, refine the
          details, and get back to you with a precise quote.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <button
            onClick={handleClick}
            disabled={submitted}
            className="group relative inline-flex items-center gap-3 rounded-full bg-warm-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-500 hover:bg-warm-gold-light hover:shadow-[0_0_40px_rgba(212,168,83,0.25)] disabled:opacity-70"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Request Sent!
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  Get Your Quote
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Assurances */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8"
        >
          {assurances.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-xs text-zinc-500"
            >
              <item.icon className="h-3.5 w-3.5 text-warm-gold/50" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
