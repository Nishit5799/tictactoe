import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function TransactionText(props) {
  const texture = useTexture("/yellow.avif");
  const { nodes, materials } = useGLTF("/transactionText.gltf");
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
        { y: -0.013 }, // Starting rotation
        {
          y: 0.013, // Ending rotation
          duration: 4,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Rotate back to starting value
          ease: "cos.inOut", // Smooth ease-in and ease-out
        }
      );
    }
  }, []);
  const scale = isSmallScreen ? [2.6, 3, 3.6] : [4.7, 2.9, 5.7];
  const xPosition = isSmallScreen
    ? [-17.5, -1.141, -0.008]
    : [-31.145, -1.141, -0.008];
  return (
    <>
      <ambientLight intensity={1} color={"white"} />
      <directionalLight
        position={[1, 7, 5]} // Positioned in front of the text
        intensity={4} // Brightness of the light
        color="white" // Light color
      />
      <group ref={groupRef} {...props} dispose={null}>
        <mesh
          geometry={nodes.Text.geometry}
          position={xPosition}
          rotation={[Math.PI / 2, 0, 0]}
          scale={scale}
        >
          <meshStandardMaterial
            map={texture}
            metallness={0.7}
            roughness={0.5}
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/transactionText.gltf");
