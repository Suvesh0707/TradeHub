import React from 'react';

function Footer() {
  return (
    <div className="h-24 bg-gradient-to-r from-[#092f86] to-[#a2a2a2] flex justify-between items-center px-6 text-white">
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">Trade Hub</h1>
        <p className="text-sm mt-2">Your ultimate destination for trade and commerce</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <div className="flex flex-col">
          <a href="#about" className="hover:text-[#00bcd4] text-lg font-medium transition duration-300">About Us</a>
          <a href="#services" className="hover:text-[#00bcd4] text-lg font-medium transition duration-300">Services</a>
          <a href="#contact" className="hover:text-[#00bcd4] text-lg font-medium transition duration-300">Contact</a>
        </div>
        <div className="flex flex-col">
          <a href="#privacy" className="hover:text-[#00bcd4] text-lg font-medium transition duration-300">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#00bcd4] text-lg font-medium transition duration-300">Terms & Conditions</a>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="https://facebook.com" className="text-2xl hover:text-[#00bcd4] transition duration-300">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" className="text-2xl hover:text-[#00bcd4] transition duration-300">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" className="text-2xl hover:text-[#00bcd4] transition duration-300">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
