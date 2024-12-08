import React from 'react';

const feedbacks = [
  { id: 1, author: 'Alice Johnson', content: 'Great team player and always delivers high-quality work!', rating: 5 },
  { id: 2, author: 'Bob Smith', content: 'Excellent problem-solving skills. A pleasure to work with.', rating: 4 },
  { id: 3, author: 'Carol Williams', content: 'Very knowledgeable and always willing to help others.', rating: 5 },
];

export default function FeedbackSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Feedback</h2>
      <div className="space-y-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-gray-50 rounded-lg p-4 shadow">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-blue-700 mr-2">{feedback.author}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{feedback.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

