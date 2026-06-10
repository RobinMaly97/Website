import { lazy, Suspense } from 'react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Showcase } from './components/Showcase';
import { About } from './components/About';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CanvasLoader } from './components/ui/CanvasLoader';

// The WebGL scene is the heaviest dependency — load it as its own chunk so the
// content shell paints immediately while three.js downloads.
const Scene = lazy(() => import('./three/Scene'));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent-gradient"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

function Site() {
  const reduced = useReducedMotion();
  useSmoothScroll(!reduced);
  const { theme } = useTheme();
  const light = theme === 'light';

  // Darken the 3D background once the user scrolls past the hero so section
  // content stays legible while the centerpiece still glows through subtly.
  const { scrollYProgress } = useScroll();
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 0.55]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
      >
        Zum Inhalt springen
      </a>

      {/* Fixed 3D background + ambient gradient backdrop */}
      <div className="fixed inset-0 -z-10 bg-bg">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: light
              ? 'radial-gradient(40% 35% at 18% 12%, rgb(var(--violet)/0.07), transparent 70%), radial-gradient(45% 40% at 85% 82%, rgb(var(--cyan)/0.06), transparent 70%)'
              : 'radial-gradient(40% 35% at 20% 15%, rgb(var(--violet)/0.16), transparent 70%), radial-gradient(45% 40% at 85% 80%, rgb(var(--cyan)/0.12), transparent 70%)',
          }}
        />
        <Suspense fallback={<CanvasLoader />}>
          <Scene light={light} />
        </Suspense>
      </div>

      {/* Scroll-driven legibility scrim (above canvas, below content) */}
      <motion.div
        className="pointer-events-none fixed inset-0 bg-bg"
        style={{ opacity: scrimOpacity, zIndex: -5 }}
        aria-hidden="true"
      />

      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <Services />
        <Showcase />
        <About />
        <Process />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* reducedMotion="user" makes every Framer animation respect the OS setting */}
        <MotionConfig reducedMotion="user">
          <Site />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}
