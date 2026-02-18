
import Link from 'next/link';
import { Eye, Heart } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { formatPrice } from '@/utils/formatters';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image_url?.startsWith('http')
    ? product.image_url
    : `https://placehold.co/400x300/e7e5e4/78716c?text=${encodeURIComponent(product.name)}`;

  return (
    <Card hover className="group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.product_id}`}
            className="bg-white text-secondary-900 p-2 rounded-full hover:bg-primary-700 hover:text-white transition-colors"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button className="bg-white text-secondary-900 p-2 rounded-full hover:bg-primary-700 hover:text-white transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <Badge variant="warning" className="absolute top-2 left-2">
            Only {product.stock_quantity} left
          </Badge>
        )}
        {product.stock_quantity === 0 && (
          <Badge variant="error" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        {product.category_name && (
          <p className="text-xs text-primary-600 font-medium mb-1">
            {product.category_name}
          </p>
        )}

        {/* Name */}
        <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
          <Link href={`/products/${product.product_id}`}>
            {product.name}
          </Link>
        </h3>


        {/* Store */}
        {product.store_name && (
          <p className="text-sm text-secondary-500 mb-2">
            by <Link href={`/profile/${product.seller_id}`} className="hover:text-primary-700 transition-colors">{product.store_name}</Link>
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-secondary-100">
          <span className="text-lg font-bold text-primary-700">
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/products/${product.product_id}`}
            className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
}


