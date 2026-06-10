import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

interface ButtonElProps extends BaseProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-8 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-gradient text-bg font-semibold shadow-glow hover:shadow-[0_0_70px_-10px_rgb(var(--violet)/0.7)]',
  ghost:
    'border border-line/80 bg-fg/[0.02] text-fg hover:border-violet/60 hover:bg-fg/[0.05]',
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(' ');
}

const hover = { scale: 1.03 };
const tap = { scale: 0.97 };

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  target,
  rel,
}: LinkProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      whileHover={hover}
      whileTap={tap}
      className={classes(variant, size, className)}
    >
      {children}
    </motion.a>
  );
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled,
}: ButtonElProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : hover}
      whileTap={disabled ? undefined : tap}
      className={classes(variant, size, className)}
    >
      {children}
    </motion.button>
  );
}

/** Small inline arrow for CTAs. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
