const User = require('../models/userModel');

exports.testUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            })
        }

        await User.create({ name, email, password });

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