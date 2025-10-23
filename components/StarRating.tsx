import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating?: number;
  readOnly?: boolean;
  onRate?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating = 0, readOnly = false, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rate: number) => {
    if (!readOnly && onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (!readOnly) {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className={`flex items-center ${!readOnly ? 'cursor-pointer' : ''}`}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const displayRating = hoverRating || rating;
        
        return (
          <button
            key={starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            className={`transition-colors duration-150 ${readOnly ? '' : 'transform hover:scale-125'}`}
            aria-label={`Rate ${starValue} stars`}
          >
            <StarIcon 
              className={`w-5 h-5 ${displayRating >= starValue ? 'text-yellow-400' : 'text-gray-600'}`} 
              filled={displayRating >= starValue}
            />
          </button>
        );
      })}
    </div>
  );
};