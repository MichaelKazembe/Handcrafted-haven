import Link from "next/link";
import { Container, Card, Button, Input, Textarea } from "@/components/ui";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AddProductPage() {
  // Check authentication
  const cookieStore = await cookies();
  const sellerId = cookieStore.get("seller_id")?.value;

  if (!sellerId) {
    redirect("/login");
  }

  // Fetch categories from Supabase
  const categories = await db.categories.findAll();

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-12">
        <Container>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Add New Product</h1>
              <p className="text-primary-100 mt-2">
                List a new handcrafted item in your store
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <form className="space-y-6">
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

              {/* Image URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-secondary-700 mb-2"
                >
                  Product Image URL *
                </label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1"
                  />
                  <Button variant="outline" type="button">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-secondary-500 mt-1">
                  Tip: Copy an image link from Unsplash.com for testing
                </p>
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
                  placeholder="Tell customers about your product's story, materials, and care instructions..."
                  className="w-full"
                />
              </div>

              {/* Preview Section */}
              <div className="border-t border-secondary-200 pt-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Product Preview
                </h3>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <div className="text-center text-secondary-500">
                    <div className="text-4xl mb-2">📦</div>
                    <p>Preview will appear here as you fill out the form</p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  Publish Product
                </Button>
              </div>
            </form>
          </Card>

          {/* Help Section */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-secondary-900 mb-3">
              Tips for Great Product Listings
            </h3>
            <ul className="space-y-2 text-sm text-secondary-600">
              <li>
                • Use high-quality, well-lit photos that show your craftsmanship
              </li>
              <li>
                • Write detailed descriptions including materials and care
                instructions
              </li>
              <li>
                • Price competitively but cover your costs and time investment
              </li>
              <li>• Start with small stock quantities to test demand</li>
              <li>
                • Respond quickly to customer inquiries for better reviews
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </div>
  );
}
