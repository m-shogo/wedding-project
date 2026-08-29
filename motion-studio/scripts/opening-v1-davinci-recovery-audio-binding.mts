import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const audioPath = join(root, 'out/qa/opening-v1-audio-listening-review.json');
const bundlePath = join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const recoveryPath = join(root, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

const blockers: string[] = [];
const load = (path: string, missing: string, invalid: string) => {
  if (!existsSync(path)) {
    blockers.push(missing);
    return null;
  }
  try { return JSON.parse(readFileSync(path, 'utf8')) as any; }
  catch {
    blockers.push(invalid);
    return null;
  }
};

const audio = load(audioPath, 'OPENING_DAVINCI_RECOVERY_AUDIO_EVIDENCE_MISSING', 'OPENING_DAVINCI_RECOVERY_AUDIO_EVIDENCE_INVALID_JSON');
const bundle = load(bundlePath, 'OPENING_DAVINCI_RECOVERY_BUNDLE_MISSING', 'OPENING_DAVINCI_RECOVERY_BUNDLE_INVALID_JSON');
const recovery = load(recoveryPath, 'OPENING_DAVINCI_RECOVERY_SIDECAR_MISSING', 'OPENING_DAVINCI_RECOVERY_SIDECAR_INVALID_JSON');

if (audio) {
  if (audio.schemaVersion !== 'opening-v1-audio-listening-review/v1') blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_SCHEMA_MISMATCH');
  if (audio.authority !== 'HUMAN_OPENING_AUDIO_LISTENING_REVIEW') blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_AUTHORITY_MISMATCH');
  if (audio.review?.overall !== 'PASS') blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_REVIEW_NOT_PASS');
  if (audio.remotionStudioActual !== 'NOT_RUN') blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_STUDIO_ACTUAL_MUST_BE_NOT_RUN');
  if (audio.macDaVinciActual !== 'NOT_RUN') blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_MAC_ACTUAL_MUST_BE_NOT_RUN');
  if (audio.productionReady !== false) blockers.push('OPENING_DAVINCI_RECOVERY_AUDIO_MUST_FAIL_CLOSED');
}

if (bundle) {
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci?.macActualState !== 'NOT_RUN') blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_MAC_ACTUAL_MUST_BE_NOT_RUN');
  if (bundle.davinci?.productionReady !== false) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_MUST_FAIL_CLOSED');
}

if (recovery) {
  if (recovery.schemaVersion !== 'wedding-davinci-production-recovery-export/v1') blockers.push('OPENING_DAVINCI_RECOVERY_SCHEMA_MISMATCH');
  if (recovery.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') blockers.push('OPENING_DAVINCI_RECOVERY_AUTHORITY_MISMATCH');
  if (recovery.recovery?.actual?.state !== 'NOT_RUN') blockers.push('OPENING_DAVINCI_RECOVERY_ACTUAL_MUST_BE_NOT_RUN');
  if (recovery.recovery?.productionReady !== false) blockers.push('OPENING_DAVINCI_RECOVERY_MUST_FAIL_CLOSED');
}

if (audio && bundle && recovery) {
  const evidenceSha = sha(audioPath);
  const previewSha = audio.preview?.sha256 ?? null;
  const bgmSha = audio.bgm?.sha256 ?? null;
  const source = recovery.sourceBundle ?? {};

  if (bundle.humanAudioListeningReview?.evidencePath !== rel(audioPath)) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_AUDIO_PATH_STALE');
  if (bundle.humanAudioListeningReview?.evidenceSha256 !== evidenceSha) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_AUDIO_SHA_STALE');
  if (bundle.humanAudioListeningReview?.previewSha256 !== previewSha) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_PREVIEW_SHA_STALE');
  if (bundle.humanAudioListeningReview?.bgmSha256 !== bgmSha) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_BGM_SHA_STALE');

  if (bundle.davinci?.expectedAudioListeningReviewEvidenceSha256 !== evidenceSha) blockers.push('OPENING_DAVINCI_RECOVERY_EXPECTED_AUDIO_SHA_STALE');
  if (bundle.davinci?.expectedAudioListeningPreviewSha256 !== previewSha) blockers.push('OPENING_DAVINCI_RECOVERY_EXPECTED_PREVIEW_SHA_STALE');
  if (bundle.davinci?.expectedAudioListeningBgmSha256 !== bgmSha) blockers.push('OPENING_DAVINCI_RECOVERY_EXPECTED_BGM_SHA_STALE');

  if (source.audioListeningReviewEvidencePath !== rel(audioPath)) blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_AUDIO_PATH_STALE');
  if (source.audioListeningReviewEvidenceSha256 !== evidenceSha) blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_AUDIO_SHA_STALE');
  if (source.audioListeningPreviewSha256 !== previewSha) blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_PREVIEW_SHA_STALE');
  if (source.audioListeningBgmSha256 !== bgmSha) blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_BGM_SHA_STALE');
}

const current = blockers.length === 0;
const report = {
  schemaVersion: 'opening-v1-davinci-recovery-audio-binding/v1',
  authority: 'DERIVED_OPENING_DAVINCI_RECOVERY_AUDIO_BINDING',
  state: current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE',
  current,
  sourceEvidence: {path: rel(audioPath), sha256: existsSync(audioPath) ? sha(audioPath) : null},
  productionBundle: {path: rel(bundlePath)},
  recoverySidecar: {path: rel(recoveryPath)},
  macDaVinciActual: 'NOT_RUN',
  productionReady: false,
  blockers,
  guardrails: [
    'AUDIO_LISTENING_EVIDENCE_SHA_CHANGED => DAVINCI_RECOVERY_STALE',
    'PREVIEW_SHA_CHANGED => DAVINCI_RECOVERY_STALE',
    'BGM_SHA_CHANGED => DAVINCI_RECOVERY_STALE',
    'DAVINCI_RECOVERY_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_EXPORTED != PRODUCTION_READY',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Opening V1 DaVinci recovery audio binding: ${report.state}`);
  for (const blocker of blockers) console.log(`BLOCK / ${blocker}`);
}
if (process.argv.includes('--strict') && !current) process.exit(1);
