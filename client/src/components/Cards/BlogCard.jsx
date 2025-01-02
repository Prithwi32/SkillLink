import React from 'react';
import { Clock, User } from 'lucide-react';
import { CategoryBadge } from '../HelperComponents/CategoryBadge';

export function BlogCard({ 
  title, 
  description, 
  image, 
  author, 
  readTime, 
  category,
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <CategoryBadge category={category} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
