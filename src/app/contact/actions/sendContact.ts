'use server'

import { query } from '@/lib/db'; 
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';

export async function sendContactMessage(formData: FormData) {
  
  // 1. Extract data from the HTML form
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Basic validation: Ensure all fields are present
  if (!name || !email || !message) {
    throw new Error('All fields are required');
  }

  try {
    // ---------------------------------------------------------
    // STEP 1: SAVE TO DATABASE (PostgreSQL)
    // ---------------------------------------------------------
    console.log('💾 Saving to database...');
    
    // Insert data and return the generated ID to track the record
    const sql = `
      INSERT INTO contacts (name, email, message) 
      VALUES ($1, $2, $3) 
      RETURNING id
    `;
    const result = await query(sql, [name, email, message]);
    const savedId = result.rows[0].id;
    
    console.log(`✅ Successfully saved to DB with ID: ${savedId}`);

    // ---------------------------------------------------------
    // STEP 2: SEND EMAIL (Simulation via Ethereal.email)
    // ---------------------------------------------------------
    try {
      console.log('🧪 Generating Ethereal test account...');
      
      // Create a temporary fake account for testing (no password needed)
      const testAccount = await nodemailer.createTestAccount();

      // Configure the transporter for Ethereal
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // Auto-generated user
          pass: testAccount.pass, // Auto-generated password
        },
      });

      console.log('📧 Sending test email...');

      // Send the email (simulation)
      const info = await transporter.sendMail({
        from: '"Handcrafted Site" <no-reply@handcraftedhaven.com>', 
        to: "developer@ethereal.email", // Simulates sending to the site owner
        replyTo: email, // Allows clicking "Reply" to answer the customer
        subject: `New Message from ${name} (Ticket #${savedId})`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #6D4C41;">New Contact Request</h2>
            <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
            <p><strong>Database ID:</strong> #${savedId}</p>
            <hr />
            <h3>Message:</h3>
            <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FFB74D;">
              ${message}
            </p>
          </div>
        `,
      });

      console.log('✅ Email sent successfully (Simulation)!');
      console.log('--------------------------------------------------');
      // CRITICAL: This link allows you to view the "sent" email in the browser
      console.log('📬 CLICK HERE TO PREVIEW EMAIL:', nodemailer.getTestMessageUrl(info));
      console.log('--------------------------------------------------');
      
    } catch (emailError) {
      // If email fails, we log it but do NOT crash the app, 
      // because the data is already safe in the database.
      console.error('⚠️ Warning: Contact saved to DB, but email failed to send.', emailError);
    }

  } catch (dbError) {
    // If the Database fails, this is a critical error.
    console.error('❌ Critical Database Error:', dbError);
    throw new Error('Failed to save message.');
  }

  // 3. Redirect user to the contact page with a success flag
  redirect('/contact?success=true');
}