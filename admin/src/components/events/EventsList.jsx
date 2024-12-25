import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import EnhancedEventCard from './EventCard';
import { AdminContext } from '@/context/AdminContext';

export default function EventList({ status }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AdminContext);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/events/status`, {
          params: { status }
        });
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format');
        }

        const formattedEvents = response.data.map((event) => ({
          id: event._id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toLocaleDateString(),
          skills: event.skills_id.map((skill) => skill.name),
          mentorName: event.created_by.name,
          mentorImage: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid", // Default image as API doesn't provide one
          rating: event.created_by.rating,
          participants: event.participants,
          max_participants: event.max_participants,
          participantsCount: event.participants.length,
          requestsCount: event.requests.length,
          start_time: new Date(event.start_time).toLocaleTimeString(),
          end_time: new Date(event.end_time).toLocaleTimeString(),
          mentorId: event.created_by._id,
          status: event.status,
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [status, backendUrl]);

  const handleShowMore = (event) => {
    console.log('Show more details for event:', event);
    // Implement your logic here, e.g., navigate to a detailed view
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EnhancedEventCard
          key={event.id}
          title={event.title}
          date={event.date}
          description={event.description}
          mentorImage={event.mentorImage}
          mentorName={event.mentorName}
          rating={event.rating}
          skills={event.skills}
          participantsCount={event.participantsCount}
          maxParticipants={event.max_participants}
          startTime={event.start_time}
          endTime={event.end_time}
          status={event.status}
          onShowMore={() => handleShowMore(event)}
        />
      ))}
    </div>
  );
}
