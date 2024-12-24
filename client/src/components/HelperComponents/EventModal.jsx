import { useState, useEffect } from "react";
import { X, Users, Clock, Calendar } from "lucide-react";
import { Rating } from "../ui/Rating";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const usePendingRegistrations = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState({});

  const setPending = (eventId) => {
    setPendingRegistrations((prevState) => ({
      ...prevState,
      [eventId]: true,
    }));
  };

  const clearPending = (eventId) => {
    setPendingRegistrations((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[eventId];
      return updatedState;
    });
  };

  const isPending = (eventId) => !!pendingRegistrations[eventId];

  return { setPending, clearPending, isPending };
};

export function EventModal({ event, onClose, onRegister }) {
  const { setPending, clearPending, isPending } = usePendingRegistrations();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [buttonText, setButtonText] = useState("Register for Event");
  const { backendUrl } = useAuth();

  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Update button text based on user's registration status
    if (user === event.mentorName) {
      setButtonText("You are Host");
    } else if (event.participantsID.includes(userId)) {
      setButtonText("Registered");
    } else if (event.requests && event.requests.includes(userId)) {
      setButtonText("Requested to Join");
    } else {
      setButtonText("Register for Event");
    }
  }, [event, token, user, userId]);

  const handleRegister = async () => {
    if (!token) {
      toast.error("Please log in to register for the event.");
      navigate("/login");
      return;
    }

    setPending(event.id);

    try {
      const response = await fetch(
        `${backendUrl}/api/events/${event.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsRegistered(true);
        toast.success("Successfully registered for the event!");
        onRegister?.();
      } else {
        const error = await response.json();
        toast.error(`Failed to register: ${error.message}`);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("An error occurred while registering. Please try again.");
    } finally {
      clearPending(event.id);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${event.mentorId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <button onClick={handleProfileClick} className="relative group">
              <img
                src={event.mentorImage}
                alt={event.mentorName}
                className="w-12 h-12 rounded-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </button>
            <div>
              <h3 className="font-semibold text-lg">{event.mentorName}</h3>
              <Rating value={event.rating} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                About This Event
              </h4>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Skills Offered
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>
                  {new Date(event.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(event.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>
                  {event.max_participants} / {event.participants.length}{" "}
                  participants
                </span>
              </div>
            </div>
          </div>

          {isRegistered ? (
            <div className="w-full mt-6 px-6 py-3 rounded-lg font-semibold bg-green-600 text-white text-center">
              Registered
            </div>
          ) : (
            <button
              onClick={handleRegister}
              disabled={isPending(event.id) || buttonText !== "Register for Event"}
              className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold transition-all ${
                isPending(event.id) || buttonText !== "Register for Event"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isPending(event.id) ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner /> Pending...
                </span>
              ) : (
                buttonText
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
