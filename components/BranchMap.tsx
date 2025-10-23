import React, { useEffect, useRef } from 'react';
import { BRANCHES } from '../constants';

// Let TypeScript know that 'L' is a global variable from the Leaflet script
declare const L: any;

export const BranchMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([6.5244, 3.3792], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      const orangeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f97316" width="32" height="32"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`;
      const orangeIconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(orangeIconSvg)}`;

      const orangeIcon = L.icon({
          iconUrl: orangeIconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
      });

      BRANCHES.forEach(branch => {
        L.marker(branch.coords, { icon: orangeIcon })
          .addTo(map)
          .bindPopup(`<b>${branch.name}</b><br>${branch.address}`);
      });
      
      mapInstanceRef.current = map;
    }
    
    // In a real React app with proper lifecycle management, you might need a more robust cleanup.
    // For this environment, we'll keep it simple.
    // No cleanup function is returned to prevent the map from being destroyed on every re-render.
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full rounded-lg z-0" />;
};