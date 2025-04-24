import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const ThreeJsCanvas = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#ff0055"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
    </Canvas>
  );
};

export default ThreeJsCanvas;
