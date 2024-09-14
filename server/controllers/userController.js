const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');

fileUploadToCloudinary = async (file, folder, type) => {
    const options = { folder };
    if (type === 'video') {
        options.resource_type = type;
    }

    if (!file.buffer) {
        throw new Error('File buffer is missing');
    }

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return reject(new Error(error.message));
            }
            resolve(result);
        }).end(file.buffer);
    });
};

exports.signUpUser = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body;
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

        await User.create({ name, email, password: hashedPassword, profile_pic });

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

            if (!decryptPassword) {
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
            _id: user._id,
        }

        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const cookieOptions = {
            httpOnly: true,
            // secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        };

        return res.status(200).cookie('token', token, cookieOptions).json({
            success: true,
            message: "User logged in",
            token: token,
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'interal server error'
        })
    }
}

exports.getUserDetailsByToken = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Session expired',
                logout: true,
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            })
        }

        const { _id } = decode;

        const user = await User.findById({ _id });

        const userData = {
            name: user.name,
            email: user.email,
            _id: _id,
            profile_pic: user.profile_pic,
        }

        return res.status(200).json({
            success: true,
            userData,
            message: 'data fetched successfully'
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        })
    }
}

exports.logoutUser = async (req, res) => {

    try {
        const cookieOptions = {
            http: true,
        }

        return res.status(200).cookie('token', '', cookieOptions).json({
            success: true,
            message: 'session ended'
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { _id, name, profile_pic } = req.body;
        const user = await User.findById({ _id });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        if (name != null) {
            await user.updateOne({ name });
        }
        if (profile_pic != null) {
            await user.updateOne({ profile_pic })
        }

        return res.status(200).json({
            success: true,
            message: 'User data successfully updated'
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

exports.updateUserProfilePicture = async (req, res) => {
    try {
        const _id = req.body._id;

        if (_id == null || undefined) {
            return res.status(500).json({
                success: false,
                message: 'no id recieved'
            })
        }

        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No image uploaded or unsupported file type',
            });
        }

        let imageUrl = '';
        const cloudinaryFolder = "Chatterly";

        const fileType = path.extname(file.originalname).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png'].includes(fileType);
        const isVideo = ['.mp4'].includes(fileType);

        if (!isImage && !isVideo) {
            throw new Error('Unsupported file type');
        }

        try {
            const response = await fileUploadToCloudinary(file, cloudinaryFolder, isVideo ? 'video' : 'image');
            imageUrl = response.secure_url;
        } catch (uploadError) {
            console.error(`Error uploading file ${file.originalname}:`, uploadError.message);
        }

        const user = await User.findById({ _id });

        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'user not found'
            })
        }

        await User.updateOne({ _id: _id }, { profile_pic: imageUrl });

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            file: file,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
