import React, { useState } from 'react';
const FeedbackForm = () => {
    const [instructorName, setInstructorName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState('');
  
    const registeredInstructors = [
      'John Doe',
      'Jane Smith',
      'Emily Davis',
      'Michael Brown',
      'Sarah Wilson',
    ];
  
    const handleInstructorChange = (e) => {
      const value = e.target.value;
      setInstructorName(value);
  
      if (value) {
        const filteredSuggestions = registeredInstructors.filter((name) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };
  
    const selectSuggestion = (name) => {
      setInstructorName(name);
      setSuggestions([]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ instructorName, rating, feedback });
      alert('Feedback submitted successfully!');
      setInstructorName('');
      setRating('');
      setFeedback('');
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full p-8 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Instructor Feedback Form</h2>
  
        {/* Instructor Name */}
        <div className="mb-4 relative">
          <label htmlFor="instructor" className="block text-blue-700 font-medium mb-2">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructor"
            value={instructorName}
            onChange={handleInstructorChange}
            className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Start typing..."
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-blue-300 rounded shadow mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((name, index) => (
                <li
                  key={index}
                  onClick={() => selectSuggestion(name)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
  
        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-blue-700 font-medium mb-2">
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
          <label htmlFor="feedback" className="block text-blue-700 font-medium mb-2">
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
    );
  };
  
  export default FeedbackForm;
  