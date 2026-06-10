import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scroll } from '../three/scrollStore';

gsap.registerPlugin(ScrollTrigger);

// Module-scoped handle so any component (e.g. the nav) can request a smooth
// scroll-to without prop-drilling the Lenis instance.
let lenisRef: Lenis | null = null;

/** Smoothly scroll to a CSS selector or element, accounting for the fixed nav. */
export function scrollToTarget(target: string | HTMLElement, offset = -72) {
  if (lenisRef) {
    lenisRef.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const el =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Initialises Lenis smooth scrolling synced to GSAP's ticker and continuously
 * publishes scroll progress to the shared store for the 3D scene.
 *
 * When `enabled` is false (reduced motion / mobile preference) it skips Lenis
 * but still tracks native scroll progress so the WebGL scene stays in sync.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scroll.progress = max > 0 ? window.scrollY / max : 0;
        scroll.velocity = 0;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef = lenis;
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    lenis.on('scroll', (e: Lenis) => {
      scroll.progress = e.progress || 0;
      scroll.velocity = e.velocity || 0;
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, [enabled]);
}
