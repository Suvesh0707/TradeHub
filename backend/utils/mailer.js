import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: '"TradeHub Security" <your_email@gmail.com>',
        to: email,
        subject: 'Your OTP Code for Secure Login',
        html: `<h1>Your OTP Code is: <b>${otp}</b></h1><p>This code will expire in 5 minutes.</p>`
    };

    await transporter.sendMail(mailOptions);
};

