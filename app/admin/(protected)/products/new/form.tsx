"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Plus, Trash2, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface AdminProductFormProps {
  slug?: string; // If provided, it's edit mode
}

export function AdminProductForm({ slug }: AdminProductFormProps) {
  const isEdit = !!slug;
  const router = useRouter();
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newContextFiles, setNewContextFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [uploadState, setUploadState] = useState({ isOpen: false, progress: 0, message: "" });
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    category: "desk-accessories",
    price: 0,
    gradient: "from-zinc-500 to-zinc-800",
    isActive: true,
    images: [] as string[],
    contextImages: Array.from({ length: 4 }).map(() => ({ url: "", location: "", description: "" })),
    variants: [] as any[],
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
            const ctxs = data.contextImages || [];
            while(ctxs.length < 4) ctxs.push({ url: "", location: "", description: "" });
            setFormData({ ...data, contextImages: ctxs });
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
    setUploadState({ isOpen: true, progress: 10, message: "Validating payload..." });

    try {
      let finalUrls = [...(formData.images || [])];
      
      if (newImageFiles.length > 0) {
        setUploadState({ isOpen: true, progress: 25, message: "Uploading product gallery to Firebase..." });
        const payload = new FormData();
        newImageFiles.forEach((file) => payload.append("files", file));
        
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: payload,
        });
        if (!uploadRes.ok) {
           const uData = await uploadRes.json();
           throw new Error(uData.message || "Failed to upload images");
        }
        
        const uploadData = await uploadRes.json();
        finalUrls = [...finalUrls, ...uploadData.urls];
      }

      let finalContextImages = [...(formData.contextImages || [])];
      
      const contextFilesToUpload = newContextFiles.filter(f => f !== null);
      if (contextFilesToUpload.length > 0) {
        setUploadState({ isOpen: true, progress: 55, message: "Uploading context scenes to Firebase..." });
        const payload = new FormData();
        contextFilesToUpload.forEach((file) => payload.append("files", file as Blob));
        
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: payload,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload context images");
        
        const uploadData = await uploadRes.json();
        const urls = uploadData.urls;

        let urlIdx = 0;
        newContextFiles.forEach((file, index) => {
          if (file) {
            finalContextImages[index].url = urls[urlIdx];
            urlIdx++;
          }
        });
      }
      
      finalContextImages = finalContextImages.filter(c => c.url.trim() !== "");

      setUploadState({ isOpen: true, progress: 85, message: "Saving configuration to database..." });
      const finalData = { ...formData, images: finalUrls, contextImages: finalContextImages };

      const url = isEdit ? `/api/admin/products/${slug}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save product");
      }

      setUploadState({ isOpen: true, progress: 100, message: "Success! Product uploaded." });
      
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
      setUploadState(p => ({ ...p, isOpen: false }));
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
        
        {/* Media & Images */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Product Images</h2>
          <ImageUploader 
            existingUrls={formData.images || []}
            onExistingUrlsChange={(urls) => setFormData(p => ({ ...p, images: urls }))}
            newFiles={newImageFiles}
            onNewFilesChange={setNewImageFiles}
            maxFiles={4}
          />
        </div>

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

        {/* Variants Builder */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-lg font-medium text-white">Product Options (Variants)</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData(p => ({
                  ...p,
                  variants: [...(p.variants || []), { id: 'size', label: 'Size', options: [] }]
                }));
              }}
              className="h-8 border-zinc-700 bg-zinc-950 text-xs text-white hover:bg-zinc-800"
            >
              <Plus className="w-3 h-3 mr-2" /> Add Option Group
            </Button>
          </div>
          
          <div className="space-y-6">
            {(formData.variants || []).map((vGroup, gIdx) => (
              <div key={gIdx} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Group Identity (ID)</label>
                    <select
                      value={vGroup.id}
                      onChange={(e) => {
                        const newV = [...formData.variants];
                        newV[gIdx] = { ...vGroup, id: e.target.value, label: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) };
                        setFormData(p => ({ ...p, variants: newV }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-white text-sm focus:outline-none"
                    >
                      <option value="size">Size</option>
                      <option value="color">Color</option>
                      <option value="finish">Finish</option>
                    </select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Display Label</label>
                    <input
                      value={vGroup.label}
                      onChange={(e) => {
                        const newV = [...formData.variants];
                        newV[gIdx] = { ...vGroup, label: e.target.value };
                        setFormData(p => ({ ...p, variants: newV }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      const newV = [...formData.variants];
                      newV.splice(gIdx, 1);
                      setFormData(p => ({ ...p, variants: newV }));
                    }}
                    className="self-end hover:bg-red-500/10 hover:text-red-500 text-zinc-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Options List */}
                <div className="pl-4 border-l-2 border-zinc-800 space-y-3">
                  {vGroup.options.map((opt: any, oIdx: number) => (
                    <div key={oIdx} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-3">
                        <input
                          placeholder="Label (e.g. XL)"
                          value={opt.label}
                          onChange={(e) => {
                            const newV = [...formData.variants];
                            newV[gIdx].options[oIdx].label = e.target.value;
                            newV[gIdx].options[oIdx].value = e.target.value.toLowerCase().replace(/[\s/]+/g, '-');
                            setFormData(p => ({ ...p, variants: newV }));
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-white text-sm"
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          placeholder="Meta (Hex OR Dimensions)"
                          value={opt.meta || ""}
                          onChange={(e) => {
                            const newV = [...formData.variants];
                            newV[gIdx].options[oIdx].meta = e.target.value;
                            setFormData(p => ({ ...p, variants: newV }));
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-white text-sm font-mono"
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 text-sm">+</span>
                          <input
                            type="number"
                            placeholder="Price"
                            value={opt.priceModifier || 0}
                            onChange={(e) => {
                              const newV = [...formData.variants];
                              newV[gIdx].options[oIdx].priceModifier = Number(e.target.value);
                              setFormData(p => ({ ...p, variants: newV }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded pl-8 pr-3 py-1.5 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            const newV = [...formData.variants];
                            newV[gIdx].options.splice(oIdx, 1);
                            setFormData(p => ({ ...p, variants: newV }));
                          }}
                          className="text-zinc-500 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newV = [...formData.variants];
                      newV[gIdx].options.push({ label: '', value: '', meta: '', priceModifier: 0 });
                      setFormData(p => ({ ...p, variants: newV }));
                    }}
                    className="text-xs text-blue-500 hover:text-blue-400 mt-2"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            ))}
            {(!formData.variants || formData.variants.length === 0) && (
              <p className="text-sm text-zinc-500 text-center py-4">No variants configured. Product will be sold as a single standard item.</p>
            )}
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

        {/* See It In Context */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">See It In Context</h2>
          <p className="text-sm text-zinc-400">Add up to 4 environmental photos with context details.</p>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => {
              const ctx = (formData.contextImages && formData.contextImages[idx]) || { url: "", location: "", description: "" };
              const newFile = newContextFiles[idx];
              const displayUrl = newFile ? URL.createObjectURL(newFile) : ctx.url;

              return (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                  {/* Image Slot */}
                  <div className="w-full sm:w-24 h-32 sm:h-24 shrink-0 rounded-lg border border-dashed border-zinc-700 overflow-hidden relative group">
                    {displayUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={displayUrl} alt={`Context ${idx + 1}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => {
                            const newFiles = [...newContextFiles];
                            newFiles[idx] = null;
                            setNewContextFiles(newFiles);
                            
                            const newCtxs = [...(formData.contextImages || [])];
                            if (newCtxs[idx]) newCtxs[idx].url = "";
                            setFormData(p => ({ ...p, contextImages: newCtxs }));
                          }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </>
                    ) : (
                      <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-zinc-800/50 transition-colors">
                        <Plus className="w-6 h-6 text-zinc-600" />
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const newFiles = [...newContextFiles];
                              newFiles[idx] = e.target.files[0];
                              setNewContextFiles(newFiles);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex-1 space-y-3 w-full">
                    <input
                      placeholder="Location (e.g. Minimalist living room)"
                      value={ctx.location || ""}
                      onChange={(e) => {
                        const newCtxs = [...(formData.contextImages || [])];
                        while(newCtxs.length <= idx) newCtxs.push({ url: "", location: "", description: "" });
                        newCtxs[idx].location = e.target.value;
                        setFormData(p => ({ ...p, contextImages: newCtxs }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                    />
                    <input
                      placeholder="Description & Emoji (e.g. Perfect for your coffee table ☕)"
                      value={ctx.description || ""}
                      onChange={(e) => {
                        const newCtxs = [...(formData.contextImages || [])];
                        while(newCtxs.length <= idx) newCtxs.push({ url: "", location: "", description: "" });
                        newCtxs[idx].description = e.target.value;
                        setFormData(p => ({ ...p, contextImages: newCtxs }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
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

      <Dialog open={uploadState.isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Saving Product</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Please wait while your product configurations and images are saved...
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-300 flex items-center gap-2">
                {uploadState.progress === 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                )}
                {uploadState.message}
              </span>
              <span className="text-zinc-500 font-mono">{uploadState.progress}%</span>
            </div>
            <Progress value={uploadState.progress} className="h-2 bg-zinc-800" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
