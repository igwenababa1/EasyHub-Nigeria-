import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { XIcon, TrashIcon } from './Icons';
import type { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

const WishlistItem: React.FC<{ item: Product }> = ({ item }) => {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
        removeFromWishlist(item.id);
    };

    return (
        <div className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
                <div className="mt-2 flex gap-2">
                    <button onClick={handleAddToCart} className="text-sm bg-orange-500/20 text-orange-300 hover:bg-orange-500/40 font-semibold py-1 px-3 rounded-md transition-colors">
                        Move to Cart
                    </button>
                </div>
            </div>
            <button onClick={() => removeFromWishlist(item.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2" aria-label={`Remove ${item.name} from wishlist`}>
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
  const { wishlistItems } = useWishlist();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 id="wishlist-title" className="text-2xl font-bold">My Wishlist</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close wishlist">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-400">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {wishlistItems.map(item => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
