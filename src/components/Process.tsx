import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" aria-labelledby="process-heading" className="section">
      <div className="container-px">
        <SectionHeading
          id="process-heading"
          eyebrow={t.process.eyebrow}
          heading={t.process.heading}
          sub={t.process.sub}
        />

        <ol className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative flex flex-col rounded-3xl p-7"
            >
              <span
                className="font-display text-5xl font-bold leading-none text-gradient"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-fg">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
