import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SortControls, SortOption } from './SortControls';

interface SearchResultsProps {
  query: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  comparisonList: Product[];
  onToggleCompare: (product: Product) => void;
  onAddToBundle: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  products,
  onSelectProduct,
  comparisonList,
  onToggleCompare,
  onAddToBundle,
}) => {
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
    <div className="py-16 sm:py-24 animate-fade-in-fast">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Search Results for "{query}"
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'} found.
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No products found matching your search.</p>
            <p className="mt-2 text-gray-400">Try searching for something else.</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};