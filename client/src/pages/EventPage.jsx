import React from 'react';
import { EventSection } from '../components/EventSection';
import { mockEvents } from '../constants/mockEvents';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EventPage() {
  const handleCreateEvent = () => {
    // Handle create event action
    console.log('Create event clicked');
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <button
            onClick={()=>navigate('/createEvent')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>
        
        <div className="space-y-12">
          <EventSection title="Created Events" events={mockEvents.created} type="created" />
          <EventSection title="Enrolled Events" events={mockEvents.enrolled} type="enrolled" />
        </div>
      </div>
    </div>
  );
}

export default EventPage;
