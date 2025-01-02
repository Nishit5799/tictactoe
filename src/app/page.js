"use client";
import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Tictactoeboard from "@/components/Tictactoeboard";
import { OrbitControls } from "@react-three/drei";
import Cross from "@/components/Cross";
import Circle from "@/components/Circle";
import StarsSphere from "@/components/Background";
import WinLine from "@/components/WinLine";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
  const [timer, setTimer] = useState(30);
  const turnToastId = useRef(null);

  const bounceSound = useRef(null);
  const victorySound = useRef(null);
  const bgMusic = useRef(null);
  const tieSound = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    bounceSound.current = new Audio("/bounce.mp3");
    victorySound.current = new Audio("/victory.mp3");
    bgMusic.current = new Audio("/game.mp3");
    tieSound.current = new Audio("/tie.mp3");
    bgMusic.current.loop = true;
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
    if (turnToastId.current) {
      toast.dismiss(turnToastId.current);
    }
    turnToastId.current = toast(
      isXTurn ? "Player 1's Turn" : "Player 2's Turn",
      {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        hideProgressBar: true,
        className: "centered-toast",
        bodyClassName: "centered-toast-body",
      }
    );
  }, [isXTurn]);

  const handleCellClick = (index) => {
    if (gameState[index] || winner) {
      toast.warn("Invalid move!", { position: "top-center" });
      return;
    }

    if (isFirstMove) {
      setIsFirstMove(false);
      setTimeout(() => setBlinkOpacity(0), 10);
    }

    const newState = [...gameState];
    newState[index] = isXTurn ? "O" : "X";
    setGameState(newState);
    setIsXTurn(!isXTurn);
    setLastClickedIndex(index);
    setShouldAnimate(true);

    bounceSound.current?.play();

    checkWinnerOrTie(newState);

    setTimeout(() => setShouldAnimate(false), 1000);

    if (!winner) resetTimer();
  };

  const checkWinnerOrTie = (state) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        setWinner(state[a]);
        setHighlightIndex(i);
        Swal.fire({
          title: `Player ${state[a]} wins! 🎉`,
          width: isSmallScreen ? 300 : 500,
          padding: "1em",
          color: "white",
          background: "rgba(0, 0, 0, 0.6) ",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/cat-nyan-cat.gif")
            left top
            no-repeat
          `,
        });
        victorySound.current?.play();
        clearInterval(timerRef.current);
        return;
      }
    }

    if (state.every((cell) => cell !== null)) {
      setWinner("Tie");
      Swal.fire({
        title: "It's a tie!",
        icon: "error",
      });
      tieSound.current?.play();
      clearInterval(timerRef.current);
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
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimer(30);
    if (!winner) startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          playRandomMove();
          return 30;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const playRandomMove = () => {
    const availableMoves = gameState
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    if (availableMoves.length > 0) {
      const randomIndex =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleCellClick(randomIndex);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

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
    if (isFirstMove) {
      const interval = setInterval(() => {
        setBlinkOpacity((prev) => (prev === 1 ? 0 : 1));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isFirstMove]);

  const yellowScale = isSmallScreen ? [0.35, 0.34, 0.34] : [0.36, 0.35, 0.35];
  const yellowPosition = isSmallScreen ? [0.01, -2.35, 0] : [0.01, -1.35, -0.2];
  const cameraPosition = isSmallScreen ? [0, 0.3, 0] : [0, 1.6, 1.2];
  const maxPolarAngle = isSmallScreen ? Math.PI / 8 : Math.PI / 6;
  const minPolarAngle = isSmallScreen ? Math.PI / 80 : Math.PI / 17;

  const fov = isSmallScreen ? 106 : 100;
  const boardPosition = isSmallScreen ? [0, 0.1, 0.2] : [0, 2, 0.7];

  return (
    <div className="w-full h-screen relative">
      <div className="absolute bottom-24 right-10 sm:right-12 bg-black text-white px-4 py-2 rounded-md z-[1000]">
        Timer: {timer}s
      </div>
      <button
        className={`absolute bottom-24 left-10 px-4 py-2 z-[1000] text-white bg-black rounded-lg transition-transform duration-300 ease-in-out ${
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
        className="absolute top-20 right-10 sm:right-12 px-4 py-2 z-[1000] text-white bg-black rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={toggleMusic}
      >
        {isMusicPlaying ? "Music Off" : "Music On"}
      </button>

      <Canvas camera={{ position: cameraPosition, fov }}>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
          enableDamping
          dampingFactor={0.1}
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
