import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-900/50 rounded-2xl overflow-hidden animate-pulse flex flex-col">
      <div className="w-full h-80 bg-gray-800"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-8 bg-gray-800 rounded w-3/4"></div>
        <div className="h-5 bg-gray-800 rounded w-1/2 mt-2"></div>
        <div className="space-y-2 mt-4 flex-grow">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="h-10 bg-gray-800 rounded-lg w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
