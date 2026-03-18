"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Mail, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await fetch("/api/admin/subscribers?limit=500");
        if (res.ok) {
          const json = await res.json();
          setSubscribers(json.items || []);
        }
      } catch (err) {
        console.error("Failed to load subscribers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, []);

  const filteredSubs = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Email", "Subscribed At", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredSubs.map((s) =>
        [s.email, new Date(s.subscribedAt).toISOString(), s.isActive ? "Active" : "Unsubscribed"].join(",")
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `layerd_subscribers_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Subscribers</h1>
          <p className="text-zinc-400 mt-1">Manage your newsletter audience and marketing contacts.</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>
      </div>

      {/* Table */}
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
                  <th className="px-6 py-4 font-medium">Email Address</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Subscribed Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredSubs.map((sub) => (
                  <tr key={sub._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-white">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sub.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-zinc-700 bg-zinc-800 text-zinc-400">
                          Unsubscribed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400" title={format(new Date(sub.subscribedAt), "PPp")}>
                      {formatDistanceToNow(new Date(sub.subscribedAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={`mailto:${sub.email}`}
                        className="text-zinc-400 hover:text-white transition-colors p-2"
                        title="Draft Email"
                      >
                        <Mail className="w-4 h-4 inline-block" />
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredSubs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                      No subscribers found matching your search.
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
