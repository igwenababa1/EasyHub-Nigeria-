import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  comparisonList: Product[];
  onToggleCompare: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onSelectProduct, comparisonList, onToggleCompare }) => {
  return (
    <section id="product-showcase" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Products</h2>
          <p className="mt-4 text-lg text-gray-400">Quality devices for every need and budget.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={() => onSelectProduct(product)}
              index={index}
              isCompared={!!comparisonList.find(p => p.id === product.id)}
              onToggleCompare={() => onToggleCompare(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};