import React from 'react';
import { WhatsAppIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img
          src="https://picsum.photos/seed/easyhub-hero/1920/1080"
          alt="Collection of modern smartphones and accessories"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 p-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
          EasyHub: Serving Your Digital Lifestyle
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 drop-shadow-md">
          Your trusted source for quality iPhones, Samsung, JBL & Accessories in Nigeria.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => document.querySelector('#product-showcase')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Shop Now
          </button>
          <a 
            href="https://wa.me/+2348169257333"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:bg-orange-500 hover:text-black shadow-lg w-full sm:w-auto"
          >
            <WhatsAppIcon className="w-6 h-6" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};