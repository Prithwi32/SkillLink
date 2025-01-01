import React, { useEffect, useState } from "react";
import { Calendar, ExternalLink, Star, Edit2, Ban, X } from "lucide-react";
import SkillSuggest from "../HelperComponents/SkillSuggestionInputField";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export function SessionCard({ session, getAllSessions }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [editData, setEditData] = useState(session);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { backendUrl } = useAuth();

  const handleSave = async () => {
    try {
      const body = {
        link: editData.link,
        date: editData.date,
        skillTaughtByUserOne:
          userId === editData.userOne._id
            ? editData.skillTaughtByUserOne._id
            : editData.skillTaughtByUserTwo._id,
        skillTaughtByUserTwo:
          userId === editData.userOne._id
            ? editData.skillTaughtByUserTwo._id
            : editData.skillTaughtByUserOne._id,
      };

      const { data } = await axios.put(
        backendUrl + `/api/sessions/edit/${editData._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success("Session updated successfully");
        getAllSessions();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Error updating session");
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const isConfirmed = confirm(
        "Are you sure you want to cancel this session?",
      );

      if (isConfirmed) {
        console.log(sessionId);
        const { data } = await axios.put(
          backendUrl + `/api/sessions/${sessionId}/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (data.success) {
          toast.success("Session canceled successfully");
          getAllSessions();
        } else {
          toast.error(data.message || "Failed to cancel session");
        }
      }
    } catch (error) {
      console.error("Failed to cancel session:", error);
      toast.error("Failed to cancel session. Please try again later.");
    }
  };

  const handleSubmitReview = async (session) => {
    try {
      const body = {
        rating: rating,
        comment: reviewText,
        reviewedTo:
          userId === session.userOne._id
            ? session.userTwo._id
            : session.userOne._id,
        sessionId: session._id,
        skillId:
          userId === session.userOne._id
            ? session.skillTaughtByUserTwo._id
            : session.skillTaughtByUserOne._id,
      };

      const { data } = await axios.post(backendUrl + "/api/reviews/new", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success("Review submitted successfully");
        getAllSessions();
        setIsReviewing(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to submit review. Try again...");
    }
  };

  const renderScheduledActions = () => (
    <div className="mt-4 flex flex-wrap gap-2">
      <a
        href={session.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        <ExternalLink className="w-4 h-4 mr-1" />
        Join Session
      </a>
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
      >
        <Edit2 className="w-4 h-4 mr-1" />
        Edit
      </button>
      <button
        onClick={() => cancelSession(session._id)}
        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        <Ban size={16} className="mr-1" />
        Cancel
      </button>
    </div>
  );

  const renderCompletedActions = () => (
    <div className="mt-4">
      {(session.userOne._id === userId && session.isReviewProvidedByUserOne) ||
      (session.userTwo._id === userId && session.isReviewProvidedByUserTwo) ? (
        <div className="text-sm text-gray-600">
          <button className="p-6 py-2 px-4 rounded-md text-center bg-green-100 text-green-800">
            Review Submitted
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsReviewing(true)}
          className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
        >
          Review Session
        </button>
      )}
       <button className="mt-4 text-violet-800 bg-violet-100 rounded-md w-full py-2 font-semibold">Session Completed</button>
    </div>
  );

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <SkillSuggest
            feildName={"Skills Offered"}
            isMultiple={false}
            setEditData={setEditData}
            editData={editData}
            isFromSessionCard={true}
          />
          <SkillSuggest
            feildName={"Skills Acquiring"}
            isMultiple={false}
            setEditData={setEditData}
            editData={editData}
            isFromSessionCard={true}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Link
            </label>
            <input
              type="url"
              value={editData.link}
              onChange={(e) =>
                setEditData({ ...editData, link: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isReviewing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
        <h3 className="font-medium text-lg mb-4">
          Review Session with{" "}
          {session.userOne._id === userId
            ? session.userTwo.name
            : session.userOne.name}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 border rounded min-h-[100px]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmitReview(session)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={!rating || !reviewText.trim()}
            >
              Submit Review
            </button>
            <button
              onClick={() => setIsReviewing(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">
          {session.userOne._id == userId
            ? session.userTwo.name
            : session.userOne.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(session.date).toLocaleDateString()}
        </div>
      </div>
      <div className="my-3 flex items-center gap-2 text-sm">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {session.skillTaughtByUserOne.name}
        </span>
        <span className="text-gray-400">⇄</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {session.skillTaughtByUserTwo.name}
        </span>
      </div>
      {session.status === "Scheduled" && renderScheduledActions()}
      {session.status === "Completed" && renderCompletedActions()}
      {session.status === "Cancelled" && (
        <button className="mt-4 bg-red-100 text-red-800 rounded-md w-full py-2 font-semibold text-opacity-80">Session Canceled</button>
      )}
    </div>
  );
}

//Old Skill design
{
  /* <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Skills Offered</h4>
          <p className="text-gray-600">{session.skillsOffered}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Skills Acquiring</h4>
          <p className="text-gray-600">{session.skillsAcquiring}</p>
        </div>
      </div> */
}
