import Event from "../models/events.js";
import Skill from "../models/skill.js";
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

