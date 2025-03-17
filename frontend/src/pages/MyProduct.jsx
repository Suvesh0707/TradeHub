import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/getproducts', {
            withCredentials: true 
        });
        setProducts(response.data);
        if (response.data.length === 0) {
            toast.warn(" Add Product First.");
          }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/deleteproducts/${productId}`, {
        withCredentials: true
      });
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Successfully Removed Product")
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black px-10 py-10">
      <h1 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wider">
        My Uploaded Products
      </h1>

      {loading ? (
        <div className="text-center text-white text-xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 shadow-lg border border-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>

              <div className="mt-3 text-white">
                <h3 className="text-lg font-bold truncate">{product.name}</h3>
                <p className="text-blue-400 font-extrabold text-lg">
                  ₹{product.price}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(product.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-4">
                 
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold tracking-wide transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
