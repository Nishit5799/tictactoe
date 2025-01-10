import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Coin(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/coin.glb");
  const { actions, names } = useAnimations(animations, group);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useFrame(() => {
    // Slow down the spinning of the coin
    if (group.current) {
      group.current.rotation.y += 0.01; // Adjust this value to control the spinning speed
    }
  });
  const coinScale = isSmallScreen ? 0.06 : 0.041;
  return (
    <>
      <ambientLight intensity={0.1} color="black" />

      <group
        ref={group}
        {...props}
        dispose={null}
        scale={coinScale}
        position={[-1.5, 0, 0]}
      >
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group
              name="dac838890acf4045a602c11254a10146fbx"
              rotation={[Math.PI / 2, 0, 0]}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group name="Coin">
                    <group name="CoinObj" rotation={[0, -1.257, 0]}>
                      <mesh
                        name="CoinObj_Coin_0"
                        geometry={nodes.CoinObj_Coin_0.geometry}
                        material={materials.Coin}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/coin.glb");
