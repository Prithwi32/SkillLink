import { Calendar, ChevronRight } from 'lucide-react';

export function AllEventCard({ event, onShowMore }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={event.mentorImage}
            alt={event.mentorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{event.mentorName}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < event.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center text-blue-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
      
      <div className="mb-4">
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
      
      <button
        onClick={onShowMore}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Show More
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
