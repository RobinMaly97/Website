import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { scrollToTarget } from '../hooks/useSmoothScroll';
import { ButtonLink, ArrowIcon } from './ui/Button';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Legibility veil over the 3D centerpiece */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-44"
        style={{ background: 'linear-gradient(to bottom, transparent, rgb(var(--bg)/0.55))' }}
        aria-hidden="true"
      />

      <div className="container-px w-full pt-28 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="eyebrow glass inline-flex rounded-full px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-cyan" aria-hidden="true" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="mt-6 font-display font-bold tracking-tightest text-fg"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)', lineHeight: 0.95 }}
          >
            {/* Solid white line gets a reliable text-shadow; the gradient line
                gets NO shadow (text-shadow/drop-shadow both render gradient-
                clipped text dark) and stays bright on its own. */}
            <span className="block text-shadow-strong">{t.hero.headline[0]}</span>
            <span className="block text-gradient-bright">{t.hero.headline[1]}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg sm:text-xl text-shadow-strong"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="#contact"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#contact');
              }}
            >
              {t.hero.ctaPrimary}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href="#projects"
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#projects');
              }}
            >
              {t.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
            aria-label="Vertrauensindikatoren"
          >
            {t.hero.trust.map((tr, i) => (
              <div key={tr.label} className="flex items-center gap-6">
                {i > 0 && <span className="h-8 w-px bg-line" aria-hidden="true" />}
                <div className="text-shadow-soft">
                  <div className="font-display text-2xl font-bold text-fg">{tr.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted">{tr.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line/80 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-fg/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
