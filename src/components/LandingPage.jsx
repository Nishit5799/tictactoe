"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import gsap from "gsap";
import TictactoeText from "./TictactoeText";
import Link from "next/link";
import CheckVaultText from "./CheckVaultText";
import Pvp from "./Pvp";
import Pvsai from "./Pvsai";

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
  const [showPlayButtonContainer, setShowPlayButtonContainer] = useState(false);
  const yTextPosition = isSmallScreen ? 3.5 : 2;
  const buttonRef = useRef();
  const textRef = useRef();
  const playButtonContainerRef = useRef();

  const handleConnectClick = () => {
    if (buttonRef.current && textRef.current) {
      // Animate Connect To Wallet button fade-out and hide
      gsap.to(buttonRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          buttonRef.current.style.display = "none";
          setShowPlayButtonContainer(true); // Show Play Game container
        },
      });

      // Animate TictactoeText position
      gsap.to(textRef.current.position, {
        y: yTextPosition,
        duration: 2,
        ease: "power2.out",
      });
    }
  };

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

  useEffect(() => {
    if (showPlayButtonContainer && playButtonContainerRef.current) {
      // Animate Play Game container scale and fade-in
      gsap.fromTo(
        playButtonContainerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    }
  }, [showPlayButtonContainer]);

  const fov = isSmallScreen ? 132 : 100;

  return (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText ref={textRef} />
      </Canvas>

      <button
        ref={buttonRef}
        onClick={handleConnectClick}
        className="absolute font-choco top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 sm:px-8 w-[60%] sm:w-fit py-4 bg-green-900/60 text-white text-xl rounded-full transition-all duration-500 hover:bg-green-600/60 hover:scale-110"
      >
        <h1 className="sm:text-xl text-lg w-full h-full">Connect To Wallet</h1>
      </button>

      {showPlayButtonContainer && (
        <div className="absolute top-2/3 left-1/2 transform    -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg w-[80%] sm:w-[40%] h-[80vh] flex items-center justify-center">
          <div className="top-1/2 w-full h-full flex flex-col items-center justify-center">
            <Link href="/maingame" className=" w-[70%]  sm:w-[55%] h-[10vh]">
              <Canvas>
                <CheckVaultText />
              </Canvas>
            </Link>
            <Link href="/maingame" className=" w-[70%]  sm:w-[55%] h-[10vh]">
              <Canvas>
                <Pvp />
              </Canvas>
            </Link>
            <Link href="/maingame" className=" w-[70%]  sm:w-[55%] h-[10vh]">
              <Canvas>
                <Pvsai />
              </Canvas>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
