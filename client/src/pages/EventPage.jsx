import { EventSection } from '../components/EventSection';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EventPage() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 overflow-x-hidden">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Events
          </h1>
          <button
            onClick={() => navigate('/createEvent')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>

        <div className="space-y-8 mt-6">
          <EventSection title="Created Events" type="created" />
          <EventSection title="Enrolled Events" type="enrolled" />
        </div>
      </div>
    </div>
  );
}

export default EventPage;