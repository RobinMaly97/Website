/**
 * A tiny module-level store that bridges the DOM scroll world (Lenis + GSAP,
 * which run on the main thread) and the WebGL world (R3F's `useFrame`, which
 * runs inside the render loop). Writing to a plain mutable object avoids React
 * re-renders entirely — the 3D scene simply reads the latest value every frame.
 */
export const scroll = {
  /** Normalised progress through the whole page, 0 → 1. */
  progress: 0,
  /** Instantaneous scroll velocity (signed), used for subtle motion accents. */
  velocity: 0,
  /** Normalised pointer position, -1 → 1, for camera parallax. */
  pointerX: 0,
  pointerY: 0,
};

/** Smoothly interpolate `current` toward `target` (frame-rate independent-ish). */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
