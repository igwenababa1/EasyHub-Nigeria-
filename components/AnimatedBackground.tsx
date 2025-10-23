import React from 'react';
import { ChevronDownIcon } from './Icons';

export const AnimatedBackground: React.FC = () => {
  const handleScrollDown = () => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1531297484001-80022131c5a9?q=80&w=1920&auto=format&fit=crop"
        >
          {/* Video by Felix Mittermeier from Pexels */}
          <source src="https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 p-6 animate-fade-in-up flex-grow flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-lg">
          Experience Innovation
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 drop-shadow-md">
          The future of digital lifestyle, delivered today.
        </p>
      </div>
      
      <div className="relative z-10 pb-12">
        <button 
          onClick={handleScrollDown} 
          className="animate-bounce"
          aria-label="Scroll down to main content"
        >
          <ChevronDownIcon className="w-12 h-12 text-white/70 hover:text-white transition-colors" />
        </button>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};