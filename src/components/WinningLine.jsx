import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Winningline = ({ highlightIndex }) => {
  const [animated, setAnimated] = useState(false); // Track if animation has already run
  const lines = [
    { position: [0, 1, 0.05], rotation: [0, 0, 0], scale: [3, 0.05, 0.1] }, // Top row
    { position: [0, -0.1, 0.05], rotation: [0, 0, 0], scale: [3, 0.05, 0.1] }, // Middle row
    { position: [0, -1.28, 0.05], rotation: [0, 0, 0], scale: [3, 0.05, 0.1] }, // Bottom row
    {
      position: [-1.11, -0.2, 0.05],
      rotation: [0, 0, Math.PI / 2],
      scale: [3, 0.05, 0.1],
    }, // Left column
    {
      position: [0.05, -0.15, 0.05],
      rotation: [0, 0, Math.PI / 2],
      scale: [3, 0.05, 0.1],
    }, // Middle column
    {
      position: [1.19, -0.15, 0.05],
      rotation: [0, 0, Math.PI / 2],
      scale: [3, 0.05, 0.1],
    }, // Right column
    {
      position: [0, -0.1, 0.05],
      rotation: [0, 0, -Math.PI / 4],
      scale: [4.2, 0.05, 0.1],
    }, // Diagonal TL-BR
    {
      position: [0, -0.2, 0.05],
      rotation: [0, 0, Math.PI / 4],
      scale: [4.2, 0.05, 0.1],
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
        { y: 0 }, // Start from top position
        {
          y: targetPosition[1], // Animate to the final position on Y axis
          duration: 2, // Duration of the position animation
          ease: "power2.out",
        }
      );

      // Animate scale from 0 to final scale
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0 }, // Start with scale 0
        {
          x: lines[highlightIndex].scale[0], // Animate to full scale on x-axis
          y: lines[highlightIndex].scale[1], // Animate to full scale on y-axis
          z: lines[highlightIndex].scale[2], // Animate to full scale on z-axis
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

export default Winningline;
