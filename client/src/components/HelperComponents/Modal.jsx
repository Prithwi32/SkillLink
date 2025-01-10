import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { StarRating } from '../HelperComponents/StarRating';

export const Modal = ({ review, isOpen, onClose, onSave }) => {
  const modalRef = useRef(null);
  const [text, setText] = useState(review.text);
  const [rating, setRating] = useState(review.rating);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    onSave({
      ...review,
      text,
      rating,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-300 animate-slideIn"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Edit Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <StarRating rating={rating} editable onChange={setRating} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <textarea
              id="review"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Write your review..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
