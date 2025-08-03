"use client";

import { useState, useEffect } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const visibilityInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(visibilityInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div
        className={`absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100" : "opacity-30"
        }`}
        style={{
          left: `${Math.max(0, Math.min(85, mousePosition.x - 10))}%`,
          top: `${Math.max(0, Math.min(85, mousePosition.y - 10))}%`,
          transform: `translate(-50%, -50%) scale(${
            0.8 + mousePosition.x / 500
          })`,
        }}
      ></div>

      <div
        className={`absolute w-80 h-80 bg-gradient-to-r from-pink-400/25 to-purple-600/25 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1500 ease-out ${
          isVisible ? "opacity-70" : "opacity-20"
        }`}
        style={{
          left: `${Math.max(0, Math.min(85, 100 - mousePosition.x + 10))}%`,
          top: `${Math.max(0, Math.min(85, mousePosition.y + 20))}%`,
          transform: `translate(-50%, -50%) scale(${
            0.9 + mousePosition.y / 400
          }) rotate(${mousePosition.x / 5}deg)`,
        }}
      ></div>

      <div
        className={`absolute w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-2000 ease-out ${
          isVisible ? "opacity-80" : "opacity-40"
        }`}
        style={{
          left: `${Math.max(0, Math.min(85, mousePosition.x + 30))}%`,
          top: `${Math.max(0, Math.min(85, 100 - mousePosition.y + 15))}%`,
          transform: `translate(-50%, -50%) scale(${
            0.7 + mousePosition.x / 600
          }) rotate(${-mousePosition.y / 3}deg)`,
        }}
      ></div>

      <div
        className={`absolute w-64 h-64 bg-gradient-to-r from-purple-400/15 to-indigo-600/15 rounded-full mix-blend-multiply filter blur-xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-60" : "opacity-10"
        }`}
        style={{
          left: `${Math.max(0, Math.min(85, mousePosition.x / 2 + 25))}%`,
          top: `${Math.max(0, Math.min(85, mousePosition.y / 2 + 35))}%`,
          transform: `translate(-50%, -50%) scale(${
            0.5 + mousePosition.y / 800
          })`,
        }}
      ></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400/20 rounded-full transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100" : "opacity-20"
            }`}
            style={{
              left: `${(i * 17 + mousePosition.x / 10) % 100}%`,
              top: `${(i * 23 + mousePosition.y / 15) % 100}%`,
              transform: `scale(${
                0.5 + (mousePosition.x + mousePosition.y) / 400
              })`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
