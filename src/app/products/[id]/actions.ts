"use server";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Review, ReviewFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Mock reviews storage for when Supabase is not configured
let mockReviews: Review[] = [
  {
    review_id: 1,
    product_id: 1,
    reviewer_name: "Sarah Johnson",
    reviewer_email: "sarah@example.com",
    rating: 5,
    comment: "Absolutely love this mug! The craftsmanship is exceptional and the design is beautiful.",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    review_id: 2,
    product_id: 1,
    reviewer_name: "Mike Chen",
    reviewer_email: "mike@example.com",
    rating: 4,
    comment: "Great quality ceramic. Perfect size for my morning coffee.",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let nextReviewId = 3;

/**
 * Fetch all reviews for a specific product
 */
export async function getProductReviews(
  productId: number
): Promise<Review[]> {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured) {
    return mockReviews
      .filter(r => r.product_id === productId)
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

/**
 * Submit a new review for a product
 */
export async function submitReview(
  reviewData: ReviewFormData
): Promise<{ success: boolean; error?: string }> {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured) {
    const newReview: Review = {
      review_id: nextReviewId++,
      product_id: reviewData.product_id,
      reviewer_name: reviewData.reviewer_name,
      reviewer_email: reviewData.reviewer_email,
      rating: reviewData.rating,
      comment: reviewData.comment,
      created_at: new Date().toISOString(),
    };
    mockReviews.push(newReview);
    revalidatePath(`/products/${reviewData.product_id}`);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          product_id: reviewData.product_id,
          reviewer_name: reviewData.reviewer_name,
          reviewer_email: reviewData.reviewer_email,
          rating: reviewData.rating,
          comment: reviewData.comment || null,
        },
      ]);

    if (error) {
      console.error("Error submitting review:", error);
      return { success: false, error: error.message };
    }

    // Revalidate the product page to show the new review
    revalidatePath(`/products/${reviewData.product_id}`);

    return { success: true };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, error: "Failed to submit review" };
  }
}

/**
 * Get average rating and count for a product
 */
export async function getProductRatingStats(
  productId: number
): Promise<{ averageRating: number; totalReviews: number }> {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured) {
    const productReviews = mockReviews.filter(r => r.product_id === productId);
    const totalReviews = productReviews.length;
    
    if (totalReviews === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }
    
    const sumRatings = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = sumRatings / totalReviews;
    
    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
    };
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("product_id", productId);

    if (error || !data) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const totalReviews = data.length;
    if (totalReviews === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const sumRatings = data.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = sumRatings / totalReviews;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
    };
  } catch (error) {
    console.error("Error fetching rating stats:", error);
    return { averageRating: 0, totalReviews: 0 };
  }
}
