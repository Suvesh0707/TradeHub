import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/mailer.js';


const otpStorage = {}; 

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000); 
    otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    try {
        await sendVerificationEmail(email, otp);
        console.log('OTP:', otp); // Check if OTP generation works
        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error('Error sending OTP email:', error); // This should print the error details
        res.status(500).json({ error: 'Failed to send OTP email.' });
    }
    
};



export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedOtpData = otpStorage[email];
    if (!storedOtpData || storedOtpData.otp !== parseInt(otp) || storedOtpData.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    delete otpStorage[email]; 

    res.status(200).json({ message: 'Login successful', token });
};
