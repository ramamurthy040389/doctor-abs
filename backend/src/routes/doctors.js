import express from "express";
import { createOrUpdateDoctorProfile, getAllDoctors, getDoctorById } from "../controllers/doctor.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", protect, authorize("doctor"), createOrUpdateDoctorProfile);

export default router;
