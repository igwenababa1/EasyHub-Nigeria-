import React from 'react';
import type { Product } from '../types';
import { ProductShowcase } from './ProductShowcase';

interface SearchResultsProps {
  query: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  comparisonList: Product[];
  onToggleCompare: (product: Product) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  products,
  onSelectProduct,
  comparisonList,
  onToggleCompare,
}) => {
  return (
    <div className="py-16 sm:py-24 animate-fade-in-fast">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Search Results for "{query}"
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'} found.
          </p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <ProductShowcase 
                key={product.id}
                products={[product]}
                onSelectProduct={onSelectProduct}
                comparisonList={comparisonList}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
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