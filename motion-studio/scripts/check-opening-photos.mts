import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const openingDir = join(studioRoot, 'public/photos/opening');
const strict = process.argv.includes('--strict');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const expected = [
  'okinawa-01',
  'okinawa-02',
  'okinawa-03',
  'seoul-01',
  'seoul-02',
  'seoul-03',
  'hawaii-01',
  'hawaii-02',
  'hawaii-03',
  'hero-01',
  'hero-02',
] as const;

const normalizeStem = (file: string): string => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const files = existsSync(openingDir)
  ? readdirSync(openingDir)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(openingDir, file)).isFile())
      .filter((file) => imageExts.has(extname(file).toLowerCase()))
  : [];

const stems = new Set(files.map(normalizeStem));
const missing = expected.filter((slot) => !stems.has(slot));

console.log(`Opening V1 photos: ${expected.length - missing.length}/${expected.length} canonical slots`);
for (const slot of expected) {
  console.log(`${stems.has(slot) ? '✅' : '· '} ${slot}`);
}

if (files.length >= expected.length && missing.length > 0) {
  console.warn(
    `⚠️  opening/には${files.length}枚ありますがcanonical名が${missing.length}枠不足。` +
      '枚数や並び順では自動割当しません。取り違え防止のためcanonical名へリネームしてください。',
  );
}

if (missing.length > 0) {
  const message = `未投入: ${missing.join(', ')}`;
  if (strict) {
    console.error(`❌ Opening V1 final render不可 — ${message}`);
    process.exit(1);
  }
  console.log(`ℹ️  ${message} — previewはplaceholderで継続可能`);
}

if (missing.length === 0) {
  console.log('✅ Opening V1 real-photo gate: 11/11');
}
