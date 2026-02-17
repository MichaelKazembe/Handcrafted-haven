'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Get products for the logged-in seller
export async function getProducts() {
  // Get seller_id from cookie
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  if (!sellerId) {
    console.log('[getProducts] No seller_id found in cookies, returning empty array');
    return [];
  }

  try {
    console.log('[getProducts] Fetching products for seller:', sellerId);
    const products = await db.products.findBySeller(sellerId);
    console.log('[getProducts] Products fetched successfully:', products?.length || 0);
    console.log('[getProducts] Products data:', JSON.stringify(products, null, 2));
    return products || [];
  } catch (error) {
    console.error('[getProducts] Error fetching products:', error);
    return [];
  }
}

export async function addProduct(formData: FormData) {
  // Get seller_id from cookie
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  if (!sellerId) {
    console.log('[addProduct] No seller_id found, redirecting to login');
    redirect('/login');
  }

  // Extract form data
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock_quantity = parseInt(formData.get('stock_quantity') as string);
  const category_id = parseInt(formData.get('category_id') as string);
  const image_url = formData.get('image_url') as string;

  console.log('[addProduct] Received form data:', { name, description, price, stock_quantity, category_id, image_url, sellerId });

  // Validate required fields
  if (!name || !description || isNaN(price) || isNaN(stock_quantity) || isNaN(category_id)) {
    console.log('[addProduct] Validation failed: Missing required fields');
    return { success: false, message: 'All fields are required.' };
  }

  try {
    // Create the product
    console.log('[addProduct] Creating product in database...');
    const newProduct = await db.products.create({
      seller_id: sellerId,
      category_id,
      name,
      description,
      price,
      stock_quantity,
      image_url: image_url || '',
    });

    console.log('[addProduct] Product created successfully:', JSON.stringify(newProduct, null, 2));

    // Revalidate the dashboard products page and public products page
    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return { success: true, message: 'Product added successfully!' };
  } catch (error) {
    console.error('[addProduct] Error adding product:', error);
    return { success: false, message: 'Failed to add product. Please try again.' };
  }
}

export async function deleteProduct(productId: number) {
  // Get seller_id from cookie
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  if (!sellerId) {
    console.log('[deleteProduct] No seller_id found, redirecting to login');
    redirect('/login');
  }

  console.log('[deleteProduct] Attempting to delete product:', { productId, sellerId });

  try {
    // Delete the product using Supabase
    const result = await db.products.delete(productId, sellerId);
    console.log('[deleteProduct] Product deleted successfully:', JSON.stringify(result, null, 2));

    // Revalidate the dashboard products page and public products page
    revalidatePath('/dashboard/products');
    revalidatePath('/products');

    return { success: true, message: 'Product deleted successfully!' };
  } catch (error) {
    console.error('[deleteProduct] Error deleting product:', error);
    return { success: false, message: 'Failed to delete product. Please try again.' };
  }
}

// Helper function to get categories for the product form
export async function getCategories() {
  try {
    const categories = await db.categories.findAll();
    console.log('[getCategories] Categories fetched:', categories?.length || 0);
    return categories;
  } catch (error) {
    console.error('[getCategories] Error fetching categories:', error);
    return [];
  }
}
