"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";

import TictactoeText from "@/components/landingpage/TictactoeText";
import CheckVaultText from "@/components/landingpage/CheckVaultText";
import Pvp from "@/components/landingpage/Pvp";
import Pvsai from "@/components/landingpage/Pvsai";
import Link from "next/link";

const RotatingSphere = () => {
  const texture = useLoader(TextureLoader, "/bg8.jpg");
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

  const setArgs = isSmallScreen ? [300, 60, 400] : [800, 800, 800];

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={setArgs} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

const WalletPage = () => {
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

  const fov = isSmallScreen ? 132 : 100;

  return (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText animate={true} />
      </Canvas>

      <div className="absolute top-2/3 left-1/2 transform landing py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[21%] flex items-center justify-center">
        <div className="top-1/2 w-full h-full flex flex-col items-center justify-center">
          <div className="w-[70%] vault sm:w-[55%] h-[9.5vh] cursor-pointer">
            <Link href="/enterwallet/vault">
              <Canvas>
                <CheckVaultText />
              </Canvas>
            </Link>
          </div>
          <div className="w-[70%] sm:w-[55%] h-[10vh] cursor-pointer">
            <Canvas>
              <Pvp />
            </Canvas>
          </div>
          <Link
            href="/enterwallet/maingame"
            className="w-[70%] sm:w-[55%] h-[10vh]"
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
