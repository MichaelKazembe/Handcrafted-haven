'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SellerProfile as SellerProfileType } from '@/lib/types';

export default function SellerProfilePage() {
  // State to control edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  
  // Profile data from API
  const [profile, setProfile] = useState<SellerProfileType | null>(null);

  // State for edit form
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    store_name: '',
    phone_number: '',
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/seller-info');
        
        if (response.status === 401) {
          setNotLoggedIn(true);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          store_name: data.store_name || '',
          phone_number: data.phone_number || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      const response = await fetch('/api/seller-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.data);
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
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        store_name: profile.store_name || '',
        phone_number: profile.phone_number || '',
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (notLoggedIn) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Login Required</h1>
          <p className="text-secondary-600 mb-4">Please login to view your profile</p>
          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Oops!</h1>
          <p className="text-secondary-600 mb-4">Could not load profile</p>
          <Link href="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header with cover image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20">
        {/* Main profile section */}
        <Card className="bg-white shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile picture */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-primary-100 flex items-center justify-center">
              {profile.first_name ? (
                <span className="text-4xl md:text-5xl font-bold text-primary-600">
                  {profile.first_name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-primary-600">
                  {profile.store_name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Main information */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full border border-secondary-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full border border-secondary-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="store_name"
                      value={formData.store_name}
                      onChange={handleInputChange}
                      className="w-full border border-secondary-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Store Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full border border-secondary-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Email (read-only)</label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      disabled
                      className="w-full border border-secondary-200 rounded-lg px-4 py-2 bg-secondary-50 text-secondary-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                    {profile.store_name}
                  </h1>
                  {fullName && (
                    <p className="text-secondary-600 mb-3">{fullName}</p>
                  )}
                  <p className="text-secondary-600 mb-3">{profile.email}</p>
                  {profile.phone_number && (
                    <div className="flex items-center gap-2 text-sm text-secondary-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {profile.phone_number}
                    </div>
                  )}
                  {profile.created_at && (
                    <div className="flex items-center gap-2 text-sm text-secondary-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Joined {new Date(profile.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}
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
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <Card className="bg-white p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">{profile.totalProducts || 0}</div>
            <div className="text-secondary-600 mt-1">Products</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-yellow-500">{profile.averageRating || 0}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-secondary-600 mt-1">Average Rating</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="text-3xl font-bold text-accent-600">{profile.totalReviews || 0}</div>
            <div className="text-secondary-600 mt-1">Reviews</div>
          </Card>
        </div>

        {/* View Public Profile Link */}
        <Card className="bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-secondary-900">Your Public Profile</h2>
              <p className="text-secondary-600 text-sm">Share this link with customers to showcase your shop</p>
            </div>
            <Link href={`/profile/${profile.seller_id}`}>
              <Button variant="outline">
                View Public Profile
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

