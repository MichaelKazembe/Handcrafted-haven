import { cookies } from 'next/headers';
import { db } from '@/lib/supabase';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  // 1. Check if the login cookie exists
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  // 2. If there is a cookie, fetch seller data
  let sellerName: string | undefined;
  let isLoggedIn = false;

  if (sellerId) {
    try {
      const seller = await db.sellers.findById(sellerId);
      if (seller) {
        sellerName = seller.first_name;
        isLoggedIn = true;
      }
    } catch (error) {
      // If there's an error fetching seller, treat as not logged in
      console.error('Error fetching seller in Navbar:', error);
      isLoggedIn = false;
    }
  }

  // 3. Render the client component with seller info
  return <NavbarClient sellerName={sellerName} isLoggedIn={isLoggedIn} />;
}

