"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import gsap from "gsap";

import Link from "next/link";
import TictactoeText from "./TictactoeText";
import CheckVaultText from "./CheckVaultText";
import Pvp from "./Pvp";
import Pvsai from "./Pvsai";
import Coin from "./Coin";

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
  const [isVaultActive, setIsVaultActive] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [inputValue, setInputValue] = useState("");

  const yTextPosition = isSmallScreen ? 3.5 : 2;
  const buttonRef = useRef();
  const textRef = useRef();
  const playButtonContainerRef = useRef();
  const vaultContainerRef = useRef();

  const handleConnectClick = () => {
    if (buttonRef.current && textRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          buttonRef.current.style.display = "none";
          setShowPlayButtonContainer(true);
        },
      });

      gsap.to(textRef.current.position, {
        y: yTextPosition,
        duration: 2,
        ease: "power2.out",
      });
    }
  };

  const handleVaultClick = () => {
    if (playButtonContainerRef.current) {
      gsap.to(playButtonContainerRef.current, {
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(playButtonContainerRef.current, {
            scale: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setIsVaultActive(true);
              // Delay animation to ensure elements are rendered
              setTimeout(() => {
                if (vaultContainerRef.current) {
                  gsap.fromTo(
                    Array.from(vaultContainerRef.current.children),
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.7,
                      stagger: 0.2,
                      ease: "power2.out",
                    }
                  );
                }
              }, 0);
            },
          });
        },
      });
    }
  };

  const handlePopupOpen = (type) => {
    setPopupTitle(`Set ${type} Amount`);
    setIsPopupVisible(true);
    setInputValue("");
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
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
        {isVaultActive && <Coin />}
      </Canvas>
      {isVaultActive && (
        <div ref={vaultContainerRef}>
          <div className="absolute sm:top-1/2 top-[50.3vh] sm:left-[57%] left-[80%] transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-md shadow-lg text-center transition-transform duration-300 ease-in-out hover:scale-105">
            <p className="sm:text-[2vw] text-[8vw] font-choco text-border">
              $100
            </p>
          </div>
          <div
            className="absolute top-[60%] cursor-pointer bg-slate-900 sm:left-[54.3%] left-[74%] mt-4 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => handlePopupOpen("Deposit")}
          >
            <h1 className="font-choco text-xl">Deposit</h1>
          </div>
          <div
            className="absolute top-[70%] bg-slate-900 cursor-pointer sm:left-[55.5%] left-[80%] mt-4 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => handlePopupOpen("Withdraw")}
          >
            <h1 className="font-choco text-xl">Withdraw</h1>
          </div>
          <div className="absolute top-[80%] bg-slate-900 sm:left-[61.5%] left-[85%] cursor-pointer sm:mt-5 mt-8 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out hover:scale-105">
            <h1 className="font-choco text-xl">Transaction History</h1>
          </div>
        </div>
      )}

      {!isVaultActive && (
        <button
          ref={buttonRef}
          onClick={handleConnectClick}
          className="absolute font-choco top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 sm:px-8 w-[60%] sm:w-fit py-4 bg-green-900/60 text-white text-xl rounded-full transition-all duration-500 hover:bg-green-600/60 hover:scale-110"
        >
          <h1 className="sm:text-xl text-lg w-full h-full">
            Connect To Wallet
          </h1>
        </button>
      )}

      {!isVaultActive && showPlayButtonContainer && (
        <div
          ref={playButtonContainerRef}
          className="absolute top-2/3 left-1/2 transform landing bg-slate-500/70 py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[20%] flex items-center justify-center"
        >
          <div className="top-1/2 w-full h-full flex flex-col items-center justify-center">
            <div
              className="w-[70%] vault sm:w-[55%] h-[10vh] cursor-pointer"
              onClick={handleVaultClick}
            >
              <Canvas>
                <CheckVaultText />
              </Canvas>
            </div>
            <div className="w-[70%] sm:w-[55%] h-[10vh]">
              <Canvas>
                <Pvp />
              </Canvas>
            </div>
            <Link href="/maingame" className="w-[70%] sm:w-[55%] h-[10vh]">
              <Canvas>
                <Pvsai />
              </Canvas>
            </Link>
          </div>
        </div>
      )}

      {/* Popup */}
      {isPopupVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[90%] sm:w-[30%]">
            <h2 className="text-lg font-bold text-center font-choco">
              {popupTitle}
            </h2>
            <input
              type="number"
              className="w-full mt-4 p-2 border rounded-md font-choco"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter amount"
            />
            <button
              onClick={handlePopupClose}
              className="w-full mt-4 p-2 bg-green-600 font-choco text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
