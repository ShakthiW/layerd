"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Check, Download, AlertCircle, Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetail {
  _id: string;
  orderNumber: string;
  customerDetails: { name: string; email: string; phone: string };
  creationData: {
    method: string;
    description: string;
    dimensions: string;
    notes: string;
    material: string;
    finish: string;
    quantity: number;
    fileAttached: boolean;
    imageAttached: boolean;
  };
  pricingData: { weightGrams?: number; printTimeHours?: number };
  fileUrl: string | null;
  status: string;
  adminNotes: string;
  quotedPrice: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  // Edit states
  const [status, setStatus] = useState("");
  const [quotedPrice, setQuotedPrice] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { id } = await params;
        const res = await fetch(`/api/admin/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          setStatus(data.status);
          setQuotedPrice(data.quotedPrice ? data.quotedPrice.toString() : "");
          setAdminNotes(data.adminNotes || "");
        } else {
          setError("Order not found or access denied.");
        }
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [params]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    setSaving(true);
    setError("");

    try {
      const { id } = await params;
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          quotedPrice: quotedPrice ? Number(quotedPrice) : null,
          adminNotes,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order");
      }

      // Refresh data
      const updatedRes = await fetch(`/api/admin/orders/${id}`);
      const data = await updatedRes.json();
      setOrder(data);
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center p-20">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
    </div>
  );

  if (error || !order) return (
    <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-xl">
      {error || "Order not found."}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
            <Link href="/admin/orders">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
              Order {order.orderNumber}
              <span className={`text-xs px-2.5 py-1 rounded-full border ${
                order.status === 'completed' ? 'border-zinc-700 bg-zinc-800 text-zinc-300' :
                order.status === 'quoted' ? 'border-blue-500/20 bg-blue-500/10 text-blue-500' :
                order.status === 'accepted' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' :
                order.status === 'rejected' ? 'border-red-500/20 bg-red-500/10 text-red-500' :
                'border-amber-500/20 bg-amber-500/10 text-amber-500'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Requested on {format(new Date(order.createdAt), "PPP 'at' p")}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Details */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h2 className="font-medium text-white">Customer Information</h2>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500 mb-1">Name</p>
                <p className="text-zinc-200 font-medium">{order.customerDetails.name}</p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Email</p>
                <a href={`mailto:${order.customerDetails.email}`} className="text-blue-400 hover:underline">
                  {order.customerDetails.email}
                </a>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Phone</p>
                <a href={`tel:${order.customerDetails.phone}`} className="text-zinc-200 hover:underline">
                  {order.customerDetails.phone || "Not provided"}
                </a>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
              <h2 className="font-medium text-white">Quotation Request Details</h2>
              <span className="text-xs text-zinc-500 px-2 py-1 rounded bg-zinc-800/50 border border-zinc-700">
                Method: {order.creationData.method}
              </span>
            </div>
            <div className="p-6 space-y-6">
              
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Description / Requirement</p>
                <p className="text-zinc-200 whitespace-pre-wrap rounded-lg bg-zinc-950 p-4 border border-zinc-800 leading-relaxed">
                  {order.creationData.description || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                  <p className="text-zinc-500 text-xs mb-1">Quantity</p>
                  <p className="text-zinc-200 font-medium">{order.creationData.quantity} units</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                  <p className="text-zinc-500 text-xs mb-1">Material Preference</p>
                  <p className="text-zinc-200 font-medium">{order.creationData.material || "Any"}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                  <p className="text-zinc-500 text-xs mb-1">Finish Preference</p>
                  <p className="text-zinc-200 font-medium">{order.creationData.finish || "Standard"}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                  <p className="text-zinc-500 text-xs mb-1">Dimensions</p>
                  <p className="text-zinc-200 font-medium">{order.creationData.dimensions || "Not specified"}</p>
                </div>
              </div>

              {order.creationData.notes && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Additional Notes</p>
                  <p className="text-zinc-300 text-sm border-l-2 border-zinc-700 pl-3 italic">
                    {order.creationData.notes}
                  </p>
                </div>
              )}

              {/* Attachments */}
              {(order.creationData.fileAttached || order.creationData.imageAttached) && (
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Attachments</p>
                  {order.fileUrl ? (
                    <Button variant="outline" asChild className="bg-zinc-950 border-zinc-700 hover:bg-zinc-800 hover:text-white">
                      <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Provided File
                      </a>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 p-3 rounded-lg text-sm border border-amber-500/20">
                      <AlertCircle className="w-4 h-4" />
                      <p>User indicated attachments but file URL was not captured.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Actions */}
        <div className="space-y-6">
          <form onSubmit={handleUpdate} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden sticky top-6">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h2 className="font-medium text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-zinc-400" />
                Review & Quote
              </h2>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-medium">Order Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 outline-none"
                >
                  <option value="pending">Pending Review</option>
                  <option value="reviewed">Reviewed (Estimating)</option>
                  <option value="quoted">Send Quote via Email</option>
                  <option value="accepted">Quote Accepted by Customer</option>
                  <option value="completed">Completed & Shipped</option>
                  <option value="rejected">Rejected / Cancelled</option>
                </select>
                {status === "quoted" && order.status !== "quoted" && (
                  <p className="text-xs text-blue-400 flex items-center gap-1 mt-2 bg-blue-500/10 p-2 rounded border border-blue-500/20">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    Saving this will send the quoted price and notes directly to the customer's email.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-medium">Quoted Price (LKR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">Rs.</span>
                  <input
                    type="number"
                    value={quotedPrice}
                    onChange={(e) => setQuotedPrice(e.target.value)}
                    placeholder="2500"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-medium">Message to Customer / Internal Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Notes added here will be sent to the customer if you select 'Send Quote'"
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 outline-none resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={saving || (status === "quoted" && !quotedPrice)}
                className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Updates
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
