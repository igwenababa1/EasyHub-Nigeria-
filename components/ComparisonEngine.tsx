import React from 'react';
import type { Product } from '../types';
import { XIcon } from './Icons';
import { useCart } from '../contexts/CartContext';

interface ComparisonEngineProps {
  products: Product[];
  onClose: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const ComparisonEngine: React.FC<ComparisonEngineProps> = ({ products, onClose }) => {
  const { addToCart } = useCart();
  
  // Create a master list of all unique spec keys across all products
  const allSpecKeys = products.reduce<string[]>((keys, product) => {
    if (product.specs) {
      Object.keys(product.specs).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
    }
    return keys;
  }, []);

  return (
    <div className="animate-fade-in-fast min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Compare Products</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <XIcon className="w-8 h-8" />
            </button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-8 min-w-max">
            {/* Header Column */}
            <div className="w-48 flex-shrink-0">
              <div className="h-56 mb-4"></div>
              <div className="text-2xl font-bold h-12">&nbsp;</div>
              <div className="text-xl h-8 mt-1">&nbsp;</div>
              <div className="h-14 mt-4">&nbsp;</div>
              <div className="border-t border-gray-700 my-6"></div>
              <div className="space-y-4">
                <div className="font-semibold text-gray-300 h-8">Condition</div>
                <div className="font-semibold text-gray-300 h-8">Warranty</div>
                {allSpecKeys.map(key => (
                  <div key={key} className="font-semibold text-gray-300 h-8">{key}</div>
                ))}
              </div>
            </div>

            {/* Product Columns */}
            {products.map(product => (
                <div key={product.id} className="bg-gray-900 rounded-2xl p-6 w-80 flex-shrink-0 flex flex-col">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" loading="lazy"/>
                    <h2 className="text-2xl font-bold h-12">{product.name}</h2>
                    <p className="text-xl font-semibold text-orange-400 mt-1 h-8">{formatPrice(product.price)}</p>
                    <button 
                        onClick={() => addToCart(product)}
                        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-6 rounded-full text-md transition-all transform hover:scale-105 h-14"
                    >
                        Add to Cart
                    </button>
                    
                    <div className="border-t border-gray-700 my-6"></div>

                    <div className="space-y-4 text-gray-200">
                      <div className="h-8">{product.condition || '-'}</div>
                      <div className="h-8">{product.warranty || '-'}</div>
                      {allSpecKeys.map(key => (
                         <div key={key} className="h-8">{product.specs?.[key] || '-'}</div>
                      ))}
                    </div>
                </div>
            ))}
          </div>
        </div>
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