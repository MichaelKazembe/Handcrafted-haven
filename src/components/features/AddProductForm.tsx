"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Card, Button, Input, Textarea } from "@/components/ui";
import { ProductImageUpload } from "@/components/features/ProductImageUpload";
import { ArrowLeft, Save } from "lucide-react";

interface Category {
  category_id: number;
  name: string;
}

interface AddProductFormProps {
  categories: Category[];
  sellerId: string;
}

export function AddProductForm({ categories, sellerId }: AddProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl,
          sellerId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      // Redirect to dashboard
      router.push("/dashboard/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-secondary-700 mb-2"
        >
          Product Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Hand-Painted Ceramic Mug"
          className="w-full"
        />
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Price ($) *
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="25.00"
            className="w-full"
          />
        </div>
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Stock Quantity *
          </label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            required
            value={formData.stock}
            onChange={handleChange}
            placeholder="10"
            className="w-full"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-secondary-700 mb-2"
        >
          Category *
        </label>
        <select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select a category...</option>
          {categories.map((category) => (
            <option
              key={category.category_id}
              value={category.category_id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          Product Image *
        </label>
        <ProductImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          sellerId={sellerId}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-secondary-700 mb-2"
        >
          Description *
        </label>
        <Textarea
          id="description"
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell customers about your product's story, materials, and care instructions..."
          className="w-full"
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" type="button" className="w-full">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Save className="h-5 w-5" />
          {loading ? "Publishing..." : "Publish Product"}
        </Button>
      </div>
    </form>
  );
}

