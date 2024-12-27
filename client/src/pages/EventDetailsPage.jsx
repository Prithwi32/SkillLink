import React, { useState } from 'react';
import { EventHeader } from '../components/HelperComponents/EventHeader';
import { EventDetails } from '../components/HelperComponents/EventDetails';
import { ParticipantsList } from '../components/HelperComponents/ParticipantsList';

// Mock data
const mockEvent = {
  title: "Advanced React Patterns Workshop",
  description: "Join us for an intensive workshop on advanced React patterns and best practices. Learn how to write clean, maintainable, and scalable React applications.",
  instructor: "Sarah Johnson",
  skill: "React.js",
  date: "March 15, 2024",
  startTime: "10:00",
  endTime: "16:00",
  link: "https://meet.google.com/abc-defg-hij",
  maxParticipants: 20,
  enrolledCount: 12,
};

const mockParticipants = {
  pending: [
    {
      id: "1",
      name: "John Doe",
      about: "Frontend Developer | React Enthusiast",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      id: "2",
      name: "Alice Smith",
      about: "Full Stack Developer | Tech Lead",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  ],
  accepted: [
    {
      id: "3",
      name: "Bob Wilson",
      about: "Senior React Developer | Mentor",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
  ],
};

function EventDetailsPage() {
  const [event, setEvent] = useState(mockEvent);
  const [participants, setParticipants] = useState(mockParticipants);

  const handleEventDetailsUpdate = (details) => {
    setEvent((prev) => ({ ...prev, ...details }));
  };

  const handleApprove = (id) => {
    setParticipants((prev) => {
      const approvedParticipant = prev.pending.find((p) => p.id === id);
      if (!approvedParticipant) return prev;

      return {
        pending: prev.pending.filter((p) => p.id !== id),
        accepted: [...prev.accepted, approvedParticipant],
      };
    });
  };

  const handleDecline = (id) => {
    setParticipants((prev) => ({
      ...prev,
      pending: prev.pending.filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <EventHeader
          title={event.title}
          description={event.description}
          instructor={event.instructor}
          skill={event.skill}
        />

        <EventDetails
          date={event.date}
          startTime={event.startTime}
          endTime={event.endTime}
          link={event.link}
          maxParticipants={event.maxParticipants}
          enrolledCount={event.enrolledCount}
          onSave={handleEventDetailsUpdate}
        />

        <ParticipantsList
          pending={participants.pending}
          accepted={participants.accepted}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      </div>
    </div>
  );
}

export default EventDetailsPage;
