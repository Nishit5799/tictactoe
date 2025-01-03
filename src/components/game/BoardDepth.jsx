import React from "react";
import { useGLTF } from "@react-three/drei";

export default function BoardDepth(props) {
  const { nodes, materials } = useGLTF("/boarddepth.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.073, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_85.geometry}
          material={materials["material_23.001"]}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.072, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_82.geometry}
          material={materials["material_24.001"]}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.073, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_79.geometry}
          material={materials["material_24.001"]}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.074, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_76.geometry}
          material={materials["material_23.001"]}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[-0.202, -0.314, 0.352]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0]}
      />
      <group
        position={[0.337, -0.315, 0.352]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials["material.001"]}
        position={[0.072, -0.285, 0.627]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.441, 0.348, 0.001]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_65.geometry}
        material={materials["material_21.001"]}
        position={[0.006, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_67.geometry}
        material={materials["material_21.001"]}
        position={[0.005, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_71.geometry}
        material={materials["material_22.001"]}
        position={[0.144, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_73.geometry}
        material={materials["material_22.001"]}
        position={[0.143, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
    </group>
  );
}

useGLTF.preload("/boarddepth.glb");
