import React from 'react';
import type { Product } from '../types';
import { XIcon, WhatsAppIcon, ShieldCheckIcon } from './Icons';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product;
  accessories: Product[];
  onClose: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, accessories, onClose }) => {
  const { addToCart } = useCart();

  const handleAccessoryClick = (accessory: Product) => {
    addToCart(accessory);
  };

  const conditionStyles = product.condition === 'Brand New' 
    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  
  return (
    <div className="animate-fade-in-fast">
      <div className="container mx-auto px-6 py-16">
        <button onClick={onClose} className="fixed top-8 right-8 text-gray-500 hover:text-white transition-colors z-50 bg-black/50 rounded-full p-2">
          <XIcon className="w-8 h-8" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24 p-8 bg-gray-900/50 rounded-2xl">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-lg" />
          </div>
          
          <div>
            {product.condition && (
              <span className={`inline-block text-sm font-bold py-1 px-4 rounded-full mb-3 border ${conditionStyles}`}>
                {product.condition}
              </span>
            )}
            <h1 className="text-5xl font-extrabold tracking-tight">{product.name}</h1>
            {product.tagline && <p className="text-2xl text-orange-400 mt-2">{product.tagline}</p>}
            
            <p className="text-4xl font-bold mt-8">{formatPrice(product.price)}</p>
            <p className="text-gray-300 mt-4 text-lg leading-relaxed">{product.description}</p>
            
            {product.warranty && (
                <div className="mt-6 flex items-center gap-3 text-green-300 bg-green-500/10 p-3 rounded-lg">
                    <ShieldCheckIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="font-semibold">{product.warranty}</span>
                </div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Add to Cart
              </button>
              <a 
                href="https://wa.me/+2348169257333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 border-2 border-orange-500 text-orange-500 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:bg-orange-500 hover:text-black shadow-lg"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>Ask a Question</span>
              </a>
            </div>
          </div>
        </div>

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-12">Key Specifications</h2>
            <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-xl p-8">
              <ul className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="font-semibold text-gray-300">{key}</span>
                    <span className="text-right text-white">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center mb-16">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {accessories.map(acc => (
              <div key={acc.id} className="text-center bg-gray-900 p-6 rounded-lg group transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-orange-500/10">
                <img src={acc.imageUrl} alt={acc.name} className="w-32 h-32 object-cover mx-auto rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy"/>
                <h4 className="font-semibold text-lg">{acc.name}</h4>
                <p className="text-gray-400 mb-4">{formatPrice(acc.price)}</p>
                 <button 
                    onClick={() => handleAccessoryClick(acc)}
                    className="w-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/40 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Add to Cart
                </button>
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