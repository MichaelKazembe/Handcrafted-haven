'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

// Types
interface SellerProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  phone: string;
  profileImage: string;
  coverImage: string;
  categories: string[];
  joinedDate: string;
  totalProducts: number;
  totalSales: number;
  averageRating: number;
  responseTime: string;
}

export default function SellerProfilePage() {
  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile data (in production would come from backend)
  const [profile, setProfile] = useState<SellerProfile>({
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    bio: 'Passionate artisan creating unique pieces in ceramics and textiles. Working with sustainable materials and traditional techniques for over 10 years.',
    location: 'São Paulo, SP',
    phone: '(11) 98765-4321',
    profileImage: 'https://ui-avatars.com/api/?name=Maria+Silva&size=400&background=9333EA&color=fff',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200',
    categories: ['Ceramics', 'Textiles', 'Home Decor'],
    joinedDate: '2023-01-15',
    totalProducts: 42,
    totalSales: 156,
    averageRating: 4.8,
    responseTime: '2 hours'
  });

  // State for edit form
  const [formData, setFormData] = useState(profile);

  // Handler for form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to save changes
  const handleSave = async () => {
    try {
      // Here you would make the API call
      // await fetch('/api/users/profile', { method: 'PUT', body: JSON.stringify(formData) })
      
      setProfile(formData);
      setIsEditing(false);
      
      // Success feedback
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving profile');
    }
  };

  // Handler to cancel editing
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  // Handler for image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would do real upload
      const reader = new FileReader();
      reader.onloadend = () => {
        const fieldName = type === 'profile' ? 'profileImage' : 'coverImage';
        setFormData(prev => ({
          ...prev,
          [fieldName]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with cover image */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-pink-600">
        {formData.coverImage && (
        <div className="relative w-full h-full">
            <Image 
            src={formData.coverImage} 
            alt="Cover" 
            fill
            className="object-cover"
            priority
            />
        </div>
        )}
        {isEditing && (
          <label className="absolute bottom-4 right-4 cursor-pointer bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition">
            <span className="text-sm font-medium">Change Cover</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={(e) => handleImageUpload(e, 'cover')}
            />
          </label>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20">
        {/* Main profile section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <Image 
                    src={formData.profileImage} 
                    alt={formData.name}
                    fill
                    className="object-cover"
                    priority
                />
                </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'profile')}
                  />
                </label>
              )}
            </div>

            {/* Main information */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold w-full border-b-2 border-gray-300 focus:border-purple-600 outline-none pb-2"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
                    placeholder="Location"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  <p className="text-gray-600 mb-4">{profile.email}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {profile.phone}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} variant="primary">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="primary">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.categories.map((category, index) => (
              <CategoryIcon key={index} category={category} />
            ))}
          </div>
        </div>

        {/* Information grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{profile.totalProducts}</div>
              <div className="text-gray-600 mt-1">Products</div>
            </div>
          </Card>
          
          <Card className="bg-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{profile.totalSales}</div>
              <div className="text-gray-600 mt-1">Sales</div>
            </div>
          </Card>
          
          <Card className="bg-white p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-yellow-500">{profile.averageRating}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-gray-600 mt-1">Average Rating</div>
            </div>
          </Card>
        </div>

        {/* About section */}
        <Card className="bg-white p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={6}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none resize-none"
              placeholder="Tell your story as an artisan..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          )}
        </Card>

        {/* Additional information */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Member since</label>
              <p className="text-lg text-gray-900 mt-1">
                {new Date(profile.joinedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Response time</label>
              <p className="text-lg text-gray-900 mt-1">{profile.responseTime}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}