import React from 'react';

export function MentorCard({ mentor }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover-lift animate-fade-in">
      <div className="flex items-center gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-12 h-12 rounded-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div>
          <h3 className="font-medium text-gray-900">{mentor.name}</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {mentor.skills.map((skill, index) => (
              <span
                key={skill}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
