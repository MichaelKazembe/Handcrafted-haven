'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-amber-100 via-orange-50 to-amber-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About Handcrafted Haven
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a marketplace dedicated to celebrating the artistry and craftsmanship 
            of local artisans, bringing unique handmade treasures to your home.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2025, Handcrafted Haven was born from a simple belief: 
                  that handmade items carry a special warmth and authenticity that 
                  mass-produced goods simply cannot match.
                </p>
                <p>
                  Our platform connects talented local artisans with customers who 
                  appreciate the time, skill, and passion that goes into every 
                  handcrafted piece. From pottery to jewelry, textiles to art, 
                  each item tells a unique story.
                </p>
                <p>
                  We believe in supporting our local creative community and providing 
                  a sustainable marketplace where artisans can thrive and customers 
                  can discover one-of-a-kind treasures.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-linear-to-br from-amber-200 to-orange-200 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-8">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Supporting Local Artisans
                  </h3>
                  <p className="text-gray-600">
                    Every purchase directly supports independent creators in our community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Community First
              </h3>
              <p className="text-gray-600">
                We prioritize building strong relationships with our artisans 
                and customers, fostering a supportive and collaborative environment.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Quality & Authenticity
              </h3>
              <p className="text-gray-600">
                Every item on our platform is genuinely handcrafted with care, 
                skill, and attention to detail that you can see and feel.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We champion sustainable practices, supporting artisans who use 
                eco-friendly materials and traditional techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-linear-to-r from-amber-700 to-orange-700 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-amber-100 text-lg">Local Artisans</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-amber-100 text-lg">Unique Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">25,000+</div>
              <div className="text-amber-100 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4 Years</div>
              <div className="text-amber-100 text-lg">Supporting Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We are a passionate team dedicated to connecting artisans with customers 
            who appreciate handcrafted excellence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-linear-to-br from-amber-300 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                👩‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Chen</h3>
              <p className="text-amber-700 font-semibold mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Passionate about supporting local artisans and building community
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-linear-to-br from-amber-300 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Michael Torres</h3>
              <p className="text-amber-700 font-semibold mb-2">Head of Technology</p>
              <p className="text-gray-600 text-sm">
                Creating seamless experiences for artisans and customers
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 bg-linear-to-br from-amber-300 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                👩‍🎨
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Emma Rodriguez</h3>
              <p className="text-amber-700 font-semibold mb-2">Artisan Relations</p>
              <p className="text-gray-600 text-sm">
                Nurturing relationships with our talented maker community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-amber-100 via-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you are an artisan looking to share your craft or a customer 
            seeking unique handmade treasures, there is a place for you at Handcrafted Haven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Browse Products
            </Link>
            <Link 
              href="/auth/login" 
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}