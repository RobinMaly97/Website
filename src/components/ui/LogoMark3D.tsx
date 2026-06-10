import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * The live 3D logo mark — a small glowing violet→cyan orb (a mini sibling of the
 * hero centerpiece) that gently rotates and morphs. Renders in its own tiny
 * canvas. Pointer-events are disabled so clicks fall through to the wrapping
 * link. Freezes to a static frame under reduced-motion.
 */
function Blob({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += delta * 0.7;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 48, 48]} />
      <MeshDistortMaterial
        color="#9A8CFF"
        metalness={0.45}
        roughness={0.18}
        emissive="#3A2E9E"
        emissiveIntensity={0.4}
        distort={reduced ? 0.25 : 0.34}
        speed={reduced ? 0 : 2.2}
      />
    </mesh>
  );
}

export default function LogoMark3D() {
  const reduced = useReducedMotion();

  return (
    <span
      className="block h-9 w-9 shrink-0 [&_canvas]:!pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3.6], fov: 40 }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 4]} intensity={1.3} />
        <pointLight position={[3, 1, 2]} intensity={3} decay={0} color="#22D3EE" />
        <pointLight position={[-3, -1, 1.5]} intensity={2.6} decay={0} color="#7C6CFF" />
        <Blob reduced={reduced} />
      </Canvas>
    </span>
  );
}
