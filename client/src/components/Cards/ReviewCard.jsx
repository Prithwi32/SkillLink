import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        <img
          src={review.reviewerImage}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{review.date}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{review.rating}</span>
            </div>
          </div>
          
          <div className="my-3 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.givenSkill}
            </span>
            <span className="text-gray-400">⇄</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.receivedSkill}
            </span>
          </div>
          
          <p className="text-gray-600">{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
