import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { name, email, password });

    if (!name || !email || !password) {
      console.error(" Error: All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        { name, email, password }, 
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success('Signup successful! Welcome to TradeHub!')
      console.log(" Signup Successful:", response.data);

      setTimeout(() => navigate("/homepage"), 500);
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response ? error.response.data : error.message
      );

      if (error.response) {
        console.error(" Backend Response:", error.response.data);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#060606] p-6">
      <div className="hidden md:flex md:w-1/2 flex-col items-start justify-center gap-6 p-10 bg-gradient-to-br from-pink-900 to-blue-800 rounded-l-2xl">
        <div className="flex items-center gap-3 text-white text-2xl font-bold">
          TradeHub
        </div>
        <p className="text-gray-400 text-lg leading-relaxed">
          Empowering students to trade smarter — Buy and sell calculators,
          books, notes, and engineering essentials with ease.
        </p>
      </div>

      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center rounded-2xl md:rounded-r-2xl">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Welcome to TradeHub!
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Create an account to get started
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full p-3 bg-gray-800 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-800 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-800 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold tracking-wide"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-bold shadow-md hover:bg-gray-200">
            <img
              src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
              alt="Google Logo"
              className="h-5 w-5"
            />
            Continue with Google
          </button>
          <div className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
