import React, { useRef, useEffect, forwardRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";

const TictactoeText = forwardRef(({ animate, ...props }, ref) => {
  const groupRef = useRef();
  const { nodes } = useGLTF("/tictactoetext.glb");
  const texture = useTexture("/Image_3.png");
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
      // Rotation animation (applies to all instances)
      gsap.fromTo(
        groupRef.current.rotation,
        { y: -0.1 },
        {
          y: 0.1,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }
  }, []);

  const yAnimation = isSmallScreen ? 15.8 : 1.8;
  useEffect(() => {
    if (groupRef.current && animate) {
      // Y-position animation (only when `animate` is true)
      gsap.fromTo(
        groupRef.current.position,
        { y: groupRef.current.position.y }, // Starting position
        {
          y: groupRef.current.position.y + `${yAnimation}`, // Ending position
          duration: 4,
          delay: 0.1,

          ease: "power4.out",
        }
      );
    }
  }, [animate]);

  return (
    <group
      ref={(el) => {
        groupRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
      {...props}
      dispose={null}
    >
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
});

useGLTF.preload("/tictactoetext.glb");

export default TictactoeText;
