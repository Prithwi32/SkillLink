import React from 'react';
import { Pencil } from 'lucide-react';
import { StarRating } from '../HelperComponents/StarRating';

export const ReviewCard = ({ review, isEditable = false, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={review.reviewerImage}
            alt={review.reviewerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {review.reviewerName}
            </h3>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        </div>
        {isEditable && (
          <button
            onClick={() => onEdit?.(review)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-50"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="mt-4">
        <StarRating rating={review.rating} />
      </div>
      
      <p className="mt-4 text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  );
};
