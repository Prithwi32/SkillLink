import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import SessionList from '../components/HelperComponents/SessionList';
import SessionForm from '../components/Forms/SessionForm';
import SessionFilter from '../components/HelperComponents/SessionFilter';

function SessionPage() {
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const handleAddSession = (formData) => {
    const newSession = {
      id: crypto.randomUUID(),
      ...formData,
      reviewed: false,
      status: 'upcoming',
    };
    
    setSessions([...sessions, newSession]);
    setShowForm(false);
  };

  const handleStatusChange = (sessionId, newStatus) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, status: newStatus } : session
    ));
  };

  const handleEditSession = (id, updates) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, ...updates } : session
    ));
  };

  const getFilterTitle = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming Sessions';
      case 'completed':
        return 'Completed Sessions';
      case 'canceled':
        return 'Canceled Sessions';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Session
          </button>
        </div>

        {showForm ? (
          <div className="mb-8">
            <SessionForm
              onSubmit={handleAddSession}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <>
            <SessionFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            
            <div className="transition-all duration-300">
              <SessionList
                title={getFilterTitle(activeFilter)}
                sessions={sessions}
                status={activeFilter}
                onStatusChange={handleStatusChange}
                onEdit={handleEditSession}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SessionPage;
