// ===========================================
// Database Types - Based on Supabase Schema
// ===========================================

export interface Seller {
  seller_id: string;
  first_name: string;
  last_name: string;
  email: string;
  store_name: string;
  phone_number?: string;
  password_hash: string;
  created_at?: string;
}

export interface SellerProfile {
  seller_id: string;
  first_name: string;
  last_name: string;
  email: string;
  store_name: string;
  phone_number?: string;
  created_at?: string;
  // Computed fields
  totalProducts?: number;
  totalSales?: number;
  totalReviews?: number;
  averageRating?: number;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Product {
  product_id: number;
  seller_id: string;
  category_id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
  created_at?: string;
  // Joined fields
  store_name?: string;
  seller_email?: string;
  category_name?: string;
}

// ===========================================
// Form Types
// ===========================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  storeName: string;
  phone_number?: string;
}

export interface ProductFormData {
  seller_id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  image_url?: string;
}

export interface Review {
  review_id: number;
  product_id: number;
  reviewer_name: string;
  reviewer_email: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

export interface ReviewFormData {
  product_id: number;
  reviewer_name: string;
  reviewer_email: string;
  rating: number;
  comment?: string;
}

// ===========================================
// API Response Types
// ===========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Session {
  seller_id: string;
  email: string;
  store_name: string;
}

// ===========================================
// UI Component Props Types
// ===========================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "primary" | "gradient";
}
