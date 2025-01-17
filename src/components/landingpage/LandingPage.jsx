"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";

import TictactoeText from "./TictactoeText";
import Link from "next/link";
import Connecttowallet from "./Connecttowallet";

const RotatingSphere = () => {
  const texture = useLoader(TextureLoader, "/mainbg.jpg");
  const sphereRef = useRef();
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

  const setArgs = isSmallScreen ? [700, 1000, 1000] : [950, 1500, 1500];

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.0009;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={setArgs} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

const LandingPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef(null);

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

  const fov = isSmallScreen ? 132 : 100;

  const toggleMusic = () => {
    if (isMusicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicOn(!isMusicOn);
  };

  return (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText animate={false} />
      </Canvas>

      <div className="absolute left-1/2 transform -translate-x-1/2 top-[60%] sm:w-[28%] rounded-full sm:h-[15%] w-[75%] h-[5%] bg-slate-900/50 hover:bg-slate-900/90 transition-all duration-300 hover:scale-105">
        <Link href="/enterwallet">
          <Canvas>
            <Connecttowallet />
          </Canvas>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
