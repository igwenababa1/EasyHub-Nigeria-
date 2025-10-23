import React from 'react';
import type { Order } from '../types';
import { XIcon } from './Icons';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const receiptContent = (
    <div id="receipt-content" className="p-8 text-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black">EasyHub</h2>
        <p className="text-sm">...serving your digital lifestyle</p>
        <h3 className="text-2xl font-semibold mt-4">Purchase Receipt</h3>
      </div>
      <div className="flex justify-between text-sm mb-6 pb-4 border-b border-gray-300">
        <div>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
        </div>
        <div>
            <p><strong>EasyHub Nigeria LTD</strong></p>
            <p>RC: 1724543</p>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p>{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t-2 border-dashed border-gray-400">
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Total</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-8">
        Thank you for your purchase! For support, visit one of our branches or contact us via WhatsApp.
      </p>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in-fast print:bg-transparent"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <div 
        className="bg-gray-200 rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-transform animate-scale-in print:shadow-none print:m-0 print:rounded-none"
        onClick={e => e.stopPropagation()}
      >
        <div className="print:hidden">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors">
              <XIcon className="w-6 h-6" />
            </button>
        </div>
        
        {receiptContent}
        
        <div className="p-6 bg-gray-300/50 flex justify-end gap-4 print:hidden">
            <button 
              onClick={onClose} 
              className="px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-400/50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handlePrint} 
              className="px-6 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors font-semibold"
            >
              Print Receipt
            </button>
        </div>
      </div>
      <style>{`
        @media print {
          body > *:not(.print-container) {
            display: none;
          }
          .print-container {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
           body > #root > div > div:last-child {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
          }
          body > #root > div > div:last-child div:first-child{
            margin: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
            border: none;
            box-shadow: none;
            border-radius: 0;
          }
        }
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};