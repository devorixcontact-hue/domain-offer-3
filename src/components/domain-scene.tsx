import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function DomainObject() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.42) * 0.12;
  });

  return (
    <group ref={group} rotation={[0.15, -0.35, 0]}>
      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1.45, 0.42, 180, 24, 2, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={5}
            thickness={0.8}
            chromaticAberration={0.1}
            anisotropy={0.35}
            distortion={0.2}
            distortionScale={0.25}
            temporalDistortion={0.08}
            roughness={0.08}
            color="#d9ff43"
          />
        </mesh>
      </Float>
      <mesh scale={2.65} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.012, 12, 160]} />
        <meshBasicMaterial color="#d9ff43" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export default function DomainScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.65} />
      <pointLight position={[4, 3, 4]} intensity={35} color="#d9ff43" />
      <pointLight position={[-4, -2, 2]} intensity={22} color="#5cd6ff" />
      <DomainObject />
      <Sparkles count={65} scale={8} size={1.4} speed={0.25} color="#d9ff43" opacity={0.45} />
    </Canvas>
  );
}