import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { CreditCardIcon, LockClosedIcon, SpinnerIcon, ShieldCheckIcon } from './Icons';
import { PaymentConfirmationModal } from './PaymentConfirmationModal';

interface CheckoutPageProps {
  onPlaceOrder: () => void;
  onBack: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPlaceOrder, onBack }) => {
  const { cartItems, subtotal } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Security Check
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        onPlaceOrder();
      }, 2500); // Simulate processing time
      return () => clearTimeout(timer);
    }
  }, [step, onPlaceOrder]);
  
  const handleConfirmPayment = () => {
    setIsConfirming(false);
    setIsProcessing(true);
    setStep(3);
  };
  
  const OrderSummary = () => (
    <div className="w-full lg:w-2/5 bg-gray-900/50 p-8 rounded-2xl sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3">
              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
              <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-gray-300">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between text-white font-bold text-xl pt-2">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-center text-green-300 text-sm">
        <p>You're saving an estimated N5,000 on shipping!</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in-fast min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12">Secure Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-3/5">
            {/* Step 1: Shipping */}
            <div className={`p-8 rounded-2xl bg-gray-900/50 border-2 ${step === 1 ? 'border-orange-500' : 'border-transparent'}`}>
              <h2 className="text-2xl font-bold mb-4">1. Shipping Information</h2>
              {step === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <textarea placeholder="Delivery Address" required rows={3} className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                  <input type="tel" placeholder="Phone Number" required className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <button type="submit" className="w-full bg-orange-600 font-bold py-3 px-6 rounded-full text-lg">Continue to Payment</button>
                </form>
              ) : (
                <p className="text-gray-400">Shipping details completed.</p>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`p-8 rounded-2xl mt-8 bg-gray-900/50 border-2 ${step === 2 ? 'border-orange-500' : 'border-transparent'}`}>
              <h2 className="text-2xl font-bold mb-4">2. Payment Method</h2>
              {step === 2 ? (
                <form onSubmit={(e) => { e.preventDefault(); setIsConfirming(true); }} className="space-y-4">
                  <div className="relative">
                    <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Card Number" required className="w-full bg-gray-800 p-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" required className="bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    <input type="text" placeholder="CVC" required className="bg-gray-800 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="text-center text-xs text-gray-400 pt-2 flex items-center justify-center gap-2">
                    <LockClosedIcon className="w-4 h-4" /> Your payment is secure and encrypted.
                  </div>
                  <button type="submit" className="w-full bg-orange-600 font-bold py-3 px-6 rounded-full text-lg">Review and Pay</button>
                </form>
              ) : (
                <p className="text-gray-400">Please complete shipping first.</p>
              )}
            </div>
            
            {step === 3 && isProcessing && (
              <div className="p-8 rounded-2xl mt-8 bg-gray-900/50 flex flex-col items-center justify-center text-center">
                  <SpinnerIcon className="w-12 h-12 text-orange-500 mb-4" />
                  <h2 className="text-2xl font-bold">Performing Security Checks...</h2>
                  <p className="text-gray-400 mt-2">Please wait while we securely process your payment.</p>
              </div>
            )}
          </div>

          <OrderSummary />
        </div>

        {isConfirming && (
          <PaymentConfirmationModal
            total={subtotal}
            onClose={() => setIsConfirming(false)}
            onConfirm={handleConfirmPayment}
          />
        )}
      </div>
    </div>
  );
};