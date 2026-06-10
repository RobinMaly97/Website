/**
 * Generates web-optimized images (WebP + raster fallback) into public/images
 * from the original full-resolution sources in legacy-site/.
 *
 * Run with: npm run optimize:images
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'legacy-site';
const OUT = 'public/images';
mkdirSync(OUT, { recursive: true });

/** [source, output basename, target width, fallback format] */
const jobs = [
  ['screenshot-timetrackerprof.png', 'timetrackerprof-screen', 540, 'png'],
  ['screenshot-finkenkrug.png', 'finkenkrug-screen', 540, 'png'],
  ['icon-timetrackerprof.png', 'timetrackerprof-icon', 180, 'png'],
  ['icon-finkenkrug.png', 'finkenkrug-icon', 180, 'png'],
  ['profile.jpg', 'profile', 880, 'jpg'],
];

for (const [src, base, width, fmt] of jobs) {
  const input = `${SRC}/${src}`;
  // WebP (primary)
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${base}.webp`);
  // Raster fallback
  if (fmt === 'jpg') {
    await sharp(input).resize({ width, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/${base}.jpg`);
  } else {
    await sharp(input).resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9, quality: 82 }).toFile(`${OUT}/${base}.png`);
  }
  console.log(`✓ ${base}  (${width}px)`);
}

// Open Graph image (1200×630, cover-cropped from the profile photo)
await sharp(`${SRC}/profile.jpg`)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(`${OUT}/og-image.jpg`);
console.log('✓ og-image  (1200×630)');

console.log('\nDone — optimized images written to public/images/');
