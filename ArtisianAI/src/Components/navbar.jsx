import React, { useState } from 'react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const toggleMobileMenu = () => setIsMobile(!isMobile);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4">
      <div className="max-w-7xl h-[50px] mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">ArtisanAI</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-semibold cursor-pointer mx-auto">
          <a href="/" className="text-white hover:text-gray-400 transition-colors duration-300">Home</a>
          <a href="/dashboard" className="text-white hover:text-gray-400 transition-colors duration-300">Dashboard</a>
          <a href="/ai" className="text-white hover:text-gray-400 transition-colors duration-300">AI</a>
        </div>

        {/* Hamburger */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Smooth Mobile Menu */}
   <div
  className={`md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 w-full left-0 absolute top-[65px] overflow-hidden transition-all duration-500 ${
    isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  <a href="#" className="block text-white px-4 py-2 active:bg-white/20 transition">Home</a>
  <a href="#" className="block text-white px-4 py-2 active:bg-white/20 transition">Dashboard</a>
  <a href="#" className="block text-white px-4 py-2 active:bg-white/20 transition">AI</a>
</div>

    </nav>
  );
}
