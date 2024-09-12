const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    reciever: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    message: [
        {
            type: mongoose.Schema.ObjectId,
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const Conversation = mongoose.model("conversation", conversationSchema);
mongoose.exports = Conversation;