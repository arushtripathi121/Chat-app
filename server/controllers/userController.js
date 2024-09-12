const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'user already exists, please sign in'
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(e) {
            return res.status(500).json({
                success: false,
                message: 'error in hashing password'
            })
        }

        await User.create({ name, email, password: hashedPassword });

        return res.status(200).json({
            success: true,
            message: 'new user created',
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'interal server error'
        })
    }
}