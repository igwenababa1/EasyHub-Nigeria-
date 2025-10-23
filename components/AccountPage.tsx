import React from 'react';
import { useUser } from '../contexts/UserContext';
import type { Order } from '../types';

interface AccountPageProps {
  onBackToHome: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

const OrderHistoryItem: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-700">
            <div>
                <p className="font-bold text-white">Order ID: {order.id}</p>
                <p className="text-sm text-gray-400">Date: {order.date}</p>
            </div>
            <p className="font-bold text-lg text-orange-400">{formatPrice(order.subtotal)}</p>
        </div>
        <div className="space-y-2">
            {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
                    <span className="text-gray-300">{item.name} (x{item.quantity})</span>
                </div>
            ))}
        </div>
    </div>
);

export const AccountPage: React.FC<AccountPageProps> = ({ onBackToHome }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl">Please sign in to view your account.</p>
        <button onClick={onBackToHome} className="mt-4 bg-orange-500 text-white font-bold py-2 px-6 rounded-full">
            Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-fast min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* User Details */}
          <div className="lg:col-span-1 bg-gray-900/50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-semibold text-white">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-semibold text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">KYC Status</p>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300">Unverified</span>
                    <button className="text-xs text-orange-400 hover:underline">Start Verification</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order History */}
          <div className="lg:col-span-2 bg-gray-900/50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {user.orderHistory.length > 0 ? (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-3">
                    {user.orderHistory.map(order => <OrderHistoryItem key={order.id} order={order} />)}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-10">You have not placed any orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};