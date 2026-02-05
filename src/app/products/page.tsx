import { Suspense } from "react";
import { Container, Card, Button, Badge } from "@/components/ui";
import Link from "next/link";
import { Filter, ArrowLeft } from "lucide-react";

// Mock products data - replace with Supabase query
const products = [
  {
    product_id: 1,
    name: "Hand-Painted Ceramic Mug",
    price: 35.0,
    image_url:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    store_name: "Maria Pottery",
    category_name: "Pottery",
    stock_quantity: 15,
  },
  {
    product_id: 2,
    name: "Woven Wool Blanket",
    price: 120.0,
    image_url:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    store_name: "Artisan Weaves",
    category_name: "Textiles",
    stock_quantity: 8,
  },
  {
    product_id: 3,
    name: "Silver Handcrafted Ring",
    price: 65.0,
    image_url:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    store_name: "Gemstone Studio",
    category_name: "Jewelry",
    stock_quantity: 20,
  },
  {
    product_id: 4,
    name: "Abstract Oil Painting",
    price: 250.0,
    image_url:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
    store_name: "Art Gallery",
    category_name: "Art",
    stock_quantity: 3,
  },
  {
    product_id: 5,
    name: "Wooden Cutting Board",
    price: 55.0,
    image_url:
      "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=400",
    store_name: "Woodcraft Masters",
    category_name: "Home",
    stock_quantity: 12,
  },
  {
    product_id: 6,
    name: "Macrame Wall Hanging",
    price: 85.0,
    image_url:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
    store_name: "Boho Decor",
    category_name: "Home",
    stock_quantity: 6,
  },
  {
    product_id: 7,
    name: "Handmade Leather Journal",
    price: 45.0,
    image_url:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400",
    store_name: "Craftsman Leather",
    category_name: "Accessories",
    stock_quantity: 25,
  },
  {
    product_id: 8,
    name: "Ceramic Flower Vase",
    price: 42.0,
    image_url:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
    store_name: "Clay Studio",
    category_name: "Pottery",
    stock_quantity: 10,
  },
];

const categories = [
  "All",
  "Pottery",
  "Jewelry",
  "Textiles",
  "Art",
  "Home",
  "Accessories",
];

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.product_id} href={`/products/${product.product_id}`}>
          <Card hover className="h-full">
            <div className="aspect-square overflow-hidden bg-secondary-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-primary-600 font-medium mb-1">
                {product.category_name}
              </p>
              <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-secondary-500 mb-2">
                by {product.store_name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-700">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock_quantity <= 5 && (
                  <Badge variant="warning" size="sm">
                    Low Stock
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-secondary-200" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-secondary-200 rounded w-1/3" />
            <div className="h-4 bg-secondary-200 rounded w-2/3" />
            <div className="h-3 bg-secondary-200 rounded w-1/2" />
            <div className="h-5 bg-secondary-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-12">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center text-primary-100 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white">All Products</h1>
          <p className="text-primary-100 mt-2">
            Discover unique handcrafted items from our talented artisans
          </p>
        </Container>
      </div>

      {/* Filters */}
      <div className="border-b border-secondary-200 bg-white">
        <Container>
          <div className="py-4 flex flex-wrap items-center gap-2">
            <Filter className="h-5 w-5 text-secondary-400 mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "primary" : "ghost"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </div>

      {/* Products Grid */}
      <Container className="py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductGrid />
        </Suspense>
      </Container>

      {/* Empty State (if no products) */}
      {products.length === 0 && (
        <Container className="py-12">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">&#x1F4A1;</div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              No products found
            </h2>
            <p className="text-secondary-600 mb-6">
              Check back soon for new handcrafted items from our artisans
            </p>
            <Link href="/">
              <Button variant="outline">Browse Categories</Button>
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
}
