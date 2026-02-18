"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button, Input } from "@/components/ui";

interface ProductImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  sellerId: string;
}

export function ProductImageUpload({ value, onChange, sellerId }: ProductImageUploadProps) {
  const [mode, setMode] = useState<"url" | "file">("url");
  const [preview, setPreview] = useState<string>(value || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle URL input change
  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
    setError("");
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sellerId", sellerId);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      // If upload fails, use the data URL as fallback (for demo purposes)
      console.error("Upload error:", err);
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  // Clear the image
  const handleClear = () => {
    setPreview("");
    onChange("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "url" ? "primary" : "outline"}
          size="sm"
          onClick={() => setMode("url")}
          className="flex items-center gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          URL
        </Button>
        <Button
          type="button"
          variant={mode === "file" ? "primary" : "outline"}
          size="sm"
          onClick={() => setMode("file")}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      {/* URL Input Mode */}
      {mode === "url" && (
        <div>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={value}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1"
            />
          </div>
          <p className="text-xs text-secondary-500 mt-1">
            Tip: Copy an image link from Unsplash.com for testing
          </p>
        </div>
      )}

      {/* File Upload Mode */}
      {mode === "file" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            id="product-image-upload"
          />
          <label htmlFor="product-image-upload">
            <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mb-2"></div>
                  <p className="text-sm text-secondary-600">Uploading...</p>
                </div>
              ) : preview ? (
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClear();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-secondary-400 mb-2" />
                  <p className="text-sm text-secondary-600">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-secondary-400 mt-1">
                    JPEG, PNG, WebP or GIF (max 5MB)
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview */}
      {preview && mode === "url" && (
        <div className="relative w-full max-w-xs">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
            onError={() => setError("Invalid image URL")}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

