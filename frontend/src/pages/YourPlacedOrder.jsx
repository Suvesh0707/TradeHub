import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function YourPlacedOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/getuserorders",
          { withCredentials: true }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Shipped":
        return "text-blue-400";
      case "Delivered":
        return "text-green-400";
      default:
        return "text-red-400";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black px-10 py-10">
        <h1 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wider">
          Your Placed Orders
        </h1>

        {loading ? (
          <div className="text-center text-white text-xl">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-white text-xl">
            No orders have been placed yet.
          </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 shadow-lg border border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="relative text-white">
                  <img
                    src={order.productId?.image || "https://via.placeholder.com/150"}
                    alt={order.productId?.name || "Unknown Product"}
                    className="w-full h-40 object-cover rounded-lg border border-gray-700"
                  />
                  <h2 className="text-2xl font-bold mt-4">{order.productId?.name || "Unknown Product"}</h2>
                  <p className="text-green-400 text-lg font-extrabold">
                    ₹{order.productId?.price || "0"}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {order.productId?.description || "No description available"}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-blue-400">Order Status:</h3>
                  <p className={`font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
