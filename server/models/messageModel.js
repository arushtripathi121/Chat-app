const mongoose = require('mongoose');
const User = require('./userModel');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    sendBy: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
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

const Message = mongoose.model('message', messageSchema);
module.exports = Message;