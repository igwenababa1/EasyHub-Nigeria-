import React from 'react';
import { CheckCircleIcon } from './Icons';

const FeaturePoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <CheckCircleIcon className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
        <span>{children}</span>
    </li>
);

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Why Choose EasyHub?</h2>
            <p className="mt-4 text-lg text-gray-400">
              We are more than just a phone store. We are your trusted partner in navigating the digital world, providing quality you can feel and service you can rely on.
            </p>
            <ul className="mt-8 space-y-4 text-gray-300 text-lg">
                <FeaturePoint>
                    <strong>Official Importer & Wholesaler:</strong> Get authentic devices at the best prices, directly from the source.
                </FeaturePoint>
                <FeaturePoint>
                    <strong>Uncompromising Quality Guarantee:</strong> Every device, new or used, is rigorously tested to meet our high standards.
                </FeaturePoint>
                <FeaturePoint>
                    <strong>Multi-Branch Support:</strong> Visit us in Ikeja, Ikotun, or Victoria Island for in-person service and support.
                </FeaturePoint>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1581347995956-397a6653f868?q=80&w=1920&auto=format&fit=crop" 
              alt="Happy customer using a smartphone in a modern store" 
              className="rounded-2xl shadow-lg shadow-orange-500/10"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};