const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../config/sentEmail");
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if (user) {
        await sendEmail(
            email,
            "Welcome to Our Platform",
            `Hi ${name},\n\nYour account has been created successfully!\n\nThank you for joining us.\n\nBest regards,\nTeam`
        );
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});
const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400);
        res.send({
            message: 'Please Enter all the Feilds',
        })
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        res.send({
            message: 'User not found',
        })
    }

    if (user && (await user.matchPassword(password))) {
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        res.send({
            message: 'Invalid Email or Password'
        })
    }
});
const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.send({
                message: 'User not found'
            })
        }

        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            res.send({
                message: 'Old password incorrect'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const result = await User.updateOne({ email: email }, { password: hashedPassword })
        if (result) {
            await sendEmail(
                email,
                "Welcome to Our Platform",
                `Hi ${user.name},\n\nYour password has been changed successfully!\n\nThank you for joining us.\n\nBest regards,\nTeam`,"Password Info"
            );
            res.send({ success: true, message: "Password updated successfully" })

        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};


module.exports = { registerUser, signIn, updatePassword };