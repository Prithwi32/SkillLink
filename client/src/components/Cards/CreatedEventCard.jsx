import { Calendar, MapPin } from 'lucide-react';

export const CreatedEventCard = ({ event, status }) => {
  const { title, description, date } = event;
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

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
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
            View Details
          </button>
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
  );
};
