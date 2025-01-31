import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "@/context/AdminContext";
import EventDetailsPopup from "./EventsDetailsPopUp";
import { Card, CardContent } from "../ui/card";
import { Calendar, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function EventList({ status }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { backendUrl } = useContext(AdminContext);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/events/status`, {
          params: { status },
        });

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const formattedEvents = response.data.map((event) => ({
          id: event._id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toLocaleDateString(),
          skills: event.skills_id.map((skill) => skill.name),
          mentorName: event.created_by.name,
          mentorImage:
            event.created_by.photo.trim() == ""
              ? "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid"
              : event.created_by.photo, // Default image as API doesn't provide one
          rating: event.created_by.rating,
          participants: event.participants,
          max_participants: event.max_participants,
          participantsCount: event.participants.length,
          requestsCount: event.requests.length,
          start_time: event.start_time,
          end_time: event.end_time,
          mentorId: event.created_by._id,
          status: event.status,
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [status, backendUrl]);

  const handleShowMore = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  if (isLoading)
    return <div className="text-center text-slate-600">Loading...</div>;
  if (error)
    return <div className="text-center text-slate-600">Error: {error}</div>;
  if (!isLoading && events.length == 0)
    return <div className="text-center text-slate-600">No events found</div>;

  function formatDate(inputDate) {
    // Split the input date into components
    const [day, month, year] = inputDate.split("/").map(Number);

    // Create a new Date object
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

    // Format the date
    const options = {
      weekday: "short", // Short day of the week (e.g., Wed)
      month: "short", // Short month name (e.g., Oct)
      day: "2-digit", // Two-digit day (e.g., 17)
      year: "numeric", // Full year (e.g., 2028)
    };

    // Use Intl.DateTimeFormat for formatting
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center cursor-pointer gap-5">
        {events.map((event, index) => (
          <Card
            key={index}
            className="p-6 bg-white rounded-3xl border shadow-md lg:max-w-md w-full hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex flex-col h-full"
          >
            <CardContent className="p-0 flex-1 flex flex-col space-y-3">
              {/* Date and Time */}
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Calendar className="size-4" /> {formatDate(event.date)}
              </div>

              {/* Event Title and Description */}
              <h2 className="text-2xl text-start font-semibold line-clamp-2 text-blue-900">
                {event.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 line-clamp-3">
                {event.description}
              </div>

              {/* Skills taught */}
              <div className="flex flex-wrap gap-2">
                {event.skills.slice(0, 3).map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs text-blue-900"
                  >
                    {badge}
                  </Badge>
                ))}
                {event.skills.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs text-blue-900"
                  >
                    +{event.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Owner Section */}
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={event.mentorImage}
                      className="object-cover"
                      alt="GammaTester"
                    />
                    <AvatarFallback>GT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-700">
                      {event.mentorName}
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map(
                        (_, i) =>
                          event.rating > i && (
                            <Star key={i} className="size-3 fill-current" />
                          )
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-900 hover:opacity-90 hover:bg-blue-900"
                  onClick={() => handleShowMore(event)}
                >
                  Show More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          open={!!selectedEvent}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}
