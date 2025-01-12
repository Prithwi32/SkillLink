import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReviewsGrid from "../HelperComponents/ReviewGrid";
import EditReviewModal from "../HelperComponents/EditReviewModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

function ReviewSection() {
  const [activeTab, setActiveTab] = useState("received");
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState({
    received: [],
    given: [],
  });

  const [loading, setLoading] = useState(false);

  const myUserId = localStorage.getItem("userId");
  const { backendUrl, token } = useAuth();

  const getMyReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + `/api/reviews/user/${myUserId}`,
      );

      if (data.success) {
        setReviews({ ...reviews, received: data.reviews });
      } else {
        toast.error("Couldn't load reviews");
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load reviews");
    } finally {
      setLoading(false);
    }
  };

  const getGivenReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/reviews/given", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const modifiedReview = data.reviews.map((review) => ({
          ...review,
          reviewedBy: review.userId,
        }));
        setReviews({ ...reviews, given: modifiedReview });
      } else {
        toast.error("Couldn't load reviews");
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab == "received") getMyReviews();
    else getGivenReviews();
  }, [activeTab]);

  const handleEditReview = useCallback((_id) => {
    setEditingReview(_id);
  }, []);

  const currentReview = useMemo(() => {
    if (!editingReview) return null;
    return reviews.given.find((review) => review._id === editingReview);
  }, [editingReview, reviews.given]);

  const handleSaveReview = useCallback(
    async (data) => {
      if (!editingReview) return;

      setReviews((prev) => ({
        ...prev,
        given: prev.given.map((review) =>
          review._id === editingReview ? { ...review, ...data } : review,
        ),
      }));

      try {
        const response = await axios.put(
          backendUrl + `/api/reviews/edit/${editingReview}`,
          { comment: data.comment, rating: data.rating },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          toast.success("Review updated successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update review");
      }

      setEditingReview(null);
    },
    [editingReview],
  );

  const handleDeleteReview = async (reviewId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (isConfirmed) {
      try {
        const { data } = await axios.delete(
          backendUrl + `/api/reviews/remove/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (data.success) {
          getGivenReviews();
          toast.success(data.message);
        } else {
          toast.error(data.message || "Failed to delete review");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete review");
      }
    }
  };

  return (
    <div className="min-h-screen sm:bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("received")}
            className={`sm:px-6 sm:py-3 px-2 rounded-lg font-medium transition-all ${
              activeTab === "received"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            My Reviews
          </button>
          <button
            onClick={() => setActiveTab("given")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "given"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reviews Given
          </button>
        </div>

        <div className="transition-opacity duration-300">
          {activeTab === "received"
            ? !loading && <ReviewsGrid reviews={reviews.received} />
            : !loading && (
                <ReviewsGrid
                  reviews={reviews.given}
                  isEditable
                  onEdit={handleEditReview}
                  handleDelete={handleDeleteReview}
                />
              )}
          {loading && (
            <div className="flex justify-center items-center font-medium text-slate-400 h-full">
              Loading...
            </div>
          )}

          {!loading &&
            reviews.received.length === 0 &&
            activeTab === "received" && (
              <div className="flex justify-center items-center font-medium text-slate-500 h-full">
                You haven't received any reviews yet
              </div>
            )}

          {!loading && reviews.given.length === 0 && activeTab === "given" && (
            <div className="flex justify-center items-center font-medium text-slate-500 h-full">
              You haven't given any reviews yet
            </div>
          )}
        </div>

        {currentReview && (
          <EditReviewModal
            isOpen={!!editingReview}
            onClose={() => setEditingReview(null)}
            onSave={handleSaveReview}
            initialRating={currentReview.rating}
            initialReview={currentReview.comment}
          />
        )}
      </div>
    </div>
  );
}

export default ReviewSection;
