import React from 'react';

export default function Home() {
  return (
    <main style={styles.main}>
      
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <h1 style={styles.logo}>Handcrafted Haven</h1>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Products</a>
          <a href="/categories" style={styles.navLink}>Categories</a>
          <a href="/about" style={styles.navLink}>About</a>
          <a href="/contact" style={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h2 style={styles.heroTitle}>Where Handmade Stories Come to Life</h2>
          <p style={styles.heroDescription}>
            Discover unique, handcrafted products made with passion by local artisans. 
            From home décor to accessories, every item tells a story.
          </p>
          <div style={styles.buttonGroup}>
            <a href="/products" style={styles.primaryBtn}>Browse Products</a>
            <a href="/signup" style={styles.secondaryBtn}>Sign Up as Seller</a>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categoryGrid}>
          <div style={styles.categoryCard}>
            <div style={styles.categoryIcon}>🏺</div>
            <h3 style={styles.categoryTitle}>Pottery</h3>
            <p style={styles.categoryDesc}>Handmade ceramics and pottery</p>
          </div>
          <div style={styles.categoryCard}>
            <div style={styles.categoryIcon}>💍</div>
            <h3 style={styles.categoryTitle}>Jewelry</h3>
            <p style={styles.categoryDesc}>Unique handcrafted accessories</p>
          </div>
          <div style={styles.categoryCard}>
            <div style={styles.categoryIcon}>🧶</div>
            <h3 style={styles.categoryTitle}>Textiles</h3>
            <p style={styles.categoryDesc}>Woven and knitted goods</p>
          </div>
          <div style={styles.categoryCard}>
            <div style={styles.categoryIcon}>🖼️</div>
            <h3 style={styles.categoryTitle}>Art</h3>
            <p style={styles.categoryDesc}>Original paintings and prints</p>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productGrid}>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Ceramic Vase</h3>
            <p style={styles.productPrice}>$45.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Handwoven Basket</h3>
            <p style={styles.productPrice}>$32.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Silver Necklace</h3>
            <p style={styles.productPrice}>$68.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Wall Art Print</h3>
            <p style={styles.productPrice}>$55.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Knitted Scarf</h3>
            <p style={styles.productPrice}>$38.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
          <div style={styles.productCard}>
            <div style={styles.productImage}>📦</div>
            <h3 style={styles.productTitle}>Clay Bowl Set</h3>
            <p style={styles.productPrice}>$52.00</p>
            <button style={styles.productBtn}>View Details</button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

    </main>
  );
}

const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
    margin: 0,
  },
  // Navigation
  nav: {
    backgroundColor: "#6D4C41",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "white",
    margin: 0,
    fontSize: "24px",
  },
  navLinks: {
    display: "flex",
    gap: "30px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
  // Hero Section
  hero: {
    backgroundImage: "linear-gradient(rgba(109, 76, 65, 0.7), rgba(109, 76, 65, 0.7)), url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"%23D7CCC8\"/%3E%3C/svg%3E')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroOverlay: {
    textAlign: "center" as const,
    padding: "80px 20px",
    maxWidth: "900px",
  },
  heroTitle: {
    fontSize: "42px",
    color: "white",
    marginBottom: "20px",
  },
  heroDescription: {
    fontSize: "18px",
    color: "white",
    marginBottom: "30px",
  },
  buttonGroup: {
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  primaryBtn: {
    backgroundColor: "#FFB74D",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
  },
  secondaryBtn: {
    backgroundColor: "#A1887F",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
  },
  // Sections
  categorySection: {
    padding: "60px 40px",
    backgroundColor: "white",
  },
  productsSection: {
    padding: "60px 40px",
    backgroundColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: "32px",
    textAlign: "center" as const,
    marginBottom: "40px",
    color: "#333",
  },
  // Category Cards
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  categoryCard: {
    backgroundColor: "#FAFAFA",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center" as const,
    border: "1px solid #E0E0E0",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  categoryIcon: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  categoryTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  },
  categoryDesc: {
    fontSize: "14px",
    color: "#666",
  },
  // Product Grid
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center" as const,
    border: "1px solid #E0E0E0",
    transition: "box-shadow 0.3s",
  },
  productImage: {
    fontSize: "60px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  productTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  productPrice: {
    fontSize: "20px",
    color: "#FFB74D",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  productBtn: {
    backgroundColor: "#6D4C41",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  // Footer
  footer: {
    backgroundColor: "#6D4C41",
    color: "white",
    padding: "40px 40px 20px",
  },
  footerContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
  },
  footerSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  footerTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#FFB74D",
  },
  footerText: {
    fontSize: "14px",
    color: "#E0E0E0",
    margin: "5px 0",
  },
  footerLink: {
    fontSize: "14px",
    color: "#E0E0E0",
    textDecoration: "none",
    margin: "5px 0",
  },
  footerBottom: {
    borderTop: "1px solid #8D6E63",
    paddingTop: "20px",
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#E0E0E0",
  },
};
