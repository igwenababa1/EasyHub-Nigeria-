import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PRODUCTS, ACCESSORIES } from '../constants';

interface Ratings {
  [productId: string]: number[];
}
type RatedProducts = string[];

interface RatingContextType {
  addRating: (productId: string, rating: number) => void;
  getRatingInfo: (productId: string) => { average: number; count: number };
  hasUserRated: (productId: string) => boolean;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<Ratings>({});
  const [userRatedProducts, setUserRatedProducts] = useState<RatedProducts>([]);

  useEffect(() => {
    try {
      const savedRatings = window.localStorage.getItem('productRatings');
      const savedRatedProducts = window.localStorage.getItem('userRatedProducts');

      if (savedRatings) {
        setRatings(JSON.parse(savedRatings));
      } else {
        // Seed initial ratings data if none exists in localStorage
        const initialRatings: Ratings = {};
        const allProducts = [...PRODUCTS, ...ACCESSORIES];

        allProducts.forEach(product => {
          if (product.salesCount && product.salesCount > 0) {
            // Generate a plausible number of reviews based on sales, skewed towards positive ratings
            const numReviews = Math.max(5, Math.floor(product.salesCount / 15));
            const productRatings = [];
            for (let i = 0; i < numReviews; i++) {
              // Skew ratings: 70% chance for 5, 25% for 4, 5% for 3
              const rand = Math.random();
              if (rand < 0.7) productRatings.push(5);
              else if (rand < 0.95) productRatings.push(4);
              else productRatings.push(3);
            }
            initialRatings[product.id] = productRatings;
          }
        });
        
        setRatings(initialRatings);
        window.localStorage.setItem('productRatings', JSON.stringify(initialRatings));
      }

      if (savedRatedProducts) {
        setUserRatedProducts(JSON.parse(savedRatedProducts));
      }
    } catch (error) {
      console.error("Failed to parse ratings from localStorage", error);
    }
  }, []);

  const addRating = (productId: string, rating: number) => {
    if (userRatedProducts.includes(productId)) return; 

    const newRatings = { ...ratings };
    if (!newRatings[productId]) {
      newRatings[productId] = [];
    }
    newRatings[productId].push(rating);

    const newRatedProducts = [...userRatedProducts, productId];

    setRatings(newRatings);
    setUserRatedProducts(newRatedProducts);

    try {
        window.localStorage.setItem('productRatings', JSON.stringify(newRatings));
        window.localStorage.setItem('userRatedProducts', JSON.stringify(newRatedProducts));
    } catch (error) {
        console.error("Failed to save ratings to localStorage", error);
    }
  };

  const getRatingInfo = (productId: string) => {
    const productRatings = ratings[productId] || [];
    const count = productRatings.length;
    const average = count > 0 ? productRatings.reduce((a, b) => a + b, 0) / count : 0;
    return { average, count };
  };

  const hasUserRated = (productId: string) => {
    return userRatedProducts.includes(productId);
  };

  return (
    <RatingContext.Provider value={{ addRating, getRatingInfo, hasUserRated }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = (): RatingContextType => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating must be used within a RatingProvider');
  }
  return context;
};
