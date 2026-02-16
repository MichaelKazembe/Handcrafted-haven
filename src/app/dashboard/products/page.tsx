'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, Badge, Button, Input, Textarea } from '@/components/ui';
import { 
  Package, 
  Edit, 
  Trash2, 
  Search, 
  Plus,
  X,
  Check,
  Image as ImageIcon,
  DollarSign,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: 'Hand-Painted Ceramic Mug',
    description: 'Beautiful hand-painted ceramic mug with unique floral design',
    price: 35.0,
    stock: 15,
    category: 'Pottery',
    image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    status: 'active',
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Woven Wool Blanket',
    description: 'Cozy hand-woven wool blanket in traditional patterns',
    price: 120.0,
    stock: 8,
    category: 'Textiles',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    status: 'active',
    rating: 4.9,
    reviews: 12,
  },
  {
    id: 3,
    name: 'Silver Handcrafted Ring',
    description: 'Elegant silver ring with intricate手工 designs',
    price: 65.0,
    stock: 20,
    category: 'Jewelry',
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    status: 'active',
    rating: 4.7,
    reviews: 8,
  },
  {
    id: 4,
    name: 'Ceramic Flower Vase',
    description: 'Elegant ceramic vase for fresh or dried flowers',
    price: 42.0,
    stock: 10,
    category: 'Pottery',
    image_url: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    status: 'active',
    rating: 4.5,
    reviews: 6,
  },
];

const categories = ['All', 'Pottery', 'Textiles', 'Jewelry', 'Home Decor', 'Accessories'];

export default function DashboardProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingProduct, setEditingProduct] = useState<typeof initialProducts[0] | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle edit
  const handleEdit = (product: typeof initialProducts[0]) => {
    setEditingProduct({ ...product });
  };

  // Save edit
  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Add new product
  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct({
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'Pottery',
      image_url: '',
      status: 'active',
      rating: 0,
      reviews: 0,
    });
  };

  // Save new product
  const handleSaveNew = () => {
    if (editingProduct) {
      setProducts([editingProduct, ...products]);
      setEditingProduct(null);
      setIsAddingProduct(false);
    }
  };

  // Cancel add
  const handleCancelAdd = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  return (
    <DashboardLayout sellerName="Maria" storeName="Handcrafted Haven">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">My Products</h2>
          <p className="text-secondary-500">Manage your product inventory</p>
        </div>
        <Button onClick={handleAddProduct} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="aspect-video bg-secondary-100 relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-secondary-300" />
                </div>
              )}
              <Badge 
                variant={product.status === 'active' ? 'success' : 'default'} 
                className="absolute top-3 right-3"
              >
                {product.status}
              </Badge>
            </div>

            {/* Product Info */}
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-secondary-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-secondary-500">{product.category}</p>
                </div>
                <p className="text-lg font-bold text-primary-700">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-sm text-secondary-600 line-clamp-2 mb-3">{product.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                <span>Stock: {product.stock}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(product)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(product.id)} 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">No products found</h3>
          <p className="text-secondary-500 mb-4">Try adjusting your search or filters</p>
          <Button onClick={handleAddProduct} variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Edit/Add Modal */}
      {(editingProduct || isAddingProduct) && editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-secondary-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-secondary-900">
                {isAddingProduct ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button 
                onClick={isAddingProduct ? handleCancelAdd : handleCancelEdit}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-secondary-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your product"
                />
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  >
                    {categories.filter(c => c !== 'All').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="url"
                    value={editingProduct.image_url}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Status
                </label>
                <select
                  value={editingProduct.status}
                  onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-secondary-100 flex justify-end gap-3">
              <Button 
                onClick={isAddingProduct ? handleCancelAdd : handleCancelEdit} 
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={isAddingProduct ? handleSaveNew : handleSaveEdit} 
                variant="primary"
              >
                <Check className="w-4 h-4 mr-2" />
                {isAddingProduct ? 'Add Product' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

