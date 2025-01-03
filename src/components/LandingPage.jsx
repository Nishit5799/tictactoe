"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import TictactoeText from "./TictactoeText";
import Link from "next/link";
import { Environment } from "@react-three/drei";

const LandingPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fov = isSmallScreen ? 125 : 100;
  return (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [0, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 2, 2]} intensity={3} color={"white"} />
        <ambientLight intensity={0.5} />

        {/* Environment component added here */}
        <Environment files="/bg8.hdr" background />

        <TictactoeText />
      </Canvas>

      <Link href="/maingame">
        <button className="absolute font-jelly top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-gray-900 text-white text-xl rounded-lg transition-all duration-500 hover:bg-gray-600 hover:scale-110">
          <h1 className="text-3xl w-full h-full">Play Game</h1>
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
