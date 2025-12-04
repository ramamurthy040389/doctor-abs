import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";

const app = express();
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/appointments", appointmentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
