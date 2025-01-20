"use client";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Background = () => {
  const sphereRef = useRef();
  const texture = useTexture("/bg1.png");
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
      sphereRef.current.rotation.y += 0.0019;
    }
  });

  const sphereGeo = isSmallScreen ? [10, 34, 34] : [10, 64, 64];

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={sphereGeo} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={texture}
          transparent
        />
      </mesh>
    </>
  );
};

export default Background;
