import { useState, useEffect } from 'react';
import { CreatedEventCard } from '../components/Cards/CreatedEventCard';
import { EnrolledEventCard } from '../components/Cards/EnrolledEventCard';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export const EventSection = ({ title, type }) => {
  const [activeCategory, setActiveCategory] = useState('scheduled');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { backendUrl, token } = useAuth();

  const categories = [
    { id: 'scheduled', label: 'Scheduled', apiStatus: 'Upcoming' },
    { id: 'canceled', label: 'Canceled', apiStatus: 'Cancelled' },
    { id: 'completed', label: 'Completed', apiStatus: 'Completed' },
  ];

  // Define the API endpoint based on the type of events (created or enrolled)
  const getApiEndpoint = (status) => {
    if (type === 'created') {
      return `${backendUrl}/api/events/user-events-status?status=${status}`;
    } else if (type === 'enrolled') {
      return `${backendUrl}/api/events/get-participating-events?status=${status}`;
    }
    return '';
  };

  const fetchEvents = async (status) => {
    setLoading(true);
    try {
      const response = await axios.get(getApiEndpoint(status), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat.id === activeCategory);
    if (selectedCategory) {
      fetchEvents(selectedCategory.apiStatus);
    }
  }, [activeCategory]);

  const handleDelete = (deletedEventId) => { setEvents((prevEvents) => prevEvents.filter(event => event.event_id !== deletedEventId)); };

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

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500">No events found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <CardComponent
              key={index}
              event={event}
              status={activeCategory}
              type={type}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
