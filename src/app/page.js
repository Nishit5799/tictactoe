"use client";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import Tictactoeboard from "@/components/Tictactoeboard";
import { OrbitControls } from "@react-three/drei";
import Cross from "@/components/Cross";
import Circle from "@/components/Circle";
import Winningline from "@/components/Winningline";

function TicTacToeGame() {
  const [gameState, setGameState] = useState(Array(9).fill(null)); // Track the board state
  const [isXTurn, setIsXTurn] = useState(true); // Track whose turn it is
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track if screen is small
  const [lastClickedIndex, setLastClickedIndex] = useState(null); // Track the last clicked index for animation
  const [shouldAnimate, setShouldAnimate] = useState(false); // Control animation for the current move
  const [winner, setWinner] = useState(null); // Track the winner
  const [highlightIndex, setHighlightIndex] = useState(null); // Highlight the winning line

  const handleCellClick = (index) => {
    if (gameState[index] || winner) return; // Prevent overwriting if already clicked or if game is over

    const newState = [...gameState];
    newState[index] = isXTurn ? "O" : "X";
    setGameState(newState);
    setIsXTurn(!isXTurn);
    setLastClickedIndex(index); // Track the last clicked index for animation
    setShouldAnimate(true); // Trigger animation for the current move

    // Check for a winner after the move
    checkWinner(newState);

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

  const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6], // Diagonal from top-right
  ];

  const checkWinner = (state) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setWinner(state[a]);
        setHighlightIndex(i); // Highlight the appropriate winning line
        return;
      }
    }
  };

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

  // Adjust FOV based on screen size
  const fov = isSmallScreen ? 73 : 50;

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 2, 0], fov: fov }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />

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

        <Winningline highlightIndex={highlightIndex} />
      </Canvas>
    </div>
  );
}

export default TicTacToeGame;
