import express from "express";
import { createAppointment, cancelAppointment, rescheduleAppointment } from "../controllers/appointment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);



router.post("/", createAppointment);
router.put("/:id/cancel", cancelAppointment);
router.put("/:id/reschedule", rescheduleAppointment);

export default router;
