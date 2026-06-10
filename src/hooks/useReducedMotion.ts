import { useMediaQuery } from './useMediaQuery';

/**
 * Respects the OS-level "reduce motion" setting. When true the site disables
 * smooth scrolling, scroll-linked 3D animation and large entrance transitions.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
