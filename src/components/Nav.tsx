import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { scrollToTarget } from '../hooks/useSmoothScroll';
import { LanguageToggle } from './ui/LanguageToggle';
import { ThemeToggle } from './ui/ThemeToggle';
import { ButtonLink } from './ui/Button';
import { BrandLogo } from './ui/BrandLogo';

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandLogo className="h-9 w-9" />
      <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
        Maly Development
      </span>
    </span>
  );
}

export function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'process', label: t.nav.process },
    { id: 'contact', label: t.nav.contact },
  ];

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line/60 bg-bg/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between" aria-label="Hauptnavigation">
        <a href="#hero" onClick={(e) => go(e, 'hero')} aria-label="Maly Development — Startseite">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageToggle className="hidden sm:inline-flex" />
          <ButtonLink
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            size="md"
            className="hidden sm:inline-flex"
          >
            {t.nav.contact}
          </ButtonLink>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-fg transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-fg transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-fg transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-2.5'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/60 bg-bg/90 backdrop-blur-xl md:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    className="block rounded-xl px-3 py-3 text-base text-fg/90 hover:bg-fg/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                <ButtonLink href="#contact" onClick={(e) => go(e, 'contact')}>
                  {t.nav.contact}
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
