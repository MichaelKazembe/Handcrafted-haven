import { createClient } from "@supabase/supabase-js";

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if Supabase is configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');

// Create Supabase client (with fallback for unconfigured state)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

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

    findByEmailWithPassword: async (email: string) => {
      const { data, error } = await supabase
        .from("sellers")
        .select("seller_id, email, password_hash, first_name, store_name")
        .eq("email", email)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },

    create: async (sellerData: {
      first_name: string;
      last_name: string;
      store_name: string;
      email: string;
      phone_number: string;
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
      // Use service role client to bypass RLS for admin operations
      const adminClient = createServerClient();
      const { data, error } = await adminClient
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

    delete: async (productId: number, sellerId: string) => {
      // Use service role client to bypass RLS for admin operations
      const adminClient = createServerClient();
      const { error } = await adminClient
        .from("products")
        .delete()
        .eq("product_id", productId)
        .eq("seller_id", sellerId);

      if (error) throw error;
      return { success: true };
    },
  },

  // Stats operations
  stats: {
    getSellerStats: async (sellerId: string) => {
      // Get product count
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("product_id", { count: "exact" })
        .eq("seller_id", sellerId);

      if (productsError) throw productsError;

      // Get review count and average rating for seller's products
      const { data: productsWithReviews, error: reviewsError } = await supabase
        .from("products")
        .select(`
          product_id,
          reviews (
            review_id,
            rating
          )
        `)
        .eq("seller_id", sellerId);

      if (reviewsError) throw reviewsError;

      // Calculate stats
      let totalReviews = 0;
      let totalRating = 0;
      let reviewCount = 0;

      productsWithReviews?.forEach((product: any) => {
        if (product.reviews) {
          totalReviews += product.reviews.length;
          product.reviews.forEach((review: any) => {
            totalRating += review.rating || 0;
            reviewCount++;
          });
        }
      });

      const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

      return {
        totalProducts: productsData?.length || 0,
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
      };
    },

    getRecentProducts: async (sellerId: string, limit: number = 5) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },

    getRecentReviews: async (sellerId: string, limit: number = 5) => {
      // First get seller's products
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("product_id, name")
        .eq("seller_id", sellerId);

      if (productsError) throw productsError;

      if (!products || products.length === 0) {
        return [];
      }

      const productIds = products.map((p) => p.product_id);
      const productMap = products.reduce((acc, p) => {
        acc[p.product_id] = p.name;
        return acc;
      }, {} as Record<number, string>);

      // Get reviews for these products
      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .in("product_id", productIds)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (reviewsError) throw reviewsError;

      // Add product name to reviews
      return reviews?.map((review) => ({
        ...review,
        product_name: productMap[review.product_id] || "Unknown Product",
      }));
    },
  },
};
