import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#6D4C41] text-white mt-auto px-10 pt-10 pb-5">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 mb-8">
        
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg text-[#FFB74D] font-semibold">
            Handcrafted Haven
          </h4>
          <p className="text-sm text-gray-200">
            Supporting local artisans since 2025
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg text-[#FFB74D] font-semibold">Quick Links</h4>
          <Link href="/about" className="text-sm text-gray-200 hover:text-white transition">
            About Us
          </Link>
          <Link href="/products" className="text-sm text-gray-200 hover:text-white transition">
            Products
          </Link>
          <Link href="/contact" className="text-sm text-gray-200 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg text-[#FFB74D] font-semibold">Contact</h4>
          <p className="text-sm text-gray-200">Email: info@handcraftedhaven.com</p>
          <p className="text-sm text-gray-200">Phone: (555) 123-4567</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#8D6E63] pt-5 text-center text-sm text-gray-200">
        © 2026 Handcrafted Haven. All rights reserved.
      </div>
    </footer>
  );
}
