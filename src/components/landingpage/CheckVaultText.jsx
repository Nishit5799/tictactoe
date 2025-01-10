import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function CheckVaultText(props) {
  const groupRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { nodes, materials } = useGLTF("/vault.gltf");
  const texture = useTexture("/blue.jpg");
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

  const scaleController = isSmallScreen ? 5.5 : 5.2;
  const xPosition = isSmallScreen
    ? [-11, -1.256, -3.181]
    : [-11, -1.256, -3.181];
  useEffect(() => {
    if (groupRef.current) {
      // Animate rotation (Y-axis rotation) with gsap.fromTo
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.09 }, // Starting rotation
        {
          y: 0.09, // Ending rotation
          duration: 4,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Rotate back to starting value
          ease: "cos.inOut", // Smooth ease-in and ease-out
        }
      );
    }
  }, []);

  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.5} />

      {/* Directional light coming from the front */}
      <directionalLight
        position={[1, 5, 5]} // Positioned in front of the text
        intensity={7} // Brightness of the light
        color="white" // Light color
      />

      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.Text.geometry}
          // position={[-4.134, 0.256, -0.181]}
          position={xPosition}
          rotation={[1.55, 0, 0]}
          scale={scaleController}
        >
          <meshStandardMaterial map={texture} metalness={0.7} roughness={0.5} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/vault.gltf");
