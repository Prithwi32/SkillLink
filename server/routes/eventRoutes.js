import ensureAuthenticated from "../middlewares/Auth/Auth.js"

import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByStatus,
  getEventById,
  getMyEvents,
  registerForEvent,
  getEventRequests,
  handleEventRequest
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
router.get('/getEvent/:id', ensureAuthenticated, getEventById)

// Route to get events by their status
router.get("/status", ensureAuthenticated, getEventsByStatus);

// Route to get Events created by me
router.get("/getMyEvents", ensureAuthenticated, getMyEvents);

// Route to Register for an event
router.post("/:eventId/register", ensureAuthenticated, registerForEvent);

// Route to Get event requests
router.get("/:eventId/requests", ensureAuthenticated, getEventRequests);

// Route to Approve or reject user request
router.post("/:eventId/handle-request", ensureAuthenticated, handleEventRequest);

export default router;
