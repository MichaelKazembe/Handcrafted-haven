"use server";

import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function registerSeller(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const storeName = formData.get("storeName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone_number") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !storeName || !email || !password) {
    return { success: false, message: "All required fields must be filled." };
  }

  try {
    // Check if email already exists
    const existingSeller = await db.sellers.findByEmail(email);

    if (existingSeller) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new seller
    const result = await db.sellers.create({
      first_name: firstName,
      last_name: lastName,
      store_name: storeName,
      email,
      phone_number: phone,
      password_hash: hashedPassword,
    });

    const sellerId = result.seller_id;

    // Set cookie for login
    const cookieStore = await cookies();
    cookieStore.set("seller_id", sellerId.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    redirect("/dashboard");
  } catch (error) {
    // Re-throw redirect errors so they can be handled properly
    const redirectError = error as { digest?: string };
    if (
      redirectError.digest &&
      redirectError.digest.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Error registering seller:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}
