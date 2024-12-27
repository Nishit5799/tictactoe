"use client";
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import gsap from "gsap"; // Import GSAP for animations
import Tictactoeboard from "@/components/Tictactoeboard";

// Cross component
function Cross({ position, shouldAnimate, key }) {
  const meshRef = useRef();

  useEffect(() => {
    if (shouldAnimate) {
      gsap.fromTo(
        meshRef.current.position,
        { z: 25 }, // Start from a higher Z value
        { z: position[2], duration: 1, ease: "bounce.out" } // Animate only Z to final position with bounce
      );
    }
  }, [shouldAnimate, position]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={2.7}
      rotation={[0, 0, -Math.PI / 1.4]}
      key={key}
    >
      <boxGeometry args={[0.2, 0.05, 0.05]} />
      <meshStandardMaterial color="red" metalness={0.3} roughness={0.7} />
      <mesh rotation={[0, 0, Math.PI / 2.5]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="red" metalness={0.3} roughness={0.7} />
      </mesh>
    </mesh>
  );
}

// Circle component
function Circle({ position, shouldAnimate, key }) {
  const meshRef = useRef();

  useEffect(() => {
    if (shouldAnimate) {
      gsap.fromTo(
        meshRef.current.position,
        { z: 25 }, // Start from a higher Z value (same as Cross)
        { z: position[2], duration: 1, ease: "bounce.out" } // Animate only Z to final position with bounce
      );
    }
  }, [shouldAnimate, position]);

  return (
    <mesh ref={meshRef} position={position} scale={2} key={key}>
      <torusGeometry args={[0.1, 0.03, 16, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

// Main Tic-Tac-Toe Game
function TicTacToeGame() {
  const [gameState, setGameState] = useState(Array(9).fill(null)); // Track the board state
  const [isXTurn, setIsXTurn] = useState(true); // Track whose turn it is
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track if screen is small
  const [lastClickedIndex, setLastClickedIndex] = useState(null); // Track the last clicked index for animation
  const [shouldAnimate, setShouldAnimate] = useState(false); // Control animation for the current move

  const handleCellClick = (index) => {
    if (gameState[index]) return; // Prevent overwriting if already clicked

    const newState = [...gameState];
    newState[index] = isXTurn ? "X" : "O";
    setGameState(newState);
    setIsXTurn(!isXTurn);
    setLastClickedIndex(index); // Track the last clicked index for animation
    setShouldAnimate(true); // Trigger animation for the current move

    // Reset animation flag after animation is done (1 second for the bounce)
    setTimeout(() => setShouldAnimate(false), 1000); // 1 second delay for animation duration
  };

  const positions = [
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
  ]; // Cell positions

  // Track window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind's 'sm' breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define responsive scale and position
  const groupScale = isSmallScreen ? [0.34, 0.34, 0.34] : [0.35, 0.35, 0.35];
  const groupPosition = isSmallScreen ? [0.01, -2.2, 0.09] : [0.01, -2.5, 0.09];

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 0], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Tictactoeboard />

        <group
          scale={groupScale}
          position={groupPosition}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {gameState.map((cell, index) =>
            cell === "X" ? (
              <Cross
                key={index}
                position={positions[index]}
                shouldAnimate={shouldAnimate && lastClickedIndex === index}
              />
            ) : cell === "O" ? (
              <Circle
                key={index}
                position={positions[index]}
                shouldAnimate={shouldAnimate && lastClickedIndex === index}
              />
            ) : (
              <mesh
                key={index}
                position={positions[index]}
                onClick={() => handleCellClick(index)}
              >
                <planeGeometry args={[0.8, 0.8]} />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
            )
          )}
        </group>

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

export default TicTacToeGame;
