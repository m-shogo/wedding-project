import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileV1RuntimeMedia} from '../src/data/profileV1RuntimeMedia.generated.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const evidencePath = join(studioRoot, 'out/qa/profile-v1-real-media-review.json');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

const valueOf = (name: string) => {
  const prefix = `--${name}=`;
  const raw = process.argv.find((arg) => arg.startsWith(prefix));
  return raw ? raw.slice(prefix.length) : null;
};

const slotId = valueOf('slot');
const crop = valueOf('crop');
const focus = valueOf('focus');
const fit = valueOf('fit');
const focusXRaw = valueOf('focus-x');
const focusYRaw = valueOf('focus-y');
const notes = valueOf('notes');

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

if (!slotId) fail('PROFILE_FRAMING_SLOT_REQUIRED: use --slot=<canonical-slot-id>');
const canonicalIds = new Set(profileV1RuntimeMedia.slots.map((slot) => slot.id));
if (!canonicalIds.has(slotId)) fail(`PROFILE_FRAMING_SLOT_UNKNOWN:${slotId}`);
if (crop !== 'PASS' && crop !== 'FAIL') fail('PROFILE_FRAMING_CROP_REQUIRED: use --crop=PASS|FAIL');
if (focus !== 'PASS' && focus !== 'FAIL') fail('PROFILE_FRAMING_FOCUS_REQUIRED: use --focus=PASS|FAIL');

const bothPass = crop === 'PASS' && focus === 'PASS';
if (bothPass && fit !== 'cover' && fit !== 'contain') {
  fail('PROFILE_FRAMING_FIT_REQUIRED_FOR_PASS: use --fit=cover|contain');
}
if (!bothPass && fit !== null) fail('PROFILE_FRAMING_FIT_FORBIDDEN_UNLESS_BOTH_PASS');

const hasFocusX = focusXRaw !== null;
const hasFocusY = focusYRaw !== null;
if (hasFocusX !== hasFocusY) fail('PROFILE_FRAMING_FOCUS_PAIR_REQUIRED: provide both --focus-x and --focus-y');
if (!bothPass && (hasFocusX || hasFocusY)) fail('PROFILE_FRAMING_FOCUS_POSITION_FORBIDDEN_UNLESS_BOTH_PASS');

let focusX: number | null = null;
let focusY: number | null = null;
if (hasFocusX && hasFocusY) {
  focusX = Number(focusXRaw);
  focusY = Number(focusYRaw);
  if (!Number.isFinite(focusX) || focusX < 0 || focusX > 100 || !Number.isFinite(focusY) || focusY < 0 || focusY > 100) {
    fail('PROFILE_FRAMING_FOCUS_OUT_OF_RANGE: focus values must be finite percentages from 0 to 100');
  }
}

if (!existsSync(evidencePath)) {
  fail('PROFILE_REAL_MEDIA_REVIEW_EVIDENCE_MISSING: initialize the canonical Human review first');
}

let evidence: any;
try {
  evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
} catch {
  fail('PROFILE_REAL_MEDIA_REVIEW_EVIDENCE_INVALID_JSON');
}
if (evidence?.schemaVersion !== 'profile-v1-real-media-review/v1') fail('PROFILE_REAL_MEDIA_REVIEW_SCHEMA_INVALID');
if (evidence?.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW') fail('PROFILE_REAL_MEDIA_REVIEW_AUTHORITY_INVALID');
if (evidence?.bgmReviewed !== false || evidence?.macDaVinciActual !== 'NOT_RUN' || evidence?.productionReady !== false) {
  fail('PROFILE_REAL_MEDIA_REVIEW_EVIDENCE_BOUNDARY_INVALID');
}
if (!Array.isArray(evidence.media)) fail('PROFILE_REAL_MEDIA_REVIEW_MEDIA_INVALID');

const matches = evidence.media.filter((item: any) => item?.slot === slotId);
if (matches.length !== 1) fail(`PROFILE_REAL_MEDIA_REVIEW_SLOT_CARDINALITY:${slotId}:${matches.length}`);
const media = matches[0];
if (!media.qa || typeof media.qa !== 'object') fail(`PROFILE_REAL_MEDIA_REVIEW_QA_INVALID:${slotId}`);

media.qa.crop = crop;
media.qa.focus = focus;
if (bothPass) {
  media.framing = {
    fit,
    ...(focusX !== null && focusY !== null ? {focusX, focusY} : {}),
  };
} else {
  delete media.framing;
}
if (notes !== null) media.framingNotes = notes;

writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);

const sync = spawnSync(
  process.execPath,
  ['--no-warnings', 'scripts/sync-profile-v1-framing-verdicts.mts', '--write'],
  {cwd: studioRoot, stdio: 'inherit'},
);
if (sync.status !== 0) fail('PROFILE_FRAMING_SNAPSHOT_SYNC_FAILED');

console.log(`Profile Human framing verdict recorded: ${slotId} crop=${crop} focus=${focus}${bothPass ? ` fit=${fit}` : ''}`);
console.log(`Evidence: ${rel(evidencePath)}`);
console.log('This command does not change color/emotional-fit/content QA, overall review, BGM rights, Mac/Studio/DaVinci Actual, or productionReady.');
