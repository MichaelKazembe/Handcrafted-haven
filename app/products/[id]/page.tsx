import React from 'react';
import { query } from '../../../lib/db'; // If you get an error here, try '../lib/db' or '../../lib/db'

type ProductDetail = {
  product_id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  image_url: string | null;
  store_name: string;
  seller_email: string; // Added email to simulate contact
  category_name: string;
};

// This function fetches ONE specific product by ID
async function getProductById(id: string) {
  const sql = `
    SELECT 
      p.*, 
      s.store_name, 
      s.email as seller_email,
      c.name as category_name
    FROM products p
    JOIN sellers s ON p.seller_id = s.seller_id
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.product_id = $1
  `;
  
  // $1 will be safely replaced with the provided 'id'
  const result = await query(sql, [id]);
  
  // Return the first item found (or undefined if nothing is found)
  return result.rows[0] as ProductDetail;
}

// In Next.js 15/16, 'params' must be handled as a Promise in async components
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. "Unwrap" the URL parameters
  const { id } = await params;
  
  // 2. Fetch the data from the database
  const product = await getProductById(id);

  // 3. If the product does not exist (e.g. id 999), show an error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-500">Product not found 😔</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      
      {/* Simple Back Button */}
      <div className="max-w-6xl mx-auto p-6">
        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 bg-gray-200 min-h-[400px] flex items-center justify-center">
           {product.image_url && product.image_url.startsWith('http') ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
           ) : (
              <span className="text-6xl">📦</span>
           )}
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
            {product.category_name}
          </span>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <p className="text-3xl text-green-600 font-bold mb-6">${product.price}</p>
          
          <div className="prose text-gray-600 mb-8">
            <h3 className="font-bold text-gray-800">Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-8">
            <p className="text-sm text-gray-500">
              Sold by: <strong className="text-gray-800">{product.store_name}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Stock: <strong className="text-gray-800">{product.stock_quantity} units available</strong>
            </p>
          </div>

          <button className="bg-orange-400 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-500 transition-colors shadow-md text-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
