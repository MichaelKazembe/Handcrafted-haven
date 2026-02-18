'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/features/ProductCard';
import { SellerProfile, Product } from '@/lib/types';

interface SellerProfilePageProps {
  params: Promise<{
    seller_id: string;
  }>;
}

export default function SellerProfilePage(props: SellerProfilePageProps) {
  const params = use(props.params);
  const sellerId = params.seller_id;
  
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sellerId) return;

    const fetchSellerData = async () => {
      try {
        setLoading(true);
        
        // Fetch seller profile
        const profileResponse = await fetch(`/api/seller-info?seller_id=${sellerId}`);
        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            setError('Seller not found');
            return;
          }
          throw new Error('Failed to fetch seller profile');
        }
        const profileData = await profileResponse.json();
        setSeller(profileData);

        // Fetch seller's products
        const productsResponse = await fetch(`/api/products?seller_id=${sellerId}`);
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData || []);
        }
      } catch (err) {
        console.error('Error fetching seller data:', err);
        setError('Failed to load seller profile');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Oops!</h1>
          <p className="text-secondary-600 mb-4">{error || 'Seller not found'}</p>
          <Link href="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${seller.first_name || ''} ${seller.last_name || ''}`.trim() || seller.store_name;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header with cover image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20">
        {/* Main profile section */}
        <Card className="bg-white shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile picture */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-primary-100 flex items-center justify-center">
              {seller.first_name ? (
                <span className="text-4xl md:text-5xl font-bold text-primary-600">
                  {seller.first_name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-primary-600">
                  {seller.store_name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Main information */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                {seller.store_name}
              </h1>
              <p className="text-secondary-600 mb-3">
                {fullName}
              </p>
              {seller.phone_number && (
                <div className="flex items-center gap-2 text-sm text-secondary-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {seller.phone_number}
                </div>
              )}
              {seller.created_at && (
                <div className="flex items-center gap-2 text-sm text-secondary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Joined {new Date(seller.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <Card className="bg-white p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">{seller.totalProducts || 0}</div>
            <div className="text-secondary-600 mt-1">Products</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-yellow-500">{seller.averageRating || 0}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-secondary-600 mt-1">Average Rating</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="text-3xl font-bold text-accent-600">{seller.totalReviews || 0}</div>
            <div className="text-secondary-600 mt-1">Reviews</div>
          </Card>
        </div>

        {/* Products section */}
        {products.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <Card className="bg-white p-8 text-center">
            <p className="text-secondary-600">This seller hasn't added any products yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
