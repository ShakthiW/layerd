"use client";

import { useState, useCallback, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";

interface ImageUploaderProps {
  existingUrls: string[];
  onExistingUrlsChange: (urls: string[]) => void;
  newFiles: File[];
  onNewFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export function ImageUploader({
  existingUrls,
  onExistingUrlsChange,
  newFiles,
  onNewFilesChange,
  maxFiles = 4,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const totalCount = existingUrls.length + newFiles.length;

  // Generate local previews for newly selected files
  useEffect(() => {
    const objectUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const spaceLeft = maxFiles - totalCount;
      const allowedFiles = selected.slice(0, spaceLeft);
      onNewFilesChange([...newFiles, ...allowedFiles]);
    }
  };

  const removeExisting = (index: number) => {
    const updated = [...existingUrls];
    updated.splice(index, 1);
    onExistingUrlsChange(updated);
  };

  const removeNewFile = (index: number) => {
    const updated = [...newFiles];
    updated.splice(index, 1);
    onNewFilesChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Existing URLs */}
        {existingUrls.map((url, i) => (
          <div key={`existing-${i}`} className="relative group aspect-square rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeExisting(i)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* New Files */}
        {previews.map((url, i) => (
          <div key={`new-${i}`} className="relative group aspect-square rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`Local Preview ${i}`} className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-2 right-2 bg-blue-500 text-xs px-2 py-0.5 rounded text-white font-medium shadow">
              New
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeNewFile(i)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Upload Button */}
        {totalCount < maxFiles && (
          <label className="relative aspect-square rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition flex flex-col items-center justify-center cursor-pointer overflow-hidden">
            <ImagePlus className="w-6 h-6 text-zinc-400 mb-2" />
            <span className="text-xs text-zinc-500 font-medium">Add Image</span>
            <span className="text-[10px] text-zinc-600 mt-1">({totalCount}/{maxFiles})</span>
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png, image/webp, image/gif"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        )}
      </div>

      <p className="text-xs text-zinc-500">
        You can upload up to {maxFiles} images. Supported formats: JPEG, PNG, WEBP, GIF. First image is the primary cover.
      </p>
    </div>
  );
}
