import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'scripts/opening-photo-preflight.mts'), 'utf8');
const errors: string[] = [];

for (const token of [
  "import {verifyIntakeReceipt} from './verify-production-media-intake-receipt.mts';",
  "verifyIntakeReceipt({project: 'opening', targetDirectory: openingDir})",
  "schemaVersion: 'opening-photo-preflight/v2'",
  "authority: 'OPENING_CANONICAL_PHOTO_INTAKE_PREFLIGHT'",
  'const productionPhotoReady = filesReady && intakeReceiptCurrent;',
  "path: 'out/intake/opening-media-intake.json'",
  'scripts/intake-production-media.mts --project opening',
  'scripts/verify-production-media-intake-receipt.mts --project opening',
  '11 FILES FOUND != SHA RECEIPT CURRENT',
  "'scripts/opening-v1-assembly-preflight.mts', '--json'",
  'assemblyRecovery.inputRecovery?.photos?.state',
  'assemblyRecovery.inputRecovery?.bgm?.state',
  'Parallel production inputs: photos=',
  '並行で進められるproduction input recovery:',
]) {
  if (!source.includes(token)) errors.push(`Opening photo preflight missing canonical intake contract: ${token}`);
}

for (const forbidden of [
  'missing ${rows.length - ready}枠をcanonical filenameで置く → pnpm render:opening-v1:preview',
  'canonical filenameで置く → pnpm render:opening-v1:preview',
]) {
  if (source.includes(forbidden)) errors.push(`Opening photo preflight still exposes raw placement as production recovery: ${forbidden}`);
}

if (errors.length) {
  console.error(`Opening photo preflight intake contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Opening photo preflight intake contract OK: prepare-time inspection distinguishes file presence from SHA-current provenance and surfaces canonical photo + BGM recovery in parallel before Studio/preview work.');
