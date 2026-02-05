'use server'

import { query } from '../../lib/db'; // or '../lib/db' depending on your folder structure
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function registerSeller(formData: FormData) {
  // 1. Receive form data
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const storeName = formData.get('storeName') as string;
  const phone = formData.get('phone') as string;

  // 2. Basic validation
  if (!firstName || !email || !password || !storeName) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  try {
    // 3. Check if the email already exists
    const checkUser = await query(
      'SELECT * FROM sellers WHERE email = $1',
      [email]
    );
    if (checkUser.rows.length > 0) {
      return { success: false, message: 'This email is already registered.' };
    }

    // 4. Hash the password (The most important step!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Insert into the database
    await query(
      `INSERT INTO sellers (first_name, last_name, email, password_hash, store_name, phone_number)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, hashedPassword, storeName, phone]
    );

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Database error. Please try again.' };
  }

  // 6. If everything goes well, redirect to a success or login page
  // For now, redirect to the Home page
  redirect('/?signup=success');
}
