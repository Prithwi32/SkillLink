import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const StarRating = ({ rating, editable = false, onChange }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            editable ? 'cursor-pointer hover:scale-110' : ''
          } fill-yellow-400 text-yellow-400 transition-transform`}
          onClick={() => editable && onChange?.(i)}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={`w-5 h-5 ${
            editable ? 'cursor-pointer hover:scale-110' : ''
          } fill-yellow-400 text-yellow-400 transition-transform`}
          onClick={() => editable && onChange?.(i)}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            editable ? 'cursor-pointer hover:scale-110' : ''
          } text-gray-300 transition-transform`}
          onClick={() => editable && onChange?.(i)}
        />
      );
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};
