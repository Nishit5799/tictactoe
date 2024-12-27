import React from "react";
import { RandomizedLight, useGLTF } from "@react-three/drei";

export default function Tictactoeboard(props) {
  const { nodes, materials } = useGLTF("/tictactoeboard1.gltf");
  return (
    // <group {...props} dispose={null} scale={3} position={[-0.2, 0, -2.1]}> //large screen
    <group {...props} dispose={null} scale={3} position={[-0.2, -1.7, -1.8]}>
      <RandomizedLight
        castShadow
        amount={8}
        frames={100}
        position={[-5, 5, -10]}
      />

      <group
        position={[-0.199, -0.283, 0.491]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.4}
      >
        <mesh position={[0, 0.001, 0]}>
          <torusGeometry args={[0.1, 0.03, 16, 32]} />
          <meshStandardMaterial color="blue" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group
        position={[0.073, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_85.geometry}
          material={materials.material_23}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.072, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_82.geometry}
          material={materials.material_24}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.073, -0.278, 0.573]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_79.geometry}
          material={materials.material_24}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[0.074, -0.278, 0.691]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          geometry={nodes.Object_76.geometry}
          material={materials.material_23}
          rotation={[0, 0, -Math.PI / 2]}
        />
      </group>
      <group
        position={[-0.202, -0.314, 0.352]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0]}
      >
        <mesh
          geometry={nodes.Object_96.geometry}
          position={[-28.834, -19.514, 7.5]}
        >
          <meshStandardMaterial color="blue" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group
        position={[0.337, -0.315, 0.352]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0]}
      >
        <mesh
          geometry={nodes.Object_99.geometry}
          material={materials.material_27}
          position={[-31.297, -19.607, 7.5]}
        />
      </group>
      <mesh
        geometry={nodes.Object_5.geometry}
        material={materials.material}
        position={[0.072, -0.285, 0.627]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.441, 0.348, 0.001]}
      />

      <mesh
        geometry={nodes.Object_25.geometry}
        material={materials.material_9}
        position={[0.419, -0.318, 0.63]}
        rotation={[-Math.PI / 2, 0, -3.138]}
        scale={[0.35, 0.435, 0.001]}
      />
      <mesh
        geometry={nodes.Object_27.geometry}
        material={materials.material_10}
        position={[0.419, -0.318, 1.067]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_29.geometry}
        material={materials.material_11}
        position={[-0.63, -0.318, 0.192]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_31.geometry}
        material={materials.material_12}
        position={[-0.629, -0.318, 0.63]}
        rotation={[-Math.PI / 2, 0, -3.138]}
        scale={[0.35, 0.436, 0.001]}
      />
      <mesh
        geometry={nodes.Object_33.geometry}
        material={materials.material_13}
        position={[-0.629, -0.318, 1.067]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_35.geometry}
        material={materials.material_14}
        position={[0.767, -0.318, 0.192]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_37.geometry}
        material={materials.material_15}
        position={[0.768, -0.318, 0.629]}
        rotation={[-Math.PI / 2, 0, -3.138]}
        scale={[0.35, 0.436, 0.001]}
      />
      <mesh
        geometry={nodes.Object_39.geometry}
        material={materials.material_16}
        position={[0.769, -0.318, 1.067]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />

      <mesh
        geometry={nodes.Object_11.geometry}
        material={materials.material_2}
        position={[0.069, -0.318, 0.628]}
        rotation={[-Math.PI / 2, 0, -3.138]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_65.geometry}
        material={materials.material_21}
        position={[0.006, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_67.geometry}
        material={materials.material_21}
        position={[0.005, -0.278, 0.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_71.geometry}
        material={materials.material_22}
        position={[0.144, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_73.geometry}
        material={materials.material_22}
        position={[0.143, -0.278, 0.629]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.Object_13.geometry}
        material={materials.material_3}
        position={[-0.28, -0.318, 0.629]}
        rotation={[-Math.PI / 2, 0, -3.138]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_15.geometry}
        material={materials.material_4}
        position={[-0.279, -0.318, 1.067]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_17.geometry}
        material={materials.material_5}
        position={[0.07, -0.318, 1.067]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_19.geometry}
        material={materials.material_6}
        position={[-0.281, -0.318, 0.192]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_21.geometry}
        material={materials.material_7}
        position={[0.068, -0.318, 0.192]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <mesh
        geometry={nodes.Object_23.geometry}
        material={materials.material_8}
        position={[0.418, -0.318, 0.192]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={[0.35, 0.441, 0.001]}
      />
      <group
        position={[0.334, -0.282, 0.521]}
        rotation={[-Math.PI / 2, 0, 0.9]} // Apply rotation to the entire group
        scale={0.5}
      >
        <mesh>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshStandardMaterial color="red" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2.5]}>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshStandardMaterial color="red" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/tictactoeboard1.gltf");
