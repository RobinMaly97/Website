import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { projectAssets } from '../i18n/content';
import { SectionHeading } from './ui/SectionHeading';

function AppStoreBadge() {
  return (
    <svg
      className="h-11 w-auto"
      viewBox="0 0 160 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Download in the App Store"
    >
      <title>Download in the App Store</title>
      <rect width="160" height="48" rx="9" fill="#000" stroke="rgba(255,255,255,0.18)" />
      <path
        d="M22.5 16.2c1.8-2.2 1.5-4.6 1.5-4.6s-2.2.1-4 2.3c-1.6 2-1.5 4.3-1.5 4.3s2.3.1 4-2zm-1.3 2.7c-2.3 0-3.3 1.4-4.9 1.4-1.7 0-3.1-1.3-4.7-1.3-2.2 0-4.9 2-4.9 5.8 0 4.6 3.8 10 5.8 10 1.4 0 2.1-1.1 3.8-1.1s2.2 1.1 3.8 1.1c2.2 0 5.8-5.1 5.8-9.6 0-3.7-2.5-5.1-4.7-5.3z"
        fill="#fff"
      />
      <text x="34" y="23" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="9.5" fill="rgba(255,255,255,0.82)" letterSpacing="0.3">
        Download in the
      </text>
      <text x="33" y="38" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="18" fontWeight="600" fill="#fff" letterSpacing="-0.3">
        App Store
      </text>
    </svg>
  );
}

function Phone({ src, fallback, alt, scale = 1 }: { src: string; fallback: string; alt: string; scale?: number }) {
  return (
    <div className="relative mx-auto w-[212px] shrink-0">
      {/* iPhone 11 Pro Max — stainless steel frame */}
      <div
        className="relative aspect-[414/896] rounded-[2.2rem] p-[3px] shadow-[0_50px_80px_-34px_rgba(0,0,0,0.9),0_22px_44px_-26px_rgba(0,0,0,0.55)]"
        style={{
          backgroundImage:
            'linear-gradient(150deg, #6a6b75 0%, #2c2d36 22%, #17181f 50%, #2c2d36 78%, #61626c 100%)',
        }}
      >
        {/* Edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/[0.12]"
          aria-hidden="true"
        />
        {/* Black bezel — thin */}
        <div className="relative h-full w-full rounded-[1.95rem] bg-black p-[4px]">
          {/* Screen — screenshot fills it (matches the iPhone 11 Pro Max simulator export 1:1) */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-black">
            <picture>
              <source srcSet={src} type="image/webp" />
              <img
                src={fallback}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
                style={scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: 'top' } : undefined}
              />
            </picture>
            {/* Notch */}
            <div
              className="absolute left-1/2 top-0 z-10 h-[23px] w-[92px] -translate-x-1/2 rounded-b-[15px] bg-black"
              aria-hidden="true"
            />
            {/* Screen reflection */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.65rem]"
              style={{
                backgroundImage:
                  'linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {/* Ambient brand glow */}
      <div className="absolute inset-x-4 -bottom-6 top-12 -z-10 rounded-[3rem] bg-violet/20 blur-3xl" aria-hidden="true" />
    </div>
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

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {t.projects.items.map((project, i) => {
            const asset = projectAssets[i];
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass flex flex-col gap-6 rounded-3xl p-8"
              >
                <Phone
                  src={asset.screenshot}
                  fallback={asset.screenshotFallback}
                  alt={`${project.name} App Screenshot`}
                  scale={asset.screenScale}
                />

                <div className="flex-1">
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

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} im App Store herunterladen`}
                    className="mt-6 inline-flex rounded-[10px] transition-transform hover:scale-[1.03] focus-visible:outline-none"
                  >
                    <AppStoreBadge />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
