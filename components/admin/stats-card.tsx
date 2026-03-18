import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group", className)}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-zinc-400 font-medium tracking-wide text-sm">{title}</h3>
        <div className="p-2 bg-zinc-800/50 rounded-lg text-zinc-300">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-end gap-3 relative z-10">
        <span className="text-3xl font-semibold tracking-tight text-white">{value}</span>
        
        {trend && (
          <span 
            className={cn(
              "text-sm font-medium mb-1",
              trend.isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {/* Decorative gradient blur in background */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 blur-3xl rounded-full transition-opacity group-hover:bg-white/10" />
    </div>
  );
}
