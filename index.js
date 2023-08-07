import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/event.js";
dotenv.config();

const app = express();

// connect db
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("the database is connected"))
    .catch((err) => console.log(err));

app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
