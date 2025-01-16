"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";

import TictactoeText from "@/components/landingpage/TictactoeText";
import CheckVaultText from "@/components/landingpage/CheckVaultText";
import Pvp from "@/components/landingpage/Pvp";
import Pvsai from "@/components/landingpage/Pvsai";
import Link from "next/link";
import Loader from "@/components/landingpage/Loader";

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

const WalletPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Adjust the duration as needed

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const fov = isSmallScreen ? 132 : 100;

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText animate={true} />
      </Canvas>

      <div className="absolute top-2/3 left-1/2 transform landing py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[21%] flex items-center justify-center">
        <div className="top-1/2 w-full h-full flex flex-col items-center justify-center ">
          <div className="w-[70%] vault sm:w-[55%] h-[9.5vh] cursor-pointer  hover:scale-110 transition-all duration:700 ease-in">
            <Link href="/enterwallet/vault">
              <Canvas>
                <CheckVaultText />
              </Canvas>
            </Link>
          </div>
          <div className="w-[70%] sm:w-[55%] h-[10vh] cursor-pointer hover:scale-110 transition-all duration:300">
            <Canvas>
              <Pvp />
            </Canvas>
          </div>
          <Link
            href="/enterwallet/maingame"
            className="w-[70%] sm:w-[55%] h-[10vh] hover:scale-110 transition-all duration:300"
          >
            <Canvas>
              <Pvsai />
            </Canvas>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
