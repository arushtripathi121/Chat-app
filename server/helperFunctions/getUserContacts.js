const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

exports.getUserContact = async (userId) => {
    try {
        const contactsArray = await Conversation.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).lean();

        const contactsData = [...new Set(contactsArray.map((c) => (userId === c.sender.toString() ? c.receiver : c.sender)))];

        const userData = await User.find({ _id: { $in: contactsData } }).lean();

        const filteredUserData = userData.filter(user => user._id.toString() !== userId);

        return filteredUserData;
    } catch (e) {
        console.error("Error fetching contacts:", e);
        throw e;
    }
};
