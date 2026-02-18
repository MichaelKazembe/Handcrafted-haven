import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/supabase";

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

    // Fetch seller data
    const seller = await db.sellers.findById(sellerId);

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      first_name: seller.first_name,
      store_name: seller.store_name,
    });
  } catch (error) {
    console.error("Error fetching seller info:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller info" },
      { status: 500 }
    );
  }
}

