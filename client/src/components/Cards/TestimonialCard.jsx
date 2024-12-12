import React from 'react';
import { StarRating } from './ui/StarRating';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
        <p className="text-blue-600 font-medium mb-2">{testimonial.skill}</p>
        <StarRating rating={testimonial.rating} />
        <p className="mt-4 text-gray-600 text-center italic">"{testimonial.review}"</p>
      </div>
    </div>
  );
};
