import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

// Index-matched to content.services.items (App, Web, Full-Stack, Maintenance).
const icons: ReactNode[] = [
  // Rocket / App
  <svg key="0" {...iconProps}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
  // Browser window / Web
  <svg key="1" {...iconProps}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M2 9h20" />
    <path d="M6 6.5h.01" />
    <path d="M9 6.5h.01" />
  </svg>,
  // Layers / Full-Stack
  <svg key="2" {...iconProps}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>,
  // Shield-check / Maintenance
  <svg key="3" {...iconProps}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-cyan"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" aria-labelledby="services-heading" className="section">
      <div className="container-px">
        <SectionHeading
          id="services-heading"
          eyebrow={t.services.eyebrow}
          heading={t.services.heading}
          sub={t.services.sub}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass group flex flex-col rounded-3xl p-7 transition-shadow duration-300 hover:shadow-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fg/[0.04] text-violet ring-1 ring-line/60 transition-colors group-hover:text-cyan">
                <span className="h-6 w-6">{icons[i]}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-fg">{service.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{service.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line/60 pt-6">
                {service.list.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-fg/80">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
