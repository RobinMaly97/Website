import { useLanguage } from '../../i18n/LanguageContext';
import type { Lang } from '../../i18n/content';

/** DE | EN segmented toggle, wired to the language context. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  const option = (value: Lang, label: string) => {
    const active = lang === value;
    return (
      <button
        type="button"
        onClick={() => setLang(value)}
        aria-pressed={active}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
          active ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line/70 p-0.5 ${className ?? ''}`}
      role="group"
      aria-label="Sprache wechseln / Switch language"
    >
      {option('de', 'DE')}
      {option('en', 'EN')}
    </div>
  );
}
