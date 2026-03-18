"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingConfig {
  materialCostPerKg: number;
  hourlyRate: number;
  electricityRate: number;
  laborCost: number;
  failureMargin: number;
  profitMargin: number;
  materialMultipliers: Record<string, number>;
  finishSurcharges: Record<string, number>;
  materials: { id: string; label: string; description: string }[];
  finishes: { id: string; label: string; description: string }[];
}

export default function AdminPricingPage() {
  const [config, setConfig] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch("/api/admin/pricing");
        if (res.ok) {
          const json = await res.json();
          setConfig(json);
        }
      } catch (err) {
        console.error("Failed to load pricing config:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPricing();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Failed to save pricing configuration.");
      // alert("Pricing configuration saved successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!config) return;
    setConfig({ ...config, [field]: Number(e.target.value) });
  };

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-xl">
        Failed to load pricing configuration. Check database seeding.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Pricing Configuration</h1>
        <p className="text-zinc-400 mt-1">Adjust the parameters used by the custom quotation calculator.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Base Rates */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Base Rates & Margins</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Material Cost / kg (LKR)</label>
              <input
                type="number"
                value={config.materialCostPerKg}
                onChange={(e) => handleChange(e, "materialCostPerKg")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Hourly Rate (LKR/hr)</label>
              <input
                type="number"
                value={config.hourlyRate}
                onChange={(e) => handleChange(e, "hourlyRate")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Electricity Rate (LKR/hr)</label>
              <input
                type="number"
                value={config.electricityRate}
                onChange={(e) => handleChange(e, "electricityRate")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Labor Setup Cost (LKR)</label>
              <input
                type="number"
                value={config.laborCost}
                onChange={(e) => handleChange(e, "laborCost")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Failure Margin (%)</label>
              <input
                type="number"
                step="0.01"
                value={config.failureMargin}
                onChange={(e) => handleChange(e, "failureMargin")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400 bg-zinc-900 px-1 absolute -mt-2 ml-2">Profit Margin (%)</label>
              <input
                type="number"
                step="0.01"
                value={config.profitMargin}
                onChange={(e) => handleChange(e, "profitMargin")}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 mt-2"
              />
            </div>
          </div>
        </div>

        {/* Multipliers & Surcharges (simplified view for brevity) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Material Multipliers</h2>
            <p className="text-xs text-zinc-500 mb-4">Values &gt; 1 increase cost relative to base PLA.</p>
            
            {Object.entries(config.materialMultipliers).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="text-sm font-mono text-zinc-300">{key}</span>
                <input
                  type="number"
                  step="0.1"
                  value={val}
                  onChange={(e) => {
                    setConfig(prev => prev ? {
                      ...prev,
                      materialMultipliers: { ...prev.materialMultipliers, [key]: Number(e.target.value) }
                    } : null)
                  }}
                  className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-right focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Finish Surcharges (LKR)</h2>
            <p className="text-xs text-zinc-500 mb-4">Flat additions to the final price for post-processing.</p>
            
            {Object.entries(config.finishSurcharges).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="text-sm font-mono text-zinc-300">{key}</span>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => {
                    setConfig(prev => prev ? {
                      ...prev,
                      finishSurcharges: { ...prev.finishSurcharges, [key]: Number(e.target.value) }
                    } : null)
                  }}
                  className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-right focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 bg-zinc-950/80 sticky bottom-6 py-4 px-6 border border-zinc-800 rounded-xl backdrop-blur-md">
          <Button type="submit" disabled={saving} className="bg-white text-zinc-900 hover:bg-zinc-200 min-w-[200px]">
            {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Pricing Rules
          </Button>
        </div>

      </form>
    </div>
  );
}
