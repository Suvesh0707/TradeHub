import mongoose,{Schema} from "mongoose";
const userSchema = new Schema(
    {
        name:{
            type: String,
        },
        email:{
            type: String,
            unique: true,
        },
        password:{
            type: String,
            required: [true, "password is required"]
        }     
    },
    {timestamps: true})
export const User = mongoose.model("User", userSchema)