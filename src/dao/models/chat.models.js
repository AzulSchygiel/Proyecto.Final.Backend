import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    username: { type: String, require: true },
    message: { type: String, require: true },
});

const messageModel = mongoose.model("messages", chatSchema);

export default messageModel;