import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/checkauth", { withCredentials: true });
        setUserEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userEmail === "suveshpagam07@gmail.com") {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/getAllOrders",
            { withCredentials: true }
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error("Failed to fetch seller orders. Please try again.");
        }
      };

      fetchOrders();
    }
  }, [userEmail]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderDetails = orders.find((order) => order._id === orderId);

      if (!orderDetails) {
        toast.error("Order details not found.");
        return;
      }

      const { email, productId } = orderDetails;

      await axios.put(
        "http://localhost:8000/api/v1/update-order-status",
        { orderId, status: newStatus },
        { withCredentials: true }
      );

      if (newStatus === "Confirmed") {
        await axios.post(
          "http://localhost:8000/api/v1/confirm-product",
          { productId, email },
          { withCredentials: true }
        );
      } else if (newStatus === "Cancelled") {
        await axios.post(
          "http://localhost:8000/api/v1/cancel-product",
          { productId, email },
          { withCredentials: true }
        );
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}!`);
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
          Admin Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-white text-2xl mt-10">Loading...</p>
        ) : userEmail === "suveshpagam07@gmail.com" ? (
          <div className="flex flex-col gap-6 w-full">
            {orders.map(
              (order) =>
                order.productId && (
                  <div
                    key={order._id}
                    className="flex w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-5 shadow-lg border border-gray-800 hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
                  >
                    <img
                      src={order.productId.image || "/default-image.jpg"}
                      alt={order.productId.name || "Unknown Product"}
                      className="w-52 h-52 object-cover rounded-lg border border-gray-700"
                    />

                    <div className="ml-5 text-white flex flex-col justify-center space-y-2 w-full">
                      <h3 className="text-lg font-bold">
                        {order.productId.name || "Unknown Product"}
                      </h3>
                      <p className="text-blue-400 font-extrabold">
                        ₹{order.productId.price || "N/A"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {order.productId.description ||
                          "No description available"}
                      </p>
                      <p className="text-yellow-400 font-bold">
                        Status: {order.status}
                      </p>
                      <p className="text-blue-400 font-bold">
                        Customer Name: {order.name}
                      </p>
                      <p className="text-blue-400 font-bold">
                        Phone: {order.mobile}
                      </p>
                      <p className="text-blue-400 font-bold">
                        Address: {order.address}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "Confirmed")
                          }
                          className="bg-green-500 text-white py-1 px-4 rounded-xl hover:bg-green-600"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "Delivered")
                          }
                          className="bg-blue-500 text-white py-1 px-4 rounded-xl hover:bg-blue-600"
                        >
                          Delivered
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "Cancelled")
                          }
                          className="bg-red-500 text-white py-1 px-4 rounded-xl hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <p className="text-center text-red-500 font-bold text-2xl mt-10">
            Access Denied: Unauthorized User
          </p>
        )}
      </div>
    </>
  );
}
