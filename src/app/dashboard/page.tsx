import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/supabase";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, Badge } from "@/components/ui";
import { 
  Package, 
  Star, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  MessageSquare,
  Eye,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Mock data for demonstration (will be replaced with actual database queries)
const mockStats = {
  totalProducts: 12,
  totalReviews: 48,
  averageRating: 4.7,
  totalSales: 156,
  pendingReviews: 5,
  recentProducts: [
    { id: 1, name: "Hand-Painted Ceramic Mug", price: 35.0, stock: 15, status: "active" },
    { id: 2, name: "Woven Wool Blanket", price: 120.0, stock: 8, status: "active" },
    { id: 3, name: "Silver Handcrafted Ring", price: 65.0, stock: 20, status: "active" },
  ],
  recentReviews: [
    { id: 1, product: "Ceramic Mug", rating: 5, comment: "Beautiful craftsmanship!", date: "2 hours ago" },
    { id: 2, product: "Wool Blanket", rating: 4, comment: "Very warm and cozy", date: "1 day ago" },
    { id: 3, product: "Silver Ring", rating: 5, comment: "Exactly as described", date: "2 days ago" },
  ]
};

export default async function DashboardPage() {
  // 1. Check if the login cookie exists
  const cookieStore = await cookies();
  const sellerId = cookieStore.get("seller_id")?.value;

  // If there is no cookie, redirect back to login
  if (!sellerId) {
    redirect("/login");
  }

  // 2. Fetch seller data to display a welcome message
  const seller = await db.sellers.findById(sellerId);

  // Use mock data for now, will be replaced with actual queries
  const stats = mockStats;

  return (
    <DashboardLayout 
      sellerName={seller?.first_name || 'Seller'} 
      storeName={seller?.store_name || 'My Store'}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-500">Total Products</p>
                <p className="text-3xl font-bold text-secondary-900 mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+3</span>
              <span className="text-secondary-500 ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Reviews */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-500">Total Reviews</p>
                <p className="text-3xl font-bold text-secondary-900 mt-1">{stats.totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-secondary-500">{stats.pendingReviews} pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-500">Average Rating</p>
                <p className="text-3xl font-bold text-secondary-900 mt-1">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600 fill-current" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-secondary-500">Based on {stats.totalReviews} reviews</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-500">Total Sales</p>
                <p className="text-3xl font-bold text-secondary-900 mt-1">${stats.totalSales * 50}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-secondary-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/products">
            <Button variant="primary">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </Link>
          <Link href="/dashboard/reviews">
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Reviews
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card className="bg-white">
          <div className="px-6 py-4 border-b border-secondary-100 flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900">Recent Products</h3>
            <Link href="/dashboard/products" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-secondary-100">
              {stats.recentProducts.map((product) => (
                <div key={product.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-secondary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{product.name}</p>
                      <p className="text-sm text-secondary-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-secondary-900">${product.price.toFixed(2)}</p>
                    <Badge variant="success" className="mt-1">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="bg-white">
          <div className="px-6 py-4 border-b border-secondary-100 flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900">Recent Reviews</h3>
            <Link href="/dashboard/reviews" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-secondary-100">
              {stats.recentReviews.map((review) => (
                <div key={review.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-secondary-900">{review.product}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-secondary-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">"{review.comment}"</p>
                  <div className="flex items-center gap-1 text-xs text-secondary-400">
                    <Clock className="w-3 h-3" />
                    {review.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

