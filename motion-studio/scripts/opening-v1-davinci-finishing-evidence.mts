import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const recoveryPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json');
const cropReviewPath = join(studioRoot, 'out/qa/opening-v1-crop-review-evidence.json');
const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCueCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const finalReviewPath = join(studioRoot, 'out/qa/opening-v1-final-render-review.json');
const evidencePath = join(studioRoot, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--strict') ? 'strict' : 'status';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';

type ProductionBundle = {
  schemaVersion: 'opening-v1-production-bundle/v1';
  authority: 'FINAL_RENDER_BOUND_HANDOFF';
  finalRender: {path: string; sha256: string};
  humanCropReview: {
    evidencePath: string;
    evidenceSha256: string;
    bindingFingerprintSha256: string;
    boundAt: string;
    overall: string;
  };
  humanPreviewReview: {evidenceSha256: string; reviewer: string | null; reviewedAt: string | null; overall: string};
  humanFinalRenderReview: {
    evidencePath: string;
    evidenceSha256: string;
    boundAt: string;
    finalRenderPath: string;
    finalRenderSha256: string;
    renderSourceFingerprintSha256: string;
    reviewer: string | null;
    reviewedAt: string | null;
    overall: string;
    notes: string;
  };
  palmier: {
    handoffContractVersion: string;
    cropReviewBindingFingerprintSha256: string;
    timelineCsv: string;
    timelineCsvSha256: string;
    soundCueCsv: string;
    soundCueCsvSha256: string;
  };
  davinci: {
    expectedSha256: string;
    expectedCropReviewEvidenceSha256: string;
    expectedCropReviewBindingFingerprintSha256: string;
    productionReady: false;
  };
};

type CropReviewEvidence = {
  schemaVersion: 'opening-v1-crop-review-evidence/v1';
  authority: 'HUMAN_OPENING_CROP_REVIEW';
  bindingFingerprintSha256: string;
  overall: string;
  macStudioActual: 'NOT_RUN';
  macDaVinciActual: 'NOT_RUN';
  productionReady: false;
};

type RecoverySidecar = {
  schemaVersion: 'wedding-davinci-production-recovery-export/v1';
  authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY';
  sourceBundle: {
    path: string;
    schemaVersion: string;
    finalRenderPath: string;
    finalRenderSha256: string;
    cropReviewEvidencePath: string;
    cropReviewEvidenceSha256: string;
    cropReviewBindingFingerprintSha256: string;
  };
  recovery: {
    movieId: string;
    stage: string;
    artifactPath: string;
    productionReady: false;
    actual: {state: string; evidencePath: string};
    bridge: {macDaVinciActualVerified: boolean; finalDeliveryApproved: boolean};
  };
};

type RecoveryBinding = {
  path: string;
  sha256: string;
  sourceRenderSha256: string;
  cropReviewEvidenceSha256: string;
  cropReviewBindingFingerprintSha256: string;
};

type FinishingEvidence = {
  schemaVersion: 'opening-v1-davinci-finishing-evidence/v1';
  authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE';
  boundAt: string;
  bundle: {path: string; sha256: string};
  productionRecovery: RecoveryBinding;
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

function loadBundle(): {bundle: ProductionBundle; bundleSha256: string; recovery: RecoverySidecar; recoverySha256: string} {
  if (!existsSync(bundlePath)) throw new Error('DAVINCI_FINISHING_BUNDLE_MISSING:run pnpm export:opening-v1-production-bundle after approved final render');
  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') throw new Error('DAVINCI_FINISHING_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') throw new Error('DAVINCI_FINISHING_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci.productionReady !== false) throw new Error('DAVINCI_FINISHING_UPSTREAM_BUNDLE_MUST_FAIL_CLOSED');
  if (bundle.finalRender.sha256 !== bundle.davinci.expectedSha256) throw new Error('DAVINCI_FINISHING_UPSTREAM_SHA_CONTRACT_MISMATCH');

  if (!existsSync(cropReviewPath)) throw new Error('DAVINCI_FINISHING_CROP_REVIEW_MISSING');
  const crop = JSON.parse(readFileSync(cropReviewPath, 'utf8')) as CropReviewEvidence;
  if (crop.schemaVersion !== 'opening-v1-crop-review-evidence/v1' || crop.authority !== 'HUMAN_OPENING_CROP_REVIEW') throw new Error('DAVINCI_FINISHING_CROP_REVIEW_CONTRACT_INVALID');
  if (crop.overall !== 'PASS') throw new Error('DAVINCI_FINISHING_CROP_REVIEW_NOT_PASS');
  if (crop.macStudioActual !== 'NOT_RUN' || crop.macDaVinciActual !== 'NOT_RUN' || crop.productionReady !== false) throw new Error('DAVINCI_FINISHING_CROP_REVIEW_AUTHORITY_BOUNDARY_INVALID');
  const cropSha = shaFile(cropReviewPath);
  if (bundle.humanCropReview?.evidencePath !== rel(cropReviewPath)) throw new Error('DAVINCI_FINISHING_CROP_REVIEW_PATH_MISMATCH');
  if (bundle.humanCropReview?.evidenceSha256 !== cropSha || bundle.davinci?.expectedCropReviewEvidenceSha256 !== cropSha) throw new Error('DAVINCI_FINISHING_CROP_REVIEW_SHA_MISMATCH');
  if (bundle.humanCropReview?.bindingFingerprintSha256 !== crop.bindingFingerprintSha256 || bundle.palmier?.cropReviewBindingFingerprintSha256 !== crop.bindingFingerprintSha256 || bundle.davinci?.expectedCropReviewBindingFingerprintSha256 !== crop.bindingFingerprintSha256) throw new Error('DAVINCI_FINISHING_CROP_REVIEW_FINGERPRINT_MISMATCH');

  if (!existsSync(finalReviewPath)) throw new Error('DAVINCI_FINISHING_FINAL_RENDER_REVIEW_MISSING');
  if (bundle.humanFinalRenderReview?.evidencePath !== rel(finalReviewPath)) throw new Error('DAVINCI_FINISHING_FINAL_RENDER_REVIEW_PATH_MISMATCH');
  if (bundle.humanFinalRenderReview?.evidenceSha256 !== shaFile(finalReviewPath)) throw new Error('DAVINCI_FINISHING_FINAL_RENDER_REVIEW_SHA_MISMATCH');
  if (bundle.humanFinalRenderReview?.overall !== 'PASS') throw new Error('DAVINCI_FINISHING_FINAL_RENDER_REVIEW_NOT_PASS');
  if (!bundle.humanFinalRenderReview?.reviewer?.trim()) throw new Error('DAVINCI_FINISHING_FINAL_RENDER_REVIEWER_MISSING');
  if (bundle.humanFinalRenderReview?.finalRenderPath !== bundle.finalRender.path) throw new Error('DAVINCI_FINISHING_FINAL_REVIEW_RENDER_PATH_MISMATCH');
  if (bundle.humanFinalRenderReview?.finalRenderSha256 !== bundle.finalRender.sha256) throw new Error('DAVINCI_FINISHING_FINAL_REVIEW_RENDER_SHA_MISMATCH');

  if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v3') throw new Error('DAVINCI_FINISHING_PALMIER_HANDOFF_CONTRACT_STALE');
  if (bundle.palmier?.timelineCsv !== rel(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_PATH_MISMATCH');
  if (!existsSync(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_MISSING');
  if (bundle.palmier?.timelineCsvSha256 !== shaFile(timelineCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_TIMELINE_SHA_MISMATCH');
  if (bundle.palmier?.soundCueCsv !== rel(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_PATH_MISMATCH');
  if (!existsSync(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_MISSING');
  if (bundle.palmier?.soundCueCsvSha256 !== shaFile(soundCueCsvPath)) throw new Error('DAVINCI_FINISHING_PALMIER_SOUND_CUE_SHA_MISMATCH');

  if (!existsSync(recoveryPath)) throw new Error('DAVINCI_FINISHING_RECOVERY_SIDECAR_MISSING');
  let recovery: RecoverySidecar;
  try { recovery = JSON.parse(readFileSync(recoveryPath, 'utf8')) as RecoverySidecar; }
  catch { throw new Error('DAVINCI_FINISHING_RECOVERY_SIDECAR_INVALID_JSON'); }
  if (recovery.schemaVersion !== 'wedding-davinci-production-recovery-export/v1' || recovery.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') throw new Error('DAVINCI_FINISHING_RECOVERY_SIDECAR_CONTRACT');
  if (recovery.sourceBundle?.path !== rel(bundlePath) || recovery.sourceBundle?.schemaVersion !== bundle.schemaVersion) throw new Error('DAVINCI_FINISHING_RECOVERY_BUNDLE_STALE');
  if (recovery.sourceBundle?.finalRenderPath !== bundle.finalRender.path || recovery.sourceBundle?.finalRenderSha256 !== bundle.finalRender.sha256) throw new Error('DAVINCI_FINISHING_RECOVERY_RENDER_STALE');
  if (recovery.sourceBundle?.cropReviewEvidencePath !== bundle.humanCropReview.evidencePath || recovery.sourceBundle?.cropReviewEvidenceSha256 !== bundle.humanCropReview.evidenceSha256) throw new Error('DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_SHA_STALE');
  if (recovery.sourceBundle?.cropReviewBindingFingerprintSha256 !== bundle.humanCropReview.bindingFingerprintSha256) throw new Error('DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_FINGERPRINT_STALE');
  if (recovery.recovery?.movieId !== 'opening' || recovery.recovery?.stage !== 'davinciFinishing' || recovery.recovery?.artifactPath !== bundle.finalRender.path) throw new Error('DAVINCI_FINISHING_RECOVERY_TARGET_STALE');
  if (recovery.recovery?.productionReady !== false || recovery.recovery?.actual?.state !== 'NOT_RUN' || recovery.recovery?.bridge?.macDaVinciActualVerified !== false || recovery.recovery?.bridge?.finalDeliveryApproved !== false) throw new Error('DAVINCI_FINISHING_RECOVERY_MUST_PRECEDE_ACTUAL');
  if (recovery.recovery?.actual?.evidencePath !== rel(evidencePath)) throw new Error('DAVINCI_FINISHING_RECOVERY_EVIDENCE_PATH_STALE');
  return {bundle, bundleSha256: shaFile(bundlePath), recovery, recoverySha256: shaFile(recoveryPath)};
}

function initializeEvidence() {
  const {bundle, bundleSha256, recovery, recoverySha256} = loadBundle();
  const sourcePath = join(studioRoot, bundle.finalRender.path);
  if (!existsSync(sourcePath)) throw new Error(`DAVINCI_FINISHING_SOURCE_RENDER_MISSING:${bundle.finalRender.path}`);
  const sourceSha = shaFile(sourcePath);
  if (sourceSha !== bundle.finalRender.sha256) throw new Error('DAVINCI_FINISHING_SOURCE_RENDER_SHA_MISMATCH');

  const evidence: FinishingEvidence = {
    schemaVersion: 'opening-v1-davinci-finishing-evidence/v1',
    authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE',
    boundAt: new Date().toISOString(),
    bundle: {path: rel(bundlePath), sha256: bundleSha256},
    productionRecovery: {
      path: rel(recoveryPath),
      sha256: recoverySha256,
      sourceRenderSha256: recovery.sourceBundle.finalRenderSha256,
      cropReviewEvidenceSha256: recovery.sourceBundle.cropReviewEvidenceSha256,
      cropReviewBindingFingerprintSha256: recovery.sourceBundle.cropReviewBindingFingerprintSha256,
    },
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
  console.log('All Mac GUI Actual verdicts remain NOT_RUN. Current crop QA + current DaVinci recovery sidecar were required before this template could be created.');
}

function verifyEvidence(strict: boolean) {
  if (!existsSync(evidencePath)) {
    console.log('Opening V1 DaVinci finishing evidence: NOT_RUN (evidence file missing)');
    if (strict) process.exit(1);
    return;
  }

  const errors: string[] = [];
  const fail = (message: string) => errors.push(message);
  let loaded: ReturnType<typeof loadBundle> | null = null;
  try { loaded = loadBundle(); } catch (error) { fail(error instanceof Error ? error.message : String(error)); }

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

  if (loaded) {
    const {bundle, bundleSha256, recovery, recoverySha256} = loaded;
    if (evidence.bundle.path !== rel(bundlePath)) fail('STALE_DAVINCI_FINISHING_BUNDLE_PATH');
    if (evidence.bundle.sha256 !== bundleSha256) fail('STALE_DAVINCI_FINISHING_BUNDLE_SHA');
    if (evidence.productionRecovery?.path !== rel(recoveryPath)) fail('STALE_DAVINCI_FINISHING_RECOVERY_PATH');
    if (evidence.productionRecovery?.sha256 !== recoverySha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_SIDECAR');
    if (evidence.productionRecovery?.sourceRenderSha256 !== recovery.sourceBundle.finalRenderSha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_RENDER_SHA');
    if (evidence.productionRecovery?.cropReviewEvidenceSha256 !== recovery.sourceBundle.cropReviewEvidenceSha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_SHA');
    if (evidence.productionRecovery?.cropReviewBindingFingerprintSha256 !== recovery.sourceBundle.cropReviewBindingFingerprintSha256) fail('STALE_DAVINCI_FINISHING_RECOVERY_CROP_REVIEW_FINGERPRINT');
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

  console.log('Opening V1 DaVinci finishing evidence: ACTUAL_VERIFIED — current crop-bound production bundle, current DaVinci recovery sidecar, Human final-render review, versioned Palmier scene/sound handoff, source render and exported movie bytes match the recorded Mac Resolve evidence.');
  console.log('productionReady remains false here; final delivery approval is a separate human decision.');
}

if (mode === 'init') initializeEvidence();
else verifyEvidence(mode === 'strict');
