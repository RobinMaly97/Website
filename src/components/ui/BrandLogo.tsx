/**
 * Brand logo — the "MD" mark on a transparent background, so it sits cleanly
 * on both the dark and light themes. WebP with a PNG fallback. Set the height
 * via `className` (default 32px); the width follows the logo's aspect ratio.
 * Assets are generated from the master logo with `npm run build:logo`.
 */
export function BrandLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <span className="block shrink-0" aria-hidden="true">
      <picture>
        <source srcSet="/images/brand-logo.webp" type="image/webp" />
        <img
          src="/images/brand-logo.png"
          alt=""
          width={324}
          height={200}
          className={`block w-auto ${className}`}
        />
      </picture>
    </span>
  );
}
