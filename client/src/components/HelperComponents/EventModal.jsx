import React from 'react';
import { X, Users, Clock, Calendar } from 'lucide-react';
import { Rating } from '../ui/Rating';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useRegistrationStore } from '../../constants/useRegistrationStore';

export function EventModal({ event, onClose, onRegister }) {
  const { isPending, setPending } = useRegistrationStore();
  const isEventPending = isPending(event.id);

  const handleRegister = () => {
    setPending(event.id);
    onRegister();
  };

  const handleProfileClick = () => {
    console.log(`Navigate to profile: ${event.mentorId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Mentor profile section */}
          <div className="flex items-center space-x-3 mb-6">
            <button
              onClick={handleProfileClick}
              className="relative group"
            >
              <img
                src={event.mentorImage}
                alt={event.mentorName}
                className="w-12 h-12 rounded-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </button>
            <div>
              <h3 className="font-semibold text-lg">{event.mentorName}</h3>
              <Rating value={event.rating} />
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Event description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About This Event</h4>
              <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
            </div>
            
            {/* Skills section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Skills Offered</h4>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Event details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{event.enrolled} / {event.capacity} participants</span>
              </div>
            </div>
          </div>
          
          {/* Registration button */}
          <button
            onClick={handleRegister}
            disabled={isEventPending}
            className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold transition-all ${
              isEventPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isEventPending ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner />
                Pending...
              </span>
            ) : (
              'Register for Event'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
