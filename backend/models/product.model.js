import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String
        },
        price:{
            type: Number,
        },
        image:{
            type: String,
        },
        description:{
            type: String,
        },
        category:{
            type: String,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        imageId:{
            type: String,
            
        }
    },
    {timestamps: true})

export const Product = mongoose.model("Product", productSchema)