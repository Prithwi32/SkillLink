import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export const ProfileEventCard = ({
  title,
  description,
  hostName,
  hostImage,
  date,
  location,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center mb-4">
          <img
            src={hostImage}
            alt={hostName}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{hostName}</p>
            <p className="text-xs text-gray-500">Host</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
          View Details
        </button>
      </div>
    </div>
  );
};
