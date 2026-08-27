import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {aliases, orderedKeys} from '../src/data/openingV1Media.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const openingDir = join(studioRoot, 'public/photos/opening');
const strict = process.argv.includes('--strict');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

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

const matchesBySlot = new Map(
  orderedKeys.map((slot) => [
    slot,
    files.filter((file) => aliases[slot].includes(normalizeStem(file))),
  ]),
);
const missing = orderedKeys.filter((slot) => (matchesBySlot.get(slot)?.length ?? 0) === 0);
const ambiguous = orderedKeys.filter((slot) => (matchesBySlot.get(slot)?.length ?? 0) > 1);
const resolvedCount = orderedKeys.length - missing.length - ambiguous.length;

console.log(`Opening V1 photos: ${resolvedCount}/${orderedKeys.length} unambiguous semantic slots`);
for (const slot of orderedKeys) {
  const matches = matchesBySlot.get(slot) ?? [];
  const marker = matches.length === 1 ? '✅' : matches.length > 1 ? '⚠️' : '· ';
  console.log(`${marker} ${slot}${matches.length > 1 ? ` -> ${matches.join(', ')}` : ''}`);
}

if (files.length >= orderedKeys.length && missing.length > 0) {
  console.warn(
    `⚠️  opening/には${files.length}枚ありますがsemantic roleが${missing.length}枠不足。` +
      '枚数や並び順では自動割当しません。取り違え防止のためcanonical/alias名へリネームしてください。',
  );
}

if (ambiguous.length > 0) {
  console.error(`❌ Opening V1 photo role ambiguity — ${ambiguous.join(', ')}`);
  console.error('同じroleに一致する実写真は1ファイルだけにしてください。拡張子違いの重複も自動選択しません。');
  process.exit(1);
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
