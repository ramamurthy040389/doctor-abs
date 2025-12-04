import express from "express";
import { createAppointment, cancelAppointment, rescheduleAppointment } from "../controllers/appointment.controller.js";

const router = express.Router();

// Temporary user simulation for now:
router.use((req, res, next) => {
    req.user = { id: "000000000000000000000000" }; // Fake user ID
    next();
});

router.post("/", createAppointment);
router.put("/:id/cancel", cancelAppointment);
router.put("/:id/reschedule", rescheduleAppointment);

export default router;
