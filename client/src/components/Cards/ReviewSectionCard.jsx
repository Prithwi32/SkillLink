import React, { memo, useState } from 'react';
import { Star, MoreVertical, Edit, Trash2 } from 'lucide-react';

const ReviewCard = memo(({ reviewedBy, rating, comment, isEditable, onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener('click', closeDropdown);
      return () => document.removeEventListener('click', closeDropdown);
    }
  }, [showDropdown]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-2 sm:gap-4 mb-4">
        <img
          src={reviewedBy.photo === ""
            ? "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            : reviewedBy.photo}
          alt={`${reviewedBy.name}'s profile`}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
            {reviewedBy.name}
          </h3>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        {isEditable && (
          <div className="relative">
            <button
              onClick={handleDropdownClick}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    onEdit();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Review
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    onDelete();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
        {comment}
      </p>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;