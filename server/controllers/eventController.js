import Event from "../models/events.js";
import Skill from "../models/skill.js";
import User from "../models/user.js"
import { validateEvent } from "../middlewares/eventValidator.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate(
      "skills_id created_by participants requests"
    );
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { error } = validateEvent(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const {
      title,
      description,
      skills,
      date,
      start_time,
      end_time,
      link,
      max_participants,
    } = req.body;

    const userId = req.user._id;

    const existingEvent = await Event.findOne({
      title,
      date,
      start_time,
      end_time,
      created_by: userId,
    });

    if (existingEvent) {
      return res.status(400).json({
        message:
          "An event with the same title, date, and time already exists. Please choose a different time.",
      });
    }

    const skillIds = [];

    for (const skillName of skills) {
      let skill = await Skill.findOne({ name: skillName });

      if (!skill) {
        skill = new Skill({
          name: skillName,
          desc: `${skillName} - skill description`,
          status: "Pending",
        });
        await skill.save();
      }

      if (skill.status != "Approved") {
        return res.status(400).json({
          message: `Skill "${skillName}" is not approved. Event cannot be created until approval. Choose from list of Skills`,
        });
      }

      skillIds.push(skill._id);
    }

    const event = new Event({
      title,
      description,
      skills_id: skillIds,
      created_by: userId,
      date,
      start_time,
      end_time,
      link,
      max_participants,
    });

    await event.save();

    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate("created_by", "name")
      .populate("skills_id", "name");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const response = {
      title: event.title,
      description: event.description,
      host_name: event.created_by.name,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      link: event.link,
      max_participants: event.max_participants,
      current_participants_count: event.participants.length,
      skills: event.skills_id.map(skill => skill.name),
      status: event.status,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get events by their status
export const getEventsByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const validStatuses = ["Upcoming", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const events = await Event.find({ status })
      .populate("created_by", "name")
      .select("title description date _id")
      .sort({ date: 1 });

    const response = events.map((event) => ({
      title: event.title,
      description: event.description,
      host_name: event.created_by.name,
      date: event.date,
      event_id: event._id,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching events by status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get events created by ME
export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ created_by: userId })
      .populate("skills_id", "name")
      .sort({ date: 1 });
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Error fetching user's events:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Route for Registering in Event
export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the user is the host of the event
    if (event.created_by.toString() === userId.toString()) {
      return res.status(400).json({ success: false, message: "Host cannot register for their own event" });
    }

    if (event.participants.includes(userId) || event.requests.includes(userId)) {
      return res.status(400).json({ success: false, message: "Already registered or request pending" });
    }

    event.requests.push(userId);
    await event.save();

    res.status(200).json({ success: true, message: "Request to join event sent successfully" });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET All event requests
export const getEventRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("requests", "name email");

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the logged-in user is the host of the event
    if (event.created_by.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Only the host can view requests" });
    }

    res.status(200).json({
      success: true,
      requests: event.requests,
    });
  } catch (error) {
    console.error("Error fetching event requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Handle requests - (Approve / Reject)
export const handleEventRequest = async (req, res) => {
  const { eventId } = req.params;
  const { userId, action } = req.body;

  if (!userId || !action || !['APPROVE', 'REJECT'].includes(action)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input. Please provide a valid userId and action ("APPROVE" or "REJECT").'
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found.'
      });
    }

    if (!Array.isArray(event.requests)) {
      return res.status(500).json({
        status: 'error',
        message: 'Requests list is not properly initialized.',
      });
    }

    // Check if the user is part of the requests list
    const userIndex = event.requests.indexOf(userId);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'User is not in the requesters list for this event.'
      });
    }

    // Approve or reject the user based on the action
    if (action === 'approve') {
      event.participants.push(userId);
    } else if (action === 'reject') {
    }

    event.requests.splice(userIndex, 1);

    // Save the updated event
    await event.save();

    // Optionally update the user status
    const user = await User.findById(userId);
    if (user) {
      user.eventStatus = action === 'approve' ? 'approved' : 'rejected';
      await user.save();
    }

    // Respond with the updated event data
    res.status(200).json({
      status: 'success',
      message: `User ${action} successfully.`,
      data: {
        eventId,
        userId,
        currentStatus: action === 'approve' ? 'approved' : 'rejected',
        updatedParticipants: event.participants,
        updatedRequests: event.requests
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while handling the request.',
      error: error.message
    });
  }
};

