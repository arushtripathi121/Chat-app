const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: str => str.toUpperCase(),
    },
    email: {
        type: String,
        required: true,
        set: str => str.toLowerCase(),
    },
    password: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
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

const User = mongoose.model("User", userSchema);
module.exports = User;