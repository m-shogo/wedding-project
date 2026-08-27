import {createHash} from 'node:crypto';
import {existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, extname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assets} from '../src/data/assets.ts';
import {openingV1Presentation} from '../src/data/openingV1Presentation.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/opening_v1_preview.mp4');
const evidencePath = join(studioRoot, 'out/qa/opening-v1-preview-review.json');
const photoDir = join(studioRoot, 'public/photos/opening');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const playableStatuses = new Set(['candidate', 'approved', 'final']);
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

const expectedPhotoSlots = [
  'okinawa-01', 'okinawa-02', 'okinawa-03',
  'seoul-01', 'seoul-02', 'seoul-03',
  'hawaii-01', 'hawaii-02', 'hawaii-03',
  'hero-01', 'hero-02',
] as const;

const checkpoints = [
  {id: '01-cold-open', frame: 24, purpose: 'cold-open / hero-01'},
  {id: '02-okinawa-full-label', frame: 90, purpose: 'Okinawa full + label'},
  {id: '03-okinawa-left', frame: 210, purpose: 'Okinawa split crop'},
  {id: '04-seoul-right-label', frame: 420, purpose: 'Seoul right + label'},
  {id: '05-hawaii-full-label', frame: 750, purpose: 'Hawaii full + label'},
  {id: '06-hawaii-wide', frame: 840, purpose: 'Hawaii wide / contain'},
  {id: '07-hero-a', frame: 1170, purpose: 'hero A'},
  {id: '08-hero-b', frame: 1440, purpose: 'hero B'},
  {id: '09-arrival', frame: 1650, purpose: 'arrival transition'},
  {id: '10-ending', frame: 1755, purpose: 'ending readability'},
] as const;

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL' | 'SKIPPED';

type Evidence = {
  schemaVersion: 'opening-v1-preview-review/v1';
  authority: 'HUMAN_PREVIEW_REVIEW_EVIDENCE';
  boundAt: string;
  preview: {path: string; sha256: string};
  presentationSha256: string;
  soundCueSha256: string;
  photos: Array<{
    slot: string;
    file: string;
    sha256: string;
    qa: {crop: QaState; focus: QaState; color: QaState; motion: QaState};
  }>;
  checkpoints: Array<{id: string; frame: number; purpose: string; visual: QaState; readability: QaState}>;
  audio: {
    bgm: {assetId: string; file: string; sha256: string; timing: QaState; level: QaState};
    ambience: Array<{assetId: string; file: string | null; sha256: string | null; timing: QaState; level: QaState}>;
  };
  review: {overall: QaState; reviewer: string | null; reviewedAt: string | null; notes: string};
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const normalizeStem = (file: string) => {
  const ext = extname(file);
  return file.slice(0, file.length - ext.length).toLowerCase().replaceAll('_', '-');
};

function findCanonicalPhotos() {
  if (!existsSync(photoDir)) throw new Error('OPENING_PREVIEW_REVIEW_PHOTO_DIR_MISSING');
  const files = readdirSync(photoDir)
    .filter((file) => !file.startsWith('.'))
    .filter((file) => statSync(join(photoDir, file)).isFile())
    .filter((file) => imageExts.has(extname(file).toLowerCase()));
  const byStem = new Map<string, string[]>();
  for (const file of files) {
    const stem = normalizeStem(file);
    byStem.set(stem, [...(byStem.get(stem) ?? []), file]);
  }
  return expectedPhotoSlots.map((slot) => {
    const matches = byStem.get(slot) ?? [];
    if (matches.length !== 1) throw new Error(`OPENING_PREVIEW_REVIEW_PHOTO_${matches.length === 0 ? 'MISSING' : 'DUPLICATE'}:${slot}`);
    const absolute = join(photoDir, matches[0]);
    return {slot, file: rel(absolute), absolute, sha256: shaFile(absolute)};
  });
}

function audioBinding(assetId: string, required: boolean) {
  const asset = assets[assetId];
  if (!asset) throw new Error(`OPENING_PREVIEW_REVIEW_AUDIO_REGISTRY_MISSING:${assetId}`);
  const playable = playableStatuses.has(asset.status);
  const absolute = join(studioRoot, asset.path);
  const local = asset.path.startsWith('public/audio/');
  const exists = local && existsSync(absolute);
  if (required && (!playable || !exists)) throw new Error(`OPENING_PREVIEW_REVIEW_AUDIO_REQUIRED_NOT_READY:${assetId}:${asset.status}`);
  if (!exists) return {assetId, file: null, absolute: null, sha256: null};
  return {assetId, file: rel(absolute), absolute, sha256: shaFile(absolute)};
}

function currentBindings() {
  if (!existsSync(previewPath)) throw new Error('OPENING_PREVIEW_REVIEW_PREVIEW_MISSING:run pnpm render:opening-v1:preview first');
  const photos = findCanonicalPhotos();
  const bgmCue = openingV1SoundCues.find((cue) => cue.role === 'bgm');
  if (!bgmCue) throw new Error('OPENING_PREVIEW_REVIEW_BGM_CUE_MISSING');
  const bgm = audioBinding(bgmCue.assetId, true);
  if (!bgm.file || !bgm.sha256) throw new Error('OPENING_PREVIEW_REVIEW_BGM_BINDING_INVALID');
  const ambience = openingV1SoundCues
    .filter((cue) => cue.role === 'ambience')
    .map((cue) => audioBinding(cue.assetId, false));
  return {
    preview: {path: rel(previewPath), sha256: shaFile(previewPath)},
    presentationSha256: shaJson(openingV1Presentation),
    soundCueSha256: shaJson(openingV1SoundCues),
    photos,
    bgm: {assetId: bgm.assetId, file: bgm.file, sha256: bgm.sha256},
    ambience,
  };
}

function initializeEvidence() {
  const current = currentBindings();
  const evidence: Evidence = {
    schemaVersion: 'opening-v1-preview-review/v1',
    authority: 'HUMAN_PREVIEW_REVIEW_EVIDENCE',
    boundAt: new Date().toISOString(),
    preview: current.preview,
    presentationSha256: current.presentationSha256,
    soundCueSha256: current.soundCueSha256,
    photos: current.photos.map((photo) => ({
      slot: photo.slot,
      file: photo.file,
      sha256: photo.sha256,
      qa: {crop: 'NOT_RUN', focus: 'NOT_RUN', color: 'NOT_RUN', motion: 'NOT_RUN'},
    })),
    checkpoints: checkpoints.map((checkpoint) => ({...checkpoint, visual: 'NOT_RUN', readability: 'NOT_RUN'})),
    audio: {
      bgm: {...current.bgm, timing: 'NOT_RUN', level: 'NOT_RUN'},
      ambience: current.ambience.map((item) => ({
        assetId: item.assetId,
        file: item.file,
        sha256: item.sha256,
        timing: item.file ? 'NOT_RUN' : 'SKIPPED',
        level: item.file ? 'NOT_RUN' : 'SKIPPED',
      })),
    },
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
  };
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Opening V1 preview review evidence initialized: ${rel(evidencePath)}`);
  console.log('All visual/audio verdicts remain NOT_RUN until a human reviews the bound preview.');
}

function verifyEvidence(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Opening V1 preview review evidence: NOT_RUN (file missing)');
    if (strict) process.exit(1);
    return;
  }
  const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as Evidence;
  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  if (evidence.schemaVersion !== 'opening-v1-preview-review/v1') fail('SCHEMA_VERSION');
  if (evidence.authority !== 'HUMAN_PREVIEW_REVIEW_EVIDENCE') fail('AUTHORITY');

  let current: ReturnType<typeof currentBindings> | null = null;
  try {
    current = currentBindings();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
  if (current) {
    if (evidence.preview.sha256 !== current.preview.sha256) fail('STALE_PREVIEW_SHA256');
    if (evidence.presentationSha256 !== current.presentationSha256) fail('STALE_PRESENTATION_CONFIG');
    if (evidence.soundCueSha256 !== current.soundCueSha256) fail('STALE_SOUND_CUES');
    for (const photo of current.photos) {
      const saved = evidence.photos.find((item) => item.slot === photo.slot);
      if (!saved) fail(`PHOTO_EVIDENCE_MISSING:${photo.slot}`);
      else if (saved.sha256 !== photo.sha256 || saved.file !== photo.file) fail(`STALE_PHOTO:${photo.slot}`);
    }
    if (evidence.audio.bgm.sha256 !== current.bgm.sha256 || evidence.audio.bgm.file !== current.bgm.file) fail('STALE_BGM');
    for (const ambience of current.ambience) {
      const saved = evidence.audio.ambience.find((item) => item.assetId === ambience.assetId);
      if (!saved) fail(`AMBIENCE_EVIDENCE_MISSING:${ambience.assetId}`);
      else if (saved.sha256 !== ambience.sha256 || saved.file !== ambience.file) fail(`STALE_AMBIENCE:${ambience.assetId}`);
    }
  }

  for (const photo of evidence.photos) {
    for (const [axis, state] of Object.entries(photo.qa)) {
      if (state !== 'PASS') fail(`PHOTO_QA_${state}:${photo.slot}:${axis}`);
    }
  }
  for (const checkpoint of evidence.checkpoints) {
    if (checkpoint.visual !== 'PASS') fail(`CHECKPOINT_VISUAL_${checkpoint.visual}:${checkpoint.id}`);
    if (checkpoint.readability !== 'PASS') fail(`CHECKPOINT_READABILITY_${checkpoint.readability}:${checkpoint.id}`);
  }
  if (evidence.audio.bgm.timing !== 'PASS') fail(`BGM_TIMING_${evidence.audio.bgm.timing}`);
  if (evidence.audio.bgm.level !== 'PASS') fail(`BGM_LEVEL_${evidence.audio.bgm.level}`);
  for (const ambience of evidence.audio.ambience) {
    const expected = ambience.file ? 'PASS' : 'SKIPPED';
    if (ambience.timing !== expected) fail(`AMBIENCE_TIMING_${ambience.timing}:${ambience.assetId}:EXPECTED_${expected}`);
    if (ambience.level !== expected) fail(`AMBIENCE_LEVEL_${ambience.level}:${ambience.assetId}:EXPECTED_${expected}`);
  }
  if (evidence.review.overall !== 'PASS') fail(`OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('REVIEWER_MISSING');
  if (!evidence.review.reviewedAt || Number.isNaN(Date.parse(evidence.review.reviewedAt))) fail('REVIEWED_AT_INVALID');

  if (errors.length > 0) {
    console.log(`Opening V1 preview review: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }
  console.log('Opening V1 preview review: PASS — evidence matches current preview/media/config and all human QA axes are approved.');
}

if (mode === 'init') initializeEvidence();
else verifyEvidence(mode === 'strict');
