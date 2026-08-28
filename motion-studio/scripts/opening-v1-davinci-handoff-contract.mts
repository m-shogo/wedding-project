import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const recoveryPath = join(root, 'out/handoff/opening-v1/opening-v1-davinci-production-recovery.json');
const cropReviewPath = join(root, 'out/qa/opening-v1-crop-review-evidence.json');
const timelinePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCuePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const finalReviewPath = join(root, 'out/qa/opening-v1-final-render-review.json');
const evidencePath = join(root, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const defaultRenderPath = 'out/opening/opening_v1.mp4';
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

const blockers: string[] = [];
let bundle: any = null;
let recoverySidecar: any = null;
if (!existsSync(bundlePath)) blockers.push('OPENING_DAVINCI_BUNDLE_MISSING');
else {
  try { bundle = JSON.parse(readFileSync(bundlePath, 'utf8')); }
  catch { blockers.push('OPENING_DAVINCI_BUNDLE_INVALID_JSON'); }
}
if (!existsSync(recoveryPath)) blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_MISSING');
else {
  try { recoverySidecar = JSON.parse(readFileSync(recoveryPath, 'utf8')); }
  catch { blockers.push('OPENING_DAVINCI_RECOVERY_SIDECAR_INVALID_JSON'); }
}

if (bundle) {
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') blockers.push('OPENING_DAVINCI_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('OPENING_DAVINCI_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci?.intendedUse !== 'FINISHING_AND_OUTPUT_QA') blockers.push('OPENING_DAVINCI_INTENDED_USE_MISMATCH');
  if (bundle.davinci?.productionReady !== false) blockers.push('OPENING_DAVINCI_BUNDLE_MUST_FAIL_CLOSED');
  if (bundle.finalRender?.path !== bundle.davinci?.handoffAsset) blockers.push('OPENING_DAVINCI_HANDOFF_ASSET_PATH_MISMATCH');
  if (bundle.finalRender?.sha256 !== bundle.davinci?.expectedSha256) blockers.push('OPENING_DAVINCI_EXPECTED_SHA_MISMATCH');

  if (!existsSync(cropReviewPath)) blockers.push('OPENING_DAVINCI_CROP_REVIEW_MISSING');
  else {
    const cropSha = sha(cropReviewPath);
    let crop: any = null;
    try { crop = JSON.parse(readFileSync(cropReviewPath, 'utf8')); }
    catch { blockers.push('OPENING_DAVINCI_CROP_REVIEW_INVALID_JSON'); }
    if (bundle.humanCropReview?.evidencePath !== rel(cropReviewPath)) blockers.push('OPENING_DAVINCI_CROP_REVIEW_PATH_STALE');
    if (bundle.humanCropReview?.evidenceSha256 !== cropSha) blockers.push('OPENING_DAVINCI_CROP_REVIEW_SHA_STALE');
    if (bundle.davinci?.expectedCropReviewEvidenceSha256 !== cropSha) blockers.push('OPENING_DAVINCI_EXPECTED_CROP_REVIEW_SHA_STALE');
    if (crop?.overall !== 'PASS') blockers.push('OPENING_DAVINCI_CROP_REVIEW_NOT_PASS');
    if (crop?.bindingFingerprintSha256 && bundle.humanCropReview?.bindingFingerprintSha256 !== crop.bindingFingerprintSha256) blockers.push('OPENING_DAVINCI_CROP_REVIEW_FINGERPRINT_STALE');
    if (crop?.bindingFingerprintSha256 && bundle.palmier?.cropReviewBindingFingerprintSha256 !== crop.bindingFingerprintSha256) blockers.push('OPENING_DAVINCI_PALMIER_CROP_REVIEW_FINGERPRINT_STALE');
    if (crop?.bindingFingerprintSha256 && bundle.davinci?.expectedCropReviewBindingFingerprintSha256 !== crop.bindingFingerprintSha256) blockers.push('OPENING_DAVINCI_EXPECTED_CROP_REVIEW_FINGERPRINT_STALE');
  }

  if (!existsSync(finalReviewPath)) blockers.push('OPENING_DAVINCI_FINAL_RENDER_REVIEW_MISSING');
  else {
    const finalReviewSha = sha(finalReviewPath);
    if (bundle.humanFinalRenderReview?.evidencePath !== rel(finalReviewPath)) blockers.push('OPENING_DAVINCI_FINAL_RENDER_REVIEW_PATH_STALE');
    if (bundle.humanFinalRenderReview?.evidenceSha256 !== finalReviewSha) blockers.push('OPENING_DAVINCI_FINAL_RENDER_REVIEW_SHA_STALE');
    if (bundle.humanFinalRenderReview?.overall !== 'PASS') blockers.push('OPENING_DAVINCI_FINAL_RENDER_REVIEW_NOT_PASS');
    if (bundle.humanFinalRenderReview?.finalRenderPath !== bundle.finalRender?.path) blockers.push('OPENING_DAVINCI_FINAL_REVIEW_RENDER_PATH_MISMATCH');
    if (bundle.humanFinalRenderReview?.finalRenderSha256 !== bundle.finalRender?.sha256) blockers.push('OPENING_DAVINCI_FINAL_REVIEW_RENDER_SHA_MISMATCH');
    if (!bundle.humanFinalRenderReview?.reviewer) blockers.push('OPENING_DAVINCI_FINAL_RENDER_REVIEWER_MISSING');
  }

  if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v3') blockers.push('OPENING_DAVINCI_PALMIER_CONTRACT_STALE');
  if (bundle.palmier?.timelineCsv !== rel(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH');
  if (!existsSync(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_MISSING');
  else if (bundle.palmier?.timelineCsvSha256 !== sha(timelinePath)) blockers.push('OPENING_DAVINCI_PALMIER_TIMELINE_SHA_STALE');
  if (bundle.palmier?.soundCueCsv !== rel(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_PATH_MISMATCH');
  if (!existsSync(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_MISSING');
  else if (bundle.palmier?.soundCueCsvSha256 !== sha(soundCuePath)) blockers.push('OPENING_DAVINCI_PALMIER_SOUND_CUE_SHA_STALE');
  const renderPath = join(root, bundle.finalRender?.path ?? defaultRenderPath);
  if (!existsSync(renderPath)) blockers.push('OPENING_DAVINCI_SOURCE_RENDER_MISSING');
  else if (bundle.finalRender?.sha256 !== sha(renderPath)) blockers.push('OPENING_DAVINCI_SOURCE_RENDER_SHA_STALE');
}

if (recoverySidecar) {
  if (recoverySidecar.schemaVersion !== 'wedding-davinci-production-recovery-export/v1') blockers.push('OPENING_DAVINCI_RECOVERY_SCHEMA_MISMATCH');
  if (recoverySidecar.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') blockers.push('OPENING_DAVINCI_RECOVERY_AUTHORITY_MISMATCH');
  if (recoverySidecar.sourceBundle?.path !== rel(bundlePath)) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_PATH_STALE');
  if (recoverySidecar.sourceBundle?.schemaVersion !== bundle?.schemaVersion) blockers.push('OPENING_DAVINCI_RECOVERY_BUNDLE_SCHEMA_STALE');
  if (recoverySidecar.sourceBundle?.finalRenderPath !== bundle?.finalRender?.path) blockers.push('OPENING_DAVINCI_RECOVERY_RENDER_PATH_STALE');
  if (recoverySidecar.sourceBundle?.finalRenderSha256 !== bundle?.finalRender?.sha256) blockers.push('OPENING_DAVINCI_RECOVERY_RENDER_SHA_STALE');
  if (recoverySidecar.recovery?.authority !== 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY') blockers.push('OPENING_DAVINCI_RECOVERY_INNER_AUTHORITY_MISMATCH');
  if (recoverySidecar.recovery?.movieId !== 'opening') blockers.push('OPENING_DAVINCI_RECOVERY_MOVIE_MISMATCH');
  if (recoverySidecar.recovery?.stage !== 'davinciFinishing') blockers.push('OPENING_DAVINCI_RECOVERY_STAGE_MISMATCH');
  if (recoverySidecar.recovery?.artifactPath !== bundle?.davinci?.handoffAsset) blockers.push('OPENING_DAVINCI_RECOVERY_ARTIFACT_STALE');
  if (recoverySidecar.recovery?.productionReady !== false) blockers.push('OPENING_DAVINCI_RECOVERY_MUST_FAIL_CLOSED');
  if (recoverySidecar.recovery?.actual?.state !== 'NOT_RUN') blockers.push('OPENING_DAVINCI_RECOVERY_ACTUAL_MUST_BE_NOT_RUN');
  if (recoverySidecar.recovery?.actual?.evidencePath !== rel(evidencePath)) blockers.push('OPENING_DAVINCI_RECOVERY_EVIDENCE_PATH_STALE');
  if (recoverySidecar.recovery?.bridge?.macDaVinciActualVerified !== false) blockers.push('OPENING_DAVINCI_RECOVERY_MUST_NOT_VERIFY_ACTUAL');
  if (recoverySidecar.recovery?.actual?.commands?.strict !== 'pnpm opening:davinci-finishing:strict') blockers.push('OPENING_DAVINCI_RECOVERY_STRICT_COMMAND_STALE');
  if (!Array.isArray(recoverySidecar.recovery?.blockerCodes) || !recoverySidecar.recovery.blockerCodes.includes('MAC_DAVINCI_ACTUAL_NOT_VERIFIED')) blockers.push('OPENING_DAVINCI_RECOVERY_BLOCKER_CODES_STALE');
  if (!Array.isArray(recoverySidecar.recovery?.blockerActions) || !recoverySidecar.recovery.blockerActions.some((action: any) => action?.kind === 'HUMAN')) blockers.push('OPENING_DAVINCI_RECOVERY_HUMAN_ACTION_MISSING');
  if (!Array.isArray(recoverySidecar.recovery?.canonicalRecovery) || recoverySidecar.recovery.canonicalRecovery.length === 0) blockers.push('OPENING_DAVINCI_RECOVERY_CANONICAL_RECOVERY_MISSING');
}

const report = {
  schemaVersion: 'opening-v1-davinci-handoff/v1',
  authority: 'MOTION_STUDIO_OPENING_DAVINCI_HANDOFF',
  current: blockers.length === 0,
  sourceAuthorities: [
    'out/qa/opening-v1-crop-review-evidence.json',
    'scripts/export-opening-v1-production-bundle.mts#bundle.davinci',
    'scripts/export-wedding-davinci-production-recovery.mts',
    'scripts/opening-v1-davinci-finishing-evidence.mts',
  ],
  requiredHumanCropReview: {
    path: rel(cropReviewPath),
    schemaVersion: 'opening-v1-crop-review-evidence/v1',
    authority: 'HUMAN_OPENING_CROP_REVIEW',
    evidenceSha256: bundle?.davinci?.expectedCropReviewEvidenceSha256 ?? null,
    bindingFingerprintSha256: bundle?.davinci?.expectedCropReviewBindingFingerprintSha256 ?? null,
    mustPassBeforeDaVinciActual: true,
  },
  requiredHumanFinalRenderReview: {
    path: rel(finalReviewPath),
    schemaVersion: 'opening-v1-final-render-review/v1',
    authority: 'HUMAN_FINAL_RENDER_REVIEW',
    mustMatchBundleFinalRenderSha: true,
    mustPassBeforeDaVinciActual: true,
  },
  upstreamPalmier: {
    requiredContractVersion: 'opening-v1-palmier-handoff/v3',
    cropReviewBindingRequired: true,
    timelinePath: rel(timelinePath),
    soundCuePath: rel(soundCuePath),
  },
  handoffAsset: {
    path: bundle?.davinci?.handoffAsset ?? defaultRenderPath,
    expectedSha256: bundle?.davinci?.expectedSha256 ?? null,
    shaBound: true,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
  },
  productionRecovery: {
    path: rel(recoveryPath),
    schemaVersion: 'wedding-davinci-production-recovery-export/v1',
    authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
    sourceRenderSha256: recoverySidecar?.sourceBundle?.finalRenderSha256 ?? null,
    actualState: recoverySidecar?.recovery?.actual?.state ?? 'NOT_RUN',
    ...(recoverySidecar ? {
      blockerCodes: Array.isArray(recoverySidecar.recovery?.blockerCodes) ? [...recoverySidecar.recovery.blockerCodes] : [],
      blockerActions: Array.isArray(recoverySidecar.recovery?.blockerActions) ? recoverySidecar.recovery.blockerActions.map((action: any) => ({...action})) : [],
      canonicalRecovery: Array.isArray(recoverySidecar.recovery?.canonicalRecovery) ? [...recoverySidecar.recovery.canonicalRecovery] : [],
      guardrails: Array.isArray(recoverySidecar.recovery?.guardrails) ? [...recoverySidecar.recovery.guardrails] : [],
    } : {}),
    requiredCurrent: true,
  },
  actualEvidence: {
    path: rel(evidencePath),
    schemaVersion: 'opening-v1-davinci-finishing-evidence/v1',
    authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE',
    commands: {
      init: 'pnpm opening:davinci-finishing:init',
      status: 'pnpm opening:davinci-finishing',
      strict: 'pnpm opening:davinci-finishing:strict',
    },
    requiredChecks: [
      'source_render_sha_readback',
      'crop_review_evidence_sha_and_fingerprint',
      'resolve_version_project_timeline',
      'timeline_insertion',
      'duration_and_fps',
      'color_finish',
      'audio_finish',
      'title_safe_and_framing',
      'playback_1x',
      'playback_half_speed',
      'export_duration_dimensions_fps_audio',
      'watched_with_sound',
      'human_overall_review',
    ],
  },
  productionReady: false,
  blockers,
  guardrails: [
    'PHOTO_SHA_OR_EFFECTIVE_FOCUS_OR_FIT_CHANGED => CROP_REVIEW_STALE',
    'CROP_REVIEW_STALE => DAVINCI_HANDOFF_NOT_CURRENT',
    'PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS',
    'HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_SIDECAR_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_ACTION_EXPORTED != RECOVERY_EXECUTED',
    'DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_EVIDENCE_TEMPLATE != ACTUAL_EVIDENCE_PASS',
    'MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Opening DaVinci handoff: ${report.current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE'} / blockers=${blockers.length}`);
if (process.argv.includes('--strict') && !report.current) process.exit(1);