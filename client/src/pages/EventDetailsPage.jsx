import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EventHeader } from "../components/HelperComponents/EventHeader";
import { EventDetails } from "../components/HelperComponents/EventDetails";
import { ParticipantsList } from "../components/HelperComponents/ParticipantsList";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState({
    pending: [],
    accepted: [],
  });
  const { backendUrl, token } = useAuth();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/events/getEvent/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const eventData = response.data;
        eventData.date = new Date(eventData.date).toLocaleDateString([], {
          year: 'numeric', month: 'long', day: 'numeric',
        });
        eventData.start_time = new Date(eventData.start_time).toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit",
        });
        eventData.end_time = new Date(eventData.end_time).toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit",
        });
        setEvent(eventData);

        // Fetch event requests
        const requestsResponse = await axios.get(`${backendUrl}/api/events/${eventId}/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requestsData = requestsResponse.data.requests;
        const pending = requestsData.map(req => ({ ...req, id: req._id }));
        setParticipants(prev => ({ ...prev, pending }));

        // Fetch event participants
        const participantsResponse = await axios.get(`${backendUrl}/api/events/${eventId}/participants`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const participantsData = participantsResponse.data.participants;
        const accepted = participantsData.map(part => ({ ...part, id: part._id }));
        setParticipants(prev => ({ ...prev, accepted }));

      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId, backendUrl, token]);

  const handleEventDetailsUpdate = (details) => {
    setEvent((prev) => ({ ...prev, ...details }));
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${backendUrl}/api/events/${eventId}/handle-request`, {
        userId: id,
        action: "APPROVE",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setParticipants((prev) => {
        const approvedParticipant = prev.pending.find((p) => p.id === id);
        if (!approvedParticipant) return prev;

        return {
          pending: prev.pending.filter((p) => p.id !== id),
          accepted: [...prev.accepted, approvedParticipant],
        };
      });

      toast.success("Participant approved successfully!");
    } catch (error) {
      console.error("Error approving participant:", error);
      toast.error("Failed to approve participant. Please try again.");
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(`${backendUrl}/api/events/${eventId}/handle-request`, {
        userId: id,
        action: "REJECT",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setParticipants((prev) => ({
        ...prev,
        pending: prev.pending.filter((p) => p.id !== id),
      }));

      toast.success("Participant declined successfully!");
    } catch (error) {
      console.error("Error declining participant:", error);
      toast.error("Failed to decline participant. Please try again.");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <EventHeader
          title={event.title}
          description={event.description}
          instructor={event.host_name}
          skills={event.skills}
        />

        <EventDetails
          eventId={eventId}
          date={event.date}
          startTime={event.start_time}
          endTime={event.end_time}
          link={event.link}
          maxParticipants={event.max_participants}
          enrolledCount={event.current_participants_count}
          onSave={handleEventDetailsUpdate}
        />

        <ParticipantsList
          pending={participants.pending}
          accepted={participants.accepted}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      </div>
    </div>
  );
}

export default EventDetailsPage;
