import EventCarousel from "@/components/HelperComponents/EventCarousel";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const { backendUrl, token } = useAuth();
  const navigate  = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [topEvents, setTopEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(backendUrl + "/api/events/getAll");
      if (!response.ok) throw new Error("Failed to fetch events.");
      const data = await response.json();
      const formattedEvents = data.map((event) => ({
        id: event._id,
        title: event.title,
        description: event.description,
        date: new Date(event.date).toLocaleDateString(),
        skills: event.skills_id.map((skill) => skill.name),
        mentorName: event.created_by.name,
        mentorImage: event.created_by.photo ||
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

      setTopEvents(formattedEvents);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to fetch top events");
    }
  };

  const getProfileRelatedEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/events/get-learn-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        const formattedEvents = data.events.map((event) => ({
          id: event._id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toLocaleDateString(),
          skills: event.skills_id.map((skill) => skill.name),
          mentorName: event.created_by.name,
          mentorImage: event.created_by.photo || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid",
          rating: event.created_by.rating,
          mentorId: event.created_by._id,
          participants: event.participants,
        }));
        setTopEvents(formattedEvents);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to top fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      getAllEvents();
    } else {
      getProfileRelatedEvents();
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-10 px-14">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
        Featured Events
      </h1>
      {!isLoading && <EventCarousel topEvents={topEvents} />}
      {isLoading && (
        <p className="text-lg font-semibold text-slate-400">Loading...</p>
      )}
      <Button
          onClick={() => (token ? navigate("/events") : navigate("/login"))}
          className="mt-8"
        >
          Explore More
        </Button>
    </main>
  );
}
