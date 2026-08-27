import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCueCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const evidencePath = join(studioRoot, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';

type ProductionBundle = {
  schemaVersion: 'opening-v1-production-bundle/v1';
  authority: 'FINAL_RENDER_BOUND_HANDOFF';
  finalRender: {path: string; sha256: string};
  humanPreviewReview: {evidenceSha256: string; reviewer: string | null; reviewedAt: string | null; overall: string};
  palmier: {
    handoffContractVersion: string;
    timelineCsv: string;
    timelineCsvSha256: string;
    soundCueCsv: string;
    soundCueCsvSha256: string;
  };
  davinci: {expectedSha256: string; productionReady: false};
};

type FinishingEvidence = {
  schemaVersion: 'opening-v1-davinci-finishing-evidence/v1';
  authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE';
  boundAt: string;
  bundle: {path: string; sha256: string};
  sourceRender: {path: string; expectedSha256: string; readbackSha256: string | null; shaMatch: QaState};
  resolve: {
    version: string | null;
    projectName: string | null;
    timelineName: string | null;
    timelineInsertion: QaState;
    durationAndFps: QaState;
  };
  finishing: {
    color: QaState;
    audio: QaState;
    titleSafeAndFraming: QaState;
    playback1x: QaState;
    playbackHalfSpeed: QaState;
  };
  export: {
    path: string | null;
    sha256: string | null;
    duration: QaState;
    dimensions: QaState;
    fps: QaState;
    audioPresent: QaState;
    watchedWithSound: QaState;
  };
  review: {
    overall: QaState;
    reviewer: string | null;
    reviewedAt: string | null;
    notes: string;
  };
  productionReady: false;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function loadBundle(): {bundle: ProductionBundle; bundleSha256: string} {
  if (!existsSync(bundlePath)) throw new Error('DAVINCI_FINISHING_BUNDLE_MISSING:run pnpm export:opening-v1-production-bundle after approved final render');
  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') throw new Error('DAVINCI_FINISHING_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') throw new Error('DAVINCI_FINISHING_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci.productionReady !== false) throw new Error('DAVINCI_FINISHING_UPSTREAM_BUNDLE_MUST_FAIL_CLOSED');
  if (bundle.finalRender.sha256 !== bundle.davinci.expectedSha256) throw new Error('DAVINCI_FINISHING_UPSTREAM_SHA_CONTRACT_MISMATCH');
  if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v2') throw new Error('DAVINCI_FINISHING_PALMIER_HANDOFF_CONTRACT_STALE');
  if (bundle.palmier?.timelineCsv !== rel(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_PATH_MISMATCH');
  if (!existsSync(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_MISSING');
  if (bundle.palmier?.timelineCsvSha256 !== shaFile(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_SHA_MISMATCH');
  if (bundle.palmier?.soundCueCsv !== rel(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_PATH_MISMATCH');
  if (!existsSync(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_MISSING');
  if (bundle.palmier?.soundCueCsvSha256 !== shaFile(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_SHA_MISMATCH');
  return {bundle, bundleSha256: shaFile(bundlePath)};
}

function initializeEvidence() {
  const {bundle, bundleSha256} = loadBundle();
  const sourcePath = join(studioRoot, bundle.finalRender.path);
  if (!existsSync(sourcePath)) throw new Error(`DAVINCI_FINISHING_SOURCE_RENDER_MISSING:${bundle.finalRender.path}`);
  const sourceSha = shaFile(sourcePath);
  if (sourceSha !== bundle.finalRender.sha256) throw new Error('DAVINCI_FINISHING_SOURCE_RENDER_SHA_MISMATCH');

  const evidence: FinishingEvidence = {
    schemaVersion: 'opening-v1-davinci-finishing-evidence/v1',
    authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE',
    boundAt: new Date().toISOString(),
    bundle: {path: rel(bundlePath), sha256: bundleSha256},
    sourceRender: {
      path: bundle.finalRender.path,
      expectedSha256: bundle.finalRender.sha256,
      readbackSha256: null,
      shaMatch: 'NOT_RUN',
    },
    resolve: {
      version: null,
      projectName: null,
      timelineName: null,
      timelineInsertion: 'NOT_RUN',
      durationAndFps: 'NOT_RUN',
    },
    finishing: {
      color: 'NOT_RUN',
      audio: 'NOT_RUN',
      titleSafeAndFraming: 'NOT_RUN',
      playback1x: 'NOT_RUN',
      playbackHalfSpeed: 'NOT_RUN',
    },
    export: {
      path: null,
      sha256: null,
      duration: 'NOT_RUN',
      dimensions: 'NOT_RUN',
      fps: 'NOT_RUN',
      audioPresent: 'NOT_RUN',
      watchedWithSound: 'NOT_RUN',
    },
    review: {overall: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''},
    productionReady: false,
  };

  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`Opening V1 DaVinci finishing evidence initialized: ${rel(evidencePath)}`);
  console.log('All Mac GUI Actual verdicts remain NOT_RUN. Fill them only after real Resolve operations.');
}

function verifyEvidence(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Opening V1 DaVinci finishing evidence: NOT_RUN (evidence file missing)');
    if (strict) process.exit(1);
    return;
  }

  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let bundle: ProductionBundle | null = null;
  let bundleSha256: string | null = null;
  try {
    const loaded = loadBundle();
    bundle = loaded.bundle;
    bundleSha256 = loaded.bundleSha256;
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }

  let evidence: FinishingEvidence | null = null;
  try {
    evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as FinishingEvidence;
  } catch {
    fail('DAVINCI_FINISHING_EVIDENCE_INVALID_JSON');
  }
  if (!evidence) {
    console.log(`Opening V1 DaVinci finishing evidence: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  if (evidence.schemaVersion !== 'opening-v1-davinci-finishing-evidence/v1') fail('DAVINCI_FINISHING_EVIDENCE_SCHEMA');
  if (evidence.authority !== 'MAC_DAVINCI_ACTUAL_EVIDENCE') fail('DAVINCI_FINISHING_EVIDENCE_AUTHORITY');
  if (evidence.productionReady !== false) fail('DAVINCI_FINISHING_EVIDENCE_MUST_NOT_SELF_PROMOTE');

  const boundAtMs = Date.parse(evidence.boundAt);
  if (!evidence.boundAt || Number.isNaN(boundAtMs)) fail('DAVINCI_FINISHING_BOUND_AT_INVALID');

  if (bundle && bundleSha256) {
    if (evidence.bundle.path !== rel(bundlePath)) fail('STALE_DAVINCI_FINISHING_BUNDLE_PATH');
    if (evidence.bundle.sha256 !== bundleSha256) fail('STALE_DAVINCI_FINISHING_BUNDLE_SHA');
    if (evidence.sourceRender.path !== bundle.finalRender.path) fail('STALE_DAVINCI_SOURCE_RENDER_PATH');
    if (evidence.sourceRender.expectedSha256 !== bundle.finalRender.sha256) fail('STALE_DAVINCI_SOURCE_EXPECTED_SHA');
    const sourcePath = join(studioRoot, bundle.finalRender.path);
    if (!existsSync(sourcePath)) fail('DAVINCI_SOURCE_RENDER_MISSING');
    else if (shaFile(sourcePath) !== bundle.finalRender.sha256) fail('DAVINCI_SOURCE_RENDER_SHA_CHANGED');
  }

  if (evidence.sourceRender.shaMatch !== 'PASS') fail(`SOURCE_SHA_MATCH_${evidence.sourceRender.shaMatch}`);
  if (!evidence.sourceRender.readbackSha256) fail('SOURCE_READBACK_SHA_MISSING');
  if (evidence.sourceRender.readbackSha256 && evidence.sourceRender.readbackSha256 !== evidence.sourceRender.expectedSha256) fail('SOURCE_READBACK_SHA_MISMATCH');
  if (!evidence.resolve.version?.trim()) fail('RESOLVE_VERSION_MISSING');
  if (!evidence.resolve.projectName?.trim()) fail('RESOLVE_PROJECT_NAME_MISSING');
  if (!evidence.resolve.timelineName?.trim()) fail('RESOLVE_TIMELINE_NAME_MISSING');
  for (const [axis, state] of Object.entries({
    timelineInsertion: evidence.resolve.timelineInsertion,
    durationAndFps: evidence.resolve.durationAndFps,
    color: evidence.finishing.color,
    audio: evidence.finishing.audio,
    titleSafeAndFraming: evidence.finishing.titleSafeAndFraming,
    playback1x: evidence.finishing.playback1x,
    playbackHalfSpeed: evidence.finishing.playbackHalfSpeed,
    exportDuration: evidence.export.duration,
    exportDimensions: evidence.export.dimensions,
    exportFps: evidence.export.fps,
    exportAudioPresent: evidence.export.audioPresent,
    watchedWithSound: evidence.export.watchedWithSound,
  })) {
    if (state !== 'PASS') fail(`DAVINCI_QA_${axis}_${state}`);
  }
  if (!evidence.export.path?.trim()) fail('DAVINCI_EXPORT_PATH_MISSING');
  if (!evidence.export.sha256?.trim()) fail('DAVINCI_EXPORT_SHA_MISSING');
  if (evidence.export.path?.trim() && evidence.export.sha256?.trim()) {
    const exportPath = join(studioRoot, evidence.export.path);
    if (!existsSync(exportPath)) fail('DAVINCI_EXPORT_FILE_MISSING');
    else if (shaFile(exportPath) !== evidence.export.sha256) fail('DAVINCI_EXPORT_SHA_MISMATCH');
  }
  if (evidence.review.overall !== 'PASS') fail(`DAVINCI_OVERALL_${evidence.review.overall}`);
  if (!evidence.review.reviewer?.trim()) fail('DAVINCI_REVIEWER_MISSING');
  const reviewedAtMs = evidence.review.reviewedAt ? Date.parse(evidence.review.reviewedAt) : Number.NaN;
  if (!evidence.review.reviewedAt || Number.isNaN(reviewedAtMs)) fail('DAVINCI_REVIEWED_AT_INVALID');
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) fail('DAVINCI_REVIEWED_BEFORE_BINDING');

  if (errors.length > 0) {
    console.log(`Opening V1 DaVinci finishing evidence: BLOCKED (${errors.length})`);
    for (const error of errors) console.log(`BLOCK / ${error}`);
    if (strict) process.exit(1);
    return;
  }

  console.log('Opening V1 DaVinci finishing evidence: ACTUAL_VERIFIED — current production bundle, versioned Palmier scene/sound handoff, source render and exported movie bytes match the recorded Mac Resolve evidence.');
  console.log('productionReady remains false here; final delivery approval is a separate human decision.');
}

if (mode === 'init') initializeEvidence();
else verifyEvidence(mode === 'strict');
