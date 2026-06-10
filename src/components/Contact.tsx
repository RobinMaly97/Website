import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  gdpr: boolean;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  gdpr: false,
};

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = f.errorRequired;
    if (!values.email.trim()) next.email = f.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = f.errorEmail;
    if (!values.message.trim()) next.message = f.errorRequired;
    if (!values.gdpr) next.gdpr = f.errorGdpr;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': '',
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          gdpr: values.gdpr ? 'yes' : 'no',
        }),
      });
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  const update =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === 'gdpr' ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const fieldClass = (field: keyof FormValues) =>
    `w-full rounded-xl border bg-fg/[0.03] px-4 py-3 text-fg placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan/60 ${
      errors[field] ? 'border-red-400/70' : 'border-line/70 focus:border-cyan/50'
    }`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-px grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Info */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-accent-gradient" aria-hidden="true" />
              {t.contact.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="contact-heading"
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-fg sm:text-5xl"
            >
              {t.contact.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t.contact.body}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href={`mailto:${t.contact.email}`}
              className="glass mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-4 text-fg transition-colors hover:text-cyan"
            >
              <span className="text-violet">
                <MailIcon />
              </span>
              <span className="font-medium">{t.contact.email}</span>
            </a>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            name="contact"
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-3xl p-6 sm:p-8"
          >
            {/* Honeypot */}
            <p className="hidden">
              <label>
                Bot-Feld: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-fg/90">
                  {f.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  placeholder={f.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass('name')}
                />
                {errors.name && (
                  <span id="name-error" role="alert" className="mt-1.5 block text-sm text-red-400">
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg/90">
                  {f.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  placeholder={f.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass('email')}
                />
                {errors.email && (
                  <span id="email-error" role="alert" className="mt-1.5 block text-sm text-red-400">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-fg/90">
                  {f.subject}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={update('subject')}
                  placeholder={f.subjectPlaceholder}
                  className={fieldClass('subject')}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg/90">
                  {f.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update('message')}
                  placeholder={f.messagePlaceholder}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${fieldClass('message')} resize-y`}
                />
                {errors.message && (
                  <span id="message-error" role="alert" className="mt-1.5 block text-sm text-red-400">
                    {errors.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="gdpr" className="flex items-start gap-3 text-sm text-muted">
                  <input
                    id="gdpr"
                    name="gdpr"
                    type="checkbox"
                    checked={values.gdpr}
                    onChange={update('gdpr')}
                    aria-invalid={!!errors.gdpr}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-line bg-transparent accent-violet"
                  />
                  <span>
                    {f.gdprBefore}
                    <a href="/datenschutz.html" className="text-cyan underline underline-offset-2">
                      {f.gdprLink}
                    </a>
                    {f.gdprAfter}
                  </span>
                </label>
                {errors.gdpr && (
                  <span role="alert" className="mt-1.5 block text-sm text-red-400">
                    {errors.gdpr}
                  </span>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                {status === 'sending' ? f.sending : f.submit}
              </Button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className="rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 text-center text-sm text-cyan"
                  >
                    {f.success}
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-center text-sm text-red-300"
                  >
                    {f.errorSubmit}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
