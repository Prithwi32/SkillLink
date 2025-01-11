import React, { useCallback, useState } from 'react';
import { Star, X } from 'lucide-react';

const EditReviewModal = ({ isOpen, onClose, onSave, initialRating, initialReview }) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSave = useCallback(() => {
    onSave({ rating, review });
    onClose();
  }, [rating, review, onSave, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 relative animate-modal-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Review</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(index + 1)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${
                    index < (hoveredRating || rating)
                      ? 'fill-blue-500 text-blue-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Write your review..."
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
