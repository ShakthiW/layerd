"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Tags, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DbCategory } from "@/lib/db-helpers";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add state
  const [isAdding, setIsAdding] = useState(false);
  const [savingAdd, setSavingAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", order: 0 });
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{name: string, slug: string, order: number}>({ name: "", slug: "", order: 0});
  const [savingEdit, setSavingEdit] = useState(false);

  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSlugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAdd(true);
    setError("");

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCat),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create category");
      }

      setIsAdding(false);
      setNewCat({ name: "", slug: "", order: categories.length });
      await fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingAdd(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setSavingEdit(true);
    setError("");

    try {
      const res = await fetch("/api/admin/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: editingId, ...editValues }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update category");
      }

      setEditingId(null);
      await fetchCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"? This could briefly affect products that rely on it.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter(c => c._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete category");
      }
    } catch (err) {
      alert("An error occurred while deleting the category.");
    }
  };

  const toggleActive = async (cat: DbCategory) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: cat._id, isActive: !cat.isActive }),
      });

      if (res.ok) {
        await fetchCategories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            <Tags className="w-8 h-8 text-warm-gold" />
            Product Categories
          </h1>
          <p className="text-zinc-400 mt-1">Manage taxonomy and explore filters for your store catalog.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="bg-white text-zinc-900 hover:bg-zinc-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-warm-gold" />
          <h2 className="text-lg font-medium text-white mb-4">Create New Category</h2>
          
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Category Name</label>
                <input
                  required
                  value={newCat.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewCat(p => ({ ...p, name, slug: handleSlugify(name) }));
                  }}
                  placeholder="e.g. Neon Collection"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">URL Slug</label>
                <input
                  required
                  value={newCat.slug}
                  onChange={(e) => setNewCat(p => ({ ...p, slug: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Sort Order</label>
                <input
                  type="number"
                  value={newCat.order}
                  onChange={(e) => setNewCat(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-2 border-t border-zinc-800/50 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-zinc-400 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={savingAdd} className="bg-warm-gold text-black hover:bg-warm-gold/90">
                {savingAdd && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Category
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              No categories found. Create your first category to populate the Explore page.
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-400 uppercase tracking-wider bg-zinc-950/50 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium w-16">Ord</th>
                  <th className="px-6 py-4 font-medium">Name & Slug</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {categories.map((cat) => {
                  const isEditing = editingId === cat._id;

                  if (isEditing) {
                    return (
                      <tr key={cat._id} className="bg-zinc-800/20">
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editValues.order}
                            onChange={(e) => setEditValues(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                            className="w-16 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-white text-sm focus:outline-none"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <input
                              value={editValues.name}
                              onChange={(e) => {
                                const name = e.target.value;
                                setEditValues(p => ({ ...p, name, slug: handleSlugify(name) }));
                              }}
                              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-1.5 text-white text-sm font-medium focus:outline-none"
                            />
                            <input
                              value={editValues.slug}
                              onChange={(e) => setEditValues(p => ({ ...p, slug: e.target.value }))}
                              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-1.5 text-zinc-400 font-mono text-xs focus:outline-none"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs text-zinc-500 italic">Editing...</span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <Button size="sm" onClick={handleSaveEdit} disabled={savingEdit} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                            {savingEdit ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-zinc-400">
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={cat._id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 text-zinc-400">{cat.order}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{cat.name}</div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">{cat.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleActive(cat)}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border transition-colors ${
                            cat.isActive 
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                        >
                          {cat.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingId(cat._id!);
                            setEditValues({ name: cat.name, slug: cat.slug, order: cat.order });
                          }}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(cat._id!, cat.name)}
                          className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
