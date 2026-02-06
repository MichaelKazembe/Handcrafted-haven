'use client'

import { useState } from 'react';
import { registerSeller } from './actions'; // We import the function from step 2

export default function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function that handles form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents the page from reloading
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    // Call our Server Action
    const result = await registerSeller(formData);
    
    // If registerSeller returns something (it means there was an error or no redirect)
    if (result?.success === false) {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-amber-900 mb-6">
          Join as an Artisan
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                name="firstName"
                required
                className="w-full border p-2 rounded"
                placeholder="Maria"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                name="lastName"
                required
                className="w-full border p-2 rounded"
                placeholder="Silva"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Store Name
            </label>
            <input
              name="storeName"
              required
              className="w-full border p-2 rounded"
              placeholder="Maria's Pottery"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border p-2 rounded"
              placeholder="maria@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full border p-2 rounded"
              placeholder="+351 912 345 678"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border p-2 rounded"
              placeholder="******"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-amber-800 text-white font-bold py-3 px-4 rounded hover:bg-amber-900 transition duration-300 mt-4 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-amber-800 font-bold">
            Log in
          </a>
        </p>
        
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}