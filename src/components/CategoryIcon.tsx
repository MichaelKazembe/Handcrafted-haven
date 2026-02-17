import {
  Gem,
  Home,
  Palette,
  Sparkles,
  Shirt,
  Wand2,
  Package,
  Boxes,
} from "lucide-react";

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  jewelry: Gem,
  home: Home,
  pottery: Sparkles,
  ceramics: Sparkles,
  paintings: Palette,
  art: Palette,
  textiles: Shirt,
  accessories: Wand2,
  woodwork: Package,
  "leather goods": Boxes,
};

export function CategoryIcon({ category, size = 20, className }: CategoryIconProps) {
  const key = category.toLowerCase();
  const Icon = iconMap[key] || Sparkles;

  return <Icon size={size} className={className} />;
}
