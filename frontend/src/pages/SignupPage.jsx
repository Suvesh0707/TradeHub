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

    if (!name || !email || !password) {
        toast.error("All fields are required!");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8000/api/v1/sendotp", {
            name,
            email,
            password,
        });

        toast.success("OTP sent successfully! Please check your email.");
        localStorage.setItem("signupEmail", email);
        navigate("/otp"); 
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Signup failed. Try again!";
        
        if (errorMsg === "Account already exists, please login.") {
            toast.error(errorMsg);
            navigate("/login"); 
        } else {
            toast.error(errorMsg);
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
