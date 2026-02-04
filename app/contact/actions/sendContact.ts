'use server'

import { query } from '../../../lib/db'; 
import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';

export async function sendContactMessage(formData: FormData) {
  
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  
  if (!name || !email || !message) {
    throw new Error('Por favor, preencha todos os campos.');
  }

  try {
    
    console.log('💾 A salvar no banco...');
    await query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    
    console.log('📧 A enviar e-mail...');
    
   
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    
    await transporter.sendMail({
      from: '"Site Contact" <seu_email_no_env@gmail.com>', 
      to: 'seu_email_pessoal@gmail.com', 
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
    
    throw new Error('Falha ao enviar mensagem');
  }

  
  redirect('/contact?success=true');
}