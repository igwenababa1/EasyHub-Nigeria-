import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon } from './Icons';
import { SearchBar } from './SearchBar';
import type { Product } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, searchQuery, setSearchQuery, onLogoClick, onSearch, products }) => {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-gray-500/20' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="hover:text-orange-500 transition-colors">EasyHub</a>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <a href="#" className="hover:text-orange-500 transition-colors">iPhones</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Samsung</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Audio</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Accessories</a>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar 
            query={searchQuery} 
            setQuery={setSearchQuery} 
            onSearch={onSearch}
            products={products}
          />
          
          <button onClick={onCartClick} className="relative text-gray-300 hover:text-orange-500 transition-colors">
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};