import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { sendVerificationEmail } from '../utils/mailer.js';

const otpStorage = {}; 

export const sendOtp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Account already exists, please login." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); 
    otpStorage[email] = {
        otp,
        userData: { name, password },
        expiresAt: Date.now() + 5 * 60 * 1000 
    };

    try {
        await sendVerificationEmail(email, otp);
        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).json({ error: 'Failed to send OTP email.' });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedOtpData = otpStorage[email];
    if (!storedOtpData || storedOtpData.otp !== parseInt(otp) || storedOtpData.expiresAt < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const { name, password } = storedOtpData.userData; 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        delete otpStorage[email];  

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
