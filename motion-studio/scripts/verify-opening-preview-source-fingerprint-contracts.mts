import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const pkg = JSON.parse(read('package.json')) as {scripts?: Record<string, string>};
const init = read('scripts/init-opening-v1-preview-review.mts');
const fingerprint = read('scripts/opening-v1-preview-source-fingerprint.mts');
const errors: string[] = [];
const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) errors.push(message);
};

const strict = pkg.scripts?.['opening:preview-review:strict'] ?? '';
const fingerprintStrict = 'scripts/opening-v1-preview-source-fingerprint.mts --strict';
const reviewStrict = 'scripts/opening-v1-preview-review.mts --strict';
if (!strict.includes(fingerprintStrict) || !strict.includes(reviewStrict)) {
  errors.push('opening:preview-review:strict must verify source fingerprint and Human preview review');
}
if (strict.indexOf(fingerprintStrict) >= strict.indexOf(reviewStrict)) {
  errors.push('opening:preview-review:strict must verify source fingerprint before Human preview review');
}

for (const token of [
  "['render:opening-v1:preview']",
  "'scripts/opening-v1-preview-source-fingerprint.mts', '--write'",
  "'scripts/opening-v1-preview-review.mts', '--init'",
]) requireText(init, token, `Opening review init missing ordered step: ${token}`);
const renderAt = init.indexOf('render:opening-v1:preview');
const fingerprintAt = init.indexOf('opening-v1-preview-source-fingerprint.mts');
const reviewAt = init.indexOf('opening-v1-preview-review.mts');
if (!(renderAt >= 0 && renderAt < fingerprintAt && fingerprintAt < reviewAt)) {
  errors.push('Opening review init ordering must be fresh render -> source fingerprint -> Human evidence init');
}

for (const path of [
  'src/index-opening-v1.ts',
  'src/OpeningV1Root.tsx',
  'src/compositions/opening/OpeningV1.tsx',
  'src/compositions/opening/OpeningV1PhotoScenes.tsx',
  'src/compositions/opening/OpeningV1UtilityScenes.tsx',
  'src/compositions/opening/OpeningV1AudioLayer.tsx',
  'src/data/openingV1.ts',
  'src/data/openingV1Media.ts',
  'src/data/openingV1Presentation.ts',
  'src/data/openingV1Sound.ts',
  'src/data/theme.ts',
]) requireText(fingerprint, `'${path}'`, `render source fingerprint missing ${path}`);

for (const token of [
  "schemaVersion: 'opening-v1-preview-source-fingerprint/v1'",
  "authority: 'PREVIEW_RENDER_SOURCE_BINDING'",
  'preview: {path: rel(previewPath), sha256: shaFile(previewPath)}',
  'sourceFingerprintSha256',
  "blockers.push('OPENING_PREVIEW_RENDER_IMPLEMENTATION_STALE')",
  'OPENING_PREVIEW_SOURCE_PREVIEW_STALE',
]) requireText(fingerprint, token, `source fingerprint contract missing: ${token}`);

if (errors.length) {
  console.error(`Opening preview source fingerprint contracts FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Opening preview source fingerprint contracts OK: Human review binds a fresh preview to the exact render implementation and final-render strict path rejects source drift.');
