import React from 'react';

export function RecommendedBlog({ title, image, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-16 h-16 rounded-lg object-cover"
      />
      <h4 className="flex-1 font-medium text-gray-800 line-clamp-2">{title}</h4>
    </div>
  );
}
