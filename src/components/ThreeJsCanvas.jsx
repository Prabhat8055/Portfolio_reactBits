// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// const ThreeJsCanvas = () => {
//   return (
//     <Canvas style={{ touchAction: "pan-y" }}>
//       <OrbitControls enableZoom={false} />
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[2, 2, 2]} />
//       <Sphere args={[1, 100, 200]} scale={2.5}>
//         <MeshDistortMaterial
//           color="#ff0055"
//           attach="material"
//           distort={0.5}
//           speed={2}
//         />
//       </Sphere>
//     </Canvas>
//   );
// };

// export default ThreeJsCanvas;

/////////////////////////////////

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const ThreeJsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Canvas
      style={{ touchAction: "pan-y" }}
      OrbitControls={false} // ✅ allows vertical scrolling on touch
    >
      {!isMobile && <OrbitControls enableZoom={false} />}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial color="#ff0055" distort={0.5} speed={2} />
      </Sphere>
    </Canvas>
  );
};

export default ThreeJsCanvas;
