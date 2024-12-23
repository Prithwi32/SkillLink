import { useState, useEffect } from 'react';
import { AllEventCard } from '../components/Cards/AllEventCard';
import { EventModal } from '../components/HelperComponents/EventModal';
import { useAuth } from '@/context/AuthContext';

function EventListPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {backendUrl} = useAuth();

    // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(backendUrl + "/api/events/getAll");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          id: event._id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toLocaleDateString(),
          skills: event.skills_id.map((skill) => skill.name),
          mentorName: event.created_by.name,
          mentorImage: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid",
          rating: event.created_by.rating,
          participants: event.participants,
          max_participants: event.max_participants,
          participantsID: event.participants.map(participant => participant._id),
          requests: event.requests.map(request => request._id),
          start_time: event.start_time,
          end_time: event.end_time,
          mentorId: event.created_by._id,
        }));
        
        setEvents(formattedEvents);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShowMore = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    setTimeout(() => {
      setSelectedEvent(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <AllEventCard
              key={event.id}
              event={event}
              onShowMore={() => handleShowMore(event)}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default EventListPage;