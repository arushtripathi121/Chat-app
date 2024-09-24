const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

exports.getMessageBySenderAndReceiverId = async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        const messages = await Conversation.findOne({
            $or: [
                { sender },
                { receiver }
            ]
        })

        if (!messages) {
            return res.status(404).json({
                success: false,
                message: 'No conversation between the two users yet',
            })
        }

        const messageIds = messages.messages;

        const messageData = await Message.find({_id : messageIds});
        
        return res.status(404).json({
            success: true,
            messageData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        })
    }
}