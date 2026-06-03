/**
 * Convert all site images to WebP and resize logos to display-appropriate dimensions.
 * Run once: node scripts/optimize-images.mjs
 * Originals are deleted after successful conversion.
 */
import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const DIRS = [
  { dir: join(ROOT, 'public/assets/photos'), quality: 82 },
  { dir: join(ROOT, 'public/assets/events'), quality: 82 },
  { dir: join(ROOT, 'public/assets/food'),   quality: 82 },
  { dir: join(ROOT, 'public/assets/logos'),  quality: 90 },
];

// Max pixel dimensions per logo (width × height) — 2× display size for retina
const LOGO_RESIZE = {
  'logo-nav.png':     { width: 950,  height: 400  },
  'logo-hero.png':    { width: null, height: 1040 },
  'logo-footer.png':  { width: null, height: 300  },
};

// Never touch these
const SKIP = new Set(['logo-favicon.png']);

const EXTS = new Set(['.png', '.jpg', '.jpeg']);

let totalBefore = 0;
let totalAfter  = 0;

for (const { dir, quality } of DIRS) {
  let files;
  try { files = readdirSync(dir); } catch { continue; }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!EXTS.has(ext) || SKIP.has(file)) continue;

    const inPath  = join(dir, file);
    const outName = basename(file, ext) + '.webp';
    const outPath = join(dir, outName);

    const sizeBefore = statSync(inPath).size;
    totalBefore += sizeBefore;

    let pipeline = sharp(inPath);

    // Resize logos to sensible max dimensions
    const resize = LOGO_RESIZE[file];
    if (resize) {
      pipeline = pipeline.resize(resize.width, resize.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    await pipeline.webp({ quality }).toFile(outPath);

    const sizeAfter = statSync(outPath).size;
    totalAfter += sizeAfter;

    const saving = Math.round((1 - sizeAfter / sizeBefore) * 100);
    console.log(`  ${file} → ${outName}  (${kb(sizeBefore)} → ${kb(sizeAfter)}, -${saving}%)`);

    unlinkSync(inPath);
  }
}

console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);

function kb(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }
