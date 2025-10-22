import React from 'react';
import { useCart } from '../contexts/CartContext';
import { XIcon } from './Icons';

interface CartSummaryProps {
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

export const CartSummary: React.FC<CartSummaryProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const handleCheckout = () => {
    alert(`Checkout initiated for a total of ${formatPrice(subtotal)}.`);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-400">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-14 bg-gray-800 border border-gray-600 rounded text-center"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-300">Subtotal</span>
                <span className="text-2xl font-bold">{formatPrice(subtotal)}</span>
              </div>
              
              <button 
                onClick={handleCheckout} 
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-full text-lg hover:from-orange-400 hover:to-amber-400 transition-all"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};