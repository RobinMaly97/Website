import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Scene from './three/Scene';
import { scroll } from './three/scrollStore';

/**
 * Mounts the same 3D background (Scene: sphere, particles, shards, glow) used on
 * the main site behind the static legal pages, so the whole site looks uniform.
 * The centerpiece is kept in its receded "content-section" state (small, drifted
 * up-right) and a scrim keeps the long legal text readable. Theme follows the
 * <html class="light"> that the legal pages' inline scripts toggle.
 */
function LegalBackground() {
  const [light, setLight] = useState(
    () => document.documentElement.classList.contains('light'),
  );

  useEffect(() => {
    // Keep the orb receded + react gently to page scroll.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const r = max > 0 ? window.scrollY / max : 0;
      scroll.progress = 0.45 + r * 0.25;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Follow the dark/light toggle.
    const obs = new MutationObserver(() =>
      setLight(document.documentElement.classList.contains('light')),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  return <Scene light={light} />;
}

const mount = document.getElementById('legal-bg');
if (mount) createRoot(mount).render(<LegalBackground />);
