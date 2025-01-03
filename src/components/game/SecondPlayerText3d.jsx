import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function SecondText3d(props) {
  const { nodes, materials } = useGLTF("/text3d.glb");
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

  const scaleText = isSmallScreen ? 0.088 : 0.086;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Text001.geometry}
        // material={nodes.Text001.material}
        position={[0.296, -0.299, 0.379]}
        scale={scaleText}
      >
        <meshStandardMaterial color={"red"} roughness={0.2} metallness={0.9} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/text3d.glb");
