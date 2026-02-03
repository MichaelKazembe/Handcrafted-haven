import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating?: number;
}

export default function Card({ id, image, title, price, rating = 0 }: CardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg overflow-hidden">
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
