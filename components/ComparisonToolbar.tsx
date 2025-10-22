import React from 'react';
import type { Product } from '../types';

interface ComparisonToolbarProps {
  list: Product[];
  onCompare: () => void;
  onClear: () => void;
}

export const ComparisonToolbar: React.FC<ComparisonToolbarProps> = ({ list, onCompare, onClear }) => {
  const canCompare = list.length > 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 animate-slide-up">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg hidden sm:inline">Comparing ({list.length}/3)</span>
          <div className="flex items-center gap-3">
            {list.map(product => (
              <img 
                key={product.id} 
                src={product.imageUrl} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-600"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClear} className="text-gray-400 hover:text-white transition-colors">
            Clear
          </button>
          <button 
            onClick={onCompare} 
            disabled={!canCompare}
            className={`bg-orange-500 text-white font-bold py-3 px-6 rounded-full transition-all ${canCompare ? 'hover:bg-orange-400' : 'opacity-50 cursor-not-allowed'}`}
          >
            Compare Now
          </button>
        </div>
      </div>
       <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};