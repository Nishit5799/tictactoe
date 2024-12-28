import React from "react";
import { useGLTF } from "@react-three/drei";

export default function SecondText3d(props) {
  const { nodes, materials } = useGLTF("/text3d.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Text001.geometry}
        // material={nodes.Text001.material}
        position={[0.296, -0.299, 0.379]}
        scale={0.086}
      >
        <meshStandardMaterial color={"red"} roughness={0.2} metallness={0.9} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/text3d.glb");
