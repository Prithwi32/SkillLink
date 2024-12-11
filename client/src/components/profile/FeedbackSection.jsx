import React from "react";
import { PlusCircle } from "lucide-react";
import { TestimonialsList } from "../TestimonialsList";

const FeedbackSection = () => {
  const handleAddTestimonial = () => {
    console.log("Add testimonial clicked");
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
    </div>
  );
};

export default FeedbackSection;
