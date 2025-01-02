import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WinLine = ({ highlightIndex }) => {
  const [animated, setAnimated] = useState(false); // Track if animation has already run
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track if screen is small
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
  const topRowPosition = isSmallScreen ? [0.03, 1.21, 1.6] : [0.03, 1.95, 3.85];
  const middleRowPosition = isSmallScreen
    ? [0.03, 0.24, 1.6]
    : [0.03, 0.82, 3.85];
  const bottomRowPosition = isSmallScreen
    ? [0.03, -0.74, 1.6]
    : [0.03, -0.27, 3.85];

  const leftColumnPosition = isSmallScreen
    ? [-1, 0.27, 1.6]
    : [-1.16, 0.75, 3.85];

  const middleColumnPosition = isSmallScreen
    ? [0.01, 0.27, 1.6]
    : [0.05, 0.75, 3.85];
  const rightColumnPosition = isSmallScreen
    ? [1, 0.2, 1.6]
    : [1.19, 0.75, 3.85];
  const topLeftRightBottomPositon = isSmallScreen
    ? [0.06, 0.17, 1.2]
    : [0.06, 0.8, 3.85];
  const topRightLeftBottomPositon = isSmallScreen
    ? [0.03, 0.19, 1.2]
    : [0, 0.8, 3.85];
  const lines = [
    {
      position: topRowPosition,
      rotation: [0, 0, 0],
      scale: [2.8, 0.05, 0.1],
    }, // Top row
    {
      position: middleRowPosition,
      rotation: [0, 0, 0],
      scale: [2.8, 0.05, 0.1],
    }, // Middle row
    {
      position: bottomRowPosition,
      rotation: [0, 0, 0],
      scale: [2.8, 0.05, 0.1],
    }, // Bottom row
    {
      position: leftColumnPosition,
      rotation: [0, 0, Math.PI / 2],
      scale: [2.8, 0.05, 0.1],
    }, // Left column
    {
      position: middleColumnPosition,
      rotation: [0, 0, Math.PI / 2],
      scale: [2.8, 0.05, 0.1],
    }, // Middle column
    {
      position: rightColumnPosition,
      rotation: [0, 0, Math.PI / 2],
      scale: [2.8, 0.05, 0.1],
    }, // Right column
    {
      position: topLeftRightBottomPositon,
      rotation: [0, 0, -Math.PI / 4],
      scale: [3.8, 0.05, 0.1],
    }, // Diagonal TL-BR
    {
      position: topRightLeftBottomPositon,
      rotation: [0, 0, Math.PI / 4],
      scale: [3.8, 0.05, 0.1],
    }, // Diagonal TR-BL
  ];

  const meshRef = useRef();

  useEffect(() => {
    if (highlightIndex !== null && !animated && meshRef.current) {
      // Trigger the animation only once

      const targetPosition = lines[highlightIndex].position;

      // Animate position from top to the final position
      let startPosition = [...targetPosition];

      // For vertical lines, animate position on the Y axis
      if (Math.abs(targetPosition[1]) > 0) {
        startPosition[1] = 1; // Start from the top
      } else {
        startPosition[1] = 0.2; // Adjust starting point for horizontal lines or diagonals
      }

      gsap.fromTo(
        meshRef.current.position,
        { y: 0.9, opacity: 0 }, // Start from top position
        {
          y: targetPosition[1], // Animate to the final position on Y axis
          duration: 2, // Duration of the position animation
          ease: "power2.out",
          opacity: 1,
        }
      );

      // Animate scale from 0 to final scale
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0, opacity: 0, scale: 0 }, // Start with scale 0
        {
          x: lines[highlightIndex].scale[0], // Animate to full scale on x-axis
          y: lines[highlightIndex].scale[1], // Animate to full scale on y-axis
          z: lines[highlightIndex].scale[2], // Animate to full scale on z-axis
          opacity: 1,
          scale: 1,
          duration: 1.5, // Duration of the scale animation
          ease: "power2.out",
          delay: 0.3, // Optional delay before animation starts
        }
      );

      setAnimated(true); // Set the state to prevent further animations
    }
  }, [highlightIndex, animated, lines]);

  return highlightIndex !== null ? (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.3, 0.3, 0.3]}
      position={[0, -2.45, 0.05]}
    >
      <mesh
        ref={meshRef}
        position={lines[highlightIndex].position}
        rotation={lines[highlightIndex].rotation}
        scale={lines[highlightIndex].scale}
      >
        {/* Using boxGeometry with the initial dimensions to ensure it's rendered */}
        <boxGeometry args={[1, 1, 1]} /> {/* Default size for box geometry */}
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  ) : null;
};

export default WinLine;
