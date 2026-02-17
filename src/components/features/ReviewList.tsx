import { Review } from "@/lib/types";
import { StarRating } from "@/components/ui";
import { formatDate } from "@/utils/formatters";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.review_id}
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">
                {review.reviewer_name}
              </h4>
              <p className="text-sm text-gray-500">
                {review.created_at ? formatDate(review.created_at) : ""}
              </p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          {review.comment && (
            <p className="text-gray-700 mt-2">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
