import { PlusCircle } from "lucide-react";
import { TestimonialsList } from "../TestimonialsList";
import React, { useState } from 'react';
import FeedbackForm from '../FeedbackForm';

const FeedbackSection = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTestimonial = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
            Testimonials
          </h1>
          <button
            onClick={handleAddTestimonial}
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-all duration-300 gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Add Testimonial
          </button>
        </div>
        <TestimonialsList />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &#x2715;
            </button>
            <FeedbackForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;




//Old feedback section code:

// const FeedbackSection = () => {
//   const handleAddTestimonial = () => {
//     console.log("Add testimonial clicked");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
//       <div className="container mx-auto py-16">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
//             Testimonials
//           </h1>
//           <button
//             onClick={handleAddTestimonial}
//             className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-all duration-300 gap-2"
//           >
//             <PlusCircle className="w-5 h-5" />
//             Add Testimonial
//           </button>
//         </div>
//         <TestimonialsList />
//       </div>
//     </div>
//   );
// };

// export default FeedbackSection;