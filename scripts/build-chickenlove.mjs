/**
 * Builds the web assets for the ChickenLove landing page (/chickenlove).
 * Sources: ../Mockups/ChickenLove (transparent iPhone mockups) and
 * ../ChickenLove_Post (reference slides — eggs + nest are cut out with a soft edge).
 *
 * Output: public/images/chickenlove/*.webp
 *
 * Run with: npm run build:chickenlove
 */
import sharp from 'sharp';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const MOCKUPS = '../Mockups/ChickenLove/Iphone_17_Pro_Mockups';
const SLIDES = '../ChickenLove_Post/ChickenLove_Referenzdesign_Alle_Slides';
const OUT = 'public/images/chickenlove';

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

/** [output name, source file, width] */
const phones = [
  ['screen-heute', 'Frontal/iPhone 17 Pro-8.png', 640],
  ['screen-huehner', 'Frontal/iPhone 17 Pro-9.png', 640],
  ['screen-gesundheit', 'Frontal/iPhone 17 Pro-10.png', 640],
  ['screen-wirtschaft', 'Frontal/iPhone 17 Pro-11.png', 640],
  ['screen-brut', 'Frontal/iPhone 17 Pro-12.png', 640],
  ['screen-schieren', 'Frontal/iPhone 17 Pro-13.png', 640],
  ['screen-mehr', 'Frontal/iPhone 17 Pro-14.png', 640],
  ['hero-heute', 'Links_Gekippt/iPhone 17 Pro-15.png', 760],
  ['hero-huehner', 'Links_Gekippt/iPhone 17 Pro-16.png', 760],
  ['tilt-brut', 'Rechts_Gekippt/iPhone 17 Pro-2.png', 640],
];

for (const [name, file, width] of phones) {
  await sharp(join(MOCKUPS, file)).resize({ width }).webp({ quality: 84 }).toFile(`${OUT}/${name}.webp`);
  console.log(`✓ ${name}`);
}

/** Cuts a region out of a slide and fades its edges with an elliptical alpha mask. */
async function cutout(name, slide, region, width) {
  const { left, top, w, h } = region;
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><defs><radialGradient id="g" cx="50%" cy="52%" r="50%">` +
      `<stop offset="70%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>` +
      `</radialGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  );
  await sharp(join(SLIDES, slide))
    .extract({ left, top, width: w, height: h })
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .resize({ width })
    .webp({ quality: 84 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(`✓ ${name}`);
}

await cutout('eggs', '02_Heute.png', { left: 0, top: 860, w: 500, h: 440 }, 500);
await cutout('nest', '06_Brut_und_Schlupf.png', { left: 0, top: 890, w: 520, h: 320 }, 520);

// App icon in a larger size than the portfolio card uses + favicons
const ICON = '../Daten iOS Apps/ChickenLove/App Icon/ChickenLove Logo.png';
await sharp(ICON).resize({ width: 256 }).webp({ quality: 88 }).toFile(`${OUT}/icon.webp`);
await sharp(ICON).resize({ width: 180 }).png().toFile(`${OUT}/icon-180.png`);
await sharp(ICON).resize({ width: 32 }).png().toFile(`${OUT}/icon-32.png`);
console.log('✓ icon');

// Social preview (Open Graph) from the Facebook cover
await sharp('../ChickenLove_Post/ChickenLove_Facebook_Titelbild_1640x856.png')
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .jpeg({ quality: 84 })
  .toFile(`${OUT}/og.jpg`);
console.log('✓ og');
