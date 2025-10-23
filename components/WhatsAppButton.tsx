import React from 'react';
import { WhatsAppIcon } from './Icons';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/+2348169257333"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
};