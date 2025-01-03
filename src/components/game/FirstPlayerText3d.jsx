import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function FirstText3d(props) {
  const { nodes, materials } = useGLTF("/Secondtext3d.glb");
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
        geometry={nodes.Text.geometry}
        // material={nodes.Text.material}
        position={[-0.43, -0.29, 0.378]}
        scale={scaleText}
      >
        <meshStandardMaterial color={"blue"} roughness={0.2} metallness={0.9} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Secondtext3d.glb");
