import React, { useState } from 'react';
import ReviewCard from '../Cards/ReviewCard';

const Reviews = () => {
  const [hasMore, setHasMore] = useState(true);
  
  const reviews = [
    {
      id: '1',
      reviewerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
      reviewerName: 'Michael Chen',
      givenSkill: 'React',
      receivedSkill: 'Python',
      text: 'Sarah is an excellent teacher! She explained React concepts clearly and helped me understand complex patterns. Highly recommended!',
      rating: 5,
      date: '2 days ago',
    },
    {
      id: '2',
      reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
      reviewerName: 'Emma Wilson',
      givenSkill: 'Node.js',
      receivedSkill: 'React',
      text: 'Great experience working with Sarah. She has deep knowledge of Node.js and made the learning process enjoyable.',
      rating: 4.5,
      date: '1 week ago',
    },
  ];

  const handleCardClick = (reviewerId) => {
    // Placeholder for navigation logic
    console.log(`Navigate to profile page for reviewer ID: ${reviewerId}`);
  };

  const handleLoadMore = () => {
    // Backend integration will go here
    setHasMore(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div 
            key={review.id}
            onClick={() => handleCardClick(review.id)}
            className="cursor-pointer"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
