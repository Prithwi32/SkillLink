import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";
import ensureAuthenticated from "../middlewares/Auth/Auth.js";
import { editReviewValidation, newReviewValidation } from "../middlewares/reviewValidation.js";

const router = new Router();

// get request
router.get("/user/:id", getReviews);

// pot request
router.post("/new", ensureAuthenticated, newReviewValidation, createReview);

// put request
router.put("/edit/:reviewId", ensureAuthenticated, editReviewValidation, updateReview);

// delete request
router.delete("/remove/:reviewId", ensureAuthenticated, deleteReview);

export default router;
