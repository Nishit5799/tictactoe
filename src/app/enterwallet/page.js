"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import gsap from "gsap";

import TictactoeText from "@/components/landingpage/TictactoeText";
import CheckVaultText from "@/components/landingpage/CheckVaultText";
import Pvp from "@/components/landingpage/Pvp";
import Pvsai from "@/components/landingpage/Pvsai";
import Loader from "@/components/landingpage/Loader";
import Link from "next/link";

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
  const [isPvpPopupVisible, setIsPvpPopupVisible] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const popupRef = useRef(null);
  const vaultRef = useRef(null);
  const pvpRef = useRef(null);
  const pvsaiRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Animate vault, pvp, and pvsai elements from downward to upward
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power4.out" },
    });
    tl.fromTo(
      vaultRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      0.8
    )
      .fromTo(pvpRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1.5)
      .fromTo(
        pvsaiRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        1.9
      );
  }, [isLoading]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopupWithAnimation();
      }
    };

    if (isPvpPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      // Animate popup opening
      gsap.fromTo(
        popupRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" }
      );
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPvpPopupVisible]);

  const closePopupWithAnimation = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => {
          setIsPvpPopupVisible(false); // Close popup
          setBetAmount(""); // Reset bet amount
        },
      });
    }
  };

  const handleStartMatchmaking = () => {
    if (betAmount) {
      console.log(`Starting matchmaking with bet amount: ${betAmount}`);
      closePopupWithAnimation(); // Close popup after starting matchmaking
    } else {
      alert("Please enter a bet amount!");
    }
  };

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

      {/* PvP Popup */}
      {isPvpPopupVisible && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="relative bg-[url('/bg.jpg')] bg-cover bg-center text-white p-8 rounded-xl shadow-lg w-[94%] sm:w-[40%] text-center"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white    p-2 focus:outline-none transition-transform duration-200"
              onClick={closePopupWithAnimation}
            >
              ✖
            </button>

            <h2 className="font-choco sm:text-2xl text-lg mb-4">
              Enter Bet Amount
            </h2>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="sm:w-full w-[77%] text-black px-5 py-1 sm:p-3 border font-choco border-gray-300 rounded-md sm:text-lg text-sm mb-4"
              placeholder="Enter amount"
            />
            <button
              className="bg-blue-600 font-choco text-white text-sm sm:text-lg sm:py-2 sm:px-6 py-1 px-4 rounded-full font-bold hover:bg-blue-700 hover:scale-105 duration-300 transition-all"
              onClick={handleStartMatchmaking}
            >
              Start Matchmaking
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="absolute top-2/3 left-1/2 transform landing py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[21%] flex items-center justify-center">
        <div className="top-1/2 w-full h-full flex flex-col items-center justify-center ">
          <div
            ref={vaultRef}
            className="w-[70%] vault sm:w-[55%] h-[9.5vh] cursor-pointer"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={() =>
              (vaultRef.current.style.transform = "scale(1.1)")
            }
            onMouseLeave={() => (vaultRef.current.style.transform = "scale(1)")}
          >
            <Link href="/enterwallet/vault">
              <Canvas>
                <CheckVaultText />
              </Canvas>
            </Link>
          </div>
          <div
            className="w-[70%] sm:w-[55%] h-[10vh] cursor-pointer"
            style={{
              transition: "transform 0.3s ease",
            }}
            ref={pvpRef}
            onMouseEnter={() => (pvpRef.current.style.transform = "scale(1.1)")}
            onMouseLeave={() => (pvpRef.current.style.transform = "scale(1)")}
            onClick={() => setIsPvpPopupVisible(true)}
          >
            <Canvas>
              <Pvp />
            </Canvas>
          </div>
          <div
            ref={pvsaiRef}
            className="w-[70%] sm:w-[55%] h-[10vh] cursor-pointer"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={() =>
              (pvsaiRef.current.style.transform = "scale(1.1)")
            }
            onMouseLeave={() => (pvsaiRef.current.style.transform = "scale(1)")}
          >
            <Canvas>
              <Pvsai />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
