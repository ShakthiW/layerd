"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ShieldAlert, Trash2, Plus, Loader2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

export default function AdminUsersClient({ currentUserEmail }: { currentUserEmail: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New user form state
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/settings/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/settings/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create user");
      }

      setIsAdding(false);
      setFormData({ name: "", email: "", password: "", role: "admin" });
      await fetchUsers(); // Refresh list

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (email === currentUserEmail) {
      alert("You cannot delete your own account.");
      return;
    }
    
    if (!confirm(`Are you sure you want to delete the admin user ${email}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/settings/users?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            <UserCog className="w-8 h-8 text-zinc-400" />
            Admin Settings
          </h1>
          <p className="text-zinc-400 mt-1">Manage portal access and administrator accounts.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="bg-white text-zinc-900 hover:bg-zinc-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Add User Form */}
      {isAdding && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <h2 className="text-lg font-medium text-white mb-4">Create New Administrator</h2>
          
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Full Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Temporary Password</label>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">System Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 outline-none"
                >
                  <option value="admin">Editor (Admin)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-2 border-t border-zinc-800/50 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-zinc-400 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50">
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Account
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-400 uppercase tracking-wider bg-zinc-950/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Administrator</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Last Login</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-xs text-zinc-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        user.role === 'super_admin' 
                          ? 'border-purple-500/20 bg-purple-500/10 text-purple-400'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-300'
                      }`}>
                        {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {user.lastLogin 
                        ? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.email !== currentUserEmail && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user._id, user.email)}
                          className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                      {user.email === currentUserEmail && (
                        <span className="text-xs text-zinc-600 px-2 py-1 italic bg-zinc-950 rounded">Current Session</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
