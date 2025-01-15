import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function DepositText(props) {
  const texture = useTexture("/yellow.avif");
  const { nodes, materials } = useGLTF("/depositText.gltf");
  const groupRef = useRef();
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
  useEffect(() => {
    if (groupRef.current) {
      // Animate rotation (Y-axis rotation) with gsap.fromTo
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.029 }, // Starting rotation
        {
          y: 0.029, // Ending rotation
          duration: 4,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Rotate back to starting value
          ease: "cos.inOut", // Smooth ease-in and ease-out
        }
      );
    }
  }, []);
  const scale = isSmallScreen ? [2.9, 2.5, 2.9] : 4.5;
  const xPosition = isSmallScreen
    ? [-13.305, -1.083, 0.7]
    : [-12.305, -1.083, 0.7];
  return (
    <>
      <ambientLight intensity={2} color={"white"} />
      <directionalLight
        position={[1, 7, 5]} // Positioned in front of the text
        intensity={7} // Brightness of the light
        color="white" // Light color
      />
      <group ref={groupRef} {...props} dispose={null}>
        <mesh
          geometry={nodes.Text.geometry}
          position={xPosition}
          rotation={[1.553, 0, 0]}
          scale={scale}
        >
          <meshStandardMaterial map={texture} metalness={0.7} roughness={0.5} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/depositText.gltf");
