'use client';

import { ContactForm } from '@/components/features';
import { Container, Card } from '@/components/ui';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-12">
        <Container>
          <h1 className="text-3xl font-bold text-white text-center">
            Get in Touch
          </h1>
          <p className="text-primary-100 text-center mt-2 max-w-2xl mx-auto">
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>
        </Container>
      </div>

      {/* Contact Information & Form */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Email</h3>
                  <p className="text-secondary-600 text-sm mt-1">
                    info@handcraftedhaven.com
                  </p>
                  <p className="text-secondary-500 text-sm">
                    We reply within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Phone</h3>
                  <p className="text-secondary-600 text-sm mt-1">
                    (555) 123-4567
                  </p>
                  <p className="text-secondary-500 text-sm">
                    Mon-Fri, 9am-5pm EST
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Location</h3>
                  <p className="text-secondary-600 text-sm mt-1">
                    123 Artisan Way
                  </p>
                  <p className="text-secondary-500 text-sm">
                    Creative District, NY 10001
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-2xl font-bold text-secondary-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                How do I become a seller?
              </h3>
              <p className="text-secondary-600 text-sm">
                Click on "Become a Seller" and fill out our registration form.
                We&apos;ll review your application within 2-3 business days.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                Is shipping included?
              </h3>
              <p className="text-secondary-600 text-sm">
                Shipping costs vary by seller and location. Each product listing
                includes shipping information from the artisan.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                Can I return handcrafted items?
              </h3>
              <p className="text-secondary-600 text-sm">
                Return policies are set by each artisan. Please check the
                product&apos;s return policy before purchasing.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                How are artisans verified?
              </h3>
              <p className="text-secondary-600 text-sm">
                We verify each seller&apos;s identity and review their portfolio
                to ensure authentic handcrafted quality.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}

