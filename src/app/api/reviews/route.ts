import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    // Get seller ID from cookie
    const cookieStore = await cookies();
    const sellerId = cookieStore.get("seller_id")?.value;

    if (!sellerId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured) {
      return NextResponse.json([]);
    }

    // Fetch reviews for seller's products
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(`
        *,
        products (
          product_id,
          name,
          image_url,
          seller_id
        )
      `)
      .eq("products.seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const transformedReviews = reviews?.map((review) => ({
      id: review.review_id,
      productId: review.product_id,
      productName: review.products?.name || "Unknown Product",
      productImage: review.products?.image_url || null,
      reviewerName: review.customer_name || "Anonymous",
      reviewerEmail: review.customer_email || "",
      rating: review.rating,
      comment: review.comment || "",
      date: review.created_at,
      status: review.status || "pending",
      helpful: 0,
    })) || [];

    return NextResponse.json(transformedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

