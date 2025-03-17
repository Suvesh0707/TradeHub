import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const placeOrder = async (req, res) => {
    const { productId, name, email, mobile, address } = req.body;

    if (!productId || !name || !email || !mobile || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const newOrder = new Order({
            userId: req.user._id,
            sellerId: product.userId, 
            productId,
            name,
            email,
            mobile,
            address,
            status: "Pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate({
                path: "productId",
                select: "name price image description"
            })
            .lean() 
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ error: "No orders found" });
        }

        const filteredOrders = orders.map(order => ({
            ...order,
            productId: order.productId || { name: "Product Deleted", image: "", price: 0 }
        }));

        res.status(200).json(filteredOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};



export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ error: "Order ID and status are required." });
    }

    try {
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status." });
    }
};



export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate("productId").populate("userId");
        
        if (!allOrders || allOrders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.status(200).json(allOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};


export const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: "productId",
            match: { userId: req.user._id } 
        });

        const sellerOrders = orders.filter(order => order.productId !== null);

        res.status(200).json(sellerOrders);
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        res.status(500).json({ error: "Failed to fetch seller orders" });
    }
};

