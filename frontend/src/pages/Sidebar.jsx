import { useState } from "react";
import { Home, Package, ShoppingCart, Settings, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // If using React Router

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside 
      initial={{ x: -250 }} 
      animate={{ x: open ? 0 : -250 }} 
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 h-screen w-60 bg-[#0c162c] shadow-lg p-6"
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 right-[-45px] p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        {open ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {/* Sidebar Title */}
      <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 text-white hover:text-blue-300 cursor-pointer">
          <Home /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 text-white hover:text-blue-300 cursor-pointer">
          <Package /> <span>Products</span>
        </li>
        <li className="flex items-center space-x-3 text-white hover:text-blue-300 cursor-pointer">
          <ShoppingCart /> <span>Orders</span>
        </li>
        <li className="flex items-center space-x-3 text-white hover:text-blue-300 cursor-pointer">
          <Settings /> <span>Settings</span>
        </li>
      </ul>
    </motion.aside>
  );
}
