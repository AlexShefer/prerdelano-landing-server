import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { events } from "./data.js";
import Event from "../models/event.js";

dotenv.config();

mongoose
    .connect(process.env.DATABASE)
    .then((c) => {
        console.log("CONNECTION TO DATABASE!");
    })
    .catch((e) => {
        console.log("DISCONNECT ERROR!!!");
        console.log(e);
    });

async function seedDatabase() {
    try {
        // Clear existing data from the collection (optional)
        await Event.deleteMany({});

        // Insert the new data
        await Event.insertMany(events);

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
}

// Call the seedDatabase function to start the seeding process
seedDatabase()
    .then((c) => {
        mongoose.connection.close();
        console.log("CONNECTION CLOSED!");
    })
    .catch((e) => {
        console.log("ERROR!!!");
        console.log(e);
    });
