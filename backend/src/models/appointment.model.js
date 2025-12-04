import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, default: "confirmed" }
}, { timestamps: true });

// Unique Index for Slot Lock
AppointmentSchema.index(
    { doctorId: 1, startTime: 1 },
    { unique: true }
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
