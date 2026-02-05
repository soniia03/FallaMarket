export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: 'traje-fallero' | 'traje-fallera' | 'complementos' | 'calzado' | 'accesorios';
  condition: 'nuevo' | 'usado' | 'reservado' | 'vendido';
  seller: string | User;
  images: string[];
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
  categoryFormatted?: string;
  conditionFormatted?: string;
  priceFormatted?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registrationDate?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  daysSinceRegistration?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  errors?: string[];
}

export interface CategoryInfo {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface ConditionInfo {
  key: string;
  label: string;
  class: string;
}