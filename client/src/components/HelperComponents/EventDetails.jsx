import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Edit2,
  Save,
  X,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EventDetails({
  eventId,
  date,
  startTime: initialStartTime,
  endTime: initialEndTime,
  link: initialLink,
  maxParticipants: initialMaxParticipants,
  enrolledCount,
  onSave,
}) {
  const { backendUrl, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [link, setLink] = useState(initialLink);
  const [maxParticipants, setMaxParticipants] = useState(
    initialMaxParticipants,
  );

  const convertToISO = (time) => {
    try {
      if (!time) return null;
  
      const [hour, minute] = time.split(":");
      const date = new Date();
  
      // Set hours and minutes based on the provided time
      date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
  
      // Adjust the date to UTC from IST (+5:30)
      const utcDate = new Date(date.getTime() - 5.5 * 60 * 60 * 1000);
  
      return utcDate.toISOString(); // Convert adjusted UTC date to ISO string
    } catch (error) {
      console.error("Invalid time format:", error);
      return null;
    }
  };

  const convertToLocalTime = (isoTime) => {
    try {
      const date = new Date(isoTime);
      return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
      });
    } catch (error) {
      console.error("Invalid ISO format:", error);
      return "Invalid Date";
    }
  };

  const handleSave = async () => {
    try {
      if (!startTime || !endTime) {
        toast.error("Start and end times are required.");
        return;
      }

      const formattedStartTime = convertToISO(startTime);
      const formattedEndTime = convertToISO(endTime);
      console.log(formattedEndTime)
      console.log(formattedStartTime)

      const payload = {
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        link,
        max_participants: maxParticipants,
      };

      // console.log("Payload:", payload);

      await axios.put(`${backendUrl}/api/events/update/${eventId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Event updated successfully!");
      onSave(payload);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating event details:", error.message);
      toast.error("Failed to update event details. Please try again.");
    }
  };

  const handleCancel = () => {
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
    setLink(initialLink);
    setMaxParticipants(initialMaxParticipants);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Edit2 size={16} />
            Edit Details
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Calendar className="text-blue-600" size={20} />
          <span className="text-gray-600">{date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" size={20} />
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <span>to</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          ) : (
            <span className="text-gray-600">
              {convertToLocalTime(initialStartTime)} - {convertToLocalTime(initialEndTime)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <LinkIcon className="text-blue-600" size={20} />
          {isEditing ? (
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-1 border rounded px-3 py-1"
              placeholder="Meeting link"
            />
          ) : (
            <a href={link} className="text-blue-600 hover:underline">
              {link}
            </a>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Users className="text-blue-600" size={20} />
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                className="border rounded w-20 px-3 py-1"
                min={enrolledCount}
              />
              <span className="text-gray-600">max participants</span>
            </div>
          ) : (
            <span className="text-gray-600">
              {enrolledCount} / {maxParticipants} participants
            </span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:text-white hover:bg-red-500 bg-gray-50 text-black"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
