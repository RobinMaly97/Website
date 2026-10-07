import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { projectAssets } from '../i18n/content';
import { SectionHeading } from './ui/SectionHeading';
import { MockupCarousel } from './ui/MockupCarousel';

/** Official store badges (Apple + Google artwork), localized. Rendered at 44px height. */
const badges = {
  apple: {
    de: { src: '/images/badges/app-store-de.svg', label: 'Laden im App Store', width: 132 },
    en: { src: '/images/badges/app-store-en.svg', label: 'Download on the App Store', width: 132 },
  },
  google: {
    de: { src: '/images/badges/google-play-de.png', label: 'Jetzt bei Google Play', width: 148 },
    en: { src: '/images/badges/google-play-en.svg', label: 'Get it on Google Play', width: 148 },
  },
} as const;

function StoreBadge({ store, href, name }: { store: keyof typeof badges; href: string; name: string }) {
  const { lang } = useLanguage();
  const badge = badges[store][lang];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-[10px] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
    >
      <img
        src={badge.src}
        alt={`${name}: ${badge.label}`}
        width={badge.width}
        height={44}
        loading="lazy"
        decoding="async"
        className="h-11 w-auto"
      />
    </a>
  );
}

export function Showcase() {
  const { t } = useLanguage();

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-px">
        <SectionHeading
          id="projects-heading"
          eyebrow={t.projects.eyebrow}
          heading={t.projects.heading}
          sub={t.projects.sub}
        />
      </div>

      {/* Wider than the page container so three 496px cards fit side by side on large screens */}
      <div className="mx-auto mt-16 flex max-w-[1680px] flex-wrap justify-center gap-10 px-6 md:px-8 lg:gap-12">
        {t.projects.items.map((project, i) => {
          const asset = projectAssets[i];
          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex w-full flex-col gap-6 rounded-3xl p-8 sm:w-[31rem]"
            >
              <MockupCarousel images={asset.mockups} name={project.name} />

              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <picture className="shrink-0">
                    <source srcSet={asset.icon} type="image/webp" />
                    <img
                      src={asset.iconFallback}
                      alt={`${project.name} App Icon`}
                      width={52}
                      height={52}
                      loading="lazy"
                      className="h-[52px] w-[52px] shrink-0 rounded-[14px] object-cover ring-1 ring-line/60"
                    />
                  </picture>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-fg">{project.name}</h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                        {t.projects.badge}
                      </span>
                    </div>
                    <span className="text-sm text-muted">{project.category}</span>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-muted">{project.body}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line/70 bg-fg/[0.03] px-3 py-1 text-xs text-fg/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pinned to the card bottom so badges line up across cards in a row */}
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {asset.appStore && <StoreBadge store="apple" href={asset.appStore} name={project.name} />}
                  {asset.playStore && <StoreBadge store="google" href={asset.playStore} name={project.name} />}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
