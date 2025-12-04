import mongoose from "mongoose";

export async function connectDB(uri) {
    try {
        if (!uri) {
            throw new Error("❌ MONGO_URI is missing in .env file");
        }

        // Recommended Mongoose settings
        const options = {};

        // Connect to MongoDB
        await mongoose.connect(uri, options);

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }

    // Extra logging for disconnection scenarios
    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
        console.log("🔁 MongoDB Reconnected");
    });

    mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB Error:", err);
    });
}
