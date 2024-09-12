const mongoose = require('mongoose');

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