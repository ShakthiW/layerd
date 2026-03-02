"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import {
  calculatePrice,
  PRICING_CONFIG,
  MATERIAL_MULTIPLIERS,
  FINISH_SURCHARGES,
  type PriceInput,
} from "@/lib/pricing-config";

interface PricingCalculatorProps {
  weightGrams: number;
  printTimeHours: number;
  material: string;
  finish: string;
  quantity: number;
  onWeightChange: (v: number) => void;
  onPrintTimeChange: (v: number) => void;
}

export function PricingCalculator({
  weightGrams,
  printTimeHours,
  material,
  finish,
  quantity,
  onWeightChange,
  onPrintTimeChange,
}: PricingCalculatorProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const breakdown = useMemo(
    () =>
      calculatePrice({
        weightGrams,
        printTimeHours,
        material,
        finish,
        quantity,
      }),
    [weightGrams, printTimeHours, material, finish, quantity],
  );

  const lineItems = [
    {
      label: `Material (${material})`,
      value: breakdown.materialCost,
      accent: false,
    },
    { label: "Machine time", value: breakdown.machineTimeCost, accent: false },
    { label: "Electricity", value: breakdown.electricityCost, accent: false },
    {
      label: `Labor + ${finish !== "Standard" ? finish + " finish" : "Finish"}`,
      value: breakdown.laborCost,
      accent: false,
    },
    {
      label: `Failure buffer (${(PRICING_CONFIG.failureMargin * 100).toFixed(0)}%)`,
      value: breakdown.failureBuffer,
      accent: false,
    },
    {
      label: `Margin (${(PRICING_CONFIG.profitMargin * 100).toFixed(0)}%)`,
      value: breakdown.profitAmount,
      accent: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,168,83,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Step 2
          </span>
          <span className="h-px w-8 bg-warm-gold/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 text-center font-display text-3xl font-light text-white sm:text-4xl"
        >
          Estimate Your <span className="italic text-warm-gold">Price</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-14 max-w-lg text-center text-sm text-zinc-500"
        >
          Adjust the sliders to get an instant estimate. Final pricing is
          confirmed after we review your design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Left — sliders */}
          <div className="space-y-8 rounded-2xl border border-white/8 bg-white/2 p-6 md:p-8">
            {/* Weight slider */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-zinc-500">
                  Estimated Weight
                </label>
                <span className="rounded-lg bg-white/5 px-3 py-1 text-sm font-medium tabular-nums text-warm-gold">
                  {weightGrams}g
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={2000}
                step={10}
                value={weightGrams}
                onChange={(e) => onWeightChange(Number(e.target.value))}
                className="custom-range-slider w-full"
              />
              <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
                <span>10g</span>
                <span>2,000g</span>
              </div>
            </div>

            {/* Print time slider */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-zinc-500">
                  Estimated Print Time
                </label>
                <span className="rounded-lg bg-white/5 px-3 py-1 text-sm font-medium tabular-nums text-warm-gold">
                  {printTimeHours}h
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={48}
                step={0.5}
                value={printTimeHours}
                onChange={(e) => onPrintTimeChange(Number(e.target.value))}
                className="custom-range-slider w-full"
              />
              <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
                <span>0.5h</span>
                <span>48h</span>
              </div>
            </div>

            {/* Current config display */}
            <div className="rounded-xl border border-white/5 bg-white/2 px-4 py-3">
              <p className="mb-1 text-[10px] uppercase tracking-wider text-zinc-600">
                Current Config
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
                <span>
                  Material:{" "}
                  <strong className="text-zinc-400">{material}</strong>
                </span>
                <span>
                  Finish: <strong className="text-zinc-400">{finish}</strong>
                </span>
                <span>
                  Qty: <strong className="text-zinc-400">×{quantity}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right — price breakdown */}
          <div className="flex flex-col rounded-2xl border border-warm-gold/15 bg-warm-gold/3 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-warm-gold/70" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Price Breakdown
              </h3>
            </div>

            <div className="flex-1 space-y-3">
              {lineItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-zinc-500">{item.label}</span>
                  <span className="text-sm tabular-nums text-zinc-300">
                    LKR {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-warm-gold/20" />

            {/* Unit price */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Unit price
              </span>
              <span className="text-base font-semibold tabular-nums text-white">
                LKR {breakdown.unitPrice.toLocaleString()}
              </span>
            </div>

            {/* Total */}
            {quantity > 1 && (
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">
                  × {quantity} units
                </span>
              </div>
            )}

            <div className="flex items-end justify-between rounded-xl bg-warm-gold/8 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-warm-gold/60">
                  Estimated Total
                </p>
                <p className="mt-1 font-display text-3xl font-light text-warm-gold">
                  LKR {breakdown.totalPrice.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-warm-gold/40" />
            </div>

            <p className="mt-3 text-center text-[10px] text-zinc-600">
              * Estimate only — final price confirmed after design review
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
