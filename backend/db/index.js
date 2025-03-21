import mongoose, { connect } from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            bufferCommands: false,
        })
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED", error)
    }
}