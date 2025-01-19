import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const RotatingSphere = () => {
  const texture = useLoader(TextureLoader, "/mainbg.jpg");
  const sphereRef = useRef();
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

  const setArgs = isSmallScreen ? [700, 1000, 1000] : [950, 1500, 1500];

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.0009;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={setArgs} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

export default RotatingSphere;
