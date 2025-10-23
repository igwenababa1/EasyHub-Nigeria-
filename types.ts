export type ProductCategory = 'iPhone' | 'Samsung' | 'Audio' | 'Accessory';
export type ProductCondition = 'Brand New' | 'Foreign Used';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  description: string;
  condition?: ProductCondition;
  specs?: { [key: string]: string };
  warranty?: string;
  tagline?: string;
  salesCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  orderHistory: Order[];
}