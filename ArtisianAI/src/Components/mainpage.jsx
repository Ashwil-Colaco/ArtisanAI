import React, { useRef } from 'react';
import video from '../assets/video.mp4';  // Import video from the correct path

export default function MainPage() {
  // Video ref for controlling the video
  const videoRef = useRef(null);

  // Handle the end of the video and reset it
  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0; // Reset the video to the beginning
    videoRef.current.play(); // Start playing from the beginning
  };

  return (
    <div className="relative w-full h-screen bg-[#111111]">
      {/* Video Background with smooth loop */}
      <video
        ref={videoRef}  // Attach video reference
        src={video}
        autoPlay
        loop={false}  // Set to false because we're handling the looping manually
        muted
        onEnded={handleVideoEnd}  // Handle video end event
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Hero Section */}
      <div className="absolute bottom-0 left-0 px-6 py-10 text-white">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          AI Powered Marketplace Assistant
        </h1>

        {/* Paragraph */}
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Unlock your creative potential with cutting-edge AI technology tailored for artisans. Automate repetitive tasks, enhance creativity, and streamline the design process with intelligent AI.
        </p>

        {/* Call to Action Button */}
        <a
          href="#get-started"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
