import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";

export default function TictactoeText(props) {
  const groupRef = useRef();
  const { nodes } = useGLTF("/tictactoetext.glb");
  const texture = useTexture("/Image_3.png");

  useEffect(() => {
    if (groupRef.current) {
      // Animate position (left-right movement) with gsap.fromTo
      // gsap.fromTo(
      //   groupRef.current.position,
      //   { x: -0.1 }, // Starting position
      //   {
      //     x: 0.5, // Ending position
      //     duration: 3,
      //     repeat: -1, // Repeat indefinitely
      //     yoyo: true, // Move back to starting position
      //     ease: "power2.inOut", // Smooth acceleration and deceleration
      //   }
      // );

      // Animate rotation (Y-axis rotation) with gsap.fromTo
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.1 }, // Starting rotation
        {
          y: 0.1, // Ending rotation
          duration: 3.5,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Rotate back to starting value
          ease: "sine.inOut", // Smooth ease-in and ease-out
        }
      );
    }
  }, []);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        position={[-3.907, 1, -0.369]}
        rotation={[1.606, 0, 0]}
      >
        <meshStandardMaterial map={texture} metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/tictactoetext.glb");
