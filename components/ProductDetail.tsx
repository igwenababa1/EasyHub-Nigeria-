import React, { useState } from 'react';
import type { Product, ProductCategory } from '../types';
import { XIcon, WhatsAppIcon, ShieldCheckIcon, HeartIcon } from './Icons';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useRating } from '../contexts/RatingContext';
import { useUser } from '../contexts/UserContext';
import { Product3DViewer } from './Product3DViewer';
import { ImageZoomViewer } from './ImageZoomViewer';
import { AdvancedFeatures } from './AdvancedFeatures';
import { ProductCard } from './ProductCard';
import { Breadcrumbs } from './Breadcrumbs';
import { StarRating } from './StarRating';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  comparisonList: Product[];
  onToggleCompare: (product: Product) => void;
  onHomeClick: () => void;
  onCategoryClick: (category: ProductCategory) => void;
  onAuthClick: () => void;
  onAddToBundle: (product: Product) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, allProducts, onClose, onSelectProduct, comparisonList, onToggleCompare, onHomeClick, onCategoryClick, onAuthClick, onAddToBundle }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useUser();
  const { getRatingInfo, addRating, hasUserRated } = useRating();
  const [viewMode, setViewMode] = useState<'3d' | 'zoom'>('3d');

  const { average, count } = getRatingInfo(product.id);
  const userHasRated = hasUserRated(product.id);

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const conditionStyles = product.condition === 'Brand New' 
    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id);
    
  const breadcrumbs = [
    { name: 'Home', onClick: onHomeClick },
    { name: product.category, onClick: () => onCategoryClick(product.category) },
    { name: product.name }
  ];
  
  return (
    <div className="animate-fade-in-fast">
      <div className="container mx-auto px-6 py-16">
        <button onClick={onClose} className="fixed top-8 right-8 text-gray-500 hover:text-white transition-colors z-50 bg-black/50 rounded-full p-2">
          <XIcon className="w-8 h-8" />
        </button>
        
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24 h-[60vh] bg-gray-900/50 rounded-2xl flex items-center justify-center p-4 relative">
            <div className="absolute top-4 left-4 z-10 bg-black/50 rounded-full p-1 flex gap-1 text-sm backdrop-blur-sm">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 rounded-full transition-colors duration-200 ${viewMode === '3d' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                aria-pressed={viewMode === '3d'}
              >
                3D
              </button>
              <button
                onClick={() => setViewMode('zoom')}
                className={`px-3 py-1 rounded-full transition-colors duration-200 ${viewMode === 'zoom' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                aria-pressed={viewMode === 'zoom'}
              >
                Zoom
              </button>
            </div>
            {viewMode === '3d' ? (
              <Product3DViewer imageUrl={product.imageUrl} altText={product.name} />
            ) : (
              <ImageZoomViewer imageUrl={product.imageUrl} altText={product.name} />
            )}
          </div>
          
          <div>
            {product.condition && (
              <span className={`inline-block text-sm font-bold py-1 px-4 rounded-full mb-3 border ${conditionStyles}`}>
                {product.condition}
              </span>
            )}
            <h1 className="text-5xl font-extrabold tracking-tight">{product.name}</h1>
            {product.tagline && <p className="text-2xl text-orange-400 mt-2">{product.tagline}</p>}
            
            <div className="mt-4 flex items-center gap-2">
                <StarRating rating={average} readOnly />
                {count > 0 ? (
                  <span className="text-gray-400">
                      {average.toFixed(1)} stars ({count} reviews)
                  </span>
                ) : (
                  <span className="text-gray-400">No reviews yet</span>
                )}
            </div>
            
            <p className="text-4xl font-bold mt-8">{formatPrice(product.price)}</p>
            <p className="text-gray-300 mt-4 text-lg leading-relaxed">{product.description}</p>
            
            {product.warranty && (
                <div className="mt-6 flex items-center gap-3 text-green-300 bg-green-500/10 p-3 rounded-lg">
                    <ShieldCheckIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="font-semibold">{product.warranty}</span>
                </div>
            )}
            
            <div className="mt-8 flex items-stretch gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-grow bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                  isInWishlist(product.id)
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-gray-700 hover:border-orange-500'
                }`}
                aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <HeartIcon
                  className={`w-6 h-6 transition-colors ${
                    isInWishlist(product.id) ? 'text-orange-500' : 'text-gray-400'
                  }`}
                  filled={isInWishlist(product.id)}
                />
              </button>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/+2348169257333"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 border-2 border-orange-500 text-orange-500 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:bg-orange-500 hover:text-black shadow-lg"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>Ask a Question</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-12">Reviews & Ratings</h2>
            <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold">Rate this product</h3>
                {user ? (
                    userHasRated ? (
                        <p className="mt-4 text-green-400">Thanks for your review!</p>
                    ) : (
                        <>
                            <p className="text-gray-400 mt-2">Share your thoughts with other customers</p>
                            <div className="mt-4 flex justify-center">
                                <StarRating onRate={(rating) => addRating(product.id, rating)} />
                            </div>
                        </>
                    )
                ) : (
                    <div className="mt-4">
                        <p className="text-gray-400">You must be signed in to leave a review.</p>
                        <button onClick={onAuthClick} className="mt-3 text-orange-400 font-semibold hover:underline">
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>


        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-12">Key Specifications</h2>
            <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-xl p-8">
              <ul className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="font-semibold text-gray-300">{key}</span>
                    <span className="text-right text-white">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <AdvancedFeatures product={product} />

        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-16">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={() => onSelectProduct(p)}
                  index={index}
                  isCompared={!!comparisonList.find(c => c.id === p.id)}
                  onToggleCompare={() => onToggleCompare(p)}
                  onAddToBundle={onAddToBundle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};