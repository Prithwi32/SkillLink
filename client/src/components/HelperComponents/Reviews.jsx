import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "../Cards/ReviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import ReviewPopup from "../Cards/ReviewPopUp"; // Import the ReviewPopup component

const Reviews = () => {
  const [hasMore, setHasMore] = useState(false);
  const { backendUrl } = useContext(AuthContext);
  const { userId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [showReviewCount, setShowReivewCount] = useState(3);
  const [selectedReview, setSelectedReview] = useState(null); // Track the selected review for editing
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track if the popup is open

  const getReviews = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/reviews/user/${userId}`,
      );

      if (data.success) {
        setReviews(data.reviews);
        if (data.reviews.length > showReviewCount) setHasMore(true);
        else setHasMore(false);
      } else {
        toast.error("Couldn't load reviews");
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load reviews");
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleLoadMore = () => {
    setShowReivewCount(reviews.length);
    setHasMore(false);
  };

  const handleEdit = (review) => {
    setSelectedReview(review); // Set the review to be edited
    setIsPopupOpen(true); // Open the popup
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>

      <div className="space-y-4">
        {reviews &&
          reviews.length > 0 &&
          reviews
            .slice(0, showReviewCount)
            .map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onEdit={handleEdit}
                getReviews={getReviews}
              />
            ))}
        {reviews && reviews.length === 0 && (
          <p className="text-center font-semibold text-slate-400">
            No reviews yet
          </p>
        )}
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

      {/* Show the ReviewPopup if isPopupOpen is true */}
      {isPopupOpen && (
        <ReviewPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          initialReview={selectedReview}
          getReviews={getReviews}
        />
      )}
    </div>
  );
};

export default Reviews;
