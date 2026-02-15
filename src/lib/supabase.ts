import { createClient } from "@supabase/supabase-js";

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function for server-side operations with service role
// Note: Only use this in server actions where you need admin privileges
export const createServerClient = () => {
  const serviceRoleKey = process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("Service role key is not configured");
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

// Database query helper functions using Supabase
export const db = {
  // Sellers operations
  sellers: {
    findById: async (sellerId: string) => {
      const { data, error } = await supabase
        .from("sellers")
        .select("*")
        .eq("seller_id", sellerId)
        .single();

      if (error) throw error;
      return data;
    },

    findByEmail: async (email: string) => {
      const { data, error } = await supabase
        .from("sellers")
        .select("seller_id")
        .eq("email", email)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 is "not found"
      return data;
    },

    create: async (sellerData: {
      first_name: string;
      last_name: string;
      store_name: string;
      email: string;
      phone: string;
      password_hash: string;
    }) => {
      const { data, error } = await supabase
        .from("sellers")
        .insert(sellerData)
        .select("seller_id")
        .single();

      if (error) throw error;
      return data;
    },
  },

  // Categories operations
  categories: {
    findAll: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  },

  // Products operations
  products: {
    create: async (productData: {
      seller_id: string;
      category_id: number;
      name: string;
      description: string;
      price: number;
      stock_quantity: number;
      image_url: string;
    }) => {
      const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },

    findBySeller: async (sellerId: string) => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name
          )
        `,
        )
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },

    findAll: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name
          ),
          sellers (
            store_name
          )
        `,
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },

    findById: async (productId: string) => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name
          ),
          sellers (
            store_name
          )
        `,
        )
        .eq("product_id", productId)
        .single();

      if (error) throw error;
      return data;
    },

    findByCategory: async (categoryId: string) => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            name
          ),
          sellers (
            store_name
          )
        `,
        )
        .eq("category_id", categoryId)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  },
};
