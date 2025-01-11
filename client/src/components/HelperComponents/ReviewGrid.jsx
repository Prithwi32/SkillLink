import React, { memo } from 'react';
import ReviewCard from '../Cards/ReviewSectionCard';

const ReviewsGrid = memo(({ reviews, isEditable, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          {...review}
          isEditable={isEditable}
          onEdit={() => onEdit?.(review.id)}
        />
      ))}
    </div>
  );
});

ReviewsGrid.displayName = 'ReviewsGrid';

export default ReviewsGrid;
