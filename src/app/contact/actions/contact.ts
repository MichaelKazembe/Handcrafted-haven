'use server'

import { query } from '@/lib/db';
import { redirect } from 'next/navigation';
// import nodemailer from 'nodemailer'; // <--- Desligado por enquanto

export async function submitContactForm(formData: FormData) {
  
  // 1. Capturar os dados do HTML
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('--- INICIANDO PROCESSO DE CONTATO ---');
  console.log('Dados recebidos:', { name, email, message });

  try {
    // 2. Salvar no PostgreSQL
    // O comando "RETURNING id" devolve o ID gerado, útil para confirmar que gravou
    const sql = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id';
    const result = await query(sql, [name, email, message]);

    console.log('✅ SUCESSO! Salvo no banco com ID:', result.rows[0].id);

    /* // 3. Parte do E-mail (COMENTADA PARA TESTE)
    // Aqui virá o código do nodemailer depois...
    */

  } catch (error) {
    console.error('❌ ERRO ao salvar no banco:', error);
    throw new Error('Erro ao processar formulário');
  }

  // 4. Se deu tudo certo, redireciona ou recarrega
  redirect('/?success=true');
}