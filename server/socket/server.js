const express = require('express');
const app = express();
require('dotenv').config();
const { cors } = require('cors');

const { Server } = require('socket.io');
const  http  = require('http');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.frontendURL,
        credentials: true,
    }
})

io.on("connection ", (socket) => {
    console.log("connected user");
})

io.on("disconnect", () => {
    console.log("disconnected user");
})

module.exports = {
    app, server
}
