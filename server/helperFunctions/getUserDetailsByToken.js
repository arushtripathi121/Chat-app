const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.getUserDetailsByToken = async (token) => {
    try {
        if (!token) {
            return null
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return null;
        }

        const { _id } = decode;

        const user = await User.findById({ _id });

        const userData = {
            name: user.name,
            email: user.email,
            userName: user.userName,
            _id: _id,
            profile_pic: user.profile_pic,
        }

        return userData;
    } catch (e) {
        console.log(e);
        return null;
    }
}