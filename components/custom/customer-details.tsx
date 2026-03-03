"use client";

import { motion } from "framer-motion";

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

interface CustomerDetailsProps {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
}

export function CustomerDetails({ data, onChange }: CustomerDetailsProps) {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-light text-white md:text-4xl">
            Your <span className="italic text-warm-gold">Details</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Let us know who we're creating this for and how to reach you with
            the quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2"
        >
          <div className="space-y-4 sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-400">
              Full Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/50 focus:bg-white/10"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-400">
              Email Address
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/50 focus:bg-white/10"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-400">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/50 focus:bg-white/10"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
