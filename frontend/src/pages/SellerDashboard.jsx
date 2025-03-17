import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function SellerDashboard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/getsellerorders",
                    { withCredentials: true }
                );
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch seller orders. Please try again.");
            }
        };
         
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                "http://localhost:8000/api/v1/update-order-status",
                { orderId, status: newStatus },  // ✅ Correct request body format
                { withCredentials: true }
            );
    
            toast.success("Order status updated successfully!");
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status. Please try again.");
        }
    };
    
    return (
        <>
        <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black px-6 py-8 md:px-10 md:py-10">
                <h1 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wider">
                    Seller Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6">
                    {orders.map((order) => (
                        order.productId && (
                            <div
                                key={order._id}
                                className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-5 shadow-lg border border-gray-800 hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
                            >
                                <img
                                    src={order.productId.image || "/default-image.jpg"} 
                                    alt={order.productId.name || "Unknown Product"} 
                                    className="w-full h-40 object-cover rounded-lg border border-gray-700"
                                />
                                <div className="mt-3 text-white">
                                    <h3 className="text-lg font-bold truncate">{order.productId.name || "Unknown Product"}</h3>
                                    <p className="text-blue-400 font-extrabold">₹{order.productId.price || "N/A"}</p>
                                    <p className="text-gray-400 text-sm truncate">{order.productId.description || "No description available"}</p>
                                    <p className="text-yellow-400 font-bold mt-2">Status: {order.status}</p>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <button 
                                            onClick={() => updateOrderStatus(order._id, "Confirmed")} 
                                            className="bg-green-500 text-white py-1 px-4 rounded-xl hover:bg-green-600">
                                            Confirm
                                        </button>
                                        <button 
                                            onClick={() => updateOrderStatus(order._id, "Delivered")} 
                                            className="bg-blue-500 text-white py-1 px-4 rounded-xl hover:bg-blue-600">
                                            Delivered
                                        </button>
                                        <button 
                                            onClick={() => updateOrderStatus(order._id, "Cancelled")} 
                                            className="bg-red-500 text-white py-1 px-4 rounded-xl hover:bg-red-600">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </>
    );
}
