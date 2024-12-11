import React from 'react';
import EventCard from "./EventCard"

export default function EventList({ status }) {
  // This is mock data. In a real application, you'd fetch this from an API
  const events = {
    upcoming: [
      { id: 1, title: "Summer Workshop", date: "Aug 15, 2024" },
      { id: 2, title: "Art Exhibition", date: "Sep 1, 2024" },
      { id: 3, title: "Music Festival", date: "Sep 20, 2024" },
    ],
    past: [
      { id: 4, title: "Spring Concert", date: "Mar 15, 2024" },
      { id: 5, title: "Dance Workshop", date: "Apr 1, 2024" },
    ],
    canceled: [
      { id: 6, title: "Poetry Reading", date: "Jul 30, 2024" },
    ],
  }

  return (
    <>
      {events[status].map((event) => (
        <EventCard 
          key={event.id}
          title={event.title}
          date={event.date}
          status={status}
        />
      ))}
    </>
  )
}

