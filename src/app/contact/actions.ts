'use server';

import { supabase, createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendContactMessage(formData: FormData) {
  const supabaseClient = createServerClient();
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    throw new Error('Please fill in all required fields.');
  }

  try {
    const { error } = await supabaseClient
      .from('contacts')
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save message.');
    }

    revalidatePath('/contact');
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw new Error('Failed to send message. Please try again.');
  }

  redirect('/contact?success=true');
}

