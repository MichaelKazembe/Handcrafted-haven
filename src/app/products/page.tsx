import { Suspense } from "react";
import { Container, Card, Button, Badge } from "@/components/ui";
import { db } from "@/lib/supabase";
import Link from "next/link";
import { Filter, ArrowLeft } from "lucide-react";

// Types
interface Product {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: {
    name: string;
  };
  sellers: {
    store_name: string;
  };
}

interface Category {
  category_id: number;
  name: string;
}

async function getProducts() {
  try {
    const products = await db.products.findAll();
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await db.categories.findAll();
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.product_id} href={`/products/${product.product_id}`}>
          <Card hover className="h-full">
            <div className="aspect-square overflow-hidden bg-secondary-100">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-primary-600 font-medium mb-1">
                {product.categories?.name || 'Uncategorized'}
              </p>
              <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-secondary-500 mb-2">
                by {product.sellers?.store_name || 'Unknown Seller'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-700">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
                {product.stock_quantity <= 5 && (
                  <Badge variant="warning">
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

export default async function ProductsPage() {
  // Fetch products and categories from database
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  // Add "All" category at the beginning
  const allCategories = [
    { category_id: 0, name: "All" },
    ...categories
  ];

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
            {allCategories.map((category) => (
              <Button
                key={category.category_id}
                variant={category.name === "All" ? "primary" : "ghost"}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Container>
      </div>

      {/* Products Grid */}
      <Container className="py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductGrid products={products} />
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

