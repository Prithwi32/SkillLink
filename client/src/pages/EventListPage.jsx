import React, { useState } from 'react';
import { AllEventCard } from '../components/Cards/AllEventCard';
import { EventModal } from '../components/HelperComponents/EventModal';
import { events } from '../constants/events';

function EventListPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
