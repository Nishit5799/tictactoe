import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap/all";

export default function Connecttowallet(props) {
  const { nodes, materials } = useGLTF("/connecttowallet.gltf");
  const texture = useTexture("/blue.jpg");
  const groupRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    if (groupRef.current) {
      // Rotation animation (applies to all instances)
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.015 },
        {
          y: 0.015,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }
  }, []);
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

  const xPosition = isSmallScreen ? [-4.5, 2.5, -1.5] : [-15.214, -0.3, -0.038];

  const scaleWallet = isSmallScreen ? 0.65 : 2;
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, 5]} intensity={2} color={"white"} />
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.Text.geometry}
          position={xPosition}
          rotation={[1.536, 0, 0]}
          scale={scaleWallet}
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

useGLTF.preload("/connecttowallet.gltf");
