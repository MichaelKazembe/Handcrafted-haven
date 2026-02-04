import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Handcrafted Haven</h4>
          <p style={styles.footerText}>Supporting local artisans since 2025</p>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Quick Links</h4>
          <a href="/about" style={styles.footerLink}>About Us</a>
          <a href="/products" style={styles.footerLink}>Products</a>
          <a href="/contact" style={styles.footerLink}>Contact</a>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Contact</h4>
          <p style={styles.footerText}>Email: info@handcraftedhaven.com</p>
          <p style={styles.footerText}>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>© 2025 Handcrafted Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  footer: { backgroundColor: "#6D4C41", color: "white", padding: "40px 40px 20px", marginTop: "auto" },
  footerContent: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto 30px" },
  footerSection: { display: "flex", flexDirection: "column", gap: "10px" },
  footerTitle: { fontSize: "18px", marginBottom: "10px", color: "#FFB74D" },
  footerText: { fontSize: "14px", color: "#E0E0E0", margin: "5px 0" },
  footerLink: { fontSize: "14px", color: "#E0E0E0", textDecoration: "none", margin: "5px 0" },
  footerBottom: { borderTop: "1px solid #8D6E63", paddingTop: "20px", textAlign: "center", fontSize: "14px", color: "#E0E0E0" },
};