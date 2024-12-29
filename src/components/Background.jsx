import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Background = () => {
  const sphereRef = useRef();
  const texture = useTexture("/star1.jpg");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useFrame((state) => {
    if (sphereRef.current) {
      // Rotate the sphere
      sphereRef.current.rotation.y += 0.0009; // Adjust speed of rotation
      sphereRef.current.rotation.x += 0.0002; // Add slight tilt for dynamic effect
    }
  });
  const sphereGeo = isSmallScreen ? [10, 34, 34] : [10, 64, 64];
  return (
    <mesh ref={sphereRef}>
      {/* Sphere to wrap around the scene */}
      <sphereGeometry args={sphereGeo} />
      <meshStandardMaterial
        side={THREE.DoubleSide} // Enable rendering both sides
        map={texture} // Add star texture
        transparent
      />
    </mesh>
  );
};

export default Background;
