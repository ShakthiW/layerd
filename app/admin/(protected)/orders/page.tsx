"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { Search, Eye, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  orderNumber: string;
  customerDetails: { name: string; email: string };
  creationData: { description: string };
  status: string;
  createdAt: string;
  quotedPrice: number | null;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const url = statusFilter === "all" 
          ? "/api/admin/orders?limit=100" 
          : `/api/admin/orders?limit=100&status=${statusFilter}`;
          
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setOrders(json.items || []);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    fetchOrders();
  }, [statusFilter]);

  const filteredOrders = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerDetails.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "quoted": return <AlertCircle className="w-4 h-4" />;
      case "accepted":
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Quotation Requests</h1>
          <p className="text-zinc-400 mt-1">Manage and respond to custom 3D printing orders.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by order number, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-zinc-400 uppercase tracking-wider bg-zinc-950/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Order info</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{order.orderNumber}</div>
                      <div className="text-xs text-zinc-500" title={format(new Date(order.createdAt), "PPp")}>
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-200">{order.customerDetails.name}</div>
                      <div className="text-xs text-zinc-500">{order.customerDetails.email}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      <div className="max-w-[200px] truncate" title={order.creationData.description}>
                        {order.creationData.description || "Custom Print"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">
                      {order.quotedPrice ? `LKR ${order.quotedPrice.toLocaleString()}` : <span className="text-zinc-600">Pending</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" asChild className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Link href={`/admin/orders/${order._id}`}>
                          Review <Eye className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
