'use server'

import { query } from '@/lib/db'; // ou '../lib/db' dependendo da sua pasta
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function registerSeller(formData: FormData) {
  // 1. Receber os dados do formulário
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const storeName = formData.get('storeName') as string;
  const phone = formData.get('phone') as string;

  // 2. Validação simples
  if (!firstName || !email || !password || !storeName) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  try {
    // 3. Verificar se o email já existe
    const checkUser = await query('SELECT * FROM sellers WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return { success: false, message: 'This email is already registered.' };
    }

    // 4. Criptografar a senha (O passo mais importante!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Inserir no Banco de Dados
    await query(
      `INSERT INTO sellers (first_name, last_name, email, password_hash, store_name, phone_number)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, hashedPassword, storeName, phone]
    );

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Database error. Please try again.' };
  }

  // 6. Se tudo der certo, redirecionar para uma página de sucesso ou login
  // Por enquanto, vamos mandar para a Home
  redirect('/?signup=success');
}