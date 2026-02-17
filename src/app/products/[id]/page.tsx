import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Store } from "lucide-react";
import { Container, Button, Badge, Card, StarRating } from "@/components/ui";
import { ReviewList, ReviewForm } from "@/components/features";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Product } from "@/lib/types";
import {
  getProductReviews,
  submitReview,
  getProductRatingStats,
} from "./actions";
import { formatPrice } from "@/utils/formatters";

// Mock products data for when Supabase is not configured
const mockProducts: Product[] = [
  {
    product_id: 1,
    seller_id: "mock-seller-1",
    category_id: 1,
    name: "Hand-Painted Ceramic Mug",
    description: "Beautiful hand-painted ceramic mug with unique floral patterns. Each piece is carefully crafted by skilled artisans, making every mug one-of-a-kind. Perfect for your morning coffee or tea. Microwave and dishwasher safe.",
    price: 35.0,
    stock_quantity: 15,
    image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    store_name: "Maria Pottery",
    category_name: "Ceramics",
  },
  {
    product_id: 2,
    seller_id: "mock-seller-2",
    category_id: 4,
    name: "Woven Wool Blanket",
    description: "Luxurious hand-woven wool blanket made from premium merino wool. Features traditional patterns passed down through generations. Soft, warm, and durable. Perfect for cold winter nights or as a decorative throw.",
    price: 120.0,
    stock_quantity: 8,
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    store_name: "Artisan Weaves",
    category_name: "Textiles",
  },
  {
    product_id: 3,
    seller_id: "mock-seller-3",
    category_id: 2,
    name: "Silver Handcrafted Ring",
    description: "Elegant sterling silver ring with intricate hand-carved details. Made by master jewelers using traditional techniques. Hypoallergenic and tarnish-resistant. Available in multiple sizes.",
    price: 65.0,
    stock_quantity: 20,
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    store_name: "Gemstone Studio",
    category_name: "Jewelry",
  },
  {
    product_id: 4,
    seller_id: "mock-seller-4",
    category_id: 5,
    name: "Abstract Oil Painting",
    description: "Original abstract oil painting on stretched canvas. Bold colors and dynamic brushstrokes create a stunning focal point for any room. Signed by the artist. Ready to hang with wire backing.",
    price: 250.0,
    stock_quantity: 3,
    image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    store_name: "Art Gallery",
    category_name: "Paintings",
  },
  {
    product_id: 5,
    seller_id: "mock-seller-5",
    category_id: 1,
    name: "Wooden Cutting Board",
    description: "Premium walnut cutting board with natural edge. Hand-finished with food-safe mineral oil. Features juice groove and non-slip rubber feet. Durable and beautiful addition to any kitchen.",
    price: 55.0,
    stock_quantity: 12,
    image_url: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=800",
    store_name: "Woodcraft Masters",
    category_name: "Woodwork",
  },
];

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

async function getProductById(id: number): Promise<Product | null> {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured) {
    return mockProducts.find(p => p.product_id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        sellers (
          store_name,
          email
        ),
        categories (
          name
        )
      `
      )
      .eq("product_id", id)
      .single();

    if (error || !data) {
      return null;
    }

    // Map the joined data
    return {
      ...data,
      store_name: data.sellers?.store_name,
      seller_email: data.sellers?.email,
      category_name: data.categories?.name,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const [product, reviews, ratingStats] = await Promise.all([
    getProductById(productId),
    getProductReviews(productId),
    getProductRatingStats(productId),
  ]);

  if (!product) {
    notFound();
  }

  const handleSubmitReview = async (formData: any) => {
    "use server";
    return await submitReview(formData);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <Container>
          <div className="py-4">
            <Link
              href="/products"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Products
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md">
            <Image
              src={
                product.image_url ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
              }
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(ratingStats.averageRating)} />
                  <span className="text-sm text-gray-600">
                    {ratingStats.averageRating.toFixed(1)} ({ratingStats.totalReviews}{" "}
                    {ratingStats.totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Store size={20} className="text-gray-500" />
                <span className="text-gray-700">{product.store_name}</span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              {product.category_name && (
                <Badge variant="default" className="mb-4">
                  {product.category_name}
                </Badge>
              )}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Availability:</span>
                <span
                  className={`font-medium ${
                    product.stock_quantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stock_quantity > 0
                    ? `${product.stock_quantity} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="mr-2" size={20} />
              {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Existing Reviews */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Customer Reviews
            </h2>
            <Card className="p-6">
              <Suspense
                fallback={<p className="text-gray-500">Loading reviews...</p>}
              >
                <ReviewList reviews={reviews} />
              </Suspense>
            </Card>
          </div>

          {/* Review Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Write a Review
            </h2>
            <Card className="p-6">
              <ReviewForm
                productId={productId}
                onSubmitReview={async (data) => {
                  "use server";
                  await submitReview(data);
                }}
              />
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
