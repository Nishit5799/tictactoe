import React, { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import { RandomizedLight, useGLTF } from "@react-three/drei";

import FirstText3d from "./FirstPlayerText3d";
import SecondText3d from "./SecondPlayerText3d";
import BoardDepth from "./BoardDepth";

export default function Tictactoeboard(props) {
  const { nodes, materials } = useGLTF("/tictactoeboard1.gltf");
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track if screen is small
  const group1Ref = useRef();
  const group2Ref = useRef();
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

  useEffect(() => {
    // Apply GSAP animation to the group
    gsap.to(group1Ref.current.rotation, {
      x: -Math.PI / 2 + 0.05, // Slightly wiggle rotation
      y: 0.1,
      z: 1.0,
      duration: 2,
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse the animation
      ease: "power1.inOut", // Smooth easing
    });

    gsap.to(group1Ref.current.position, {
      z: 0.65, // Slightly move forward/backward for depth
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(group2Ref.current.position, {
      z: 0.512, // Slightly move forward/backward for depth
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const groupPosition = isSmallScreen ? [-0.2, -1.5, -1.9] : [-0.2, -0.5, -2.1];
  const lightPosition = isSmallScreen ? [0, -1, 2] : [0, 5, 10];
  return (
    <group {...props} dispose={null} scale={3} position={groupPosition}>
      <RandomizedLight
        castShadow
        amount={8}
        frames={100}
        position={lightPosition}
      />

      <group
        position={[-0.199, -0.283, 0.491]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.4}
        ref={group2Ref}
      >
        <mesh position={[0, -0.35, 0]}>
          <torusGeometry args={[0.1, 0.03, 16, 32]} />
          <meshStandardMaterial color="blue" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group
        position={[0.073, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_85.geometry}
          material={materials.material_23}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.072, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_82.geometry}
          material={materials.material_24}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.073, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_79.geometry}
          material={materials.material_24}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.074, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_76.geometry}
          material={materials.material_23}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>

      <BoardDepth />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.material_1}
        position={[0.072, -0.301, 0.627]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.001, 0, 0.002]}
      />

      <mesh
        geometry={nodes.Object_65.geometry}
        material={materials.material_21}
        position={[0.006, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_67.geometry}
        material={materials.material_21}
        position={[0.005, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_71.geometry}
        material={materials.material_22}
        position={[0.144, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_73.geometry}
        material={materials.material_22}
        position={[0.143, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />

      <group
        position={[0.334, -0.282, 0.63]}
        rotation={[-Math.PI / 2, 0, 0.9]} // Apply rotation to the entire group
        scale={0.5}
        ref={group1Ref}
      >
        <mesh>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshStandardMaterial color="red" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2.5]}>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshStandardMaterial color="red" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <FirstText3d />
      <SecondText3d />
    </group>
  );
}

useGLTF.preload("/tictactoeboard1.gltf");
