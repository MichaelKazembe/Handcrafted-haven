'use server'

import { query } from '../../../lib/db';
import { redirect } from 'next/navigation';


export async function submitContactForm(formData: FormData) {
  
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('--- INICIANDO PROCESSO DE CONTATO ---');
  console.log('Dados recebidos:', { name, email, message });

  try {
    
    const sql = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id';
    const result = await query(sql, [name, email, message]);

    console.log('✅ SUCESSO! Salvo no banco com ID:', result.rows[0].id);

   

  } catch (error) {
    console.error('❌ ERRO ao salvar no banco:', error);
    throw new Error('Erro ao processar formulário');
  }

 
  redirect('/?success=true');
}