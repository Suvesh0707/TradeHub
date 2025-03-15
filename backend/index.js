import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

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

import userRoutes from "./routes/user.routes.js"
app.use("/api/v1", userRoutes)

const port = process.env.PORT || 3000
connectDb()
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
