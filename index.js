import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Event from "./models/event.js";

const app = express();

// connect db
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("the database is connected"))
    .catch((err) => console.log(err));

// middleware

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://peredelano.netlify.app"
    ); // Replace with your frontend domain
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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
