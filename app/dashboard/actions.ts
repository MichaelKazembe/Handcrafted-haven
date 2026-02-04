'use server'

import { query } from '../../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  // 1. Who is the owner of this product? (We get it from the secure cookie)
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  if (!sellerId) {
    redirect('/login'); // If not logged in, kick the user out
  }

  // 2. Get the form data
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  const categoryId = formData.get('category') as string;
  const stock = formData.get('stock') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // 3. Insert into the database
  try {
    await query(
      `INSERT INTO products (seller_id, category_id, name, price, description, stock_quantity, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [sellerId, categoryId, name, price, description, stock, imageUrl]
    );
    
    // Important: Notify Next.js that the Home Page and Dashboard have changed (to refresh the cache)
    revalidatePath('/');
    revalidatePath('/dashboard');

  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, message: 'Failed to add product.' };
  }

  // 4. Redirect back to the Dashboard
  redirect('/dashboard?success=true');
}

export async function logout() {
  // 1. Access the cookies
  const cookieStore = await cookies();
  
  // 2. Delete the session cookie
  cookieStore.delete('seller_id');
  
  // 3. Redirect the user to the Home Page
  redirect('/');
}
