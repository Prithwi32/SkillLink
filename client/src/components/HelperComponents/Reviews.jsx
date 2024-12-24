import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "../Cards/ReviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Reviews = () => {
  const [hasMore, setHasMore] = useState(false);
  const { backendUrl } = useContext(AuthContext);
  const { userId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [showReviewCount, setShowReivewCount]=useState(3);

  const getReviews = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/reviews/user/${userId}`,
      );

      if (data.success) {
        setReviews(data.reviews);
        if (data.reviews.length > showReviewCount) setHasMore(true);
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

  // const reviews = [
  //   {
  //     id: '1',
  //     reviewerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
  //     reviewerName: 'Michael Chen',
  //     givenSkill: 'React',
  //     receivedSkill: 'Python',
  //     text: 'Sarah is an excellent teacher! She explained React concepts clearly and helped me understand complex patterns. Highly recommended!',
  //     rating: 5,
  //     date: '2 days ago',
  //   },
  //   {
  //     id: '2',
  //     reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
  //     reviewerName: 'Emma Wilson',
  //     givenSkill: 'Node.js',
  //     receivedSkill: 'React',
  //     text: 'Great experience working with Sarah. She has deep knowledge of Node.js and made the learning process enjoyable.',
  //     rating: 4.5,
  //     date: '1 week ago',
  //   },
  // ];


  const handleLoadMore = () => {
    // Backend integration will go here
    setShowReivewCount(reviews.length);
    setHasMore(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>

      <div className="space-y-4">
        {reviews &&
          reviews.length > 0 &&
          reviews.slice(0, showReviewCount).map((review) => (
            <div
              key={review._id}
              className="cursor-pointer"
            >
              <ReviewCard review={review} />
            </div>
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
    </div>
  );
};

export default Reviews;
