import { useState } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  const handleUpdate = () => {
    alert(`Updated Info:\nPhone: ${phone}\nAddress: ${address}\nEmail: ${email}`);
  };

  const handleAddProduct = () => {
    if (product) {
      setProducts([...products, product]);
      setProduct("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-blue-950 to-black p-6 items-center justify-center">
      <h1 className="text-5xl font-bold text-blue-400 mb-6" style={{ textShadow: '5px 5px 10px blue' }}>Dashboard</h1>
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl p-8 bg-gray-950 shadow-lg shadow-blue-500 rounded-lg border border-gray-700 grid grid-cols-2 gap-6"
      >
        {/* Personal Information */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className="bg-gray-900 shadow-md shadow-blue-500 rounded-xl p-4 border border-gray-700"
        >
          <h2 className="text-xl font-semibold text-white">Personal Info</h2>
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 mt-2 bg-gray-800 text-white rounded" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 mt-2 bg-gray-800 text-white rounded" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mt-2 bg-gray-800 text-white rounded" />
          <button onClick={handleUpdate} className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Update</button>
        </motion.div>

        {/* Products Section */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900 shadow-md shadow-blue-500 rounded-xl p-4 border border-gray-700"
        >
          <h2 className="text-xl font-semibold text-white">Products</h2>
          <input type="text" placeholder="Your Products" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full p-2 mt-2 bg-gray-800 text-white rounded" />
          <button onClick={handleAddProduct} className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Add</button>
          <ul className="mt-3 text-white">
            {products.map((prod, index) => (
              <li key={index} className="bg-gray-800 p-2 mt-1 rounded">{prod}</li>
            ))}
          </ul>
        </motion.div>

        {/* Orders Section */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900 shadow-md shadow-blue-500 rounded-xl p-4 border border-gray-700 col-span-2"
        >
          <h2 className="text-xl font-semibold text-white">Orders</h2>
          <p className="text-gray-400 mt-2 text-sm">List of ordered products will be displayed here.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
