"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-32 md:py-40"
    >
      {/* Divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.06)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Stay Connected
          </span>
          <span className="h-px w-8 bg-warm-gold/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-display text-4xl font-light text-white sm:text-5xl"
        >
          Join the <span className="italic text-warm-gold">Journey</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 text-base text-zinc-500"
        >
          Be the first to know about new drops, exclusive collections, and
          behind-the-scenes looks at our creative process.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <div className="relative w-full flex-1">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/3 px-6 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/30 focus:bg-white/5"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitted}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-warm-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-warm-gold-light hover:shadow-[0_0_30px_rgba(212,168,83,0.2)] disabled:opacity-70 sm:w-auto"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-xs text-zinc-700"
        >
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
