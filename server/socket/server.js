const express = require('express');
const app = express();
require('dotenv').config();
const { Server } = require('socket.io');
const http = require('http');
const { getUserDetailsByToken } = require('../helperFunctions/getUserDetailsByToken');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const { getMessageBySenderAndReceiverId } = require('../helperFunctions/getMessageBySenderAndReceiverId.js');
const { getUserContact } = require('../helperFunctions/getUserContacts.js');


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.frontendURL,
    credentials: true,
  }
});

const onlineUsers = new Set();
const contacts = new Set();

io.on('connection', async (socket) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await getUserDetailsByToken(token);

    if (user?._id) {
      socket.join(user._id);
      onlineUsers.add(user._id);

      const contactData = await getUserContact(user._id);

      io.emit('contactResponse', contactData)

      io.emit('onlineUser', Array.from(onlineUsers));

      socket.on('join-chat', async (data) => {
        const userDetails = await User.findById(data.userId);
        if (userDetails) {
          socket.join(userDetails._id);
          const loadChats = await getMessageBySenderAndReceiverId(data.userId, data.receiverId);
          io.to(userDetails._id).emit('loaded-chats', loadChats);
        }
      });
      


      socket.on('new-message', async (messageData) => {

        const { sender, receiver, message } = messageData;

        try {
          if (receiver && message) {
            const messageDetails = await Message.create({ text: message, sendBy: sender })
            const conversation = await Conversation.findOne({
              $and: [
                { sender },
                { receiver }
              ]
            })
            if (!conversation) {
              await Conversation.create({ receiver, sender, messages: messageDetails._id });
            } else {
              await Conversation.findByIdAndUpdate(conversation._id,
                { $push: { messages: messageDetails._id } }, { new: true });
            }
          }
          io.to(receiver).emit('get-message', { sender: sender, message });
          io.emit('contactResponse', contactData)
        }
        catch (e) {
          console.log(e);
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
