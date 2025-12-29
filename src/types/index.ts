export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  popular: boolean;
  category: string;
}

export interface CarBrand {
  name: string;
  models: number;
  image: string;
}

export interface VisibilityState {
  hero: boolean;
  brands: boolean;
  products: boolean;
  features: boolean;
  contact: boolean;
}

export interface ProductsVisibilityState {
  hero: boolean;
  filters: boolean;
  products: boolean;
  contact: boolean;
}

export interface AutoPartsVisibilityState {
  hero: boolean;
  features: boolean;
  services: boolean;
  contact: boolean;
}