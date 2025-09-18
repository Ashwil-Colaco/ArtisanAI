// src/Components/Navbar.jsx
import React, { useState } from 'react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => setIsMobile(!isMobile);

  return (
    <nav className="font-sans-serif p-4 floating-background fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl h-[50px] mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">ArtisanAI</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-[#B3B3B3] font-semibold font-[14px] mx-auto">
          <a href="" className="text-white hover:text-gray-400 hover:transition-colors duration-300">Home</a>
          <a href="" className="text-white hover:text-gray-400 hover:transition-colors duration-300">Dashboard</a>
          <a href="" className="text-white hover:text-gray-400 hover:transition-colors duration-300">AI</a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="md:hidden bg-gray-800">
          <a href="/" className="block text-white px-4 py-2">Home</a>
          <a href="/about" className="block text-white px-4 py-2">About</a>
          <a href="/services" className="block text-white px-4 py-2">Services</a>
          <a href="/contact" className="block text-white px-4 py-2">Contact</a>
        </div>
      )}
    </nav>
  );
}
