import ensureAuthenticated, { adminAuth } from "../middlewares/Auth/Auth.js"

import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByStatus,
  getEventsByStatusAndUser,
  getEventById,
  getMyEvents,
  registerForEvent,
  getEventRequests,
  handleEventRequest,
  getEventParticipants,
  getUserParticipatingEvents,
  getEventsBasedOnSkillsRequested,
  getEventsForSpecificSkill
} from "../controllers/eventController.js";

const router = express.Router();

// Route to get all events
router.get("/getAll", getAllEvents);

// Route to create a new event
router.post("/create", ensureAuthenticated, createEvent);

// Route to update an event by ID
router.put("/update/:id", ensureAuthenticated, updateEvent);

// Route to delete an event by ID
router.delete("/delete/:id", ensureAuthenticated, deleteEvent);

// Route to get events by ID
router.get('/getEvent/:id', getEventById)

// Route to get events by their status
router.get("/status", adminAuth, getEventsByStatus);

// Route to get events by their status
router.get("/user-events-status", ensureAuthenticated, getEventsByStatusAndUser);

// Route to get Events created by me
router.get("/getMyEvents", ensureAuthenticated, getMyEvents);

// Route to Register for an event
router.post("/:eventId/register", ensureAuthenticated, registerForEvent);

// Route to Get event requests
router.get("/:eventId/requests", ensureAuthenticated, getEventRequests);

// Route to Approve or reject user request
router.post("/:eventId/handle-request", ensureAuthenticated, handleEventRequest);

// Route to get all participants for an event
router.get('/:eventId/participants', ensureAuthenticated, getEventParticipants);

// Route to get events which is registered by specific user
router.get("/get-participating-events", ensureAuthenticated, getUserParticipatingEvents);

// Route to get list of events for user learning skills
router.get("/get-learn-events", ensureAuthenticated, getEventsBasedOnSkillsRequested);

// Route to get upcoming events for specific skill
router.get("/events/skill/:skillId", getEventsForSpecificSkill);

export default router;
