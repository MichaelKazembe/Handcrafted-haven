'use server'

import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  // 1. Quem é o dono deste produto? (Pegamos do Cookie seguro)
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  if (!sellerId) {
    redirect('/login'); // Se não tiver logado, expulsa
  }

  // 2. Pegar os dados do formulário
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  const categoryId = formData.get('category') as string;
  const stock = formData.get('stock') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // 3. Inserir no Banco de Dados
  try {
    await query(
      `INSERT INTO products (seller_id, category_id, name, price, description, stock_quantity, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [sellerId, categoryId, name, price, description, stock, imageUrl]
    );
    
    // Importante: Avisar o Next.js que a Home Page e o Dashboard mudaram (para atualizar o cache)
    revalidatePath('/');
    revalidatePath('/dashboard');

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return { success: false, message: 'Failed to add product.' };
  }

  // 4. Voltar para o Dashboard
  redirect('/dashboard?success=true');
}


export async function logout() {
  // 1. Acessar os cookies
  const cookieStore = await cookies();
  
  // 2. Deletar o cookie de sessão
  cookieStore.delete('seller_id');
  
  // 3. Redirecionar o usuário para a Home Page
  redirect('/');
}