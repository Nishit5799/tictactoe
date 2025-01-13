"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";

import TictactoeText from "@/components/landingpage/TictactoeText";
import Coin from "@/components/landingpage/Coin";

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

const Vault = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [popupType, setPopupType] = useState(null); // 'deposit' or 'withdraw'

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

  const closePopup = () => setPopupType(null);

  return (
    <div
      className={`w-full h-screen bg-black text-white relative ${
        popupType ? "bg-opacity-50" : ""
      }`}
    >
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText animate={true} />
        <Coin />
      </Canvas>

      {/* Popup */}
      {popupType && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white/90 text-black p-8 rounded-xl shadow-lg w-[90%] sm:w-[40%] text-center">
            <h2 className="font-choco text-2xl mb-4">
              {popupType === "deposit"
                ? "Set Deposit Amount"
                : "Set Withdraw Amount"}
            </h2>
            <input
              type="number"
              className="w-full p-3 border font-choco border-gray-300 rounded-md text-lg  mb-4"
              placeholder="Enter amount"
            />
            <button
              className="bg-blue-600 font-choco text-black py-2 px-6 rounded-full font-bold hover:bg-blue-700 hover:scale-105 duration-300 transition-all"
              onClick={closePopup}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="absolute top-1/2 sm:left-1/2 left-[60%] transform landing py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[21%] flex items-center justify-center">
        <p className="sm:text-[2vw] text-[8vw] font-choco text-border">$100 </p>
      </div>
      <div
        className="absolute top-[60%] cursor-pointer bg-slate-900 sm:left-[53%] left-[70%] mt-4 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-all duration-300 ease-in-out hover:scale-105"
        onClick={() => setPopupType("deposit")}
      >
        <h1 className="font-choco text-xl">Deposit</h1>
      </div>
      <div
        className="absolute top-[70%] bg-slate-900 cursor-pointer sm:left-[54.4%] left-[74.7%] mt-4 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-all duration-300 ease-in-out hover:scale-105"
        onClick={() => setPopupType("withdraw")}
      >
        <h1 className="font-choco text-xl">Withdraw</h1>
      </div>
      <div className="absolute top-[80%] bg-slate-900 sm:left-[60.5%] left-[80%] cursor-pointer sm:mt-5 mt-8 transform -translate-x-[120%] -translate-y-1/2 p-4 rounded-2xl shadow-lg text-center transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="font-choco text-xl">Transaction History</h1>
      </div>
    </div>
  );
};

export default Vault;
