"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

type P = { frame?: string; material?: string; scale?: number };

function Keepsake({ frame = "#17120D", material = "#EDE4D3", scale = 1 }: P) {
  const g = useRef<Group>(null);

  useFrame((s) => {
    if (g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.45;
  });

  return (
    <Float speed={1.4} floatIntensity={0.6}>
      <group ref={g} scale={scale}>
        <RoundedBox args={[2.4, 3, 0.35]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={frame} roughness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0, 0.19]}>
          <planeGeometry args={[2, 2.6]} />
          <meshStandardMaterial color="#0E0C0A" />
        </mesh>

        <group position={[0, -0.1, 0.3]}>
          <mesh>
            <sphereGeometry args={[0.5, 48, 48]} />
            <meshStandardMaterial color={material} metalness={0.05} roughness={0.75} />
          </mesh>
          {[-0.42, -0.2, 0.02, 0.24, 0.45].map((x, i) => (
            <mesh
              key={i}
              position={[x, 0.55 + (i === 2 ? 0.1 : i % 4 === 0 ? -0.15 : 0), 0]}
              rotation={[0, 0, -x * 0.5]}
            >
              <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
              <meshStandardMaterial color={material} metalness={0.05} roughness={0.75} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function KeepsakeScene(p: P) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      dpr={[1, 2]}
      aria-label="Interactive 3D keepsake preview"
      role="img"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, 2, 3]} color="#E7CF8E" intensity={30} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <Keepsake {...p} />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.35} blur={2.6} scale={8} />
    </Canvas>
  );
}
