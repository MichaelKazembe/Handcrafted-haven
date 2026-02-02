'use server'

import { query } from '@/lib/db'; // Importe a sua conexão do banco aqui (ajuste o caminho se necessário)
import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';

export async function sendContactMessage(formData: FormData) {
  
  // 1. Pegar os dados do formulário HTML
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Validação simples
  if (!name || !email || !message) {
    throw new Error('Por favor, preencha todos os campos.');
  }

  try {
    // ---------------------------------------------------------
    // AÇÃO 1: SALVAR NO BANCO DE DADOS (PostgreSQL)
    // ---------------------------------------------------------
    console.log('💾 A salvar no banco...');
    await query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    // ---------------------------------------------------------
    // AÇÃO 2: ENVIAR O E-MAIL
    // ---------------------------------------------------------
    console.log('📧 A enviar e-mail...');
    
    // Configuração do "Transportador" (Exemplo com Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou use host: 'smtp.office365.com' para Outlook
      auth: {
        user: process.env.EMAIL_USER, // Coloque no seu .env: EMAIL_USER=seu@gmail.com
        pass: process.env.EMAIL_PASS, // Coloque no seu .env: EMAIL_PASS=senha_de_app_gerada
      },
    });

    // O E-mail em si
    await transporter.sendMail({
      from: '"Site Contact" <seu_email_no_env@gmail.com>', 
      to: 'seu_email_pessoal@gmail.com', // Para onde vai o aviso?
      subject: `Nova mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Nova mensagem recebida!</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
          ${message}
        </blockquote>
      `,
    });

    console.log('✅ Tudo feito com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao processar formulário:', error);
    // Em produção, você retornaria um erro visual para o usuário
    throw new Error('Falha ao enviar mensagem');
  }

  // Se tudo der certo, redireciona ou atualiza
  redirect('/contact?success=true');
}