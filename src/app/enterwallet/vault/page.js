"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import gsap from "gsap";
import Link from "next/link"; // Import Next.js Link

import TictactoeText from "@/components/landingpage/TictactoeText";
import Coin from "@/components/landingpage/Coin";
import DepositText from "@/components/landingpage/DepositText";
import WithdrawText from "@/components/landingpage/WithdrawText";
import TransactionText from "@/components/landingpage/TransactionText";
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

const Vault = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [popupType, setPopupType] = useState(null); // 'deposit' or 'withdraw'
  const popupRef = useRef(null);
  const depositRef = useRef(null);
  const withdrawRef = useRef(null);
  const transactionRef = useRef(null);
  const coinRef = useRef(null); // Ref for Coin
  const textRef = useRef(null); // Ref for $100 text

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust duration as necessary

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (popupType) {
      gsap.fromTo(
        popupRef.current,
        { scale: 0 },
        { scale: 1, duration: 2, ease: "power4.out" }
      );
    }
  }, [popupType]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power4.out" },
    });

    // Only add animations if refs are available
    if (depositRef.current) {
      tl.fromTo(
        depositRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.5
      );
    }
    if (withdrawRef.current) {
      tl.fromTo(
        withdrawRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.8
      );
    }
    if (transactionRef.current) {
      tl.fromTo(
        transactionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        1.1
      );
    }
    if (coinRef.current) {
      tl.fromTo(
        coinRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        1.4
      );
    }
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.3
      );
    }
  }, [isLoading]);

  const fov = isSmallScreen ? 132 : 100;

  const closePopup = () => setPopupType(null);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`w-full h-screen bg-black text-white relative ${
        popupType ? "bg-opacity-50" : ""
      }`}
    >
      {/* Back Button */}
      <Link href="/enterwallet">
        <button className="absolute sm:top-4 sm:left-4 top-10 left-4 z-[1000000] font-choco  text-white/70 px-4 py-2 ">
          Back
        </button>
      </Link>

      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />
        <RotatingSphere />
        <TictactoeText animate={true} />
        <Coin ref={coinRef} /> {/* Added ref to Coin */}
      </Canvas>

      {/* Popup */}
      {popupType && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-[url('/bg.jpg')] bg-cover bg-center text-white p-8 rounded-xl shadow-lg w-[94%] sm:w-[40%] text-center relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition"
              onClick={closePopup}
            >
              ✖
            </button>
            <h2 className="font-choco sm:text-2xl text-lg mb-4">
              {popupType === "deposit"
                ? "Set Deposit Amount"
                : "Set Withdraw Amount"}
            </h2>
            <input
              type="number"
              className="sm:w-full w-[77%] text-black px-5 py-1 sm:p-3 border font-choco border-gray-300 rounded-md sm:text-lg text-sm mb-4"
              placeholder="Enter amount"
            />
            <button
              className="bg-blue-600 font-choco text-white text-sm sm:text-lg sm:py-2 sm:px-6 py-1 px-4 rounded-full font-bold hover:bg-blue-700 hover:scale-105 duration-300 transition-all"
              onClick={closePopup}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={textRef}
        className="absolute top-1/2 sm:left-1/2 left-[60%] transform landing py-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg w-[75%] sm:w-[21%] flex items-center justify-center"
      >
        <p className="sm:text-[2vw] text-[7vw] font-choco bg-slate-900/60 rounded-full px-2 py-2 text-yellow-600 text-border">
          $100{" "}
        </p>
      </div>
      <div
        ref={depositRef}
        className="absolute top-[55%] sm:top-[57%] sm:w-[12%] w-full h-[12%] sm:h-[9%] cursor-pointer  sm:left-[42%] left-[1%] mt-4   p-4 rounded-2xl shadow-lg text-center "
        onClick={() => setPopupType("deposit")}
        style={{
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={() => (depositRef.current.style.transform = "scale(1.1)")}
        onMouseLeave={() => (depositRef.current.style.transform = "scale(1)")}
      >
        <Canvas>
          <DepositText />
        </Canvas>
      </div>
      <div
        ref={withdrawRef}
        className="absolute top-[65%] sm:top-[64.8%] sm:w-[17%] sm:h-[9%] w-full h-[12%] cursor-pointer sm:left-[39.3%] left-[1.7%] mt-4  p-4 rounded-2xl shadow-lg text-center "
        onClick={() => setPopupType("withdraw")}
        style={{
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={() =>
          (withdrawRef.current.style.transform = "scale(1.1)")
        }
        onMouseLeave={() => (withdrawRef.current.style.transform = "scale(1)")}
      >
        <Canvas>
          <WithdrawText />
        </Canvas>
      </div>
      <div
        style={{
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={() =>
          (transactionRef.current.style.transform = "scale(1.1)")
        }
        onMouseLeave={() =>
          (transactionRef.current.style.transform = "scale(1)")
        }
        ref={transactionRef}
        className="absolute top-[75%] sm:top-[74%] sm:w-[25%] w-full h-[12%] sm:h-[9%] sm:left-[35%] left-[1%] cursor-pointer sm:mt-5 mt-8  p-4 rounded-2xl shadow-lg text-center "
      >
        <Canvas>
          <TransactionText />
        </Canvas>
      </div>
    </div>
  );
};

export default Vault;
