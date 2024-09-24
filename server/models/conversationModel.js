 const mongoose = require('mongoose');
const User = require('./userModel');

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: User
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: User
    },
    messages: [
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
module.exports = Conversation;