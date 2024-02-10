import messageModel from "../models/chat.models.js";

class ChatManager {

    async getMessages() {
        try {
            const message = await messageModel.find().lean();
            return message;
        } catch (error) {
            throw new Error;
        }
    }

    async newMessage(message) {
        try {
            const result = await messageModel.create(message);
            const messages = await this.getMessages();
            return messages
        } catch (Error) {
            return ("No se pudo enviar el mensaje")
        }
    }
}

export default ChatManager;