import React from 'react';
import { SessionCard } from '../Cards/SessionCard';

export function SessionList({ sessions, onStatusChange, onEdit, onReview, getAllSessions }) {
  console.log(sessions);
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <SessionCard
          key={session._id}
          session={session}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onReview={onReview}
          getAllSessions={getAllSessions}
        />
      ))}
    </div>
  );
}
