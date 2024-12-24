import React, { useContext } from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        <img
          src={review.reviewerImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'}
          alt={review.reviewedBy.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{review.reviewedBy.name}</h3>
              {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{review.date}</span>
              </div> */}
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{review.rating}</span>
            </div>
          </div>
          
          <div className="my-3 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.sessionId.skillTaughtByUserOne.name}
            </span>
            <span className="text-gray-400">⇄</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.sessionId.skillTaughtByUserTwo.name}
            </span>
          </div>
          
          <p className="text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
