import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cross = ({ position, shouldAnimate }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (shouldAnimate) {
      gsap.fromTo(
        meshRef.current.position,
        { z: 10 },
        { z: position[2], duration: 1, ease: "bounce.out" }
      );
    }
  }, [shouldAnimate, position]);
  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={2.7}
      rotation={[0, 0, -Math.PI / 1.4]}
    >
      <boxGeometry args={[0.2, 0.05, 0.05]} />
      <meshStandardMaterial color="red" metalness={0.3} roughness={0.7} />
      <mesh rotation={[0, 0, Math.PI / 2.5]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color="red" metalness={0.3} roughness={0.7} />
      </mesh>
    </mesh>
  );
};

export default Cross;
