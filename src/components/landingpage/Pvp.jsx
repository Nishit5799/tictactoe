import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function Pvp(props) {
  const texture = useTexture("/yellow.avif");
  const { nodes, materials } = useGLTF("/pvp.gltf");
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
  const setScale = isSmallScreen ? 3.5 : 3.8;
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
      <ambientLight intensity={3} color={"white"} />

      {/* Directional light coming from the front */}
      <directionalLight
        position={[1, 7, 5]} // Positioned in front of the text
        intensity={7} // Brightness of the light
        color="white" // Light color
      />
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.Text.geometry}
          // position={[-1.561, 0.125, -0.38]}
          position={[-4.561, -3.125, -0.5]}
          rotation={[1.5, 0, 0]}
          scale={setScale}
        >
          <meshStandardMaterial map={texture} metalness={0.7} roughness={0.5} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/pvp.gltf");
