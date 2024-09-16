const express = require('express');
const app = express();
require('dotenv').config();

const { Server } = require('socket.io');
const http = require('http');
const { getUserDetailsByToken } = require('../helperFunctions/getUserDetailsByToken');
const User = require('../models/userModel');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.frontendURL,
    credentials: true,
  }
});

const onlineUsers = new Set();

io.on('connection', async (socket) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await getUserDetailsByToken(token);

    if (user?._id) {
      socket.join(user._id);
      onlineUsers.add(user._id);
      io.emit('onlineUser', Array.from(onlineUsers));

      socket.on('join-chat', async (userId) => {
        const userDetails = await User.findById(userId);
      });

      socket.on('new-message', (messageData) => {
        const { sender, receiver, message } = messageData;

        if (receiver && message) {
          io.to(receiver).emit('get-message', { sender: sender, message });
        }
      });

      socket.on('disconnect', () => {
        onlineUsers.delete(user._id);
        io.emit('onlineUser', Array.from(onlineUsers));
      });
    }
  } catch (error) {
    console.error('Error during socket connection:', error);
  }
});

module.exports = {
  app, server
};
