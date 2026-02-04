import React from 'react';
import { query } from '../lib/db';
import Image from 'next/image';

type Product = {
  product_id: number;
  name: string;
  price: string;
  image_url: string | null;
  store_name: string;
  category_name: string;
};

async function getProducts() {
  const sql = `
    SELECT p.product_id, p.name, p.price, p.image_url, s.store_name, c.name as category_name
    FROM products p
    JOIN sellers s ON p.seller_id = s.seller_id
    JOIN categories c ON p.category_id = c.category_id
    ORDER BY p.created_at DESC LIMIT 6
  `;
  try {
    const result = await query(sql);
    return result.rows as Product[];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={styles.main}>
      {/* Hero Section */}
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
    
    {/* Card 1: Pottery */}
    <div style={styles.categoryCard}
    className="card-center">
      <div style={styles.imageContainer}>
        <Image 
          src="/categories/pottery.png" // Caminho começa na pasta public
          alt="Pottery"
          width={80} 
          height={80}
          style={styles.categoryImage}
        />
      </div>
      <h3 style={styles.categoryTitle}>Pottery</h3>
      <p style={styles.categoryDesc}>Handmade ceramics and pottery</p>
    </div>

    {/* Card 2: Jewelry */}
    <div style={styles.categoryCard}
    className="card-center">
      <div style={styles.imageContainer}>
        <Image 
          src="/categories/jewerly.png" 
          alt="Jewelry"
          width={80} 
          height={80}
          style={styles.categoryImage}
        />
      </div>
      <h3 style={styles.categoryTitle}>Jewelry</h3>
      <p style={styles.categoryDesc}>Unique handcrafted accessories</p>
    </div>

    {/* Card 3: Textiles */}
    <div 
  style={styles.categoryCard} 
  className="card-center" 
>
  <div style={styles.imageContainer}>
    <Image 
      src="/categories/textile.png" 
      alt="Textiles"
      width={80} 
      height={80}
      style={styles.categoryImage}
    />
  </div>
  <h3 style={styles.categoryTitle}>Textiles</h3>
  <p style={styles.categoryDesc}>Woven and knitted goods</p>
</div>

    {/* Card 4: Art */}
    <div style={styles.categoryCard}
    className="card-center">
      <div style={styles.imageContainer}>
        <Image 
          src="/categories/art.png" 
          alt="Art"
          width={80} 
          height={80}
          style={styles.categoryImage}
        />
      </div>
      <h3 style={styles.categoryTitle}>Art</h3>
      <p style={styles.categoryDesc}>Original paintings and prints</p>
    </div>

  </div>
</section>

      {/* Featured Products Grid */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        {products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>
            <p>No products found properly. Check your database connection.</p>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {products.map((product) => (
              <div key={product.product_id} style={styles.productCard}>
                <div style={styles.productImage}>
                  {product.image_url && product.image_url.startsWith('http') ? (
                    <img src={product.image_url} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px'}} />
                  ) : (
                    <span style={{fontSize: '50px'}}>📦</span>
                  )}
                </div>
                <h3 style={styles.productTitle}>{product.name}</h3>
                <p style={{fontSize: '12px', color: '#888', marginBottom: '5px'}}>
                   {product.category_name} by {product.store_name}
                </p>
                <p style={styles.productPrice}>${product.price}</p>
                <a href={`/products/${product.product_id}`} style={{...styles.productBtn, textDecoration: 'none', display: 'inline-block'}}>
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Removi os estilos do Nav e Footer daqui, pois agora estão nos componentes
const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: "Arial, sans-serif", backgroundColor: "#F5F5F5", minHeight: "100vh", margin: 0 },
  hero: {
    backgroundImage: "linear-gradient(rgba(109, 76, 65, 0.7), rgba(109, 76, 65, 0.7)), url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"%23D7CCC8\"/%3E%3C/svg%3E')",
    backgroundSize: "cover", backgroundPosition: "center", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center",
  },
  heroOverlay: { textAlign: "center", padding: "80px 20px", maxWidth: "900px" },
  heroTitle: { fontSize: "42px", color: "white", marginBottom: "20px" },
  heroDescription: { fontSize: "18px", color: "white", marginBottom: "30px" },
  buttonGroup: { marginTop: "40px", display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: { backgroundColor: "#FFB74D", color: "#fff", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", display: "inline-block" },
  secondaryBtn: { backgroundColor: "#A1887F", color: "#fff", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", display: "inline-block" },
  categorySection: { padding: "60px 40px", backgroundColor: "white" },
  productsSection: { padding: "60px 40px", backgroundColor: "#F5F5F5" },
  sectionTitle: { fontSize: "32px", textAlign: "center", marginBottom: "40px", color: "#333" },
  categoryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" },
  categoryCard: { backgroundColor: "#FAFAFA", padding: "30px", borderRadius: "8px", textAlign: "center", border: "1px solid #E0E0E0", transition: "transform 0.3s", cursor: "pointer" },
  categoryIcon: { fontSize: "48px", marginBottom: "15px" },
  categoryTitle: { fontSize: "20px", color: "#333", marginBottom: "10px" },
  categoryDesc: { fontSize: "14px", color: "#666" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" },
  productCard: { backgroundColor: "white", borderRadius: "8px", padding: "20px", textAlign: "center", border: "1px solid #E0E0E0", transition: "box-shadow 0.3s" },
  productImage: { height: "200px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", borderRadius: "6px", marginBottom: "15px", overflow: "hidden" },
  productTitle: { fontSize: "18px", color: "#333", marginBottom: "10px" },
  productPrice: { fontSize: "20px", color: "#FFB74D", fontWeight: "bold", marginBottom: "15px" },
  productBtn: { backgroundColor: "#6D4C41", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" },
};

/*import React from 'react';
import { query } from '../lib/db'; // Importamos a conexão que criamos

// 1. Definimos o formato dos dados que vêm do banco
type Product = {
  product_id: number;
  name: string;
  price: string;
  image_url: string | null;
  store_name: string;
  category_name: string;
};

// 2. Função para buscar os dados no PostgreSQL
async function getProducts() {
  // Vamos buscar produtos e o nome da loja do vendedor
  // O LIMIT 6 garante que o layout não quebre se tivermos mil produtos
  const sql = `
    SELECT 
      p.product_id, 
      p.name, 
      p.price, 
      p.image_url, 
      s.store_name,
      c.name as category_name
    FROM products p
    JOIN sellers s ON p.seller_id = s.seller_id
    JOIN categories c ON p.category_id = c.category_id
    ORDER BY p.created_at DESC
    LIMIT 6
  `;
  
  try {
    const result = await query(sql);
    return result.rows as Product[];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return []; // Retorna lista vazia se o banco falhar (para não quebrar a página)
  }
}

export default async function Home() {
  // 3. Executamos a busca antes da página carregar
  const products = await getProducts();

  return (
    <main style={styles.main}>
      
      {/* Navigation Bar *//*
      <nav style={styles.nav}>
        <h1 style={styles.logo}>Handcrafted Haven</h1>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Products</a>
          <a href="/categories" style={styles.navLink}>Categories</a>
          <a href="/about" style={styles.navLink}>About</a>
          <a href="/contact" style={styles.navLink}>Contact</a>
          
          {/* NOVO ITEM: Botão de Login com destaque *//*}
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

      {/* Hero Section }
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

      {/* Category Cards Section (Mantido Estático por enquanto) }
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

      {/* Featured Products Grid - AGORA DINÂMICO }
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        
        {/* Se não houver produtos, mostramos um aviso amigável }
        {products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>
            <p>No products found properly. Check your database connection.</p>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {/* Aqui fazemos o LOOP pelos produtos do banco }
            {products.map((product) => (
              <div key={product.product_id} style={styles.productCard}>
                <div style={styles.productImage}>
                  {/* Se tiver URL de imagem válida, tenta mostrar, senão mostra emoji }
                  {product.image_url && product.image_url.startsWith('http') ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px'}}
                    />
                  ) : (
                    <span style={{fontSize: '50px'}}>📦</span>
                  )}
                </div>
                
                <h3 style={styles.productTitle}>{product.name}</h3>
                
                {/* Detalhes extras vindos do JOIN }
                <p style={{fontSize: '12px', color: '#888', marginBottom: '5px'}}>
                   {product.category_name} by {product.store_name}
                </p>

                <p style={styles.productPrice}>${product.price}</p>
                <a href={`/products/${product.product_id}`} style={{...styles.productBtn, textDecoration: 'none', display: 'inline-block'}}>
                  View Details
                </a>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Footer }
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

// Mantive seus estilos exatamente iguais, apenas adicionei um tipo para o TypeScript não reclamar
const styles: { [key: string]: React.CSSProperties } = {
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
    textAlign: "center",
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
    flexWrap: "wrap",
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
    textAlign: "center",
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
    textAlign: "center",
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
    textAlign: "center",
    border: "1px solid #E0E0E0",
    transition: "box-shadow 0.3s",
  },
  productImage: {
    // fontSize: "60px", // Removido para acomodar imagens reais se houver
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: "6px",
    marginBottom: "15px",
    overflow: "hidden"
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
    flexDirection: "column",
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
    textAlign: "center",
    fontSize: "14px",
    color: "#E0E0E0",
  },
};*/