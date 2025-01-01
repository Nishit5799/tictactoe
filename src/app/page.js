"use client";
import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import Tictactoeboard from "@/components/Tictactoeboard";
import { OrbitControls } from "@react-three/drei";
import Cross from "@/components/Cross";
import Circle from "@/components/Circle";

import StarsSphere from "@/components/Background";
import WinLine from "@/components/WinLine";

function TicTacToeGame() {
  const [gameState, setGameState] = useState(Array(9).fill(null)); // Track the board state
  const [isXTurn, setIsXTurn] = useState(true); // Track whose turn it is
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track if screen is small
  const [lastClickedIndex, setLastClickedIndex] = useState(null); // Track the last clicked index for animation
  const [shouldAnimate, setShouldAnimate] = useState(false); // Control animation for the current move
  const [winner, setWinner] = useState(null); // Track the winner
  const [highlightIndex, setHighlightIndex] = useState(null); // Highlight the winning line
  const [blinkOpacity, setBlinkOpacity] = useState(1); // Control opacity of planes
  const [isFirstMove, setIsFirstMove] = useState(true); // Track if it's the first move
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Track music state

  // Refs for sound effects
  const bounceSound = useRef(null);
  const victorySound = useRef(null);
  const bgMusic = useRef(null);

  useEffect(() => {
    // Initialize sound files in the browser environment
    bounceSound.current = new Audio("/bounce.mp3");
    victorySound.current = new Audio("/victory.mp3");
    bgMusic.current = new Audio("/game.mp3");
    bgMusic.current.loop = true; // Loop background music
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgMusic.current.pause();
    } else {
      bgMusic.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
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

  const handleCellClick = (index) => {
    if (gameState[index] || winner) return; // Prevent overwriting if already clicked or if game is over

    // Stop blinking on first move
    if (isFirstMove) {
      setIsFirstMove(false); // Stop blinking
      setTimeout(() => setBlinkOpacity(0), 500); // Smooth fade-out
    }

    const newState = [...gameState];
    newState[index] = isXTurn ? "O" : "X";
    setGameState(newState);
    setIsXTurn(!isXTurn);
    setLastClickedIndex(index); // Track the last clicked index for animation
    setShouldAnimate(true); // Trigger animation for the current move

    // Play sound based on the current turn
    if (isXTurn) {
      bounceSound.current?.play(); // Play circle sound
    } else {
      bounceSound.current?.play(); // Play cross sound
    }

    // Check for a winner after the move
    checkWinner(newState);

    // Reset animation flag after animation is done (1 second for the bounce)
    setTimeout(() => setShouldAnimate(false), 1000); // 1 second delay for animation duration
  };

  const checkWinner = (state) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setWinner(state[a]);
        setHighlightIndex(i); // Highlight the appropriate winning line

        // Play victory sound
        victorySound.current?.play();
        return;
      }
    }
  };

  const resetGame = () => {
    setGameState(Array(9).fill(null)); // Reset board state
    setIsXTurn(true); // Reset turn to X
    setWinner(null); // Clear winner
    setHighlightIndex(null); // Clear highlight line
    setLastClickedIndex(null); // Reset animation state
    setShouldAnimate(false); // Reset animation
    setIsFirstMove(true); // Reactivate blinking
    setBlinkOpacity(1); // Reset blinking opacity
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

  // Handle blinking effect
  useEffect(() => {
    if (isFirstMove) {
      const interval = setInterval(() => {
        setBlinkOpacity((prev) => (prev === 1 ? 0 : 1));
      }, 500); // Blink every 500ms

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isFirstMove]);

  // Define responsive scale and position
  const yellowScale = isSmallScreen ? [0.35, 0.34, 0.34] : [0.36, 0.35, 0.35];
  const yellowPosition = isSmallScreen ? [0.01, -2.35, 0] : [0.01, -1.35, -0.2];
  const cameraPosition = isSmallScreen ? [0, 0.3, 0] : [0, 1.6, 1.2];
  const maxAzimuthalAngle = isSmallScreen ? -Math.PI / 20 : -Math.PI / 5;
  const minAzimuthalAngle = isSmallScreen ? Math.PI / 20 : Math.PI / 6;
  const maxPolarAngle = isSmallScreen ? Math.PI / 8 : Math.PI / 6;
  const minPolarAngle = isSmallScreen ? Math.PI / 80 : Math.PI / 17;

  // Adjust FOV based on screen size
  const fov = isSmallScreen ? 106 : 100;
  const boardPosition = isSmallScreen ? [0, 0.1, 0.2] : [0, 2, 0.7];

  return (
    <div className="w-full h-screen relative">
      {/* Reset Button */}
      <button
        className={`absolute top-4 right-4 px-4 py-2 z-[1000] text-white bg-black rounded-lg transition-transform duration-300 ease-in-out ${
          winner
            ? "cursor-pointer opacity-100 hover:scale-110"
            : "cursor-not-allowed opacity-50"
        }`}
        onClick={resetGame}
        disabled={!winner} // Only enable button if there is a winner
      >
        Reset
      </button>

      {/* Music Toggle Button */}
      <button
        className="absolute top-16 right-4 px-4 py-2 z-[1000] text-white bg-blue-600 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={toggleMusic}
      >
        {isMusicPlaying ? "Music Off" : "Music On"}
      </button>

      <Canvas camera={{ position: cameraPosition, fov: fov }}>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={minPolarAngle} // Restrict vertical rotation (down limit)
          maxPolarAngle={maxPolarAngle} // Restrict vertical rotation (up limit)
          enableDamping // Smooth rotation
          dampingFactor={0.1} // Adjust the damping effect
        />
        <ambientLight intensity={0.1} />
        <group position={boardPosition}>
          <StarsSphere />
          <Tictactoeboard />

          <group
            scale={yellowScale}
            position={yellowPosition}
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
                  <meshBasicMaterial
                    color={"yellow"}
                    transparent
                    opacity={blinkOpacity} // Apply blinking effect
                  />
                </mesh>
              )
            )}
          </group>

          <WinLine highlightIndex={highlightIndex} />
        </group>
      </Canvas>
    </div>
  );
}

export default TicTacToeGame;
