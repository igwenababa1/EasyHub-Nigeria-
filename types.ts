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
}

export interface CartItem extends Product {
  quantity: number;
}
