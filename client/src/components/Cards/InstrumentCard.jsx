import React from 'react';
import { Calendar, MapPin, Music2 } from 'lucide-react';

export function InstrumentCard({
  image,
  name,
  userImage,
  userName,
  location,
  startDate,
  onRent,
  isRented
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-w-16 aspect-h-9 h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <Music2 size={16} className="text-blue-500" />
          <h2 className="font-semibold">{name}</h2>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{userName}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={14} className="mr-1" />
              {location}
            </div>
          </div>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Calendar size={14} className="mr-1" />
          Available from {startDate}
        </div>
        <button
          onClick={onRent}
          disabled={isRented}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isRented
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isRented ? 'Request Sent' : 'Rent Now'}
        </button>
      </div>
    </div>
  );
}
