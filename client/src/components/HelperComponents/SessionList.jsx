import React from 'react';
import SessionCard from '../Cards/SessionCard';

export default function SessionList({ 
  title, 
  sessions, 
  status, 
  onStatusChange, 
  onEdit 
}) {
  const filteredSessions = sessions.filter(session => session.status === status);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map(session => (
          <SessionCard
            key={session._id}
            session={session}
            status={status}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
          />
        ))}
        {filteredSessions.length === 0 && (
          <div className="col-span-full text-center py-6 text-gray-500 bg-white rounded-lg shadow">
            No {status} sessions
          </div>
        )}
      </div>
    </div>
  );
}
