'use server'

import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'; // Necessário para criar a "sessão"
import { redirect } from 'next/navigation';

export async function loginSeller(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Please enter email and password.' };
  }

  try {
    // 1. Buscar o usuário pelo email
    const result = await query('SELECT * FROM sellers WHERE email = $1', [email]);
    const user = result.rows[0];

    // Se não achar o usuário, retornamos erro genérico (segurança)
    if (!user) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // 2. Comparar a senha digitada com o Hash do banco
    // O bcrypt faz a mágica de comparar "123456" com "$2b$10$..."
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // 3. Criar a Sessão (Cookie)
    // Aqui estamos a guardar o ID do usuário num cookie seguro
    // Nota: Em produção real, usaríamos bibliotecas como Auth.js, mas isto serve para aprender o fluxo.
    const sessionCookie = await cookies();
    sessionCookie.set('seller_id', user.seller_id.toString(), {
      httpOnly: true, // O JavaScript do navegador não consegue ler (segurança)
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana de duração
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Something went wrong.' };
  }

  // 4. Redirecionar para o Painel de Controlo (Dashboard)
  redirect('/dashboard');
}