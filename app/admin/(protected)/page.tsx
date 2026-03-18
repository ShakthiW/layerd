"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { StatsCard } from "@/components/admin/stats-card";
import { Button } from "@/components/ui/button";

interface DashboardData {
  metrics: {
    products: number;
    pendingOrders: number;
    subscribers: number;
    totalOrders: number;
  };
  recentOrders: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending": return <Clock className="w-4 h-4 text-amber-500" />;
      case "quoted": return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "accepted":
      case "completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return <Clock className="w-4 h-4 text-zinc-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "quoted": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "accepted": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "completed": return "text-zinc-300 bg-zinc-800 border-zinc-700";
      case "rejected": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-zinc-400 bg-zinc-800 border-zinc-700";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Overview</h1>
        <p className="text-zinc-400 mt-2">Here's what's happening at Layerd today.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Active Products" 
          value={data.metrics.products} 
          icon={Package} 
          className="border-zinc-800"
        />
        <StatsCard 
          title="Pending Quotes" 
          value={data.metrics.pendingOrders} 
          icon={Clock} 
          trend={{ value: 12, isPositive: true }}
          className="border-zinc-800"
        />
        <StatsCard 
          title="Total Orders" 
          value={data.metrics.totalOrders} 
          icon={ShoppingCart} 
          trend={{ value: 8, isPositive: true }}
          className="border-zinc-800"
        />
        <StatsCard 
          title="Subscribers" 
          value={data.metrics.subscribers} 
          icon={Users} 
          trend={{ value: 3, isPositive: true }}
          className="border-zinc-800"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <div>
            <h2 className="text-lg font-medium text-white">Recent Quotation Requests</h2>
            <p className="text-sm text-zinc-400 mt-1">Latest custom orders awaiting review.</p>
          </div>
          <Button variant="outline" size="sm" asChild className="border-zinc-700 text-zinc-300 hover:text-white">
            <Link href="/admin/orders">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase tracking-wider bg-zinc-900 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {data.recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order._id}`} className="font-medium text-white hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-zinc-200">{order.customerDetails.name}</span>
                      <span className="text-xs text-zinc-500">{order.customerDetails.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[200px] truncate text-zinc-300" title={order.creationData.description}>
                      {order.creationData.description || "Custom File Print"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-zinc-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
              {data.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No recent quotation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
