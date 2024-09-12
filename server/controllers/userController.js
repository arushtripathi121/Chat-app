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
        catch (e) {
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

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user registerd with this email id'
            })
        }

        try {
            
            const decryptPassword = await bcrypt.compare(password, user.password);

            if(!decryptPassword) {
                return res.status(404).json({
                    success: false,
                    message: 'Incorrect password'
                })
            }

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: 'something went wrong, please try again!!!!'
            })
        }

        const payload = {
            email: user.email,
            name: user.name,
        }

        return res.status(200).json({
            success: true,
            message: "User logged in",
            data: payload,
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'interal server error'
        })
    }
}