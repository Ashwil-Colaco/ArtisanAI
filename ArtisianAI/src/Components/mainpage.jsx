import React, { useRef, useState, useEffect } from "react";
import video from "../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function MainPage() {
  const videoRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ added useNavigate

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-screen bg-[#111111]"
    >
      <video
        ref={videoRef}
        src={video}
        autoPlay
        loop={false}
        muted
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-[1.5px] transition-opacity duration-1000 ease-in-out"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 text-white z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          AI Powered Marketplace Assistant
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl text-white drop-shadow-lg">
          Unlock your creative potential with cutting-edge AI technology tailored for artisans. Automate repetitive tasks, enhance creativity, and streamline the design process with intelligent AI.
        </p>

        <button
          onClick={() => (user ? navigate("/products") : navigate("/login"))} // ✅ navigate to ProductsDashboard
          className="inline-block bg-white/10 text-white border border-white/30 py-3 px-6 rounded-lg hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm max-sm:active:bg-white/70"
        >
          {user ? "Upload Details" : "Get Started"}
        </button>
      </div>
    </motion.div>
  );
}
