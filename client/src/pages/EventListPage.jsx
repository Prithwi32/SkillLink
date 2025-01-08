import { useState, useEffect } from "react";
import { AllEventCard } from "../components/Cards/AllEventCard";
import { EventModal } from "../components/HelperComponents/EventModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function EventListPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(backendUrl + "/api/events/getAll");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          _id: event._id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toLocaleDateString(),
          skills: event.skills_id.map((skill) => skill.name),
          mentorName: event.created_by.name,
          mentorImage:
            event.created_by.photo ||
            "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid",
          rating: event.created_by.rating,
          participants: event.participants,
          max_participants: event.max_participants,
          participantsID: event.participants.map(
            (participant) => participant._id,
          ),
          requests: event.requests.map((request) => request._id),
          start_time: event.start_time,
          end_time: event.end_time,
          mentorId: event.created_by._id,
        }));
        setEvents(formattedEvents);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShowMore = (event) => {
    if (!token) return navigate("/login");
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    setTimeout(() => {
      setSelectedEvent(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-5 text-center">
          Upcoming <span className="text-blue-800">Events</span>
        </h1>
        <p className="text-gray-500 sm:text-lg mx-auto max-w-lg text-center mb-6">
          Explore our featured upcoming events, where ideas meet opportunities.
          Stay updated and join the journey!
        </p>
        <div className="flex w-full flex-wrap items-center justify-center cursor-pointer gap-8">
          {!isLoading &&
            events.map((event) => (
              <AllEventCard
                key={event._id}
                event={event}
                onShowMore={() => handleShowMore(event)}
              />
            ))}
          {isLoading && (
            <div className="text-center text-gray-500">Loading events...</div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default EventListPage;
