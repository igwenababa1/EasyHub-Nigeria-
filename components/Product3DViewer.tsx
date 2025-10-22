import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface Product3DViewerProps {
  imageUrl: string;
  altText: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ imageUrl, altText }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 20 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoom(prev => {
      const newZoom = prev - e.deltaY * 0.001;
      return Math.max(0.7, Math.min(2, newZoom)); // Clamp zoom between 0.7 and 2
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      style={{ perspective: '1500px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto object-contain transition-transform duration-100 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        draggable="false"
      />
      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm pointer-events-none animate-fade-out">
          Drag to rotate, scroll to zoom
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