import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/index.js"
import cookieParser from "cookie-parser"

dotenv.config({})
const app = express()

// middlewares 
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

import userRoutes from "./routes/user.routes.js"
app.use("/api/v1", userRoutes)

const port = process.env.PORT || 3000
connectDb()
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
