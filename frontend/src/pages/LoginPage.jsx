import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/UseAuth';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login} = useAuthStore()
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        await login(email, password)
        navigate("/homepage")
       
    };

    return (
      <div className="flex min-h-screen bg-[#060606] p-6">
        <div className="hidden md:flex md:w-1/2 flex-col items-start justify-center gap-6 p-10 bg-gradient-to-br from-pink-900 to-blue-800 rounded-l-2xl">
          <div className="flex items-center gap-3 text-white text-2xl font-bold">
            TradeHub
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            Empowering students to trade smarter — Buy and sell calculators, books, notes, and engineering essentials with ease.
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center rounded-2xl md:rounded-r-2xl">
          <div className="w-full max-w-sm p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-3">Welcome Back!</h2>
            <p className="text-gray-400 text-center mb-6">Login to continue</p>
            
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-gray-400">Email</label>
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
                <label htmlFor="password" className="text-gray-400">Password</label>
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

              <button className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold tracking-wide">
                Login
              </button>
            </form>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* <button disabled className="mt-4 w-full flex items-center justify-center gap-3 bg-slate-800 text-black py-3 rounded-lg font-bold shadow-md ">
              <img
                src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
                alt="Google Logo"
                className="h-5 w-5"
              />
              Continue with Google
            </button> */}

            <div className="text-center text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/" className="text-blue-500 hover:underline font-bold">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}
