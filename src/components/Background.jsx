"use client";
import { useTexture, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Background = () => {
  const sphereRef = useRef();
  // const texture = useTexture("/star1.jpg");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  useFrame(() => {
    if (sphereRef.current) {
      // Rotate the sphere
      sphereRef.current.rotation.y += 0.0009; // Adjust speed of rotation
      sphereRef.current.rotation.x += 0.0002; // Add slight tilt for dynamic effect
    }
  });

  const sphereGeo = isSmallScreen ? [10, 34, 34] : [10, 64, 64];

  return (
    <>
      {/* Add the rotating background sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={sphereGeo} />
        <meshStandardMaterial
          // side={THREE.DoubleSide} // Enable rendering both sides
          // map={texture} // Add star texture
          transparent
        />
      </mesh>

      {/* HDRI Environment */}
      <Environment
        files="/bg8.hdr" // Replace with the path to your HDRI file
        background // Use HDRI as background
        blur={0} // Set blur if desired
      />
    </>
  );
};

export default Background;
