import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/getallproducts",
          { withCredentials: true }
        );
        setProducts(response.data);
        if (response.data.length === 0) {
          toast.info("Currently there are no products available.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/addtocart", 
        { productId },
        { withCredentials: true }
      );
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/v1/place-order",
        {
          productId: selectedProduct._id,
          ...formData
        },
        { withCredentials: true }
      );

      toast.success("Order placed successfully!");
      setShowForm(false); 
      setFormData({ name: "", email: "", mobile: "", address: "" });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black px-10 py-10">
        <h1 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wider">
          Explore Our Products
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

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => openOrderForm(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold tracking-wide transition-all"
                    >
                      Buy Now
                    </button>
                    <button
                      className="flex-1 bg-transparent border border-blue-500 text-blue-400 py-2 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-all"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && selectedProduct && (
  <div className="fixed inset-0 from-black via-blue-950 to-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-md">
    <div className="bg-gradient-to-br from-blue-950 to-black border border-blue-500 shadow-2xl p-8 rounded-3xl w-[450px] relative">
      <button
        className="absolute top-4 right-4 text-red-500 text-3xl hover:scale-110 transition-transform"
        onClick={() => setShowForm(false)}
      >
        ✖
      </button>

      <div className="text-center">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-40 h-40 object-cover rounded-xl mx-auto shadow-lg border border-blue-400"
        />
        <h2 className="text-3xl text-white font-bold mt-4">{selectedProduct.name}</h2>
        <p className="text-green-400 text-2xl font-extrabold">
          ₹{selectedProduct.price}
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="space-y-5 mt-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Full Name"
          className="w-full p-3 rounded-xl bg-transparent text-white border border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-3 rounded-xl bg-transparent text-white border border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full p-3 rounded-xl bg-transparent text-white border border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="w-full p-3 rounded-xl bg-transparent text-white border border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl text-xl font-bold hover:bg-green-600 transition-all"
        >
          Confirm Order
        </button>
      </form>
    </div>
  </div>
)}

      </div>
    </>
  );
}
