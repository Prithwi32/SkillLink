import React from 'react';
import { SessionCard } from '../Cards/SessionCard';

export function SessionList({ sessions, getAllSessions }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <SessionCard
          key={session._id}
          session={session}
          getAllSessions={getAllSessions}
        />
      ))}
    </div>
  );
}
