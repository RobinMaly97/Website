import { useLanguage } from '../i18n/LanguageContext';
import { scrollToTarget } from '../hooks/useSmoothScroll';
import { BrandLogo } from './ui/BrandLogo';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const pageLinks = [
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'process', label: t.nav.process },
    { id: 'contact', label: t.nav.contact },
  ];

  const legalLinks = [
    { href: '/impressum.html', label: t.footer.impressum },
    { href: '/datenschutz.html', label: t.footer.datenschutz },
    { href: '/agb.html', label: t.footer.agb },
  ];

  return (
    <footer role="contentinfo" className="relative border-t border-line/60 pt-16 pb-10">
      <div className="container-px">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex items-center gap-3">
              <BrandLogo className="h-14 w-14" />
              <span className="font-display text-base font-semibold text-fg">Maly Development</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          </div>

          {/* Pages */}
          <nav aria-label="Footer-Navigation">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg/70">
              {t.footer.pagesHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {pageLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(`#${l.id}`);
                    }}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Rechtliches">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg/70">
              {t.footer.legalHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted">© {year} Maly Development — Robin Maly</p>
          <button
            type="button"
            onClick={() => scrollToTarget('#hero', 0)}
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            ↑ {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
