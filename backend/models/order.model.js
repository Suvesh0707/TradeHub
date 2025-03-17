import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        mobile: {
            type: String,
        },
        address: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
