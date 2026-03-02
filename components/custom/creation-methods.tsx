"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileUp,
  ImageUp,
  PenLine,
  Upload,
  X,
  FileText,
  Eye,
} from "lucide-react";
import { MATERIALS, FINISHES } from "@/lib/pricing-config";

type CreationMethod = "stl" | "image" | "describe";

interface FileWithPreview {
  file: File;
  preview?: string;
}

const methods = [
  {
    id: "stl" as CreationMethod,
    icon: FileUp,
    label: "Upload 3D File",
    description: "Have a ready-to-print STL? Drop it here.",
  },
  {
    id: "image" as CreationMethod,
    icon: ImageUp,
    label: "Upload Image",
    description: "Share a photo or sketch of what you want.",
  },
  {
    id: "describe" as CreationMethod,
    icon: PenLine,
    label: "Describe It",
    description: "Tell us your idea in words — we'll design it.",
  },
];

export interface CreationData {
  method: CreationMethod;
  file: File | null;
  imagePreview: string | null;
  description: string;
  dimensions: string;
  notes: string;
  material: string;
  finish: string;
  quantity: number;
}

interface CreationMethodsProps {
  data: CreationData;
  onChange: (data: CreationData) => void;
}

export function CreationMethods({ data, onChange }: CreationMethodsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const setField = <K extends keyof CreationData>(
    key: K,
    value: CreationData[K],
  ) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,168,83,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-warm-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-warm-gold/70">
            Step 1
          </span>
          <span className="h-px w-8 bg-warm-gold/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 text-center font-display text-3xl font-light text-white sm:text-4xl"
        >
          How would you like to{" "}
          <span className="italic text-warm-gold">start</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-14 max-w-lg text-center text-sm text-zinc-500"
        >
          Choose the method that works best for you. We handle the rest.
        </motion.p>

        {/* Method selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {methods.map((method) => {
            const isActive = data.method === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setField("method", method.id)}
                className={`group relative rounded-2xl border p-6 text-left transition-all duration-500 ${
                  isActive
                    ? "border-warm-gold/40 bg-warm-gold/5 shadow-[0_0_40px_rgba(212,168,83,0.08)]"
                    : "border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/4"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="method-indicator"
                    className="absolute inset-0 rounded-2xl border border-warm-gold/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <method.icon
                  className={`mb-4 h-7 w-7 transition-colors duration-300 ${
                    isActive
                      ? "text-warm-gold"
                      : "text-zinc-500 group-hover:text-zinc-400"
                  }`}
                />
                <h3
                  className={`mb-1 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {method.label}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500">
                  {method.description}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* Animated panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={data.method}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {data.method === "stl" && (
              <STLPanel data={data} onChange={onChange} />
            )}
            {data.method === "image" && (
              <ImagePanel data={data} onChange={onChange} />
            )}
            {data.method === "describe" && (
              <DescribePanel data={data} onChange={onChange} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Shared fields: Material, Finish, Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 rounded-2xl border border-white/8 bg-white/2 p-6 md:p-8"
        >
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Preferences
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Material */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                Material
              </label>
              <div className="space-y-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setField("material", mat.id)}
                    className={`w-full rounded-xl border p-3 text-left transition-all duration-300 ${
                      data.material === mat.id
                        ? "border-warm-gold/40 bg-warm-gold/5"
                        : "border-white/8 bg-white/2 hover:border-white/15"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        data.material === mat.id
                          ? "text-warm-gold"
                          : "text-zinc-300"
                      }`}
                    >
                      {mat.label}
                    </span>
                    <span className="block text-[11px] text-zinc-500">
                      {mat.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                Finish
              </label>
              <div className="space-y-2">
                {FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setField("finish", fin.id)}
                    className={`w-full rounded-xl border p-3 text-left transition-all duration-300 ${
                      data.finish === fin.id
                        ? "border-warm-gold/40 bg-warm-gold/5"
                        : "border-white/8 bg-white/2 hover:border-white/15"
                    }`}
                  >
                    <span
                      className={`block text-sm font-medium ${
                        data.finish === fin.id
                          ? "text-warm-gold"
                          : "text-zinc-300"
                      }`}
                    >
                      {fin.label}
                    </span>
                    <span className="block text-[11px] text-zinc-500">
                      {fin.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                Quantity
              </label>
              <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/2 p-3">
                <button
                  onClick={() =>
                    setField("quantity", Math.max(1, data.quantity - 1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-lg text-zinc-400 transition-colors hover:border-warm-gold/30 hover:text-warm-gold"
                >
                  −
                </button>
                <span className="min-w-[3ch] text-center text-2xl font-light text-white">
                  {data.quantity}
                </span>
                <button
                  onClick={() => setField("quantity", data.quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-lg text-zinc-400 transition-colors hover:border-warm-gold/30 hover:text-warm-gold"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-[11px] text-zinc-600">
                Bulk orders get better per-unit pricing
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// STL Upload Panel
// ============================================================

function STLPanel({
  data,
  onChange,
}: {
  data: CreationData;
  onChange: (d: CreationData) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      onChange({ ...data, file });
    },
    [data, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.name.toLowerCase().endsWith(".stl")) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`relative flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-300 ${
        isDragging
          ? "border-warm-gold/60 bg-warm-gold/5"
          : data.file
            ? "border-warm-gold/30 bg-warm-gold/3"
            : "border-white/10 bg-white/2 hover:border-white/20"
      }`}
    >
      {data.file ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-warm-gold/10">
            <FileText className="h-7 w-7 text-warm-gold" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{data.file.name}</p>
            <p className="text-xs text-zinc-500">
              {(data.file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={() => onChange({ ...data, file: null })}
            className="mt-2 flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-red-400"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3">
            <Upload className="h-7 w-7 text-zinc-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">
              Drop your STL file here
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              or click to browse • .stl files only
            </p>
          </div>
          <input
            type="file"
            accept=".stl"
            onChange={onFileInput}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

// ============================================================
// Image Upload Panel
// ============================================================

function ImagePanel({
  data,
  onChange,
}: {
  data: CreationData;
  onChange: (d: CreationData) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          ...data,
          file,
          imagePreview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [data, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`relative flex min-h-[240px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-300 ${
        isDragging
          ? "border-warm-gold/60 bg-warm-gold/5"
          : data.imagePreview
            ? "border-warm-gold/30 bg-warm-gold/3"
            : "border-white/10 bg-white/2 hover:border-white/20"
      }`}
    >
      {data.imagePreview ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10">
            <img
              src={data.imagePreview}
              alt="Preview"
              className="max-h-48 max-w-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white">{data.file?.name}</p>
            <button
              onClick={() =>
                onChange({ ...data, file: null, imagePreview: null })
              }
              className="mt-1 flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-red-400"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3">
            <ImageUp className="h-7 w-7 text-zinc-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">
              Drop your image here
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              Photo, sketch, or reference • JPG, PNG, WebP
            </p>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileInput}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

// ============================================================
// Describe Design Panel
// ============================================================

function DescribePanel({
  data,
  onChange,
}: {
  data: CreationData;
  onChange: (d: CreationData) => void;
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/8 bg-white/2 p-6 md:p-8">
      {/* Description */}
      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
          Describe your design
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="E.g. A desk organizer shaped like a mountain range with slots for pens and a phone stand..."
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-sm leading-relaxed text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/30 focus:bg-white/5"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Dimensions */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
            Approximate dimensions (optional)
          </label>
          <input
            type="text"
            value={data.dimensions}
            onChange={(e) => onChange({ ...data, dimensions: e.target.value })}
            placeholder="E.g. 15cm × 10cm × 8cm"
            className="w-full rounded-xl border border-white/10 bg-white/3 px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/30 focus:bg-white/5"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
            Additional notes (optional)
          </label>
          <input
            type="text"
            value={data.notes}
            onChange={(e) => onChange({ ...data, notes: e.target.value })}
            placeholder="Colour preferences, special requests..."
            className="w-full rounded-xl border border-white/10 bg-white/3 px-5 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-warm-gold/30 focus:bg-white/5"
          />
        </div>
      </div>
    </div>
  );
}
