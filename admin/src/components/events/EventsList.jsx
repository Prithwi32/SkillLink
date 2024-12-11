import React from 'react';
import EventCard from "./EventCard"

export default function EventList({ status }) {
  // This is mock data. In a real application, you'd fetch this from an API
  const events = {
    upcoming: [
      { id: 1, title: "Summer Workshop", date: "Aug 15, 2024", host: "John Doe", description: "Join us for an exciting summer workshop focused on creative arts and crafts." },
      { id: 2, title: "Art Exhibition", date: "Sep 1, 2024", host: "Jane Smith", description: "Explore a diverse collection of contemporary artworks from emerging artists." },
      { id: 3, title: "Music Festival", date: "Sep 20, 2024", host: "Music Lovers Association", description: "A three-day extravaganza featuring top artists from various genres." },
    ],
    past: [
      { id: 4, title: "Spring Concert", date: "Mar 15, 2024", host: "City Orchestra", description: "A delightful evening of classical music celebrating the arrival of spring." },
      { id: 5, title: "Dance Workshop", date: "Apr 1, 2024", host: "Dance Studio X", description: "Learn new dance moves and techniques from professional choreographers." },
    ],
    canceled: [
      { id: 6, title: "Poetry Reading", date: "Jul 30, 2024", host: "Literary Club", description: "An intimate gathering featuring readings from local and visiting poets." },
    ],
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events[status].map((event) => (
        <EventCard 
          key={event.id}
          title={event.title}
          date={event.date}
          status={status}
          host={event.host}
          description={event.description}
        />
      ))}
    </div>
  )
}

