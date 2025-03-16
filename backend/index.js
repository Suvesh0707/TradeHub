import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from 'path';
import url from 'url';

dotenv.config({})
const app = express()

// middlewares 
app.use
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,           
    methods: "GET,POST,PUT,DELETE",  
    allowedHeaders: "Content-Type,Authorization" 
}));

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import userRoutes from "./routes/user.routes.js"
app.use("/api/v1", userRoutes)

import productRoutes from "./routes/product.routes.js"
app.use("/api/v1", productRoutes)

import cartRoutes from "./routes/cart.routes.js"
app.use("/api/v1", cartRoutes);

const port = process.env.PORT || 3000
connectDb()
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
