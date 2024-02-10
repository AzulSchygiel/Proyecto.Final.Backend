import mongoose from "mongoose";
import { cartCollection } from "./carts.models.js";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    age: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user", "premium"], default: "user" },
    cart: { type: [{ cart: { type: mongoose.Schema.Types.ObjectId, ref: cartCollection } }], default: [] },
    documents: { type: [{ name: { type: String, required: true }, reference: { type: String, required: true } }], default: [] },
    last_connection: { type: Date, default: null },
    status: { type: String, required: true, enums: ["completo", "incompleto", "pendiente"], default: "pendiente" },
    avatar: { type: String, default: " " }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;