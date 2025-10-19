import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const MobileBall = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.5}>
        <icosahedronGeometry args={[1, 0]} /> {/* Reduzido de [1, 1] para [1, 0] */}
        <meshBasicMaterial // Mudado de meshStandardMaterial para meshBasicMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={0.8} // Reduzido de 1 para 0.8
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const MobileBallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand' // Mantém demand para economizar bateria
      dpr={[0.5, 1]} // Reduzido de [1, 2] para [0.5, 1]
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: false, // Desabilita antialias para economizar
        alpha: false, // Desabilita alpha para economizar
        powerPreference: "low-power" // Força GPU de baixo consumo
      }}
      performance={{ min: 0.2 }} // Adiciona fallback de performance
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <MobileBall imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default MobileBallCanvas;
