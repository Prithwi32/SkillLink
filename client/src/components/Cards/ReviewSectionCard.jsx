import React, { memo } from 'react';
import { Star, Edit } from 'lucide-react';

const ReviewCard = memo(({ profileImage, name, rating, review, isEditable, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? 'fill-yellow-400 text-yellow-400 ' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        {isEditable && (
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}
      </div>
      <p className="text-gray-600 leading-relaxed">{review}</p>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;
