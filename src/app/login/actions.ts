"use server";

import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function loginSeller(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  try {
    // Find seller by email including password hash
    const seller = await db.sellers.findByEmailWithPassword(email);

    if (!seller) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, seller.password_hash);

    if (!isValidPassword) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Set cookie for login session
    const cookieStore = await cookies();
    cookieStore.set("seller_id", seller.seller_id.toString(), {
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
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Failed to log in. Please try again.",
    };
  }
}

