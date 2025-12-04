import mongoose from "mongoose";
import { User } from "./src/models/user.model.js";
import { Doctor } from "./src/models/doctor.model.js";
import dotenv from "dotenv";

dotenv.config();

async function testDoctorModel() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        // 1. Create User
        const email = `doc${Date.now()}@example.com`;
        const user = await User.create({
            name: "Dr. Test",
            email,
            password: "password123",
            role: "doctor"
        });
        console.log("User Created:", user._id);

        // 2. Create Doctor Profile
        const doctor = await Doctor.create({
            user: user._id,
            specialization: "Cardiology",
            experience: 10,
            qualifications: ["MBBS", "MD"],
            bio: "Expert Cardiologist",
            fees: 500
        });
        console.log("Doctor Profile Created:", doctor);

        // 3. Verify
        const fetchedDoctor = await Doctor.findOne({ user: user._id }).populate("user");
        if (fetchedDoctor.user.email === email) {
            console.log("✅ Verification Successful: Doctor linked to User");
        } else {
            console.error("❌ Verification Failed");
        }

    } catch (error) {
        console.error("❌ Test Failed:", error);
    } finally {
        await mongoose.connection.close();
    }
}

testDoctorModel();
