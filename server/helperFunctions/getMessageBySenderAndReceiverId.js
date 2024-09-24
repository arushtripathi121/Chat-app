const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

exports.getMessageBySenderAndReceiverId = async (senderId, receiverId) => {
    try {
        const messages = await Conversation.find({
            $or: [
              { sender: senderId, receiver: receiverId },
              { sender: receiverId, receiver: senderId }
            ]
          });
          

        if (!messages) {
            return;
        }

        const messageIds = messages.map(m => m.messages.map(id => id)).flat();

        const messageData = await Message.find({_id : messageIds});
              
        return messageData;

    } catch (e) {
       console.log(e);
       return;
    }
}