
import ensureAuthenticated from "../middlewares/Auth/Auth.js"


import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
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

export default router;
