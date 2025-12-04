import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: [true, "Please add a specialization"]
    },
    experience: {
        type: Number,
        required: [true, "Please add years of experience"]
    },
    qualifications: {
        type: [String],
        required: [true, "Please add qualifications"]
    },
    bio: {
        type: String
    },
    fees: {
        type: Number,
        required: [true, "Please add consultation fees"]
    },
    availableSlots: [{
        day: String, // e.g., "Monday"
        startTime: String, // e.g., "09:00"
        endTime: String // e.g., "17:00"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);
