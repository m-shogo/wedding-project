import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const audioEvidencePath = join(root, 'out/qa/opening-v1-audio-listening-review.json');
const bundlePath = join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

type AudioEvidence = {
  schemaVersion?: string;
  authority?: string;
  preview?: {path?: string; sha256?: string};
  bgm?: {path?: string; sha256?: string};
  review?: {overall?: string};
  remotionStudioActual?: string;
  macDaVinciActual?: string;
  productionReady?: boolean;
};

type Bundle = {
  schemaVersion?: string;
  authority?: string;
  humanAudioListeningReview?: {
    evidencePath?: string;
    evidenceSha256?: string;
    previewPath?: string;
    previewSha256?: string;
    bgmPath?: string;
    bgmSha256?: string;
    overall?: string;
  };
  palmier?: {
    audioListeningReviewEvidenceSha256?: string;
    audioListeningPreviewSha256?: string;
    audioListeningBgmSha256?: string;
  };
  davinci?: {
    expectedAudioListeningReviewEvidenceSha256?: string;
    expectedAudioListeningPreviewSha256?: string;
    expectedAudioListeningBgmSha256?: string;
    macActualState?: string;
    productionReady?: boolean;
  };
};

const blockers: string[] = [];
let audio: AudioEvidence | null = null;
let bundle: Bundle | null = null;

if (!existsSync(audioEvidencePath)) blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_MISSING');
else {
  try { audio = JSON.parse(readFileSync(audioEvidencePath, 'utf8')) as AudioEvidence; }
  catch { blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_INVALID_JSON'); }
}

if (!existsSync(bundlePath)) blockers.push('OPENING_AUDIO_HANDOFF_BUNDLE_MISSING');
else {
  try { bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as Bundle; }
  catch { blockers.push('OPENING_AUDIO_HANDOFF_BUNDLE_INVALID_JSON'); }
}

if (audio) {
  if (audio.schemaVersion !== 'opening-v1-audio-listening-review/v1') blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_SCHEMA_MISMATCH');
  if (audio.authority !== 'HUMAN_OPENING_AUDIO_LISTENING_REVIEW') blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_AUTHORITY_MISMATCH');
  if (audio.review?.overall !== 'PASS') blockers.push('OPENING_AUDIO_HANDOFF_HUMAN_REVIEW_NOT_PASS');
  if (audio.remotionStudioActual !== 'NOT_RUN') blockers.push('OPENING_AUDIO_HANDOFF_MUST_NOT_PROMOTE_STUDIO_ACTUAL');
  if (audio.macDaVinciActual !== 'NOT_RUN') blockers.push('OPENING_AUDIO_HANDOFF_MUST_NOT_PROMOTE_DAVINCI_ACTUAL');
  if (audio.productionReady !== false) blockers.push('OPENING_AUDIO_HANDOFF_MUST_FAIL_CLOSED');
}

if (bundle) {
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') blockers.push('OPENING_AUDIO_HANDOFF_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('OPENING_AUDIO_HANDOFF_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci?.macActualState !== 'NOT_RUN') blockers.push('OPENING_AUDIO_HANDOFF_DAVINCI_ACTUAL_MUST_BE_NOT_RUN');
  if (bundle.davinci?.productionReady !== false) blockers.push('OPENING_AUDIO_HANDOFF_DAVINCI_MUST_FAIL_CLOSED');
}

if (audio && bundle) {
  const evidenceSha = sha(audioEvidencePath);
  const expectedPath = rel(audioEvidencePath);
  const previewPath = audio.preview?.path ?? null;
  const previewSha = audio.preview?.sha256 ?? null;
  const bgmPath = audio.bgm?.path ?? null;
  const bgmSha = audio.bgm?.sha256 ?? null;

  if (bundle.humanAudioListeningReview?.evidencePath !== expectedPath) blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_PATH_STALE');
  if (bundle.humanAudioListeningReview?.evidenceSha256 !== evidenceSha) blockers.push('OPENING_AUDIO_HANDOFF_EVIDENCE_SHA_STALE');
  if (bundle.humanAudioListeningReview?.previewPath !== previewPath) blockers.push('OPENING_AUDIO_HANDOFF_PREVIEW_PATH_STALE');
  if (bundle.humanAudioListeningReview?.previewSha256 !== previewSha) blockers.push('OPENING_AUDIO_HANDOFF_PREVIEW_SHA_STALE');
  if (bundle.humanAudioListeningReview?.bgmPath !== bgmPath) blockers.push('OPENING_AUDIO_HANDOFF_BGM_PATH_STALE');
  if (bundle.humanAudioListeningReview?.bgmSha256 !== bgmSha) blockers.push('OPENING_AUDIO_HANDOFF_BGM_SHA_STALE');
  if (bundle.humanAudioListeningReview?.overall !== 'PASS') blockers.push('OPENING_AUDIO_HANDOFF_BUNDLE_REVIEW_NOT_PASS');

  if (bundle.palmier?.audioListeningReviewEvidenceSha256 !== evidenceSha) blockers.push('OPENING_AUDIO_HANDOFF_PALMIER_EVIDENCE_SHA_STALE');
  if (bundle.palmier?.audioListeningPreviewSha256 !== previewSha) blockers.push('OPENING_AUDIO_HANDOFF_PALMIER_PREVIEW_SHA_STALE');
  if (bundle.palmier?.audioListeningBgmSha256 !== bgmSha) blockers.push('OPENING_AUDIO_HANDOFF_PALMIER_BGM_SHA_STALE');

  if (bundle.davinci?.expectedAudioListeningReviewEvidenceSha256 !== evidenceSha) blockers.push('OPENING_AUDIO_HANDOFF_DAVINCI_EVIDENCE_SHA_STALE');
  if (bundle.davinci?.expectedAudioListeningPreviewSha256 !== previewSha) blockers.push('OPENING_AUDIO_HANDOFF_DAVINCI_PREVIEW_SHA_STALE');
  if (bundle.davinci?.expectedAudioListeningBgmSha256 !== bgmSha) blockers.push('OPENING_AUDIO_HANDOFF_DAVINCI_BGM_SHA_STALE');
}

const current = blockers.length === 0;
const report = {
  schemaVersion: 'opening-v1-audio-handoff-binding/v1',
  authority: 'DERIVED_OPENING_AUDIO_HANDOFF_BINDING',
  state: current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE',
  current,
  sourceEvidence: {
    path: rel(audioEvidencePath),
    sha256: existsSync(audioEvidencePath) ? sha(audioEvidencePath) : null,
  },
  productionBundle: {path: rel(bundlePath)},
  palmier: {
    requiresAudioListeningEvidenceSha: true,
    requiresPreviewSha: true,
    requiresBgmSha: true,
  },
  davinci: {
    requiresAudioListeningEvidenceSha: true,
    requiresPreviewSha: true,
    requiresBgmSha: true,
    macActualState: 'NOT_RUN',
    productionReady: false,
  },
  blockers,
  guardrails: [
    'HUMAN_AUDIO_LISTENING_REVIEW_PASS != PALMIER_HANDOFF_CURRENT',
    'HUMAN_AUDIO_LISTENING_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED',
    'AUDIO_LISTENING_EVIDENCE_SHA_CHANGED => PALMIER_AND_DAVINCI_HANDOFF_STALE',
    'PREVIEW_SHA_CHANGED => AUDIO_LISTENING_REVIEW_AND_HANDOFF_STALE',
    'BGM_SHA_CHANGED => AUDIO_LISTENING_REVIEW_AND_HANDOFF_STALE',
    'HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Opening V1 audio handoff binding: ${report.state}`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
}
if (process.argv.includes('--strict') && !current) process.exit(1);
