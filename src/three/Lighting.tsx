import { Environment, Lightformer } from '@react-three/drei';

/**
 * Neon lighting rig. A self-contained Environment (built from Lightformers, no
 * external HDR fetch) gives the metallic centerpiece its violet/cyan reflections,
 * while two colored point lights add directional accent glow.
 */
export function Lighting({ light = false }: { light?: boolean }) {
  return (
    <>
      <ambientLight intensity={light ? 1.15 : 0.35} />
      <pointLight position={[-6, 3, -2]} intensity={light ? 0.55 : 1.6} decay={0} color="#7C6CFF" />
      <pointLight position={[6, -3, 3]} intensity={light ? 0.45 : 1.3} decay={0} color="#22D3EE" />

      <Environment resolution={256} frames={1}>
        <Lightformer
          form="circle"
          intensity={3}
          color="#7C6CFF"
          position={[-4, 2, -4]}
          scale={7}
        />
        <Lightformer
          form="circle"
          intensity={2.6}
          color="#22D3EE"
          position={[4, -1, -3]}
          scale={7}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#ffffff"
          position={[0, 5, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 4, 1]}
        />
      </Environment>
    </>
  );
}
