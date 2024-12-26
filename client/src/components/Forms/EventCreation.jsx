import { useState } from "react";
import axios from "axios";
import { InputField } from "../HelperComponents/InputField";
import SkillSuggest from "../HelperComponents/SkillSuggestionInputField.jsx";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export function EventCreationForm() {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    meetLink: "",
    maxParticipants: "",
    skillsRequired: [],
  });
  const { token, backendUrl } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSkillSelect = (skill) => {
    if (!eventDetails.skillsRequired.includes(skill)) {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        skillsRequired: [...prevDetails.skillsRequired, skill],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(eventDetails);

    // if (!eventDetails.date) {
    //   toast.error("Please select a valid date.");
    //   return;
    // }

    // if (!eventDetails.startTime || !eventDetails.endTime) {
    //   toast.error("Please provide valid start and end times.");
    //   return;
    // }

    // const formatTime = (date, time, period) => {
    //   const [hours, minutes] = time.split(":").map(Number);
    //   const adjustedHours =
    //     period === "PM" && hours !== 12
    //       ? hours + 12
    //       : period === "AM" && hours === 12
    //         ? 0
    //         : hours;
    //   return new Date(
    //     `${date}T${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`,
    //   ).toISOString();
    // };

    // try {
    //   const startTime = formatTime(
    //     eventDetails.date,
    //     eventDetails.startTime,
    //     eventDetails.startPeriod,
    //   );
    //   const endTime = formatTime(
    //     eventDetails.date,
    //     eventDetails.endTime,
    //     eventDetails.endPeriod,
    //   );

    //   if (new Date(startTime) >= new Date(endTime)) {
    //     toast.error("Start time must be earlier than end time.");
    //     return;
    //   }

    //   const eventData = {
    //     title: eventDetails.title,
    //     description: eventDetails.description,
    //     skills: eventDetails.skillsRequired,
    //     date: eventDetails.date,
    //     start_time: startTime,
    //     end_time: endTime,
    //     link: eventDetails.meetLink,
    //     max_participants: parseInt(eventDetails.maxParticipants, 10),
    //   };

    //   const response = await axios.post(
    //     `${backendUrl}/api/events/create`,
    //     eventData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //     },
    //   );
    //   toast.success("Event created successfully!");
    //   console.log("Event created successfully:", response.data);
    // } catch (error) {
    //   const errorMessage =
    //     error.response?.data?.message || "An unexpected error occurred.";
    //   toast.error(errorMessage);
    //   console.error("Error creating event:", errorMessage);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <img
        src="https://dovilearn.s3.eu-west-2.amazonaws.com/images/course-images/1612287896eventmanagement.jpeg"
        alt="event_bg_img"
        className="absolute z-0 opacity-75 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create a New Event
          </h2>
          <p className="text-blue-100">
            Organize your event and inspire participants to join you!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <InputField
            label="Event Title"
            name="title"
            type="text"
            value={eventDetails.title}
            onChange={handleInputChange}
            required
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
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={eventDetails.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <InputField
            label="Date"
            name="date"
            type="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Time
              </label>
              <div className="flex">
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Time
              </label>
              <div className="flex">
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <InputField
            label="Maximum Participants"
            name="maxParticipants"
            type="number"
            value={eventDetails.maxParticipants}
            onChange={handleInputChange}
            min="1"
          />
          <InputField
            label="Meet Link"
            name="meetLink"
            type="url"
            value={eventDetails.meetLink}
            onChange={handleInputChange}
            placeholder="Enter meet link (e.g., Zoom, Google Meet)"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Offered
            </label>
            <SkillSuggest onSkillSelect={handleSkillSelect}  isMultiple={true}/>
            {/* <div className="mt-2 flex flex-wrap gap-2">
              {eventDetails.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div> */}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventCreationForm;
