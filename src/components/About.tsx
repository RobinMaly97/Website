import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from './ui/Reveal';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-px grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        {/* Visual */}
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="relative rounded-[2rem] bg-accent-gradient p-[1.5px] shadow-glow">
            <div className="overflow-hidden rounded-[2rem] bg-surface p-1.5">
              <picture>
                <source srcSet="/images/profile.webp" type="image/webp" />
                <img
                  src="/images/profile.jpg"
                  alt="Robin Maly — Freelance App-Entwickler aus Deutschland"
                  width={420}
                  height={500}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-[1.4rem] object-cover object-[50%_18%]"
                />
              </picture>
            </div>
          </div>
          <div className="glass absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-fg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
            {t.about.available}
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-accent-gradient" aria-hidden="true" />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="about-heading"
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-fg sm:text-5xl"
            >
              {t.about.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t.about.body}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl px-4 py-5 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <div className="font-display text-3xl font-bold text-gradient">{stat.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-muted">{stat.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
