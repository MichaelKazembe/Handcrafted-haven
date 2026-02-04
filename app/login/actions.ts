'use server'

import { query } from '../../lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'; // Required to create the "session"
import { redirect } from 'next/navigation';

export async function loginSeller(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Please enter email and password.' };
  }

  try {
    // 1. Fetch the user by email
    const result = await query(
      'SELECT * FROM sellers WHERE email = $1',
      [email]
    );
    const user = result.rows[0];

    // If the user is not found, return a generic error (security)
    if (!user) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // 2. Compare the entered password with the hash stored in the database
    // bcrypt performs the magic of comparing "123456" with "$2b$10$..."
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // 3. Create the session (cookie)
    // Here we store the user ID in a secure cookie
    // Note: In real production apps, we would use libraries like Auth.js,
    // but this is enough to understand the authentication flow.
    const sessionCookie = await cookies();
    sessionCookie.set('seller_id', user.seller_id.toString(), {
      httpOnly: true, // Browser JavaScript cannot read it (security)
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week duration
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Something went wrong.' };
  }

  // 4. Redirect to the Dashboard
  redirect('/dashboard');
}
