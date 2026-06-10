/**
 * Brand logo — the 3D "MD" mark on a transparent background, so it sits cleanly
 * on both the dark and light themes. WebP with a PNG fallback. Size is
 * controlled via `className` (default 36×36).
 */
export function BrandLogo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span className={`block shrink-0 ${className}`} aria-hidden="true">
      <picture>
        <source srcSet="/images/brand-mark.webp" type="image/webp" />
        <img
          src="/images/brand-mark.png"
          alt=""
          width={320}
          height={320}
          className="h-full w-full object-contain"
        />
      </picture>
    </span>
  );
}
