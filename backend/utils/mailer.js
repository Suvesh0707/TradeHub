import nodemailer from 'nodemailer';
import { Product } from '../models/product.model.js';

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
export const confirmProduct = async (email, productId) => {
    const product = await Product.findOne({_id: productId});
    const mailOptions = {
        from: '"TradeHub Security" <your_email@gmail.com>',
        to: email,
        subject: 'Your product has been confirmed',
        html: `<p>
        <h1>Your Product has been confirmed</h1>
        <img src=${product.image} alt=${product.name} width="300px" />
        <h3>Product Name: ${product.name}</h3>
        <h3>Product Price: ${product.price}</h3>
        </>`
    };

    await transporter.sendMail(mailOptions);
};


export const cancelProduct = async (email, productId) => {
    const product = await Product.findOne({_id: productId});
    const mailOptions = {
        from: '"TradeHub Security" <your_email@gmail.com>',
        to: email,
        subject: 'Your product is cancelled',
        html: `<p>
        <h1>Product Canceled</h1>
        <p>The Product which you have been try to buy, the seller has cancelled you request.</p>
        <img src=${product.image} alt=${product.name} width="300px"/>
        <p>Product Name: ${product.name}</p>
        <p>Product Price: ${product.price}</p>
        </>`
    };

    await transporter.sendMail(mailOptions);
};
