import React, { useState } from "react";

const FeedbackForm = ({ mentorName, closeForm }) => {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ mentorName, rating, feedback });
    alert("Feedback submitted successfully!");
    setRating("");
    setFeedback("");
    closeForm(); // Close the form after submission
  };

  const handleClose = () => {
    closeForm(); // Close the form without submitting
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl relative"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Instructor Feedback Form
        </h2>

        {/* Instructor Name */}
        <div className="mb-4">
          <label
            htmlFor="instructor"
            className="block text-blue-700 font-medium mb-2"
          >
            Instructor Name
          </label>
          <input
            type="text"
            id="instructor"
            value={mentorName}
            readOnly
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-blue-700 font-medium mb-2"
          >
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a rating..."
          />
        </div>

        {/* Feedback */}
        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-blue-700 font-medium mb-2"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your feedback here..."
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
