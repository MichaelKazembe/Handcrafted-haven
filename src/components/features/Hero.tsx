
import Link from 'next/link';
import { ArrowRight, Store, ShoppingBag } from 'lucide-react';
import { Button, Container } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-secondary-50 via-primary-50 to-secondary-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="hero-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          </pattern>
          <rect fill="url(#hero-pattern)" width="100" height="100" />
        </svg>
      </div>

      <Container>
        <div className="py-16 md:py-24 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <ShoppingBag className="h-4 w-4" />
              <span>Supporting Local Artisans Since 2025</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight animate-slide-up">
              Where Handmade Stories
              <span className="text-primary-700"> Come to Life</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-secondary-600 mb-8 max-w-2xl mx-auto animate-slide-up">
              Discover unique, handcrafted products made with passion by local artisans.
              From home decor to accessories, every item tells a story.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/products">
                <Button size="lg" className="group">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  <Store className="mr-2 h-5 w-5" />
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-700">500+</div>
                <div className="text-sm text-secondary-500">Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-700">10K+</div>
                <div className="text-sm text-secondary-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-700">25K+</div>
                <div className="text-sm text-secondary-500">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-secondary-200 rounded-full opacity-20 blur-3xl" />
    </section>
  );
}

