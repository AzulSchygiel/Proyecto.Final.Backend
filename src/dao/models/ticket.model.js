import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date },
    amount: { type: Number },
    purchaser: { type: String, required: true },
});

export const ticketsModel = mongoose.model(ticketCollection, ticketSchema)