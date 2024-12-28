import React from "react";
import { useGLTF } from "@react-three/drei";

export default function FirstText3d(props) {
  const { nodes, materials } = useGLTF("/Secondtext3d.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Text.geometry}
        // material={nodes.Text.material}
        position={[-0.43, -0.29, 0.378]}
        scale={0.086}
      >
        <meshStandardMaterial color={"blue"} roughness={0.2} metallness={0.9} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Secondtext3d.glb");
