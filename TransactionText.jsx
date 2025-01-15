import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/transactionText.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        position={[-6.145, 0.141, -0.008]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.887}
      />
    </group>
  );
}

useGLTF.preload("/transactionText.gltf");
