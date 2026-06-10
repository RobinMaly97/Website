import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { scroll, damp } from './scrollStore';

const VIOLET = new THREE.Color('#7C6CFF');
const CYAN = new THREE.Color('#22D3EE');
// Pale variants for light mode so dark hero text stays readable over the orb.
const VIOLET_LIGHT = new THREE.Color('#CFC9FF');
const CYAN_LIGHT = new THREE.Color('#BEEEF8');

interface CenterpieceProps {
  mobile?: boolean;
  reduced?: boolean;
  light?: boolean;
}

/**
 * The hero centerpiece: a liquid-metal core with a strong emissive glow (for
 * bloom), a counter-rotating wireframe shell, and a ring of orbiting emissive
 * shards. Rotation, distortion, color and scale are all scroll-driven; after
 * the hero the whole cluster recedes and drifts up-right so it never washes out
 * the section content.
 */
export function Centerpiece({ mobile = false, reduced = false, light = false }: CenterpieceProps) {
  const root = useRef<THREE.Group>(null); // recede + drift
  const core = useRef<THREE.Group>(null); // spin
  const shell = useRef<THREE.Mesh>(null); // counter-spin
  const shardGroup = useRef<THREE.Group>(null); // orbit
  const mat = useRef<THREE.MeshPhysicalMaterial & { distort: number }>(null);
  const tmpColor = useRef(new THREE.Color('#7C6CFF')).current;

  const segments = mobile ? 64 : 128;

  // Orbiting shards — small emissive octahedra that bloom into glowing lights.
  const shards = useMemo(() => {
    const n = mobile ? 7 : 13;
    return Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 2.3 + Math.random() * 1.2;
      const y = (Math.random() - 0.5) * 2.4;
      const size = 0.05 + Math.random() * 0.1;
      const color =
        Math.random() > 0.5 ? (light ? '#6354EB' : '#9A8CFF') : (light ? '#0E97B8' : '#5BE9FF');
      const rot: [number, number, number] = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0,
      ];
      return { angle, radius, y, size, color, rot };
    });
  }, [mobile, light]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const p = scroll.progress;
    const recede = Math.min(p / 0.15, 1);
    const t = state.clock.elapsedTime;

    if (root.current) {
      const targetScale = (1 - recede * 0.5) * (1 + Math.sin(p * Math.PI) * 0.05);
      root.current.scale.setScalar(damp(root.current.scale.x, targetScale, 4, dt));
      root.current.position.x = damp(root.current.position.x, recede * 1.7, 3, dt);
      root.current.position.y = damp(root.current.position.y, recede * 0.9, 3, dt);
    }
    if (core.current) {
      core.current.rotation.y = t * 0.1 + p * Math.PI * 2.5;
      core.current.rotation.x = damp(core.current.rotation.x, p * 0.9, 4, dt);
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.08 - p * Math.PI;
      shell.current.rotation.z = p * 0.6;
    }
    if (shardGroup.current) {
      shardGroup.current.rotation.y = t * 0.2 + p * Math.PI * 3;
      shardGroup.current.rotation.x = Math.sin(t * 0.15) * 0.25;
    }
    if (mat.current) {
      tmpColor
        .copy(light ? VIOLET_LIGHT : VIOLET)
        .lerp(light ? CYAN_LIGHT : CYAN, Math.sin(p * Math.PI));
      mat.current.color.copy(tmpColor);
      // Glowing in dark mode; near-flat and pale in light mode so it doesn't
      // darken the headline / subtext sitting in front of it.
      mat.current.emissive
        .copy(tmpColor)
        .multiplyScalar(light ? 0.04 : 0.4 + Math.min(Math.abs(scroll.velocity) * 0.03, 0.5));
      const targetDistort = reduced
        ? 0.25
        : 0.3 + Math.min(Math.abs(scroll.velocity) * 0.018, 0.28);
      mat.current.distort = damp(mat.current.distort, targetDistort, 5, dt);
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.3}
      floatIntensity={reduced ? 0 : 0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={root}>
        {/* Wireframe depth shell */}
        <mesh ref={shell} scale={1.9}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#7C6CFF" wireframe transparent opacity={0.12} toneMapped={false} />
        </mesh>

        {/* Liquid-metal core */}
        <group ref={core}>
          <mesh>
            <sphereGeometry args={[1.25, segments, segments]} />
            <MeshDistortMaterial
              ref={mat as never}
              color="#7C6CFF"
              metalness={light ? 0.2 : 0.9}
              roughness={light ? 0.42 : 0.14}
              distort={0.3}
              speed={reduced ? 0 : 1.8}
              emissiveIntensity={1}
              envMapIntensity={light ? 0.7 : 1.3}
            />
          </mesh>
        </group>

        {/* Orbiting emissive shards */}
        <group ref={shardGroup}>
          {shards.map((s, i) => (
            <mesh
              key={i}
              position={[Math.cos(s.angle) * s.radius, s.y, Math.sin(s.angle) * s.radius]}
              rotation={s.rot}
            >
              <octahedronGeometry args={[s.size, 0]} />
              <meshBasicMaterial color={s.color} toneMapped={false} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}
