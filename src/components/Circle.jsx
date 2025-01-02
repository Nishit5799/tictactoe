import React, { useEffect, useRef } from "react";
import gsap from "gsap";
const Circle = ({ position, shouldAnimate }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (shouldAnimate) {
      gsap.fromTo(
        meshRef.current.position,
        { z: 3 },
        { z: position[2], duration: 0.5, ease: "bounce.out" }
      );
    }
  }, [shouldAnimate, position]);

  return (
    <mesh ref={meshRef} position={position} scale={2}>
      <torusGeometry args={[0.1, 0.03, 16, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Circle;
