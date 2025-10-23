import React from 'react';
import { XIcon, ShieldCheckIcon } from './Icons';

interface PaymentConfirmationModalProps {
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({ total, onClose, onConfirm }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md m-4 p-8 relative transform transition-transform animate-scale-in text-center"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <XIcon className="w-6 h-6" />
        </button>
        
        <ShieldCheckIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        
        <h2 id="confirm-title" className="text-2xl font-bold mb-2 text-white">Confirm Your Payment</h2>
        <p className="text-gray-400 mb-4">You are about to make a payment of</p>
        
        <p className="text-4xl font-extrabold text-white my-4">{formatPrice(total)}</p>
        
        <p className="text-xs text-gray-500 mb-6">
            By clicking 'Confirm & Pay', you agree to our Terms of Service and authorize this payment.
            Please ensure you are on a secure network.
        </p>

        <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-full hover:from-orange-400 hover:to-amber-400 transition-all"
            >
              Confirm & Pay
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-400 font-bold py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};