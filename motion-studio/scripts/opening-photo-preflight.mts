import {existsSync, readdirSync, statSync} from 'node:fs';
import {dirname, extname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  openingV1Presentation,
  type OpeningMemoryLayout,
  type OpeningPhotoFocus,
  type OpeningPhotoMotion,
} from '../src/data/openingV1Presentation.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const openingDir = join(studioRoot, 'public/photos/opening');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const jsonMode = process.argv.includes('--json');

type SlotRow = {
  slot: string;
  file: string | null;
  status: 'ready' | 'missing';
  role: string;
  layout: OpeningMemoryLayout | 'hero';
  fit: 'cover' | 'contain';
  motion: OpeningPhotoMotion;
  focus: OpeningPhotoFocus;
  cropCheck: 'required' | 'native-frame';
};

const normalizeStem = (file: string): string => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

const files = existsSync(openingDir)
  ? readdirSync(openingDir)
      .filter((file) => !file.startsWith('.'))
      .filter((file) => statSync(join(openingDir, file)).isFile())
      .filter((file) => imageExts.has(extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, 'en'))
  : [];

const fileByStem = new Map(files.map((file) => [normalizeStem(file), file]));

const memoryRow = (
  place: 'okinawa' | 'seoul' | 'hawaii',
  index: 0 | 1 | 2,
): SlotRow => {
  const slot = `${place}-${String(index + 1).padStart(2, '0')}`;
  const plan = openingV1Presentation.memories[place][index];
  const fit = plan.layout === 'wide' ? 'contain' : 'cover';
  const file = fileByStem.get(slot) ?? null;

  return {
    slot,
    file,
    status: file ? 'ready' : 'missing',
    role: `${place.toUpperCase()} ${index + 1}`,
    layout: plan.layout,
    fit,
    motion: plan.motion,
    focus: plan.focus,
    cropCheck: fit === 'cover' ? 'required' : 'native-frame',
  };
};

const heroRow = (index: 0 | 1): SlotRow => {
  const slot = `hero-0${index + 1}`;
  const plan = index === 0 ? openingV1Presentation.heroes.a : openingV1Presentation.heroes.b;
  const file = fileByStem.get(slot) ?? null;

  return {
    slot,
    file,
    status: file ? 'ready' : 'missing',
    role: index === 0 ? 'HERO A + COLD OPEN' : 'HERO B',
    layout: 'hero',
    fit: plan.fit,
    motion: plan.motion,
    focus: plan.focus,
    cropCheck: plan.fit === 'cover' ? 'required' : 'native-frame',
  };
};

const rows: SlotRow[] = [
  memoryRow('okinawa', 0),
  memoryRow('okinawa', 1),
  memoryRow('okinawa', 2),
  memoryRow('seoul', 0),
  memoryRow('seoul', 1),
  memoryRow('seoul', 2),
  memoryRow('hawaii', 0),
  memoryRow('hawaii', 1),
  memoryRow('hawaii', 2),
  heroRow(0),
  heroRow(1),
];

const ready = rows.filter((row) => row.status === 'ready').length;
const coverReady = rows.filter((row) => row.status === 'ready' && row.fit === 'cover').length;

if (jsonMode) {
  console.log(
    JSON.stringify(
      {
        ready,
        total: rows.length,
        coverCropChecks: coverReady,
        directory: 'public/photos/opening',
        rows,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

console.log(`Opening V1 photo preflight: ${ready}/${rows.length}`);
console.log('');
console.log('status  slot          file                     role                  layout  fit      motion       focus    crop');
console.log('------  ------------  -----------------------  --------------------  ------  -------  -----------  -------  ------------');

for (const row of rows) {
  const status = row.status === 'ready' ? '✅' : '· ';
  const file = (row.file ?? '—').padEnd(23);
  const role = row.role.padEnd(20);
  const layout = row.layout.padEnd(6);
  const fit = row.fit.padEnd(7);
  const motion = row.motion.padEnd(11);
  const focus = `${row.focus.x}/${row.focus.y}`.padEnd(7);
  console.log(
    `${status.padEnd(6)}  ${row.slot.padEnd(12)}  ${file}  ${role}  ${layout}  ${fit}  ${motion}  ${focus}  ${row.cropCheck}`,
  );
}

console.log('');
if (ready < rows.length) {
  console.log(`次: missing ${rows.length - ready}枠をcanonical filenameで置く → pnpm render:opening-v1:preview`);
} else if (coverReady > 0) {
  console.log(`次: previewでcover ${coverReady}枠の顔/身体cropを確認 → 必要な枠だけopeningV1Presentation.tsのfocusを調整`);
} else {
  console.log('次: pnpm render:opening-v1:preview');
}
console.log('JSONが必要なら: pnpm opening:preflight -- --json');
