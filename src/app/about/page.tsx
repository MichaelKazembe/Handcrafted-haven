import { Container, Card } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              About Handcrafted Haven
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              We are a marketplace dedicated to celebrating the artistry and
              craftsmanship of local artisans, bringing unique handmade
              treasures to your home.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  Founded in 2025, Handcrafted Haven was born from a simple
                  belief: that handmade items carry a special warmth and
                  authenticity that mass-produced goods simply cannot match.
                </p>
                <p>
                  Our platform connects talented local artisans with customers
                  who appreciate the time, skill, and passion that goes into
                  every handcrafted piece. From pottery to jewelry, textiles to
                  art, each item tells a unique story.
                </p>
                <p>
                  We believe in supporting our local creative community and
                  providing a sustainable marketplace where artisans can thrive
                  and customers can discover one-of-a-kind treasures.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-8">
                  <div className="text-6xl mb-4">&#x1F3A8;</div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    Supporting Local Artisans
                  </h3>
                  <p className="text-secondary-600">
                    Every purchase directly supports independent creators in our
                    community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <Container>
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <Card className="p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">&#x1F91D;</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                Community First
              </h3>
              <p className="text-secondary-600">
                We prioritize building strong relationships with our artisans
                and customers, fostering a supportive and collaborative
                environment.
              </p>
            </Card>

            {/* Value 2 */}
            <Card className="p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">&#x2728;</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                Quality & Authenticity
              </h3>
              <p className="text-secondary-600">
                Every item on our platform is genuinely handcrafted with care,
                skill, and attention to detail that you can see and feel.
              </p>
            </Card>

            {/* Value 3 */}
            <Card className="p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">&#x1F331;</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                Sustainability
              </h3>
              <p className="text-secondary-600">
                We champion sustainable practices, supporting artisans who use
                eco-friendly materials and traditional techniques.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-700 to-orange-700 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-100 text-lg">Local Artisans</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-primary-100 text-lg">Unique Products</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25K+</div>
              <div className="text-primary-100 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4 Years</div>
              <div className="text-primary-100 text-lg">
                Supporting Community
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            We are a passionate team dedicated to connecting artisans with
            customers who appreciate handcrafted excellence.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 relative rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://ui-avatars.com/api/?name=Sergio+Pontes&background=f59e0b&color=fff&size=160&font-size=0.4"
                  alt="Sergio Pontes"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                Sergio Pontes
              </h3>
              <p className="text-primary-700 font-semibold mb-2">
                Founder & CEO
              </p>
              <p className="text-secondary-600 text-sm">
                Passionate about supporting local artisans and building
                community
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 relative rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://ui-avatars.com/api/?name=Michael+Kazembe&background=f59e0b&color=fff&size=160&font-size=0.4"
                  alt="Michael Kazembe"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                Michael Kazembe
              </h3>
              <p className="text-primary-700 font-semibold mb-2">
                Head of Technology
              </p>
              <p className="text-secondary-600 text-sm">
                Creating seamless experiences for artisans and customers
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 relative rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://ui-avatars.com/api/?name=Eyob+Teffera&background=f59e0b&color=fff&size=160&font-size=0.4"
                  alt="Eyob Teffera"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                Eyob Teffera
              </h3>
              <p className="text-primary-700 font-semibold mb-2">
                Artisan Relations
              </p>
              <p className="text-secondary-600 text-sm">
                Nurturing relationships with our talented maker community
              </p>
            </div>
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 relative rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://ui-avatars.com/api/?name=Lucas+Silver&background=f59e0b&color=fff&size=160&font-size=0.4"
                  alt="Lucas Silver"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                Lucas Silver
              </h3>
              <p className="text-primary-700 font-semibold mb-2">
                Customer Experience
              </p>
              <p className="text-secondary-600 text-sm">
                Ensuring every customer has a delightful experience
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-orange-50 to-primary-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Whether you are an artisan looking to share your craft or a
              customer seeking unique handmade treasures, there is a place for
              you at Handcrafted Haven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-md hover:shadow-lg"
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary-700 text-white font-semibold rounded-lg hover:bg-secondary-800 transition-colors shadow-md hover:shadow-lg"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
