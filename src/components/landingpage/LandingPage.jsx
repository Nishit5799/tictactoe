// "use client";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import React, { useEffect, useRef, useState } from "react";
// import { TextureLoader } from "three";
// import { DoubleSide } from "three";
// import gsap from "gsap";

// import TictactoeText from "./TictactoeText";

// const RotatingSphere = () => {
//   const texture = useLoader(TextureLoader, "/bg8.jpg");
//   const sphereRef = useRef();
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 640);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const setArgs = isSmallScreen ? [300, 60, 400] : [800, 800, 800];

//   useFrame(() => {
//     if (sphereRef.current) {
//       sphereRef.current.rotation.y += 0.0009;
//     }
//   });

//   return (
//     <mesh ref={sphereRef}>
//       <sphereGeometry args={setArgs} />
//       <meshStandardMaterial map={texture} side={DoubleSide} />
//     </mesh>
//   );
// };

// const LandingPage = () => {
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 640);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const button = buttonRef.current;
//     if (button) {
//       button.addEventListener("mouseenter", () => {
//         gsap.to(button, { scale: 1.1, duration: 2, ease: "power4.out" });
//       });
//       button.addEventListener("mouseleave", () => {
//         gsap.to(button, { scale: 1, duration: 2, ease: "power4.out" });
//       });
//     }

//     return () => {
//       if (button) {
//         button.removeEventListener("mouseenter", () => {});
//         button.removeEventListener("mouseleave", () => {});
//       }
//     };
//   }, []);

//   const fov = isSmallScreen ? 132 : 100;

//   return (
//     <div className="w-full h-screen bg-black text-white relative">
//       <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
//         <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
//         <ambientLight intensity={0.5} />

//         <RotatingSphere />
//         <TictactoeText />
//       </Canvas>

//       <div className="absolute left-1/2 transform -translate-x-1/2 top-[60%] sm:w-fit w-fit  text-center h-[7vh] sm:h-[10vh] font-choco">
//         <button
//           ref={buttonRef}
//           className="bg-blue-600 text-white font-bold py-2 sm:text-3xl text-sm bg-green-500/40 px-4 rounded-full  h-full"
//         >
//           Connect to Wallet
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import { DoubleSide } from "three";
import gsap from "gsap";

import TictactoeText from "./TictactoeText";
import Link from "next/link";
import Connecttowallet from "./Connecttowallet";

const RotatingSphere = () => {
  const texture = useLoader(TextureLoader, "/bg8.jpg");
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

  const setArgs = isSmallScreen ? [300, 60, 400] : [800, 800, 800];

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

const LandingPage = () => {
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

  const fov = isSmallScreen ? 132 : 100;

  return (
    <div className="w-full h-screen bg-black text-white relative">
      <Canvas camera={{ position: [-0.3, 0.5, 5], fov: fov }}>
        <directionalLight position={[0, 5, 5]} intensity={4} color={"white"} />
        <ambientLight intensity={0.5} />

        <RotatingSphere />
        <TictactoeText animate={false} />
      </Canvas>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[60%] sm:w-[28%] rounded-full sm:h-[15%] w-[75%] h-[5%] bg-slate-900/50 hover:bg-slate-900/90  transition-all duration-300 hover:scale-105  ">
        <Link href="/enterwallet">
          <Canvas>
            <Connecttowallet />
          </Canvas>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
