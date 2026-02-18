import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get("seller_id");

    let products;
    if (sellerId) {
      // Fetch products for a specific seller
      products = await db.products.findBySeller(sellerId);
    } else {
      // Fetch all active products
      products = await db.products.findAll();
    }

    return NextResponse.json(products || []);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sellerId = cookieStore.get("seller_id")?.value;

    if (!sellerId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { name, price, stock, category, imageUrl, description } = body;

    // Validate required fields
    if (!name || !price || !stock || !category || !imageUrl || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create product in database
    const product = await db.products.create({
      seller_id: sellerId,
      category_id: parseInt(category, 10),
      name,
      description,
      price: parseFloat(price),
      stock_quantity: parseInt(stock, 10),
      image_url: imageUrl,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 },
    );
  }
}
