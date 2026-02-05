import React from 'react';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Handcrafted Haven</h1>
      <div style={styles.navLinks}>
        <a href="/" style={styles.navLink}>Home</a>
        <a href="/products" style={styles.navLink}>Products</a>
        <a href="/categories" style={styles.navLink}>Categories</a>
        <a href="/about" style={styles.navLink}>About</a>
        <a href="/contact" style={styles.navLink}>Contact</a>
        
        <a href="/login" style={{
          ...styles.navLink, 
          border: '1px solid white', 
          padding: '8px 15px', 
          borderRadius: '4px',
          marginLeft: '10px'
        }}>
          Seller Login
        </a>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: "#6D4C41",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: "white", margin: 0, fontSize: "24px" },
  navLinks: { display: "flex", gap: "30px" },
  navLink: { color: "white", textDecoration: "none", fontSize: "16px", transition: "color 0.3s" },
};