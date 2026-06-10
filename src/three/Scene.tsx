import { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { Lighting } from './Lighting';
import { Centerpiece } from './Centerpiece';
import { Particles } from './Particles';
import { Effects } from './Effects';
import { scroll, damp } from './scrollStore';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Dollies + rolls the camera through the scene with subtle pointer parallax. */
function CameraRig({ reduced }: { reduced: boolean }) {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const p = scroll.progress;
    const cam = state.camera;
    cam.position.z = damp(cam.position.z, 5 + p * 1.1, 3, dt);
    if (!reduced) {
      cam.position.x = damp(cam.position.x, scroll.pointerX * 0.6, 2.5, dt);
      cam.position.y = damp(cam.position.y, scroll.pointerY * 0.4 + p * 0.3, 2.5, dt);
    }
    cam.lookAt(0, 0, 0);
    // Subtle cinematic roll that peaks mid-page.
    if (!reduced) cam.rotateZ(Math.sin(p * Math.PI) * 0.05);
  });
  return null;
}

/**
 * The full WebGL background scene. Loaded lazily by <App> and wrapped in a
 * <Suspense> boundary. Renders a lighter configuration on mobile and a static
 * (demand-rendered) frame when the user prefers reduced motion.
 */
export default function Scene({ light = false }: { light?: boolean }) {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  // Window-level pointer tracking (the canvas is pointer-events:none).
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      scroll.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scroll.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  return (
    <Canvas
      className="!pointer-events-none"
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <Lighting light={light} />
        <Centerpiece mobile={mobile} reduced={reduced} light={light} />
        {!reduced && <Particles mobile={mobile} light={light} />}
        {!reduced && !light && (
          <Sparkles
            count={mobile ? 24 : 70}
            scale={[14, 14, 14]}
            size={mobile ? 2 : 3.5}
            speed={0.25}
            opacity={0.6}
            color="#9FE9FF"
          />
        )}
        <CameraRig reduced={reduced} />
        {!mobile && !reduced && !light && <Effects mobile={mobile} />}
      </Suspense>
    </Canvas>
  );
}
