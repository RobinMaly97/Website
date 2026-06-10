import { useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Cinematic post-processing stack — the single biggest "premium" upgrade.
 * Bloom makes the emissive core, orbiting shards and particle nebula glow;
 * a touch of chromatic aberration + vignette adds the award-site sheen.
 * Only mounted on desktop without reduced-motion (it is GPU-heavy).
 */
export function Effects({ mobile = false }: { mobile?: boolean }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), []);

  return (
    <EffectComposer multisampling={mobile ? 0 : 4} disableNormalPass>
      <Bloom
        mipmapBlur
        intensity={0.9}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.35}
        radius={0.75}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={caOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette offset={0.22} darkness={0.62} eskil={false} />
    </EffectComposer>
  );
}
