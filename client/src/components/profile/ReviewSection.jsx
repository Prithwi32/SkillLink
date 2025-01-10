import React, { useState } from 'react';
import { ReviewCard } from '../Cards/ReviewSectionCard';
import { Modal } from '../HelperComponents/Modal';

// Mock data - replace with actual API calls
const mockReceivedReviews = [
  {
    id: '1',
    reviewerName: 'Sarah Johnson',
    reviewerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.5,
    text: 'Exceptional work ethic and great communication throughout the project. Would definitely recommend!',
    date: 'March 15, 2024',
  },
  {
    id: '2',
    reviewerName: 'Michael Chen',
    reviewerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 5,
    text: 'Outstanding attention to detail and delivered the project ahead of schedule.',
    date: 'March 10, 2024',
  },
  {
    id: '4',
    reviewerName: 'Emily Rodriguez',
    reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4.5,
    text: 'A pleasure to work with. Very professional and delivered high-quality work.',
    date: 'March 5, 2024',
  },
];

const mockGivenReviews = [
  {
    id: '3',
    reviewerName: 'David Wilson',
    reviewerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4,
    text: 'Great experience working together. Very professional and responsive.',
    date: 'March 8, 2024',
  },
  {
    id: '5',
    reviewerName: 'Alex Thompson',
    reviewerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 5,
    text: 'Excellent collaboration and communication throughout the project.',
    date: 'March 1, 2024',
  },
];

function ReviewSection() {
  const [activeTab, setActiveTab] = useState('received');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleSaveReview = async (updatedReview) => {
    try {
      // Here you would make an API call to update the review
      console.log('Saving updated review:', updatedReview);

      // Optimistic update (replace with actual API integration)
      const updatedReviews = mockGivenReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );
      console.log('Updated reviews:', updatedReviews);
    } catch (error) {
      console.error('Error updating review:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'received'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            My Reviews
          </button>
          <button
            onClick={() => setActiveTab('given')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'given'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            Reviews Given
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'received'
            ? mockReceivedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            : mockGivenReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isEditable
                  onEdit={handleEditReview}
                />
              ))}
        </div>
      </div>

      {selectedReview && (
        <Modal
          review={selectedReview}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReview(null);
          }}
          onSave={handleSaveReview}
        />
      )}
    </div>
  );
}

export default ReviewSection;
