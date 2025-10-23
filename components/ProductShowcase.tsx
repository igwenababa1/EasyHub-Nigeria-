import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SortControls, SortOption } from './SortControls';

interface ProductShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  comparisonList: Product[];
  onToggleCompare: (product: Product) => void;
  onAddToBundle: (product: Product) => void;
  title?: string;
  description?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onSelectProduct, comparisonList, onToggleCompare, onAddToBundle, title, description }) => {
  const [sortOption, setSortOption] = useState<SortOption>('popularity');

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popularity':
      default:
        sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
    }
    return sorted;
  }, [products, sortOption]);

  return (
    <section id="product-showcase" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title || 'Featured Products'}</h2>
          <p className="mt-4 text-lg text-gray-400">{description || 'Quality devices for every need and budget.'}</p>
        </div>
        
        <div className="flex justify-end mb-8">
          <SortControls sortOption={sortOption} onSortChange={setSortOption} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={() => onSelectProduct(product)}
              index={index}
              isCompared={!!comparisonList.find(p => p.id === product.id)}
              onToggleCompare={() => onToggleCompare(product)}
              onAddToBundle={onAddToBundle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};