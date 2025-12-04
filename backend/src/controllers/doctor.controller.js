import { Doctor } from "../models/doctor.model.js";

// @desc    Create or Update Doctor Profile
// @route   POST /api/doctors
// @access  Private (Doctor only)
export async function createOrUpdateDoctorProfile(req, res) {
    try {
        const { specialization, experience, qualifications, bio, fees, availableSlots } = req.body;

        const doctorFields = {
            user: req.user.id,
            specialization,
            experience,
            qualifications,
            bio,
            fees,
            availableSlots
        };

        let doctor = await Doctor.findOne({ user: req.user.id });

        if (doctor) {
            // Update
            doctor = await Doctor.findOneAndUpdate(
                { user: req.user.id },
                { $set: doctorFields },
                { new: true }
            );
            return res.json(doctor);
        }

        // Create
        doctor = new Doctor(doctorFields);
        await doctor.save();
        res.json(doctor);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export async function getAllDoctors(req, res) {
    try {
        const doctors = await Doctor.find().populate("user", ["name", "email"]);
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export async function getDoctorById(req, res) {
    try {
        const doctor = await Doctor.findById(req.params.id).populate("user", ["name", "email"]);

        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        res.json(doctor);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        res.status(500).send("Server Error");
    }
}
