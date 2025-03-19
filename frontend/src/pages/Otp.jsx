import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("signupEmail"); 

    if (!email) {
      toast.error("No email found. Please sign up again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/verifyotp", {
        email,
        otp,
      });

      toast.success("OTP verified successfully! Redirecting...");
      localStorage.removeItem("signupEmail"); 
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-blue-950 to-black">
      <div className="bg-gradient-to-br from-gray-900 to-black shadow-2xl rounded-2xl p-10 w-full max-w-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-6">OTP Verification</h1>
        <p className="text-gray-400 text-center mb-4">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={verifyOtp} className="flex flex-col items-center">
          <div className="flex gap-3 mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-2xl text-center bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
                value={otp[index] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setOtp((prev) =>
                    prev.substring(0, index) + value + prev.substring(index + 1)
                  );
                }}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold tracking-wide"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
