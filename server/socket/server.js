const express = require('express');
const app = express();
require('dotenv').config();

const { Server } = require('socket.io');
const  http  = require('http');
const { getUserDetailsByToken } = require('../helperFunctions/getUserDetailsByToken');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.frontendURL,
        credentials: true,
    }
})

const onlineUser = new Set();

io.on('connection', async (socket) => {
    console.log("connected user", socket.id);

    const token = socket.handshake.auth.token;
    console.log(token);

    const user = await getUserDetailsByToken(token); 
    
    console.log(user);

    socket.join(user?._id)
    onlineUser.add(user?._id);

    io.emit('onlineUser', Array.from(onlineUser));
    
})

io.on('disconnect', () => {
    onlineUser.delete(user?._id);
    console.log("disconnected user", socket.id);
})

module.exports = {
    app, server
}
