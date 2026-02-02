import React from 'react';
import { sendContactMessage } from '@/app/contact/actions/sendContact';

export default function ContactPage() {
  return (
    <section style={styles.formSection}>
      <div style={styles.formContainer}>
        <h2 style={styles.sectionTitle}>Get in Touch</h2>
        <p style={styles.formDescription}>
          Have questions? Fill out the form below.
        </p>

        <form action={sendContactMessage} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input type="text" name="name" required placeholder="Your full name" style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" name="email" required placeholder="you@email.com" style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Message</label>
            <textarea name="message" required rows={5} placeholder="How can we help you?" style={styles.textarea}></textarea>
          </div>

          <button type="submit" style={styles.submitBtn}>Send Message</button>
        </form>
      </div>
    </section>
  );
}


const styles: { [key: string]: React.CSSProperties } = {
  formSection: { display: "flex", justifyContent: "center", alignItems: "center", padding: "60px 20px", backgroundColor: "#F5F5F5", height: "100%" },
  formContainer: { backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "600px", border: "1px solid #E0E0E0" },
  sectionTitle: { fontSize: "32px", textAlign: "center", marginBottom: "15px", color: "#333", marginTop: 0 },
  formDescription: { textAlign: "center", color: "#666", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontWeight: "bold", color: "#4A4A4A", fontSize: "14px" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #CCCCCC", fontSize: "16px", backgroundColor: "#FFFFFF", color: "#000000" },
  textarea: { padding: "12px", borderRadius: "6px", border: "1px solid #CCCCCC", fontSize: "16px", resize: "vertical", backgroundColor: "#FFFFFF", color: "#000000" },
  submitBtn: { backgroundColor: "#FFB74D", color: "white", padding: "15px", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
};