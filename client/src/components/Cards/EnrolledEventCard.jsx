import { useState } from 'react';
import { Calendar, MapPin, Video } from 'lucide-react';
import EventDetailsPopup from '../HelperComponents/EventDetailsPopUp.jsx';

export const EnrolledEventCard = ({ event, status }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { title, description, host_name, host_img, date, link } = event;
  const formattedDate = new Date(date).toLocaleDateString();
  const defaultHostImage = host_img || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid";

  const handleViewDetails = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center mb-4">
            <img
              src={host_img || defaultHostImage}
              alt={host_name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-xs text-gray-500">Host</p>
              <p className="text-sm font-medium text-gray-800">{host_name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">Online</span>
            </div>
          </div>

          {status === 'scheduled' ? (
            <div className="mt-4 space-y-2">
              <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                onClick={handleViewDetails}
              >
                View Details
              </button>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </a>
              )}
            </div>
          ) : (
            <div className={`mt-4 py-2 px-4 rounded-md text-center ${
              status === 'canceled' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {status === 'canceled' ? 'Event Canceled' : 'Event Completed'}
            </div>
          )}
        </div>
      </div>
      <EventDetailsPopup event={event} onClose={handleClosePopup} open={showPopup} />
    </>
  );
};
