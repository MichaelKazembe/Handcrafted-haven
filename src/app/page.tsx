import { Hero, CategoryCard, defaultCategories } from '@/components/features';
import { Container, Button, Card } from '@/components/ui';
import { ProfileCard } from '@/components/ProfileCard';
import { CategoryIcon } from '@/components/CategoryIcon';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

// Mock data for featured products - in production this would come from Supabase
const featuredProducts = [
  {
    product_id: 1,
    name: 'Hand-Painted Ceramic Mug',
    price: 35.00,
    image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    store_name: 'Maria Pottery',
    category_name: 'Pottery',
    stock_quantity: 15,
  },
  {
    product_id: 2,
    name: 'Woven Wool Blanket',
    price: 120.00,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    store_name: 'Artisan Weaves',
    category_name: 'Textiles',
    stock_quantity: 8,
  },
  {
    product_id: 3,
    name: 'Silver Handcrafted Ring',
    price: 65.00,
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    store_name: 'Gemstone Studio',
    category_name: 'Jewelry',
    stock_quantity: 20,
  },
  {
    product_id: 4,
    name: 'Abstract Oil Painting',
    price: 250.00,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
    store_name: 'Art Gallery',
    category_name: 'Art',
    stock_quantity: 3,
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Unique & Handmade',
    description: 'Every item is crafted with care and attention to detail',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'We stand behind the quality of every product',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Quick delivery directly from artisans to your door',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Banner */}
      <section className="bg-secondary-50 border-y border-secondary-100">
        <Container>
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{feature.title}</h3>
                    <p className="text-sm text-secondary-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Explore our diverse collection of handcrafted items, organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultCategories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </Container>
      </section>

      {/* Artisan Spotlight Section */}
      <section className="py-16 bg-secondary-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-3">
              Artisan Spotlight
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Meet the makers behind the craft. Discover their story, specialty,
              and what makes their work unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ProfileCard
              name="Tom Rickes"
              storeName="Harper Studio"
              bio="I craft small-batch ceramic pieces inspired by the warm colors and textures of the desert. Each item is hand-thrown and glazed in my home studio."
              avatarUrl="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300"
              rating={4.8}
              totalReviews={126}
              location="Rexburg, ID"
              specialty="Ceramics"
            />
            <ProfileCard
              name="Ross Smith"
              storeName="Smith Textiles"
              bio="I weave traditional patterns with modern techniques, creating unique textile pieces that tell a story. Each weaving is made on my grandmother's loom."
              avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300"
              rating={4.9}
              totalReviews={98}
              location="St. Anthony, ID"
              specialty="Textiles"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Jewelry', 'Ceramics', 'Textiles', 'Woodwork', 'Paintings', 'Home'].map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 rounded-lg bg-white p-3 border border-secondary-100"
              >
                <CategoryIcon category={category} className="text-primary-700" />
                <span className="text-sm font-medium text-secondary-800">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-secondary-50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                Featured Products
              </h2>
              <p className="text-secondary-600">
                Discover our most popular handcrafted items
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden md:flex">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.product_id} href={`/products/${product.product_id}`}>
                <Card hover className="h-full">
                  <div className="aspect-square overflow-hidden bg-secondary-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary-600 font-medium mb-1">
                      {product.category_name}
                    </p>
                    <h3 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-secondary-500 mb-2">
                      by {product.store_name}
                    </p>
                    <p className="text-lg font-bold text-primary-700">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Are You an Artisan?
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Join our community of talented makers and reach customers who appreciate
              the beauty of handmade craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button variant="secondary" size="lg">
                  Become a Seller
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-700">
                  Seller Login
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

