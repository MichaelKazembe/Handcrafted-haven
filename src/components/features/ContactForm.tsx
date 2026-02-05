"use client";

import { useState } from "react";
import { Input, Textarea, Button, Card } from "@/components/ui";
import { sendContactMessage } from "@/app/contact/actions";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await sendContactMessage(formData);
      setIsSuccess(true);
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">
          Thank You!
        </h3>
        <p className="text-secondary-600 mb-6">
          Your message has been sent successfully. We&apos;ll get back to you
          within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Full Name *
          </label>
          <Input id="name" name="name" required placeholder="Your full name" />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Subject
          </label>
          <Input id="subject" name="subject" placeholder="What's this about?" />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-secondary-700 mb-1.5"
          >
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us how we can help you..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-secondary-500 text-center">
          By submitting this form, you agree to our Privacy Policy. We&apos;ll
          never share your personal information.
        </p>
      </form>
    </Card>
  );
}
