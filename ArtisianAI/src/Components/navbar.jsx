import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMobileMenu = () => setIsMobile(!isMobile);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-transparent">
      <div className="max-w-7xl h-[50px] mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-white text-2xl font-semibold">ArtisanAI</div>

        {/* Center: Links (only when logged in) */}
        {user && (
          <div className="hidden md:flex space-x-8 font-semibold cursor-pointer">
            <Link
              to="/"
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/products" // ✅ updated to ProductsDashboard
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              Products
            </Link>
          </div>
        )}

        {/* Right: Auth Buttons + Hamburger */}
        <div className="flex items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white font-semibold px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white font-semibold px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}

          {/* Hamburger (mobile only) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 w-full left-0 absolute top-[65px] overflow-hidden transition-all duration-500 ${
          isMobile ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {user ? (
          <>
            <Link
              to="/"
              className="block text-white px-4 py-2 active:bg-white/20 transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block text-white px-4 py-2 active:bg-white/20 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/products" // ✅ updated to ProductsDashboard
              className="block text-white px-4 py-2 active:bg-white/20 transition"
            >
              Products
            </Link>
            <button
              onClick={handleLogout}
              className="block text-white w-full text-left px-4 py-2 active:bg-white/20 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="block text-white px-4 py-2 active:bg-white/20 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
