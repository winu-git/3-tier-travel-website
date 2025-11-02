// routes/bookingRoutes.js
import express from "express";
import { createBooking } from "./bookingController.js";


const router = express.Router();

// POST /api/booking
router.post("/", createBooking);

export default router;
