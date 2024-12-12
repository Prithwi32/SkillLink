import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);  // Whole number part of the rating
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a decimal part greater than or equal to 0.5

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 transition-colors ${
            star <= fullStars
              ? 'fill-yellow-400 text-yellow-400'  // Full golden stars
              : star === fullStars + 1 && hasHalfStar
              ? 'fill-yellow-400/50 text-yellow-400'  // Half-filled star for decimal ratings
              : 'fill-gray-200 text-gray-200'  // White stars with golden border
          }`}
        />
      ))}
    </div>
  );
};

