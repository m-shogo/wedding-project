import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {openingV1Scenes, openingV1TotalSec} from '../src/data/openingV1.ts';
import {openingV1SoundCues} from '../src/data/openingV1Sound.ts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const finalRenderPath = join(studioRoot, 'out/opening/opening_v1.mp4');
const cropReviewPath = join(studioRoot, 'out/qa/opening-v1-crop-review-evidence.json');
const previewReviewPath = join(studioRoot, 'out/qa/opening-v1-preview-review.json');
const audioListeningReviewPath = join(studioRoot, 'out/qa/opening-v1-audio-listening-review.json');
const finalRenderReviewPath = join(studioRoot, 'out/qa/opening-v1-final-render-review.json');
const outDir = join(studioRoot, 'out/handoff/opening-v1');
const bundlePath = join(outDir, 'opening-v1-production-bundle.json');
const timelineCsvPath = join(outDir, 'opening-v1-palmier-timeline.csv');
const soundCueCsvPath = join(outDir, 'opening-v1-palmier-sound-cues.csv');

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const shaText = (text: string) => createHash('sha256').update(text).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const run = (args: string[]) => spawnSync(process.execPath, ['--no-warnings', ...args], {cwd: studioRoot, encoding: 'utf-8'});

const assembly = run(['scripts/opening-v1-assembly-preflight.mts', '--json']);
if (assembly.status !== 0) {
  console.error(assembly.stderr || assembly.stdout || 'Opening V1 assembly preflight failed');
  process.exit(1);
}
let assemblyReport: any;
try { assemblyReport = JSON.parse(assembly.stdout); }
catch { console.error('Opening V1 assembly preflight did not return valid JSON'); process.exit(1); }
if (assemblyReport.readiness?.finalRenderEligible !== true) {
  console.error('Opening V1 production bundle blocked: assembly preflight is not final-render eligible.');
  for (const blocker of assemblyReport.readiness?.blockers ?? []) console.error(`BLOCK / ${blocker}`);
  process.exit(1);
}

const cropReview = run(['scripts/opening-v1-crop-review-evidence.mts', '--strict']);
if (cropReview.status !== 0) {
  console.error('Opening V1 production bundle blocked: current photos/focus/fit have no valid Human crop review.');
  console.error(cropReview.stdout || cropReview.stderr || 'crop review strict failed');
  process.exit(1);
}
if (!existsSync(cropReviewPath)) {
  console.error('Opening V1 production bundle blocked: crop review evidence file missing.');
  process.exit(1);
}

const previewSource = run(['scripts/opening-v1-preview-source-fingerprint.mts', '--strict']);
if (previewSource.status !== 0) {
  console.error('Opening V1 production bundle blocked: preview/render implementation binding is stale.');
  console.error(previewSource.stdout || previewSource.stderr || 'preview source strict failed');
  process.exit(1);
}
const previewReview = run(['scripts/opening-v1-preview-review.mts', '--strict']);
if (previewReview.status !== 0) {
  console.error('Opening V1 production bundle blocked: current preview has no valid human review evidence.');
  console.error(previewReview.stdout || previewReview.stderr || 'preview review strict failed');
  process.exit(1);
}
if (!existsSync(previewReviewPath)) {
  console.error('Opening V1 production bundle blocked: preview review evidence file missing.');
  process.exit(1);
}

const audioListeningReview = run(['scripts/opening-v1-audio-listening-review.mts', '--strict']);
if (audioListeningReview.status !== 0) {
  console.error('Opening V1 production bundle blocked: current preview/BGM has no valid Human audio listening review.');
  console.error(audioListeningReview.stdout || audioListeningReview.stderr || 'audio listening review strict failed');
  process.exit(1);
}
if (!existsSync(audioListeningReviewPath)) {
  console.error('Opening V1 production bundle blocked: Human audio listening review evidence file missing.');
  process.exit(1);
}

if (!existsSync(finalRenderPath)) {
  console.error('Opening V1 production bundle blocked: final render missing.');
  process.exit(1);
}
const renderCheck = run(['scripts/check-opening-render.mts', 'out/opening/opening_v1.mp4']);
if (renderCheck.status !== 0) {
  console.error('Opening V1 production bundle blocked: final render QA contract failed.');
  console.error(renderCheck.stdout || renderCheck.stderr || 'render QA failed');
  process.exit(1);
}
const finalReview = run(['scripts/opening-v1-final-render-review.mts', '--strict']);
if (finalReview.status !== 0) {
  console.error('Opening V1 production bundle blocked: final MP4 has no current Human final-render review.');
  console.error(finalReview.stdout || finalReview.stderr || 'final render review strict failed');
  process.exit(1);
}
if (!existsSync(finalRenderReviewPath)) {
  console.error('Opening V1 production bundle blocked: final-render Human review evidence file missing.');
  process.exit(1);
}

const cropEvidence = JSON.parse(readFileSync(cropReviewPath, 'utf8')) as {
  schemaVersion: string;
  authority: string;
  boundAt: string;
  bindingFingerprintSha256: string;
  slots: Array<{key: string; file: string; mediaSha256: string; presentationRevision: string; review: string; reviewer: string | null; reviewedAt: string | null}>;
  overall: string;
  macStudioActual: string;
  macDaVinciActual: string;
  productionReady: boolean;
};
if (cropEvidence.schemaVersion !== 'opening-v1-crop-review-evidence/v1' || cropEvidence.authority !== 'HUMAN_OPENING_CROP_REVIEW') {
  throw new Error('OPENING_CROP_REVIEW_EVIDENCE_CONTRACT_INVALID_AT_EXPORT');
}
if (cropEvidence.overall !== 'PASS') throw new Error('OPENING_CROP_REVIEW_NOT_PASS_AT_EXPORT');
if (cropEvidence.macStudioActual !== 'NOT_RUN' || cropEvidence.macDaVinciActual !== 'NOT_RUN' || cropEvidence.productionReady !== false) {
  throw new Error('OPENING_CROP_REVIEW_EVIDENCE_AUTHORITY_BOUNDARY_INVALID');
}

const evidence = JSON.parse(readFileSync(previewReviewPath, 'utf8')) as {
  schemaVersion: string;
  preview: {path: string; sha256: string};
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
  photos: Array<{slot: string; file: string; sha256: string}>;
  audio: {bgm: {assetId: string; file: string; sha256: string}; ambience: Array<{assetId: string; file: string | null; sha256: string | null}>};
};
const audioEvidence = JSON.parse(readFileSync(audioListeningReviewPath, 'utf8')) as {
  schemaVersion: string;
  authority: string;
  boundAt: string;
  preview: {path: string; sha256: string};
  bgm: {path: string; sha256: string};
  qa: {audibility: string; balance: string; startIntegrity: string; endIntegrity: string; pictureSync: string};
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
  remotionStudioActual: string;
  macDaVinciActual: string;
  productionReady: boolean;
};
if (audioEvidence.schemaVersion !== 'opening-v1-audio-listening-review/v1' || audioEvidence.authority !== 'HUMAN_OPENING_AUDIO_LISTENING_REVIEW') {
  throw new Error('OPENING_AUDIO_LISTENING_EVIDENCE_CONTRACT_INVALID_AT_EXPORT');
}
if (audioEvidence.review?.overall !== 'PASS') throw new Error('OPENING_AUDIO_LISTENING_REVIEW_NOT_PASS_AT_EXPORT');
if (audioEvidence.remotionStudioActual !== 'NOT_RUN' || audioEvidence.macDaVinciActual !== 'NOT_RUN' || audioEvidence.productionReady !== false) {
  throw new Error('OPENING_AUDIO_LISTENING_EVIDENCE_AUTHORITY_BOUNDARY_INVALID');
}
if (audioEvidence.preview?.path !== evidence.preview.path || audioEvidence.preview?.sha256 !== evidence.preview.sha256) {
  throw new Error('OPENING_AUDIO_LISTENING_PREVIEW_BINDING_STALE_AT_EXPORT');
}
if (audioEvidence.bgm?.sha256 !== evidence.audio.bgm.sha256) {
  throw new Error('OPENING_AUDIO_LISTENING_BGM_BINDING_STALE_AT_EXPORT');
}

const finalEvidence = JSON.parse(readFileSync(finalRenderReviewPath, 'utf8')) as {
  boundAt: string;
  finalRender: {path: string; sha256: string};
  renderSourceFingerprintSha256: string;
  review: {overall: string; reviewer: string | null; reviewedAt: string | null; notes: string};
};

let cursor = 0;
const sceneTimeline = openingV1Scenes.map((scene, index) => {
  const startSec = cursor;
  const endSec = startSec + scene.durationSec;
  cursor = endSec;
  return {order: index + 1, sceneId: scene.id, title: scene.title, startSec, endSec, durationSec: scene.durationSec, kind: scene.kind, owner: scene.owner, replacementPolicy: scene.replacementPolicy};
});
if (cursor !== openingV1TotalSec || openingV1TotalSec !== 60) throw new Error(`Opening V1 timeline drifted: cursor=${cursor} total=${openingV1TotalSec}`);

const finalRenderSha256 = shaFile(finalRenderPath);
if (finalEvidence.finalRender.path !== rel(finalRenderPath) || finalEvidence.finalRender.sha256 !== finalRenderSha256) {
  throw new Error('OPENING_FINAL_RENDER_REVIEW_BINDING_STALE_AT_EXPORT');
}
const csvEscape = (value: unknown) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const timelineRows = [
  ['order', 'scene_id', 'title', 'start_sec', 'end_sec', 'duration_sec', 'kind', 'owner', 'replacement_policy', 'final_render_sha256'],
  ...sceneTimeline.map((scene) => [scene.order, scene.sceneId, scene.title, scene.startSec, scene.endSec, scene.durationSec, scene.kind, scene.owner, scene.replacementPolicy, finalRenderSha256]),
];
const timelineCsv = `${timelineRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`;
const timelineCsvSha256 = shaText(timelineCsv);
const soundCueRows = [
  ['cue_id', 'role', 'asset_id', 'start_sec', 'end_sec', 'volume', 'note', 'final_render_sha256'],
  ...openingV1SoundCues.map((cue) => [cue.id, cue.role, cue.assetId, cue.startSec, cue.endSec, cue.volume, cue.note, finalRenderSha256]),
];
const soundCueCsv = `${soundCueRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`;
const soundCueCsvSha256 = shaText(soundCueCsv);
const audioListeningReviewEvidenceSha256 = shaFile(audioListeningReviewPath);

const bundle = {
  schemaVersion: 'opening-v1-production-bundle/v1',
  authority: 'FINAL_RENDER_BOUND_HANDOFF',
  generatedAt: new Date().toISOString(),
  composition: {id: 'OpeningV1', width: 1920, height: 1080, fps: 30, durationSeconds: 60},
  finalRender: {path: rel(finalRenderPath), sha256: finalRenderSha256, qaContract: 'check-opening-render.mts=PASS_AT_EXPORT'},
  humanCropReview: {
    evidencePath: rel(cropReviewPath),
    evidenceSha256: shaFile(cropReviewPath),
    bindingFingerprintSha256: cropEvidence.bindingFingerprintSha256,
    boundAt: cropEvidence.boundAt,
    overall: cropEvidence.overall,
    reviewedSlots: cropEvidence.slots.filter((slot) => slot.review === 'PASS').map((slot) => ({
      key: slot.key,
      file: slot.file,
      mediaSha256: slot.mediaSha256,
      presentationRevision: slot.presentationRevision,
      reviewer: slot.reviewer,
      reviewedAt: slot.reviewedAt,
    })),
  },
  humanPreviewReview: {
    evidencePath: rel(previewReviewPath), evidenceSha256: shaFile(previewReviewPath), previewPath: evidence.preview.path, previewSha256: evidence.preview.sha256,
    reviewer: evidence.review.reviewer, reviewedAt: evidence.review.reviewedAt, overall: evidence.review.overall, notes: evidence.review.notes,
  },
  humanAudioListeningReview: {
    evidencePath: rel(audioListeningReviewPath),
    evidenceSha256: audioListeningReviewEvidenceSha256,
    boundAt: audioEvidence.boundAt,
    previewPath: audioEvidence.preview.path,
    previewSha256: audioEvidence.preview.sha256,
    bgmPath: audioEvidence.bgm.path,
    bgmSha256: audioEvidence.bgm.sha256,
    qa: {...audioEvidence.qa},
    reviewer: audioEvidence.review.reviewer,
    reviewedAt: audioEvidence.review.reviewedAt,
    overall: audioEvidence.review.overall,
    notes: audioEvidence.review.notes,
  },
  humanFinalRenderReview: {
    evidencePath: rel(finalRenderReviewPath), evidenceSha256: shaFile(finalRenderReviewPath), boundAt: finalEvidence.boundAt,
    finalRenderPath: finalEvidence.finalRender.path, finalRenderSha256: finalEvidence.finalRender.sha256,
    renderSourceFingerprintSha256: finalEvidence.renderSourceFingerprintSha256,
    reviewer: finalEvidence.review.reviewer, reviewedAt: finalEvidence.review.reviewedAt, overall: finalEvidence.review.overall, notes: finalEvidence.review.notes,
  },
  media: {assemblyPreflight: assemblyReport, photos: evidence.photos, bgm: evidence.audio.bgm, ambience: evidence.audio.ambience},
  timeline: sceneTimeline,
  soundCues: openingV1SoundCues.map((cue) => ({...cue})),
  palmier: {
    handoffContractVersion: 'opening-v1-palmier-handoff/v3', handoffMode: 'REFERENCE_TIMELINE_AND_FINAL_RENDER',
    cropReviewBindingFingerprintSha256: cropEvidence.bindingFingerprintSha256,
    audioListeningReviewEvidenceSha256,
    audioListeningPreviewSha256: audioEvidence.preview.sha256,
    audioListeningBgmSha256: audioEvidence.bgm.sha256,
    timelineCsv: rel(timelineCsvPath), timelineCsvSha256, soundCueCsv: rel(soundCueCsvPath), soundCueCsvSha256,
    instruction: '60秒のscene boundary・replacement policy・J-cut/BGM cue timing・final render SHA・Human crop review binding・Human audio listening evidence SHAを正本として扱う。写真/focus/fit/preview/BGMを変えた場合は対応Human QAから再実行し、古いhandoffを使わない。',
  },
  davinci: {
    handoffAsset: rel(finalRenderPath), expectedSha256: finalRenderSha256,
    expectedCropReviewEvidenceSha256: shaFile(cropReviewPath),
    expectedCropReviewBindingFingerprintSha256: cropEvidence.bindingFingerprintSha256,
    expectedAudioListeningReviewEvidenceSha256: audioListeningReviewEvidenceSha256,
    expectedAudioListeningPreviewSha256: audioEvidence.preview.sha256,
    expectedAudioListeningBgmSha256: audioEvidence.bgm.sha256,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
    macActualState: 'NOT_RUN', timelineInsertionState: 'NOT_RUN', colorFinishState: 'NOT_RUN', audioFinishState: 'NOT_RUN', exportValidationState: 'NOT_RUN', productionReady: false,
  },
  guardrails: [
    'FINAL_RENDER_EXISTS != DAVINCI_ACTUAL_VERIFIED',
    'HUMAN_CROP_REVIEW_PASS != HUMAN_PREVIEW_REVIEW_PASS',
    'HUMAN_PREVIEW_REVIEW_PASS != HUMAN_AUDIO_LISTENING_REVIEW_PASS',
    'HUMAN_AUDIO_LISTENING_REVIEW_PASS != HUMAN_FINAL_RENDER_REVIEW_PASS',
    'HUMAN_FINAL_RENDER_REVIEW_PASS != FINAL_DELIVERY_APPROVED',
    'PHOTO_SHA_OR_EFFECTIVE_FOCUS_OR_FIT_CHANGED => CROP_REVIEW_STALE',
    'PREVIEW_SHA_OR_BGM_SHA_CHANGED => AUDIO_LISTENING_REVIEW_STALE',
    'AUDIO_LISTENING_REVIEW_EVIDENCE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'CROP_REVIEW_EVIDENCE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'CROP_REVIEW_BINDING_FINGERPRINT_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'FINAL_RENDER_OR_RENDER_SOURCE_CHANGED => RE_RENDER_AND_RE_REVIEW',
    'BUNDLE_EXPORTED != PRODUCTION_READY',
    'RENDER_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'PALMIER_HANDOFF_CONTRACT_VERSION_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'PALMIER_TIMELINE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
    'PALMIER_SOUND_CUE_SHA_MISMATCH => STOP_AND_REGENERATE_HANDOFF',
  ],
  nextActions: [
    'Palmierでscene boundary・replacement policy・sound cue timing・crop review binding・audio listening evidence SHAを確認し、正本renderや承認済みHuman QAを無断変更しない',
    'DaVinciへHuman final-render review済みfinal renderを挿入し、final render SHA・crop review evidence SHA/fingerprint・audio listening evidence SHAが一致することを確認',
    '実機でcolor/audio/output QAを行い各Actual evidenceを別途記録',
    'Mac Actual未実施のままproductionReadyへ昇格しない',
  ],
};

mkdirSync(outDir, {recursive: true});
writeFileSync(timelineCsvPath, timelineCsv);
writeFileSync(soundCueCsvPath, soundCueCsv);
writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(`Opening V1 production bundle exported: ${rel(bundlePath)}`);
console.log(`Palmier timeline exported: ${rel(timelineCsvPath)}`);
console.log(`Palmier sound cues exported: ${rel(soundCueCsvPath)}`);
console.log(`finalRenderSha256=${finalRenderSha256}`);
console.log(`cropReviewEvidenceSha256=${shaFile(cropReviewPath)}`);
console.log(`cropReviewBindingFingerprintSha256=${cropEvidence.bindingFingerprintSha256}`);
console.log(`audioListeningReviewEvidenceSha256=${audioListeningReviewEvidenceSha256}`);
console.log(`audioListeningPreviewSha256=${audioEvidence.preview.sha256}`);
console.log(`audioListeningBgmSha256=${audioEvidence.bgm.sha256}`);
console.log(`finalRenderReviewEvidenceSha256=${shaFile(finalRenderReviewPath)}`);
console.log(`timelineCsvSha256=${timelineCsvSha256}`);
console.log(`soundCueCsvSha256=${soundCueCsvSha256}`);
console.log('DaVinci Mac Actual remains NOT_RUN; productionReady=false.');