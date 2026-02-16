'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { 
  Star, 
  MessageSquare,
  Clock,
  Filter,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock reviews data
const initialReviews = [
  {
    id: 1,
    productId: 1,
    productName: 'Hand-Painted Ceramic Mug',
    productImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    reviewerName: 'John Smith',
    reviewerEmail: 'john@example.com',
    rating: 5,
    comment: 'Absolutely beautiful! The colors are even more vibrant in person. Fast shipping too.',
    date: '2024-01-15',
    status: 'approved',
    helpful: 3,
  },
  {
    id: 2,
    productId: 1,
    productName: 'Hand-Painted Ceramic Mug',
    productImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    reviewerName: 'Sarah Johnson',
    reviewerEmail: 'sarah@example.com',
    rating: 4,
    comment: 'Great quality and design. The handle is a bit smaller than expected but overall very satisfied.',
    date: '2024-01-14',
    status: 'approved',
    helpful: 1,
  },
  {
    id: 3,
    productId: 2,
    productName: 'Woven Wool Blanket',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    reviewerName: 'Mike Wilson',
    reviewerEmail: 'mike@example.com',
    rating: 5,
    comment: 'Incredibly warm and cozy! Perfect for cold winter nights. The craftsmanship is outstanding.',
    date: '2024-01-13',
    status: 'approved',
    helpful: 5,
  },
  {
    id: 4,
    productId: 3,
    productName: 'Silver Handcrafted Ring',
    productImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    reviewerName: 'Emily Brown',
    reviewerEmail: 'emily@example.com',
    rating: 3,
    comment: 'The ring is beautiful but slightly smaller than expected. Might need to resize.',
    date: '2024-01-12',
    status: 'pending',
    helpful: 0,
  },
  {
    id: 5,
    productId: 4,
    productName: 'Ceramic Flower Vase',
    productImage: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    reviewerName: 'David Lee',
    reviewerEmail: 'david@example.com',
    rating: 5,
    comment: 'Perfect addition to my home decor. The glaze is stunning!',
    date: '2024-01-11',
    status: 'approved',
    helpful: 2,
  },
  {
    id: 6,
    productId: 1,
    productName: 'Hand-Painted Ceramic Mug',
    productImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    reviewerName: 'Lisa Chen',
    reviewerEmail: 'lisa@example.com',
    rating: 2,
    comment: 'The design is nice but there was a small chip on the rim when it arrived.',
    date: '2024-01-10',
    status: 'flagged',
    helpful: 0,
  },
];

const statusFilters = ['All', 'approved', 'pending', 'flagged'];

export default function DashboardReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesStatus = selectedStatus === 'All' || review.status === selectedStatus;
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    fiveStars: reviews.filter(r => r.rating === 5).length,
    fourStars: reviews.filter(r => r.rating === 4).length,
    threeStars: reviews.filter(r => r.rating === 3).length,
    twoStars: reviews.filter(r => r.rating === 2).length,
    oneStar: reviews.filter(r => r.rating === 1).length,
    pending: reviews.filter(r => r.status === 'pending').length,
    flagged: reviews.filter(r => r.status === 'flagged').length,
  };

  // Handle status change
  const handleStatusChange = (reviewId: number, newStatus: 'approved' | 'pending' | 'flagged') => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'w-4 h-4',
              star <= rating ? 'text-yellow-400 fill-current' : 'text-secondary-200'
            )}
          />
        ))}
      </div>
    );
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'flagged':
        return <Badge variant="error">Flagged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout sellerName="Maria" storeName="Handcrafted Haven">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900">Reviews & Ratings</h2>
        <p className="text-secondary-500">Manage customer feedback on your products</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
                <p className="text-sm text-secondary-500">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{stats.averageRating}</p>
                <p className="text-sm text-secondary-500">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{stats.fiveStars}</p>
                <p className="text-sm text-secondary-500">5-Star Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{stats.pending + stats.flagged}</p>
                <p className="text-sm text-secondary-500">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card className="bg-white mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-secondary-900 mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = rating === 5 ? stats.fiveStars :
                           rating === 4 ? stats.fourStars :
                           rating === 3 ? stats.threeStars :
                           rating === 2 ? stats.twoStars : stats.oneStar;
              const percentage = (count / stats.total) * 100;
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-secondary-700">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 h-3 bg-secondary-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-secondary-500 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
                selectedStatus === status
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
              )}
            >
              {status}
              {status === 'pending' && stats.pending > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                  {stats.pending}
                </span>
              )}
              {status === 'flagged' && stats.flagged > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {stats.flagged}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Info */}
                <div className="flex items-start gap-4 lg:w-64">
                  <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                    {review.productImage ? (
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-secondary-300" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 line-clamp-2">{review.productName}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-secondary-500 ml-1">({review.rating}.0)</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-secondary-900">{review.reviewerName}</p>
                      <p className="text-sm text-secondary-500">{review.reviewerEmail}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(review.status)}
                    </div>
                  </div>
                  
                  <p className="text-secondary-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-secondary-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                      {review.helpful > 0 && (
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {review.helpful} found this helpful
                        </span>
                      )}
                    </div>
                    
                    {/* Status Actions */}
                    <div className="flex items-center gap-2">
                      {review.status !== 'approved' && (
                        <Button
                          onClick={() => handleStatusChange(review.id, 'approved')}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      {review.status !== 'flagged' && (
                        <Button
                          onClick={() => handleStatusChange(review.id, 'flagged')}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Flag
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">No reviews found</h3>
          <p className="text-secondary-500">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
}

