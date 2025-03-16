import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/getcartinfo", {
          withCredentials: true,
        });
  
        const validItems = response.data.cart.products.filter(product => product.productId);
        setCartItems(validItems);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        alert("Failed to fetch cart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartData();
  }, []);
  

  const removeItem = async (productId) => {
    try {
      console.log("Removing product with ID:", productId); 
      const response = await axios.delete("http://localhost:8000/api/v1/deletecartinfo", {
        data: { productId },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter((product) => product.productId._id !== productId));
      } else {
        alert("Failed to remove item. Please try again.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item from cart. Please try again.");
    }
  };
 
  const totalPrice = cartItems.reduce((total, product) => {
    return total + (product.productId.price * product.quantity);
  }, 0);

  return (
    <>
    <Navbar/>
    <div className="flex px-10 flex-col lg:px-40 md:flex-row justify-center h-screen w-full bg-gradient-to-tl from-blue-950 to-black md:gap-2 overflow-hidden">
      <div className="flex flex-col justify-start md:w-1/2 h-screen w-full items-center overflow-hidden">
        {loading ? (
          <div className="text-white text-2xl font-sans">Loading cart...</div>
        ) : (
          cartItems.map((product, index) => (
            <div key={index} className="flex flex-row w-full h-44 md:w-full m-3 p-6 bg-gray-900 rounded-3xl shadow-2xl transform transition-all hover:scale-105">
              <img
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-lg object-cover"
                src={`http://localhost:8000${product.productId.image}`}
                alt={`${product.productId.name} product image`}
              />
              <div className="flex flex-col justify-center m-5">
                <h1 className="text-2xl font-semibold text-white font-serif">{product.productId.name}</h1>
                <h2 className="text-xl font-semibold text-green-400">{`Rs ${product.productId.price}`}</h2>
                <div className="flex flex-row gap-6 mt-4">
                  <button className="bg-blue-700 text-white rounded-xl h-12 w-28 font-semibold hover:bg-blue-600 transition duration-300">Buy</button>
                  <button
                    className="bg-red-500 text-white rounded-xl h-12 w-28 font-semibold hover:bg-red-400 transition duration-300"
                    onClick={() => removeItem(product.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col items-center md:w-1/2 flex-grow">
        <div className="flex flex-col hidden md:block w-full h-auto m-3 p-6 text-white bg-gray-900 rounded-3xl shadow-2xl">
          <div className="flex m-2 text-xl flex-row justify-evenly font-semibold font-sans">
            <h1>Product</h1>
            <h1>Price</h1>
          </div>
          <hr className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 rounded-full my-3" />
          <div className="flex flex-col text-lg px-4 max-h-150 overflow-hidden font-medium md:w-full justify-center items-center content-center">
            {cartItems.map((product, index) => (
              <div key={index} className="flex py-3 flex-row justify-between w-full">
                <div className="flex items-center gap-4">
                  <img src={`http://localhost:8000${product.productId.image}`} alt={product.productId.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                  <span className="font-serif text-lg">{product.productId.name}</span>
                </div>
                <span className="text-xl font-semibold">{`Rs ${product.productId.price}`}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-row w-full sticky bottom-0 justify-between font-semibold items-center p-6 m-1 h-16 text-xl md:w-full bg-gradient-to-tl from-blue-950 text-white to-blue-500 rounded-xl shadow-2xl">
          <h1>Total Amount</h1>
          <h1>{`Rs ${totalPrice}`} /-</h1>
        </div>
      </div>
    </div>
    </>
  );
  
}


export default CartPage;
