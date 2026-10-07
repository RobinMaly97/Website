/**
 * Converts the numbered iPhone mockups into web-optimized WebPs for the
 * project carousels. Order = ascending number in the filename
 * (lowest number = first slide, highest = last slide).
 *
 * Output: public/images/mockups/<app>-<index>.webp + manifest printed to console.
 *
 * Run with: npm run build:mockups
 */
import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '../Mockups';
const OUT = 'public/images/mockups';
const WIDTH = 560;

/** [app slug, source folder] */
const apps = [
  ['timetrackerprof', 'TimeTrackerProf/iPhone_17_pro'],
  ['finkenkrug', 'Finkenkrug/iPhone_17_pro'],
  ['chickenlove', 'ChickenLove/Iphone_17_Pro_Mockups/Frontal'],
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const num = (f) => Number(f.match(/-(\d+)\.png$/)?.[1] ?? NaN);

for (const [slug, dir] of apps) {
  const files = readdirSync(join(SRC, dir))
    .filter((f) => f.endsWith('.png') && !Number.isNaN(num(f)))
    .sort((a, b) => num(a) - num(b));

  for (const [i, file] of files.entries()) {
    await sharp(join(SRC, dir, file))
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`${OUT}/${slug}-${i + 1}.webp`);
  }
  console.log(`✓ ${slug}: ${files.length} Mockups (${files.join(', ')})`);
}

// ChickenLove app icon
await sharp('../Daten iOS Apps/ChickenLove/App Icon/ChickenLove Logo.png')
  .resize({ width: 180 })
  .webp({ quality: 85 })
  .toFile('public/images/chickenlove-icon.webp');
await sharp('../Daten iOS Apps/ChickenLove/App Icon/ChickenLove Logo.png')
  .resize({ width: 180 })
  .png({ compressionLevel: 9 })
  .toFile('public/images/chickenlove-icon.png');
console.log('✓ chickenlove-icon');
