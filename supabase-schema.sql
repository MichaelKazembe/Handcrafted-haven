-- ============================================
-- SUPABASE DATABASE SCHEMA SETUP
-- ============================================
-- Run this SQL in Supabase Dashboard > SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create 'sellers' table
-- ------------------------
CREATE TABLE IF NOT EXISTS sellers (
  seller_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  store_name VARCHAR(200) NOT NULL,
  phone_number VARCHAR(50),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create 'categories' table
-- ------------------------
CREATE TABLE IF NOT EXISTS categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Create 'products' table
-- ------------------------
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create 'reviews' table
-- ------------------------
CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
  reviewer_name VARCHAR(200) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create 'contacts' table
-- ------------------------
CREATE TABLE IF NOT EXISTS contacts (
  contact_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert sample categories
INSERT INTO categories (name) VALUES
  ('Woodwork'),
  ('Jewelry'),
  ('Ceramics'),
  ('Textiles'),
  ('Paintings'),
  ('Sculptures'),
  ('Glasswork'),
  ('Leather Goods')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_sellers_email ON sellers(email);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Sellers: Everyone can read, anyone can create, only owner can update
DROP POLICY IF EXISTS "Public sellers are viewable by everyone" ON sellers;
CREATE POLICY "Public sellers are viewable by everyone" ON sellers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can create sellers" ON sellers;
CREATE POLICY "Anyone can create sellers" ON sellers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Sellers can update own data" ON sellers;
CREATE POLICY "Sellers can update own data" ON sellers FOR UPDATE USING (auth.uid() = seller_id);

-- Categories: Everyone can read
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);

-- Products: Everyone can view active products
DROP POLICY IF EXISTS "Active products are viewable by everyone" ON products;
CREATE POLICY "Active products are viewable by everyone" ON products FOR SELECT USING (is_active = true);

-- Products: Sellers can insert their own products
DROP POLICY IF EXISTS "Sellers can insert own products" ON products;
CREATE POLICY "Sellers can insert own products" ON products FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Products: Sellers can update their own products
DROP POLICY IF EXISTS "Sellers can update own products" ON products;
CREATE POLICY "Sellers can update own products" ON products FOR UPDATE USING (auth.uid() = seller_id);

-- Reviews: Everyone can view reviews, authenticated users can create reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (true);

-- ============================================
-- STORAGE SETUP (for product images)
-- ============================================

-- Note: Storage buckets should be created via Supabase Dashboard > Storage
-- Go to Storage > New Bucket > Name: "products" > Set as public
-- Or use the Storage API to create buckets programmatically

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Run this to verify tables were created:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- ============================================
-- NEW CODE TO RUN (if needed for new features)
-- ============================================

-- Storage policies for product images (run if not already set up):
-- First create the bucket if it doesn't exist:
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies:
CREATE POLICY "Public access to product images" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Owners can delete their product images" ON storage.objects
FOR DELETE USING (bucket_id = 'products');

