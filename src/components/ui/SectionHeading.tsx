import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  sub?: string;
  align?: 'left' | 'center';
  id?: string;
}

/** Shared eyebrow + headline + subheading block with staggered reveals. */
export function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = 'center',
  id,
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent-gradient" aria-hidden="true" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-fg sm:text-5xl"
        >
          {heading}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
