const events = [
  { id: 1, name: 'Web Dev Conference', date: '2023-08-15', location: 'New York, NY' },
  { id: 2, name: 'React Meetup', date: '2023-09-01', location: 'Online' },
  { id: 3, name: 'Hackathon 2023', date: '2023-10-10', location: 'San Francisco, CA' },
];

export default function EventsSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-blue-700">{event.name}</h3>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

