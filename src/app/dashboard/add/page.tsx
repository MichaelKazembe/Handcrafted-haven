import Link from "next/link";
import { Container, Card, Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AddProductForm } from "@/components/features/AddProductForm";

export default async function AddProductPage() {
  // Check authentication
  const cookieStore = await cookies();
  const sellerId = cookieStore.get("seller_id")?.value;

  if (!sellerId) {
    redirect("/login");
  }

  // Fetch categories from Supabase
  const categories = await db.categories.findAll();

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-12">
        <Container>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Add New Product</h1>
              <p className="text-primary-100 mt-2">
                List a new handcrafted item in your store
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <AddProductForm categories={categories} sellerId={sellerId} />
          </Card>

          {/* Help Section */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-secondary-900 mb-3">
              Tips for Great Product Listings
            </h3>
            <ul className="space-y-2 text-sm text-secondary-600">
              <li>
                • Use high-quality, well-lit photos that show your craftsmanship
              </li>
              <li>
                • Write detailed descriptions including materials and care
                instructions
              </li>
              <li>
                • Price competitively but cover your costs and time investment
              </li>
              <li>• Start with small stock quantities to test demand</li>
              <li>
                • Respond quickly to customer inquiries for better reviews
              </li>
            </ul>
          </Card>
        </div>
      </Container>
    </div>
  );
}
