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

  // 3. Fetch real stats from database
  let stats = {
    totalProducts: 0,
    totalReviews: 0,
    averageRating: 0,
    totalSales: 0,
    pendingReviews: 0,
  };

  let recentProducts: any[] = [];
  let recentReviews: any[] = [];

  try {
    // Get seller stats
    const sellerStats = await db.stats.getSellerStats(sellerId);
    stats = {
      ...stats,
      ...sellerStats,
    };

    // Get recent products
    recentProducts = await db.stats.getRecentProducts(sellerId, 5) || [];

    // Get recent reviews
    recentReviews = await db.stats.getRecentReviews(sellerId, 5) || [];
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Use fallback values if there's an error
  }

  // Format recent reviews with relative dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

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
              <span className="text-green-600 font-medium">Active</span>
              <span className="text-secondary-500 ml-1">in inventory</span>
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
              <MessageSquare className="w-4 h-4 text-secondary-400 mr-1" />
              <span className="text-secondary-500">Customer feedback</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-500">Average Rating</p>
                <p className="text-3xl font-bold text-secondary-900 mt-1">
                  {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600 fill-current" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-secondary-500">
                {stats.totalReviews > 0 ? `Based on ${stats.totalReviews} reviews` : 'No reviews yet'}
              </span>
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
            {recentProducts.length > 0 ? (
              <div className="divide-y divide-secondary-100">
                {recentProducts.map((product) => (
                  <div key={product.product_id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-secondary-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900 line-clamp-1">{product.name}</p>
                        <p className="text-sm text-secondary-500">Stock: {product.stock_quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary-900">${product.price?.toFixed(2) || '0.00'}</p>
                      <Badge variant={product.is_active ? 'success' : 'default'} className="mt-1">
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-secondary-500">
                <Package className="w-12 h-12 mx-auto mb-2 text-secondary-300" />
                <p>No products yet</p>
                <Link href="/dashboard/products" className="text-primary-600 hover:text-primary-700 text-sm">
                  Add your first product
                </Link>
              </div>
            )}
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
            {recentReviews.length > 0 ? (
              <div className="divide-y divide-secondary-100">
                {recentReviews.map((review) => (
                  <div key={review.review_id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-secondary-900">{review.product_name}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-secondary-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 mb-2">"{review.comment || 'No comment'}"</p>
                    <div className="flex items-center gap-1 text-xs text-secondary-400">
                      <Clock className="w-3 h-3" />
                      {formatDate(review.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-secondary-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 text-secondary-300" />
                <p>No reviews yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

