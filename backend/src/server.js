import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./routes/doctors.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB(process.env.MONGO_URI);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
