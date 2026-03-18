"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AdminProductFormProps {
  slug?: string; // If provided, it's edit mode
}

export function AdminProductForm({ slug }: AdminProductFormProps) {
  const isEdit = !!slug;
  const router = useRouter();
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    category: "desk-accessories",
    price: 0,
    gradient: "from-zinc-500 to-zinc-800",
    isActive: true,
    story: {
      headline: "",
      paragraphs: [""],
      designInspo: "",
      printJourney: "",
    },
    specs: {
      dimensions: "",
      weight: "",
      material: "PLA",
      printTime: "",
      layerCount: "",
      finish: "Matte",
    },
    lifestyleContexts: [""],
    relatedSlugs: [],
    reviewList: [],
    rating: 5.0,
    reviews: 0,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/admin/products/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Product not found") {
            setError("Product not found");
          } else {
            setFormData(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load product");
          setLoading(false);
        });
    }
  }, [slug, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = isEdit ? `/api/admin/products/${slug}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name if in create mode and slug hasn't been manually edited much
    if (!isEdit && name === "name" && formData.slug.length < 5) {
      const gSlug = value.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, name: value, slug: gSlug }));
      return;
    }

    // Handle nested objects
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white">
          <Link href="/admin/products">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
          <p className="text-zinc-400 text-sm">{isEdit ? formData.name : "Add a new item to your catalog"}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Product Name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">URL Slug</label>
              <input
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                disabled={isEdit}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-400 disabled:opacity-50 focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 outline-none"
              >
                <option value="desk-accessories">Desk Accessories</option>
                <option value="pop-culture">Pop Culture</option>
                <option value="automotive">Automotive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Price (LKR)</label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Card Gradient (Tailwind)</label>
              <input
                name="gradient"
                value={formData.gradient}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Tagline / Short Description</label>
            <textarea
              required
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              rows={2}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 outline-none resize-none"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Dimensions</label>
              <input
                name="specs.dimensions"
                value={formData.specs.dimensions}
                onChange={handleChange}
                placeholder="20x20x15 cm"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Weight</label>
              <input
                name="specs.weight"
                value={formData.specs.weight}
                onChange={handleChange}
                placeholder="250g"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Material</label>
              <input
                name="specs.material"
                value={formData.specs.material}
                onChange={handleChange}
                placeholder="Premium PLA"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Print Time</label>
              <input
                name="specs.printTime"
                value={formData.specs.printTime}
                onChange={handleChange}
                placeholder="14 hours"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Layer Count</label>
              <input
                name="specs.layerCount"
                value={formData.specs.layerCount}
                onChange={handleChange}
                placeholder="~1,200 layers"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Finish</label>
              <input
                name="specs.finish"
                value={formData.specs.finish}
                onChange={handleChange}
                placeholder="Matte / Texture"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Product Story</h2>
          
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Headline</label>
            <input
              name="story.headline"
              value={formData.story.headline}
              onChange={handleChange}
              placeholder="e.g. Masterful Engineering Meets Desk Aesthetics"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400 font-medium flex justify-between">
              <span>Main Paragraphs (One per array item)</span>
              <button 
                type="button"
                onClick={() => setFormData(p => ({ ...p, story: { ...p.story, paragraphs: [...p.story.paragraphs, ""] } }))}
                className="text-xs text-blue-500 hover:text-blue-400"
              >
                + Add Paragraph
              </button>
            </label>
            <div className="space-y-3">
              {formData.story.paragraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={p}
                    onChange={(e) => {
                      const newParas = [...formData.story.paragraphs];
                      newParas[i] = e.target.value;
                      setFormData(prev => ({ ...prev, story: { ...prev.story, paragraphs: newParas } }));
                    }}
                    rows={3}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white text-sm focus:ring-1 focus:ring-zinc-600 outline-none resize-y"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newParas = formData.story.paragraphs.filter((_, idx) => idx !== i);
                      setFormData(prev => ({ ...prev, story: { ...prev.story, paragraphs: newParas } }));
                    }}
                    className="p-2 text-zinc-500 hover:text-red-500 self-start"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex justify-between items-center cursor-pointer"
             onClick={() => setFormData(p => ({ ...p, isActive: !p.isActive }))}
        >
          <div>
            <h3 className="text-white font-medium">Product Status</h3>
            <p className="text-zinc-400 text-sm">Should this product be visible on the store front?</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.isActive ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isActive ? 'left-7' : 'left-1'}`} />
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button type="button" variant="ghost" className="text-zinc-400 hover:text-white" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={saving} className="bg-white text-zinc-900 hover:bg-zinc-200">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
        </div>

      </form>
    </div>
  );
}
