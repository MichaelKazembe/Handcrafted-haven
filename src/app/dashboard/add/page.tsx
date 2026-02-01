import { query } from '@/lib/db';
import { createProduct } from '../actions'; // We import the action we created above

// Function to fetch categories (to populate the dropdown menu)
async function getCategories() {
  const result = await query('SELECT * FROM categories ORDER BY name ASC');
  return result.rows;
}

export default async function AddProductPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-800">Cancel</a>
        </div>

        {/* The action={createProduct} connects the form directly to the server */}
        <form action={createProduct as any} className="flex flex-col gap-6">
          
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input name="name" required className="w-full border p-3 rounded bg-gray-50" placeholder="Ex: Handpainted Mug" />
          </div>

          <div className="flex gap-4">
            {/* Price */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
              <input name="price" type="number" step="0.01" required className="w-full border p-3 rounded bg-gray-50" placeholder="25.00" />
            </div>
            
            {/* Stock */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Stock Quantity</label>
              <input name="stock" type="number" required className="w-full border p-3 rounded bg-gray-50" placeholder="10" />
            </div>
          </div>

          {/* Category (Dynamic Dropdown) */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <select name="category" required className="w-full border p-3 rounded bg-gray-50">
              <option value="">Select a category...</option>
              {categories.map((cat: any) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input name="imageUrl" type="url" required className="w-full border p-3 rounded bg-gray-50" placeholder="https://images.unsplash.com/..." />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Copy an image link from Unsplash.com for testing.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              className="w-full border p-3 rounded bg-gray-50"
              placeholder="Tell the story of your product..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-4 rounded hover:bg-green-700 transition"
          >
            Publish Product
          </button>
        </form>
      </div>
    </div>
  );
}
