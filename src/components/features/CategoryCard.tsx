import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  href?: string;
}

const categoryIcons: Record<string, string> = {
  pottery: "🏺",
  jewelry: "💍",
  textiles: "🧶",
  art: "🖼️",
  home: "🏠",
  accessories: "👝",
  furniture: "🪑",
  garden: "🌿",
  default: "🎨",
};

export function CategoryCard({
  name,
  description,
  icon,
  href = `/products?category=${encodeURIComponent(name)}`,
}: CategoryCardProps) {
  const iconEmoji = categoryIcons[icon.toLowerCase()] || categoryIcons.default;

  return (
    <Link href={href}>
      <Card hover className="h-full p-6 text-center group cursor-pointer">
        {/* Icon */}
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {iconEmoji}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary-500 mb-4">{description}</p>

        {/* Arrow */}
        <div className="flex items-center justify-center text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium mr-1">Explore</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}

// Predefined categories for the homepage
export const defaultCategories = [
  {
    name: "Pottery",
    description: "Handmade ceramics and pottery",
    icon: "pottery",
  },
  {
    name: "Jewelry",
    description: "Unique handcrafted accessories",
    icon: "jewelry",
  },
  {
    name: "Textiles",
    description: "Woven and knitted goods",
    icon: "textiles",
  },
  {
    name: "Art",
    description: "Original paintings and prints",
    icon: "art",
  },
];
