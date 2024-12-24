import React, { useState } from "react";
import { Star, MoreVertical } from "lucide-react";

const ReviewCard = ({ review, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit(review); // Trigger the edit function passed down as a prop
    setMenuOpen(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this review?");
    if (isConfirmed) {
      console.log("Delete confirmed");
    } else {
      console.log("Delete canceled");
    }
    setMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] relative">
      <div className="flex items-start gap-4">
        <img
          src={
            review.reviewerImage ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
          }
          alt={review.reviewedBy.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{review.reviewedBy.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{review.rating}</span>
              </div>
            </div>
            <div>
              <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                  <button
                    onClick={handleEdit}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="my-3 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.sessionId.skillTaughtByUserOne.name}
            </span>
            <span className="text-gray-400">⇄</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {review.sessionId.skillTaughtByUserTwo.name}
            </span>
          </div>

          <p className="text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

