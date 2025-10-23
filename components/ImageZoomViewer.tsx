import React, { useState, MouseEvent, useEffect, useRef } from 'react';

interface ImageZoomViewerProps {
  imageUrl: string;
  altText: string;
  zoomLevel?: number;
}

export const ImageZoomViewer: React.FC<ImageZoomViewerProps> = ({ imageUrl, altText, zoomLevel = 2.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    if (containerRef.current) {
      const img = containerRef.current.querySelector('img');
      if (img) {
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = `scale(${zoomLevel})`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      const img = containerRef.current.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-contain transition-transform duration-100 ease-out"
      />
      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm pointer-events-none animate-fade-out">
          Hover to zoom
        </div>
      )}
      <style>{`
        @keyframes fade-out {
          0% { opacity: 1; transform: translate(-50%, 0); }
          80% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 10px); }
        }
        .animate-fade-out {
          animation: fade-out 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
