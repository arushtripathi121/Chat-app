const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

exports.getUserContact = async (userId) => {
    try {

        const contactsArray = await Conversation.find({
            $or: [
                {sender: userId},
                {receiver: userId}
              ]
        })

        const contactsData = contactsArray.map((c) => {
            return (userId === c.sender) ? c.receiver : c.sender;
        });

        const userData = await User.find({ _id: { $in: contactsData } });
        
        return userData;
    }
    catch (e) {
        console.log(e);
    }
}