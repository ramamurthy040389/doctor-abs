import mongoose from "mongoose";

import { Appointment } from "../models/appointment.model.js";

export async function createAppointment(req, res) {
    try {
        const { doctorId, startTime, endTime } = req.body;

        // Rely on the unique index for concurrency control
        try {
            const newAppointment = await Appointment.create({
                doctorId,
                patientId: req.user.id,
                startTime,
                endTime,
            });

            return res.status(201).json({
                message: "Appointment booked successfully",
                appointment: newAppointment
            });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ error: "Slot already booked" });
            }
            throw err;
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function cancelAppointment(req, res) {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: "cancelled" },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        return res.status(200).json({ message: "Appointment cancelled", appointment });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function rescheduleAppointment(req, res) {
    try {
        const { id } = req.params;
        const { startTime, endTime } = req.body;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        // Check for conflicts manually (race condition possible but mitigated by unique index on save)
        // Actually, if we just save, the unique index will catch it if another appointment exists.
        // But we need to be careful: the unique index is on { doctorId, startTime }.
        // If we change startTime, the index applies.

        appointment.startTime = startTime;
        appointment.endTime = endTime;
        appointment.status = "confirmed";

        try {
            await appointment.save();
            return res.status(200).json({ message: "Appointment rescheduled successfully", appointment });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ error: "Slot already booked" });
            }
            throw err;
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
