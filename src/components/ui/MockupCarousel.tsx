import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Look of a slide by its circular distance to the active one:
 * front phone faces the viewer, previous/next only peek out behind it, the rest is hidden.
 */
const ring = [
  { x: 0, z: 0, rot: 0, opacity: 1 },
  { x: 36, z: -130, rot: 30, opacity: 0.6 },
  { x: 44, z: -240, rot: 42, opacity: 0 },
];

/**
 * Circular 3D mockup carousel (endless: after the last slide comes the first).
 * - Touch / mouse: swipe or drag, tap a side phone to bring it to the front
 * - Trackpad: horizontal two-finger swipe
 * - Buttons, dots and ← / → keys while focused
 */
export function MockupCarousel({ images, name }: { images: string[]; name: string }) {
  const { lang } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragX = useRef<number | null>(null);
  const dragged = useRef(false);
  const [index, setIndex] = useState(0);
  const n = images.length;

  const goTo = (i: number) => setIndex(((i % n) + n) % n);
  const step = (dir: number) => setIndex((cur) => (((cur + dir) % n) + n) % n);

  // Horizontal trackpad swipe → one step per gesture (ignores inertia tail)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let acc = 0;
    let last = 0;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // no browser back-swipe
      e.stopPropagation(); // keep Lenis out of it
      const now = performance.now();
      if (locked && now - last < 180) {
        last = now;
        return;
      }
      locked = false;
      last = now;
      acc += e.deltaX;
      if (Math.abs(acc) > 40) {
        step(acc > 0 ? 1 : -1);
        acc = 0;
        locked = true;
      }
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [n]);

  const t =
    lang === 'de'
      ? { prev: 'Vorheriger Screen', next: 'Nächster Screen', slide: 'Screen', of: 'von' }
      : { prev: 'Previous screen', next: 'Next screen', slide: 'Screen', of: 'of' };

  const arrow =
    'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/70 bg-fg/[0.04] text-fg/80 transition hover:bg-fg/[0.09] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet';

  return (
    <div className="relative -mx-8" role="region" aria-roledescription="carousel" aria-label={`${name} Screenshots`}>
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            step(e.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onPointerDown={(e) => {
          dragX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          dragged.current = Math.abs(dx) > 35;
          if (dragged.current) step(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          dragX.current = null;
        }}
        className="relative mx-auto h-[456px] cursor-grab touch-pan-y select-none [overflow-x:clip] [perspective:1100px] sm:h-[498px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet active:cursor-grabbing"
      >
        {/* Ambient brand glow */}
        <div className="absolute inset-x-16 bottom-4 top-16 rounded-[3rem] bg-violet/20 blur-3xl" aria-hidden="true" />

        {images.map((src, i) => {
          let d = (((i - index) % n) + n) % n;
          if (d > n / 2) d -= n;
          const abs = Math.min(Math.abs(d), ring.length - 1);
          const sign = Math.sign(d);
          const look = ring[abs];
          return (
            <div
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${t.slide} ${i + 1} ${t.of} ${n}`}
              aria-hidden={d !== 0}
              onClick={() => !dragged.current && Math.abs(d) === 1 && goTo(i)}
              className="absolute left-1/2 top-0 w-[220px] transition-[transform,opacity] sm:w-[240px] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                transform: `translateX(-50%) translateX(${sign * look.x}%) translateZ(${look.z}px) rotateY(${sign * look.rot}deg)`,
                opacity: look.opacity,
                zIndex: 10 - abs,
                pointerEvents: look.opacity === 0 ? 'none' : undefined,
              }}
            >
              <img
                src={src}
                alt={`${name} App, ${t.slide} ${i + 1}`}
                width={1034}
                height={2129}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
              />
            </div>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${t.slide} ${index + 1} ${t.of} ${n}`}
      </p>

      <div className="mx-auto mt-2 flex max-w-[260px] items-center justify-between gap-3">
        <button type="button" className={arrow} onClick={() => step(-1)} aria-label={t.prev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex flex-wrap justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.slide} ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-violet' : 'w-1.5 bg-fg/25 hover:bg-fg/45'}`}
            />
          ))}
        </div>

        <button type="button" className={arrow} onClick={() => step(1)} aria-label={t.next}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
