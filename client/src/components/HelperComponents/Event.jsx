import EventCarousel from "@/components/HelperComponents/EventCarousel";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// const events = [
//   {
//     skillName: "Web Development",
//     rating: 4.5,
//     participants: 1500,
//     description:
//       "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
//   },
//   {
//     skillName: "Data Science",
//     rating: 4.8,
//     participants: 1200,
//     description:
//       "Explore data analysis, machine learning, and statistical modeling techniques.",
//   },
//   {
//     skillName: "UX Design",
//     rating: 4.2,
//     participants: 800,
//     description:
//       "Master the principles of user experience design and create intuitive interfaces.",
//   },
//   {
//     skillName: "Digital Marketing",
//     rating: 4.0,
//     participants: 1000,
//     description:
//       "Discover strategies for online marketing, SEO, and social media campaigns.",
//   },
//   {
//     skillName: "Mobile App Development",
//     rating: 4.6,
//     participants: 950,
//     description:
//       "Build native and cross-platform mobile applications for iOS and Android.",
//   },
//   {
//     skillName: "Artificial Intelligence",
//     rating: 4.9,
//     participants: 750,
//     description:
//       "Dive into AI concepts, neural networks, and deep learning techniques.",
//   },
// ];

export default function Event() {
  const { backendUrl, token } = useAuth();

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
        mentorImage:
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
          mentorImage:
            "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid",
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
    </main>
  );
}
