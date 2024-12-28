import { Calendar, MapPin, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export const CreatedEventCard = ({ event, status, onDelete }) => {
  const { title, description, date, event_id } = event;
  const formattedDate = new Date(date).toLocaleDateString();
  const navigate = useNavigate();
  const { backendUrl } = useAuth();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${backendUrl}/api/events/delete/${event_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Event deleted successfully!");
      onDelete(event_id);
    } catch (error) {
      console.error("Error deleting event:", error.message);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">Online</span>
          </div>
        </div>

        {status === "scheduled" ? (
          <div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              onClick={() => navigate(`/userDashboard/${event_id}`)}
            >
              View Details
            </button>
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Event
            </button>
          </div>
        ) : (
          <div
            className={`mt-4 py-2 px-4 rounded-md text-center ${
              status === "canceled"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status === "canceled" ? "Event Canceled" : "Event Completed"}
          </div>
        )}
      </div>
    </div>
  );
};
