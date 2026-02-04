import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { query } from '../../lib/db';
import { logout } from './actions';

export default async function DashboardPage() {
  // 1. Check if the login cookie exists
  const cookieStore = await cookies();
  const sellerId = cookieStore.get('seller_id')?.value;

  // If there is no cookie, redirect back to login
  if (!sellerId) {
    redirect('/login');
  }

  // 2. Fetch seller data to display a welcome message
  const result = await query(
    'SELECT * FROM sellers WHERE seller_id = $1',
    [sellerId]
  );
  const seller = result.rows[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-900">Seller Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">Hello, {seller?.first_name}</span>
          
          <a href="/" className="text-sm text-blue-600 hover:underline">
            Go to Shop
          </a>

          {/* Logout Button (Works via Server Action) */}
          <form action={logout}>
            <button 
              type="submit" 
              className="text-sm text-red-600 font-bold border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition"
            >
              Logout
            </button>
          </form>
          
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to your store, {seller?.store_name}!
          </h2>
          <p className="text-gray-600 mb-8">
            Here you will be able to manage your products.
          </p>
          
          <a
            href="/dashboard/add"
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 inline-block text-center"
          >
            + Add New Product
          </a>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
            <p>🚧 Product management coming soon in the next step!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
