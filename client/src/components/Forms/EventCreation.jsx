import { useState } from "react";
import axios from "axios";
import { InputField } from "../HelperComponents/InputField";
import SkillSuggest from "../HelperComponents/SkillSuggestionForEventCreation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import EventCreateImg from "../../assets/Events-create.png"

export function EventCreationForm() {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    meetLink: "",
    maxParticipants: "",
    skills: [],
  });
  const { token, backendUrl } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSkillSelect = (skills) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      skills: skills,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDetails.date) {
      toast.error("Please select a valid date.");
      return;
    }

    if (!eventDetails.startTime || !eventDetails.endTime) {
      toast.error("Please provide valid start and end times.");
      return;
    }

    const formatTime = (date, time, period) => {
      const [hours, minutes] = time.split(":").map(Number);
      const adjustedHours =
        period === "PM" && hours !== 12
          ? hours + 12
          : period === "AM" && hours === 12
            ? 0
            : hours;
      return new Date(
        `${date}T${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`,
      ).toISOString();
    };

    try {
      const startTime = formatTime(
        eventDetails.date,
        eventDetails.startTime,
        eventDetails.startPeriod,
      );
      const endTime = formatTime(
        eventDetails.date,
        eventDetails.endTime,
        eventDetails.endPeriod,
      );

      if (new Date(startTime) >= new Date(endTime)) {
        toast.error("Start time must be earlier than end time.");
        return;
      }

      const eventData = {
        title: eventDetails.title,
        description: eventDetails.description,
        skills: eventDetails.skills,
        date: eventDetails.date,
        start_time: startTime,
        end_time: endTime,
        link: eventDetails.meetLink,
        max_participants: parseInt(eventDetails.maxParticipants, 10),
      };

      const response = await axios.post(
        `${backendUrl}/api/events/create`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Event created successfully!");
      setEventDetails({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        meetLink: "",
        maxParticipants: "",
        skills: [],
      });
      // console.log("Event created successfully:", response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Error creating event:", errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side - Event Creation Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Welcome Text */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-center lg:text-left">
                Create an <span className="text-blue-700">Event</span>
              </h1>
              <p className="text-gray-600 text-center lg:text-left">
                Share your skills and connect with others
              </p>
            </div>

            {/* Event Creation Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Event Title"
                name="title"
                type="text"
                value={eventDetails.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={eventDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Date"
                  name="date"
                  type="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <InputField
                  label="Max Participants"
                  name="maxParticipants"
                  type="number"
                  value={eventDetails.maxParticipants}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={eventDetails.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <InputField
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={eventDetails.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <InputField
                label="Meet Link"
                name="meetLink"
                type="url"
                value={eventDetails.meetLink}
                onChange={handleInputChange}
                placeholder="Enter meet link (e.g., Zoom, Google Meet)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Offered
                </label>
                <SkillSuggest
                  onSkillSelect={handleSkillSelect}
                  isMultiple={true}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:flex lg:w-7/12 items-center justify-center bg-blue-50">
          <img
            src={EventCreateImg}
            alt="Event Creation Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default EventCreationForm;
