import React, { useState, useCallback, useMemo } from 'react';
import ReviewsGrid from '../HelperComponents/ReviewGrid';
import EditReviewModal from '../HelperComponents/EditReviewModal';

// Sample data - replace with actual data from your backend
const myReviews = [
  {
    id: '1',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    name: 'John Doe',
    rating: 4,
    review: 'Great work ethic and attention to detail. Always delivers on time.',
  },
  {
    id: '2',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    name: 'Jane Smith',
    rating: 5,
    review: 'Exceptional communication skills and problem-solving abilities.',
  },
];

const reviewsGiven = [
  {
    id: '3',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    name: 'Mike Johnson',
    rating: 4,
    review: 'Consistently delivers high-quality work. A pleasure to work with.',
  },
  {
    id: '4',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    name: 'Sarah Williams',
    rating: 5,
    review: 'Outstanding performance on all projects. Highly recommended.',
  },
];

function ReviewSection() {
  const [activeTab, setActiveTab] = useState('received');
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState({ received: myReviews, given: reviewsGiven });

  const handleEditReview = useCallback((id) => {
    setEditingReview(id);
  }, []);

  const currentReview = useMemo(() => {
    if (!editingReview) return null;
    return reviews.given.find((review) => review.id === editingReview);
  }, [editingReview, reviews.given]);

  const handleSaveReview = useCallback(
    (data) => {
      if (!editingReview) return;

      setReviews((prev) => ({
        ...prev,
        given: prev.given.map((review) =>
          review.id === editingReview ? { ...review, ...data } : review
        ),
      }));

      setEditingReview(null);
    },
    [editingReview]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'received'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            My Reviews
          </button>
          <button
            onClick={() => setActiveTab('given')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'given'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Reviews Given
          </button>
        </div>

        <div className="transition-opacity duration-300">
          {activeTab === 'received' ? (
            <ReviewsGrid reviews={reviews.received} />
          ) : (
            <ReviewsGrid
              reviews={reviews.given}
              isEditable
              onEdit={handleEditReview}
            />
          )}
        </div>

        {currentReview && (
          <EditReviewModal
            isOpen={!!editingReview}
            onClose={() => setEditingReview(null)}
            onSave={handleSaveReview}
            initialRating={currentReview.rating}
            initialReview={currentReview.review}
          />
        )}
      </div>
    </div>
  );
}

export default ReviewSection;
