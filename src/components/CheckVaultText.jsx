import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function CheckVaultText(props) {
  const groupRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { nodes, materials } = useGLTF("/CheckVaultText.gltf");
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

  useEffect(() => {
    if (groupRef.current) {
      // Animate rotation (Y-axis rotation) with gsap.fromTo
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.009 }, // Starting rotation
        {
          y: 0.009, // Ending rotation
          duration: 3,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Rotate back to starting value
          ease: "cos.inOut", // Smooth ease-in and ease-out
        }
      );
    }
  }, []);

  const scaleController = isSmallScreen ? 2.5 : 4.2;
  const xPosition = isSmallScreen
    ? [-15, -1.256, -3.181]
    : [-24, -1.256, -3.181];
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={3} color={"white"} />

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

useGLTF.preload("/CheckVaultText.gltf");
