'use client';

import { useState, useEffect, useTransition } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { 
  Package, 
  Search, 
  Plus,
  X,
  Check,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProducts, addProduct, deleteProduct, getCategories } from './actions';

// Types
interface Category {
  category_id: number;
  name: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  categories?: {
    name: string;
  };
}

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [sellerName, setSellerName] = useState('Seller');
  const [storeName, setStoreName] = useState('My Store');

  // Fetch products and categories on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData || []);
        
        // Fetch seller info from the API
        const sellerResponse = await fetch('/api/seller-info');
        if (sellerResponse.ok) {
          const sellerData = await sellerResponse.json();
          if (sellerData.first_name) {
            setSellerName(sellerData.first_name);
          }
          if (sellerData.store_name) {
            setStoreName(sellerData.store_name);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle edit
  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (editingProduct) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('name', editingProduct.name);
        formData.append('description', editingProduct.description);
        formData.append('price', editingProduct.price.toString());
        formData.append('stock_quantity', editingProduct.stock_quantity.toString());
        formData.append('category_id', editingProduct.category_id.toString());
        formData.append('image_url', editingProduct.image_url || '');
        
        const result = await addProduct(formData);
        if (result.success) {
          // Refresh products
          const productsData = await getProducts();
          setProducts(productsData);
        }
        setEditingProduct(null);
      });
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        const result = await deleteProduct(productId);
        if (result.success) {
          // Remove from local state
          setProducts(products.filter(p => p.product_id !== productId));
        }
      });
    }
  };

  // Add new product
  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct({
      product_id: Date.now(),
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: categories[0]?.category_id || 1,
      image_url: '',
      is_active: true,
      created_at: new Date().toISOString(),
    });
  };

  // Save new product
  const handleSaveNew = async () => {
    if (editingProduct) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('name', editingProduct.name);
        formData.append('description', editingProduct.description);
        formData.append('price', editingProduct.price.toString());
        formData.append('stock_quantity', editingProduct.stock_quantity.toString());
        formData.append('category_id', editingProduct.category_id.toString());
        formData.append('image_url', editingProduct.image_url || '');
        
        const result = await addProduct(formData);
        if (result.success) {
          // Refresh products
          const productsData = await getProducts();
          setProducts(productsData);
        }
        setEditingProduct(null);
        setIsAddingProduct(false);
      });
    }
  };

  // Cancel add
  const handleCancelAdd = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.category_id === categoryId);
    return category?.name || 'Unknown';
  };

  if (isLoading) {
    return (
      <DashboardLayout sellerName={sellerName} storeName={storeName}>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sellerName={sellerName} storeName={storeName}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">My Products</h2>
          <p className="text-secondary-500">Manage your product inventory</p>
        </div>
        <Button onClick={handleAddProduct} variant="primary" disabled={isPending}>
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
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedCategory === 'All'
                ? 'bg-primary-700 text-white'
                : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => setSelectedCategory(category.category_id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.category_id
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.product_id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
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
                variant={product.is_active ? 'success' : 'default'} 
                className="absolute top-3 right-3"
              >
                {product.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            {/* Product Info */}
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-secondary-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-secondary-500">{product.categories?.name || getCategoryName(product.category_id)}</p>
                </div>
                <p className="text-lg font-bold text-primary-700">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-sm text-secondary-600 line-clamp-2 mb-3">{product.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                <span>Stock: {product.stock_quantity}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(product)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(product.product_id)} 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={isPending}
                >
                  <X className="w-4 h-4" />
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
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) || 0 })}
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
                    value={editingProduct.category_id}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category_id: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.category_id} value={category.category_id}>{category.name}</option>
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

              {/* Status (only for edit) */}
              {!isAddingProduct && (
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingProduct.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.value === 'active' })}
                    className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-secondary-100 flex justify-end gap-3">
              <Button 
                onClick={isAddingProduct ? handleCancelAdd : handleCancelEdit} 
                variant="outline"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={isAddingProduct ? handleSaveNew : handleSaveEdit} 
                variant="primary"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                {isAddingProduct ? 'Add Product' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

