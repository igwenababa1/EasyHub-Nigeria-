import React from 'react';
import type { Product } from '../types';
import { PlusIcon, CheckIcon } from './Icons';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  index: number;
  isCompared: boolean;
  onToggleCompare: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, index, isCompared, onToggleCompare }) => {
  const { addToCart } = useCart();
  
  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare();
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const conditionStyles = product.condition === 'Brand New' 
    ? 'bg-green-500/20 text-green-300' 
    : 'bg-yellow-500/20 text-yellow-300';

  return (
    <div 
      className={`bg-gray-900/50 rounded-2xl overflow-hidden group animate-fade-in border-2 ${isCompared ? 'border-orange-500' : 'border-transparent'} transition-all duration-300 flex flex-col`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative" onClick={onSelect}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        {product.condition && (
          <div className={`absolute top-4 left-4 text-xs font-bold py-1 px-3 rounded-full ${conditionStyles}`}>
            {product.condition}
          </div>
        )}
        <button
          onClick={handleCompareClick}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isCompared ? 'bg-orange-500 text-black' : 'bg-black/50 text-white hover:bg-black/80'}`}
          aria-label={isCompared ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isCompared ? <CheckIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold">
          <a href="#" onClick={(e) => { e.preventDefault(); onSelect(); }} className="hover:text-orange-500 transition-colors focus:outline-none focus:text-orange-500">{product.name}</a>
        </h3>
        {product.tagline && <p className="text-md text-orange-400 mt-1">{product.tagline}</p>}
        <p className="text-gray-400 mt-4 text-sm flex-grow">{product.description.substring(0, 100)}...</p>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
          <button onClick={handleAddToCart} className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/40 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Add to Cart
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};