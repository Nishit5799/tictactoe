"use client";
import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Tictactoeboard from "@/components/Tictactoeboard";
import { OrbitControls } from "@react-three/drei";
import Cross from "@/components/Cross";
import Circle from "@/components/Circle";
import StarsSphere from "@/components/Background";
import WinLine from "@/components/WinLine";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TicTacToeGame() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [winner, setWinner] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [blinkOpacity, setBlinkOpacity] = useState(1);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [timer, setTimer] = useState(8);
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const [showPlayerTurn, setShowPlayerTurn] = useState(true);

  const toastId = useRef(null);
  const timerInterval = useRef(null);
  const blinkInterval = useRef(null);

  // Sound effects
  const bounceSound = useRef(null);
  const victorySound = useRef(null);
  const bgMusic = useRef(null);

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
  ];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    bounceSound.current = new Audio("/bounce.mp3");
    victorySound.current = new Audio("/victory.mp3");
    bgMusic.current = new Audio("/game.mp3");
    bgMusic.current.loop = true;
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  useEffect(() => {
    blinkInterval.current = setInterval(() => {
      setBlinkOpacity((prev) => (prev === 1 ? 0 : 1));
    }, 500);

    return () => clearInterval(blinkInterval.current);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgMusic.current.pause();
    } else {
      bgMusic.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    if (winner || gameState.every((cell) => cell !== null)) {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
      setShowPlayerTurn(false);
      setIsTimerVisible(false);
      return;
    }

    const currentPlayer = isXTurn ? "Player 1 (O)" : "Player 2 (X)";
    toastId.current = toast(`${currentPlayer}'s turn`, {
      autoClose: false,
      className: "bg-black text-white",
    });

    setIsTimerVisible(true);
    setShowPlayerTurn(true);
    startTimer();

    return () => stopTimer();
  }, [isXTurn, winner]);

  const startTimer = () => {
    setTimer(50);
    stopTimer();

    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleTimeoutMove();
          return 50;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval.current);
  };

  const handleTimeoutMove = () => {
    if (winner || !gameState.includes(null)) return;

    const availableMoves = gameState
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    const randomMoveIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleCellClick(randomMoveIndex);
  };

  const handleCellClick = (index) => {
    if (gameState[index] || winner) {
      toast.warn("Invalid move!", { position: "top-center" });
      return;
    }

    if (isFirstMove) {
      setIsFirstMove(false);
    }

    const newState = [...gameState];
    newState[index] = isXTurn ? "O" : "X";
    setGameState(newState);
    setIsXTurn(!isXTurn);
    setLastClickedIndex(index);
    setShouldAnimate(true);

    bounceSound.current?.play();

    if (toastId.current) {
      toast.dismiss(toastId.current);
      toastId.current = null;
    }

    checkWinnerOrTie(newState);
    setTimeout(() => setShouldAnimate(false), 1000);
  };

  const checkWinnerOrTie = (state) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setWinner(state[a]);
        setHighlightIndex(i);

        toast.success(`${state[a]} wins! 🎉`, { position: "top-center" });

        victorySound.current?.play();
        stopTimer();
        setIsTimerVisible(false);
        setShowPlayerTurn(false);

        if (toastId.current) {
          toast.dismiss(toastId.current);
          toastId.current = null;
        }

        return;
      }
    }

    if (state.every((cell) => cell !== null)) {
      setWinner("Tie");
      toast.info("It's a tie! 🤝", { position: "top-center" });
      stopTimer();
      setIsTimerVisible(false);
      setShowPlayerTurn(false);

      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    }
  };

  const resetGame = () => {
    setGameState(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setHighlightIndex(null);
    setLastClickedIndex(null);
    setShouldAnimate(false);
    setIsFirstMove(true);
    setBlinkOpacity(1);
    setIsTimerVisible(true);
    setShowPlayerTurn(false);
    stopTimer();
  };

  const yellowScale = isSmallScreen ? [0.35, 0.34, 0.34] : [0.36, 0.35, 0.35];
  const yellowPosition = isSmallScreen ? [0.01, -2.35, 0] : [0.01, -1.35, -0.2];
  const cameraPosition = isSmallScreen ? [0, 0.3, 0] : [0, 1.6, 1.2];
  const maxPolarAngle = isSmallScreen ? Math.PI / 8 : Math.PI / 6;
  const minPolarAngle = isSmallScreen ? Math.PI / 80 : Math.PI / 17;

  const fov = isSmallScreen ? 106 : 100;
  const boardPosition = isSmallScreen ? [0, 0.1, 0.2] : [0, 2, 0.7];

  return (
    <div className="w-full h-screen relative">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />

      <button
        className={`absolute sm:bottom-4 sm:left-2 bottom-24 left-4 px-4 py-2 z-[1000] text-white bg-black rounded-lg transition-transform duration-300 ease-in-out ${
          winner || gameState.every((cell) => cell !== null)
            ? "cursor-pointer opacity-100 hover:scale-110"
            : "cursor-not-allowed opacity-50"
        }`}
        onClick={resetGame}
        disabled={!winner && !gameState.every((cell) => cell !== null)}
      >
        Reset
      </button>

      <button
        className="absolute top-16 right-4 px-4 py-2 z-[1000] text-white bg-black rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 "
        onClick={toggleMusic}
      >
        {isMusicPlaying ? "Music Off" : "Music On"}
      </button>

      {isTimerVisible && (
        <div className="absolute sm:bottom-4 sm:right-4 bottom-24 right-8 text-white bg-black px-4 py-2 rounded-lg z-[1000]">
          Timer: {timer}s
        </div>
      )}

      <Canvas camera={{ position: cameraPosition, fov }}>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
          enableDamping
          dampingFactor={0.1}
        />

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
                    opacity={blinkOpacity}
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
