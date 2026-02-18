import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerIdParam = searchParams.get("seller_id");

    // If seller_id is provided as query param, fetch that seller's public profile
    if (sellerIdParam) {
      const seller = await db.sellers.findById(sellerIdParam);

      if (!seller) {
        return NextResponse.json(
          { error: "Seller not found" },
          { status: 404 }
        );
      }

      // Get seller stats
      const stats = await db.stats.getSellerStats(sellerIdParam);

      return NextResponse.json({
        seller_id: seller.seller_id,
        first_name: seller.first_name,
        last_name: seller.last_name,
        store_name: seller.store_name,
        phone_number: seller.phone_number,
        email: seller.email,
        created_at: seller.created_at,
        totalProducts: stats.totalProducts,
        averageRating: stats.averageRating,
        totalReviews: stats.totalReviews,
      });
    }

    // Otherwise, get the logged-in seller's profile
    const cookieStore = await cookies();
    const sellerId = cookieStore.get("seller_id")?.value;

    if (!sellerId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Fetch seller data
    const seller = await db.sellers.findById(sellerId);

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    // Get seller stats
    const stats = await db.stats.getSellerStats(sellerId);

    return NextResponse.json({
      seller_id: seller.seller_id,
      first_name: seller.first_name,
      last_name: seller.last_name,
      store_name: seller.store_name,
      phone_number: seller.phone_number,
      email: seller.email,
      created_at: seller.created_at,
      totalProducts: stats.totalProducts,
      averageRating: stats.averageRating,
      totalReviews: stats.totalReviews,
    });
  } catch (error) {
    console.error("Error fetching seller info:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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

    const body = await request.json();
    const { first_name, last_name, store_name, phone_number } = body;

    // Update seller data
    const updatedSeller = await db.sellers.update(sellerId, {
      first_name,
      last_name,
      store_name,
      phone_number,
    });

    return NextResponse.json({
      success: true,
      data: {
        seller_id: updatedSeller.seller_id,
        first_name: updatedSeller.first_name,
        last_name: updatedSeller.last_name,
        store_name: updatedSeller.store_name,
        phone_number: updatedSeller.phone_number,
      },
    });
  } catch (error) {
    console.error("Error updating seller info:", error);
    return NextResponse.json(
      { error: "Failed to update seller info" },
      { status: 500 }
    );
  }
}

