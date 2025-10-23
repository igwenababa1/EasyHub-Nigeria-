import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useUser } from '../contexts/UserContext';
import { ShoppingCartIcon, HeartIcon, SparklesIcon, UserCircleIcon, LogoutIcon, CheckCircleIcon } from './Icons';
import { SearchBar } from './SearchBar';
import type { Product, ProductCategory } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  products: Product[];
  onCategorySelect: (category: ProductCategory) => void;
  selectedCategory: ProductCategory | null;
  onAIStudioClick: () => void;
  onCompareClick: () => void;
  comparisonCount: number;
  onAuthClick: () => void;
  onAccountClick: () => void;
}

const navLinks: { name: string, category: ProductCategory }[] = [
    { name: 'iPhones', category: 'iPhone' },
    { name: 'Samsung', category: 'Samsung' },
    { name: 'Audio', category: 'Audio' },
    { name: 'Accessories', category: 'Accessory' },
];

const UserMenu: React.FC<{ onAccountClick: () => void }> = ({ onAccountClick }) => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition-colors">
        <UserCircleIcon className="w-7 h-7" />
        <span className="hidden lg:inline">{user?.name}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-20 animate-fade-in-fast">
          <ul className="py-1">
            <li>
              <button
                onClick={() => { onAccountClick(); setIsOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                My Account
              </button>
            </li>
            <li>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
              >
                <LogoutIcon className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, onWishlistClick, searchQuery, setSearchQuery, 
  onLogoClick, onSearch, products, onCategorySelect, 
  selectedCategory, onAIStudioClick, onCompareClick, comparisonCount, 
  onAuthClick, onAccountClick 
}) => {
  const { itemCount } = useCart();
  const { wishlistItemCount } = useWishlist();
  const { user } = useUser();
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
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-wider">
            <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="hover:text-orange-500 transition-colors">EasyHub</a>
          </div>
          <div className="relative group flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Official RC Verified Business
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => onCategorySelect(link.category)}
              className={`hover:text-orange-500 transition-colors ${selectedCategory === link.category ? 'text-orange-500 font-semibold' : ''}`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={onCompareClick}
            className="flex items-center gap-2 hover:text-orange-500 transition-colors"
          >
            Compare Now
            {comparisonCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-black">
                    {comparisonCount}
                </span>
            )}
          </button>
          <button
            onClick={onAIStudioClick}
            className="flex items-center gap-2 hover:text-orange-500 transition-colors"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>AI Studio</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar 
            query={searchQuery} 
            setQuery={setSearchQuery} 
            onSearch={onSearch}
            products={products}
          />
          
          {user ? (
            <UserMenu onAccountClick={onAccountClick} />
          ) : (
            <button onClick={onAuthClick} className="font-medium hover:text-orange-500 transition-colors">
              Sign In
            </button>
          )}

          <button onClick={onWishlistClick} className="relative text-gray-300 hover:text-orange-500 transition-colors">
            <HeartIcon className="w-6 h-6" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                {wishlistItemCount}
              </span>
            )}
          </button>
          
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
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};