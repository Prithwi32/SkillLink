import React from 'react';
import { TestimonialCard } from '../Cards/TestimonialCard';
import { testimonials } from '../../constants/testimonials';

//I am using placeholder data which is in testimonials in constants folder
//While intergrating send the data here so that map funtion will render based on the number
//of user
export const TestimonialsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};
