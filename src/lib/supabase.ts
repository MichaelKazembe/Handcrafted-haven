import { createClient } from '@supabase/supabase-js';

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
    throw new Error('Service role key is not configured');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

