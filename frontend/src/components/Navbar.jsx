import { LayoutDashboardIcon, Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import tradehub from "../assets/tradeHub.jpg";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/checkauth", {
          withCredentials: true
        });
        setUserEmail(data.email); // Store the email in state
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/logout", {
        withCredentials: true
      });
      toast.success("Logout successful!");
      navigate("/login"); 
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div className="h-20 bg-gradient-to-r from-[#092f86] to-[#a2a2a2] flex items-center px-6 justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4 flex-shrink-0">
          <img
            src={tradehub}
            alt="Logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-[#00bcd4] p-1"
          />
          <h1 className="font-bold text-white text-3xl hidden md:block">Trade Hub</h1>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <input
            className="bg-transparent text-black font-bold px-3 py-1 w-40 md:w-64 border-b-2 border-transparent focus:border-[#000000] focus:outline-none focus:ring-0 rounded-lg transition-all duration-300"
            placeholder="Search here"
            type="text"
          />

          <Search
            className="text-white h-8 w-8 p-2 rounded-full bg-[#000000] hover:bg-[#04b3bb] transition-all duration-300 cursor-pointer"
          />

          <button
            className={`flex gap-3 items-center text-xl font-medium text-[#000000] hover:text-white px-10 cursor-pointer transition-all duration-300`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <LayoutDashboardIcon />
            <span className="hidden md:inline">Dashboard</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/4 bg-gradient-to-br from-[#000428] to-[#004e92] shadow-2xl p-5 z-50 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end mb-4">
          <X
            className="text-[#00bcd4] h-8 w-8 cursor-pointer hover:text-red-500 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#fff]">Dashboard Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/productcard" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cartpage" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/uploadproduct" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/myproduct" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
              Your Products
            </Link>
          </li>
          <li>
            <Link to="/yourplacedorder" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
              Placed Products
            </Link>
          </li>

          {/* Show "Seller Dashboard" ONLY for authorized email */}
          {userEmail === "suveshpagam07@gmail.com" && (
            <li>
              <Link to="/sellerdashboard" className="cursor-pointer text-white hover:text-[#00bcd4] transition-all">
                Admin Dashboard
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="cursor-pointer text-red-500 hover:text-red-400 transition-all"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
