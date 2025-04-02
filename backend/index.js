import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectDb } from "./db/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from 'path';
import url from 'url';
import session from 'express-session';


const app = express()

// middlewares 
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","https://dashing-pavlova-f35b89.netlify.app"], 
    credentials: true,           
    methods: "GET,POST,PUT,DELETE",  
    allowedHeaders: "Content-Type,Authorization" 
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'lax', // or 'None' if you're using cross-origin cookies
    },
  }));
  


const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import userRoutes from "./routes/user.routes.js"
app.use("/api/v1", userRoutes)

import productRoutes from "./routes/product.routes.js"
app.use("/api/v1", productRoutes)

import cartRoutes from "./routes/cart.routes.js"
app.use("/api/v1", cartRoutes);

import otpRoutes from "./routes/otp.routes.js"
app.use('/api/v1', otpRoutes);

import orderRoutes from "./routes/order.routes.js";
app.use("/api/v1", orderRoutes);

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);


const port = process.env.PORT || 3000

connectDb()
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
