import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    continent: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: String, required: true },
    link: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model("Event", eventSchema);
