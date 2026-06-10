import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scroll } from './scrollStore';

/**
 * A glowing particle nebula (additive, unlit so it blooms). In the hero it
 * forms a dense shell around the centerpiece; as the user scrolls it expands
 * outward, spins up and fades — a subtle "dispersal" that keeps lower sections
 * clean. Count scales down on mobile.
 */
export function Particles({ mobile = false, light = false }: { mobile?: boolean; light?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions, colors, count } = useMemo(() => {
    const count = mobile ? 700 : 3200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const violet = new THREE.Color(light ? '#6354EB' : '#7C6CFF');
    const cyan = new THREE.Color(light ? '#0E97B8' : '#22D3EE');
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Mostly clustered near a shell, with a sparse outer halo.
      const r = 2.0 + Math.pow(Math.random(), 2) * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      tmp.copy(violet).lerp(cyan, Math.random());
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors, count };
  }, [mobile, light]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = scroll.progress;
    ref.current.rotation.y = t * 0.03 + p * 1.3;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    // Disperse outward on scroll.
    ref.current.scale.setScalar(1 + p * 1.7);
    if (matRef.current) {
      // Fade as it disperses so content sections stay clean.
      matRef.current.opacity = light ? Math.max(0, 0.5 - p * 0.4) : Math.max(0, 0.9 - p * 0.7);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={mobile ? 0.05 : 0.038}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
