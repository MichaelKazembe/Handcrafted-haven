// ===========================================
// Database Types - Based on Supabase Schema
// ===========================================

export interface Seller {
  seller_id: number;
  first_name: string;
  last_name: string;
  email: string;
  store_name: string;
  phone_number?: string;
  password_hash: string;
  created_at?: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Product {
  product_id: number;
  seller_id: number;
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

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
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
  phone?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  image_url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
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
  seller_id: number;
  email: string;
  store_name: string;
}

// ===========================================
// UI Component Props Types
// ===========================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary' | 'gradient';
}

