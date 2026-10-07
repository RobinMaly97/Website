/**
 * Generates every logo asset from the master logo (transparent PNG):
 * - public/images/brand-logo.{webp,png}  wide mark for the website (nav, footer, legal pages)
 * - public/images/brand-mark.{webp,png}  same mark centred on a 320×320 square
 *   (used by the e-mails at a fixed 46×46 and by the business-card generator)
 * - public/favicon-{16,32,48,192}.png + public/favicon.ico (16/32/48), transparent
 * - public/apple-touch-icon.png (180×180 on the dark brand background, iOS needs an opaque icon)
 *
 * Run with: npm run build:logo
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = '../Logo/Logo_MD.png';
const DARK_BG = '#0A0B12';
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Master: the logo pixels come in at alpha 253 → make them fully opaque, then cut away the empty canvas.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 3; i < data.length; i += 4) if (data[i] >= 250) data[i] = 255;
const master = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();

/** Logo fitted into a square of `size` px with `pad` (fraction) margin, on `bg` (transparent by default). */
async function onSquare(size, { pad = 0, bg } = {}) {
  const inner = Math.round(size * (1 - 2 * pad));
  const logo = await sharp(master).resize({ width: inner, height: inner, fit: 'contain', background: CLEAR }).png().toBuffer();
  let img = sharp({ create: { width: size, height: size, channels: 4, background: bg ?? CLEAR } }).composite([
    { input: logo, gravity: 'center' },
  ]);
  if (bg) img = sharp(await img.png().toBuffer()).removeAlpha();
  return img.png({ compressionLevel: 9 }).toBuffer();
}

/** Packs PNG images into one .ico file (PNG-compressed entries, supported by all current browsers). */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = header.length + dir.length;
  entries.forEach(([size, png], i) => {
    const o = i * 16;
    dir.writeUInt8(size, o); // width
    dir.writeUInt8(size, o + 1); // height
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...entries.map(([, png]) => png)]);
}

// Website logo (wide)
const wide = sharp(master).resize({ height: 200 });
await wide.clone().webp({ quality: 90, alphaQuality: 100 }).toFile('public/images/brand-logo.webp');
const wideInfo = await wide.clone().png({ compressionLevel: 9 }).toFile('public/images/brand-logo.png');
console.log(`✓ brand-logo  ${wideInfo.width}×${wideInfo.height}`);

// Square mark (e-mails, business card)
const mark = await onSquare(320, { pad: 0.04 });
writeFileSync('public/images/brand-mark.png', mark);
await sharp(mark).webp({ quality: 90, alphaQuality: 100 }).toFile('public/images/brand-mark.webp');
console.log('✓ brand-mark  320×320');

// Favicons
const fav = {};
for (const size of [16, 32, 48, 192]) {
  fav[size] = await onSquare(size, { pad: 0.03 });
  writeFileSync(`public/favicon-${size}.png`, fav[size]);
}
writeFileSync('public/favicon.ico', ico([16, 32, 48].map((s) => [s, fav[s]])));
writeFileSync('public/apple-touch-icon.png', await onSquare(180, { pad: 0.14, bg: DARK_BG }));
console.log('✓ favicon-16/32/48/192.png, favicon.ico, apple-touch-icon.png');
