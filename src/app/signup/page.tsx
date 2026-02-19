'use client';

import { useState } from "react";
import Link from "next/link";
import { Container, Card, Button, Input } from "@/components/ui";
import { registerSeller } from "./actions";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await registerSeller(formData);

    if (result?.success === false) {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <Container size="sm">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              Join as an Artisan
            </h1>
            <p className="text-secondary-600">
              Create your seller account and start selling handcrafted items
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1.5">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Maria"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Silva"
                />
              </div>
            </div>

            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-secondary-700 mb-1.5">
                Store Name
              </label>
              <Input
                id="storeName"
                name="storeName"
                required
                placeholder="Maria's Pottery"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1.5">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="maria@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-secondary-700 mb-1.5">
                Phone Number
              </label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="+1 555 123 4567"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1.5">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full mt-4"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary-700 hover:text-primary-800">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-secondary-400 hover:text-secondary-600">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

