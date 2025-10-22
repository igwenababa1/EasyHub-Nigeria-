import React from 'react';
import { ShieldCheckIcon, TruckIcon, UsersIcon } from './Icons';

const TrustFeature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4 text-orange-500">{icon}</div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-gray-900/50 py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <TrustFeature 
            icon={<ShieldCheckIcon className="w-10 h-10" />}
            title="RC Verified"
            description="A fully registered company (RC 1724543) you can trust."
          />
          <TrustFeature 
            icon={<ShieldCheckIcon className="w-10 h-10" />}
            title="Warranty Guaranteed"
            description="Shop with confidence. All our devices come with a solid warranty."
          />
          <TrustFeature 
            icon={<TruckIcon className="w-10 h-10" />}
            title="Nationwide Shipping"
            description="Fast and secure delivery to your doorstep, anywhere in Nigeria."
          />
          <TrustFeature 
            icon={<UsersIcon className="w-10 h-10" />}
            title="100% Customer Referrals"
            description="Our service is so good, every customer recommends us."
          />
        </div>
      </div>
    </section>
  );
};
