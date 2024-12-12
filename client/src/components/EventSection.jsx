import React, { useState } from 'react';
import { CreatedEventCard } from '../components/Cards/CreatedEventCard';
import { EnrolledEventCard } from '../components/Cards/EnrolledEventCard';

export const EventSection = ({ title, events, type }) => {
  const [activeCategory, setActiveCategory] = useState('scheduled');

  const categories = [
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'canceled', label: 'Canceled' },
    { id: 'completed', label: 'Completed' },
  ];

  const CardComponent = type === 'created' ? CreatedEventCard : EnrolledEventCard;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      <div className="flex space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events[activeCategory].map((event, index) => (
          <CardComponent
            key={index}
            event={event}
            status={activeCategory}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};
