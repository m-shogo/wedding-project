import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {profileV1GeneratedAccentImplementations} from '../src/data/profileV1GeneratedAccentRegistry.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(root, 'out/handoff/profile-v1/profile-v1-production-bundle.json');
const recoveryPath = join(root, 'out/handoff/profile-v1/profile-v1-davinci-production-recovery.json');
const timelinePath = join(root, 'out/handoff/profile-v1/profile-v1-palmier-timeline.csv');
const finalReviewPath = join(root, 'out/qa/profile-v1-final-render-review.json');
const realMediaReviewPath = join(root, 'out/qa/profile-v1-real-media-review.json');
const evidencePath = join(root, 'out/qa/profile-v1-davinci-finishing-evidence.json');
const defaultRenderPath = 'out/profile/profile_v1.mp4';
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const accentSignature = (value: any) => `${value?.slotId ?? ''}|${value?.chapterId ?? ''}|${value?.implementation ?? ''}|${value?.canonicalReuse ?? ''}`;
const expectedAccentRoutes = profileV1GeneratedAccentImplementations.map(accentSignature).sort();
const sameRoutes = (routes: any) => Array.isArray(routes) && JSON.stringify(routes.map(accentSignature).sort()) === JSON.stringify(expectedAccentRoutes);

const blockers: string[] = [];
let bundle: any = null;
let recoverySidecar: any = null;
let currentRealMediaReview: any = null;
let currentRealMediaReviewSha256: string | null = null;
if (!existsSync(bundlePath)) blockers.push('PROFILE_DAVINCI_BUNDLE_MISSING');
else {
  try { bundle = JSON.parse(readFileSync(bundlePath, 'utf8')); }
  catch { blockers.push('PROFILE_DAVINCI_BUNDLE_INVALID_JSON'); }
}
if (!existsSync(recoveryPath)) blockers.push('PROFILE_DAVINCI_RECOVERY_SIDECAR_MISSING');
else {
  try { recoverySidecar = JSON.parse(readFileSync(recoveryPath, 'utf8')); }
  catch { blockers.push('PROFILE_DAVINCI_RECOVERY_SIDECAR_INVALID_JSON'); }
}
if (!existsSync(realMediaReviewPath)) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_MISSING');
else {
  currentRealMediaReviewSha256 = sha(realMediaReviewPath);
  try { currentRealMediaReview = JSON.parse(readFileSync(realMediaReviewPath, 'utf8')); }
  catch { blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_INVALID_JSON'); }
}

if (bundle) {
  if (bundle.schemaVersion !== 'profile-v1-production-bundle/v1') blockers.push('PROFILE_DAVINCI_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') blockers.push('PROFILE_DAVINCI_BUNDLE_AUTHORITY_MISMATCH');
  if (bundle.davinci?.intendedUse !== 'FINISHING_AND_OUTPUT_QA') blockers.push('PROFILE_DAVINCI_INTENDED_USE_MISMATCH');
  if (bundle.davinci?.productionReady !== false) blockers.push('PROFILE_DAVINCI_BUNDLE_MUST_FAIL_CLOSED');
  if (bundle.finalRender?.path !== bundle.davinci?.handoffAsset) blockers.push('PROFILE_DAVINCI_HANDOFF_ASSET_PATH_MISMATCH');
  if (bundle.finalRender?.sha256 !== bundle.davinci?.expectedSha256) blockers.push('PROFILE_DAVINCI_EXPECTED_SHA_MISMATCH');

  if (!existsSync(finalReviewPath)) blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_MISSING');
  else {
    let review: any = null;
    try { review = JSON.parse(readFileSync(finalReviewPath, 'utf8')); }
    catch { blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_INVALID_JSON'); }
    if (review) {
      if (review.schemaVersion !== 'profile-v1-final-render-review/v1') blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_SCHEMA');
      if (review.authority !== 'HUMAN_FINAL_RENDER_REVIEW') blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_AUTHORITY');
      if (review.review?.overall !== 'PASS') blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_NOT_PASS');
      if (!review.review?.reviewer?.trim()) blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEWER_MISSING');
      if (review.finalRender?.path !== bundle.finalRender?.path) blockers.push('PROFILE_DAVINCI_FINAL_REVIEW_RENDER_PATH_MISMATCH');
      if (review.finalRender?.sha256 !== bundle.finalRender?.sha256) blockers.push('PROFILE_DAVINCI_FINAL_REVIEW_RENDER_SHA_MISMATCH');
      if (review.macDaVinciActual !== 'NOT_RUN') blockers.push('PROFILE_DAVINCI_FINAL_REVIEW_MUST_PRECEDE_ACTUAL');
      if (review.productionReady !== false) blockers.push('PROFILE_DAVINCI_FINAL_REVIEW_MUST_FAIL_CLOSED');
    }
    if (bundle.humanFinalRenderReview?.evidencePath !== rel(finalReviewPath)) blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_PATH_STALE');
    if (bundle.humanFinalRenderReview?.evidenceSha256 !== sha(finalReviewPath)) blockers.push('PROFILE_DAVINCI_FINAL_RENDER_REVIEW_SHA_STALE');
  }

  if (currentRealMediaReview) {
    if (currentRealMediaReview.schemaVersion !== 'profile-v1-real-media-review/v1') blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_SCHEMA');
    if (currentRealMediaReview.authority !== 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW') blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_AUTHORITY');
    if (currentRealMediaReview.review?.overall !== 'PASS' || !currentRealMediaReview.review?.reviewer?.trim()) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_NOT_PASS');
    if (currentRealMediaReview.macDaVinciActual !== 'NOT_RUN' || currentRealMediaReview.productionReady !== false) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_MUST_PRECEDE_ACTUAL');
    if (bundle.realMediaHumanQa?.evidencePath !== rel(realMediaReviewPath)) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_PATH_STALE');
    if (bundle.realMediaHumanQa?.evidenceSha256 !== currentRealMediaReviewSha256) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_SHA_STALE');
    if (!bundle.realMediaHumanQa?.bindingFingerprintSha256) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_FINGERPRINT_MISSING');
    if (bundle.realMediaHumanQa?.previewSourceFingerprintSha256 !== currentRealMediaReview.previewSourceFingerprintSha256) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_PREVIEW_SOURCE_STALE');
    if (bundle.realMediaHumanQa?.canonicalPlanFingerprint !== currentRealMediaReview.canonicalPlanFingerprint) blockers.push('PROFILE_DAVINCI_REAL_MEDIA_HUMAN_QA_CANONICAL_PLAN_STALE');
    if (bundle.upstreamHumanEvidence?.realMediaReviewSha256 !== currentRealMediaReviewSha256) blockers.push('PROFILE_DAVINCI_UPSTREAM_REAL_MEDIA_HUMAN_QA_SHA_STALE');
    if (bundle.upstreamHumanEvidence?.realMediaReviewBindingFingerprintSha256 !== bundle.realMediaHumanQa?.bindingFingerprintSha256) blockers.push('PROFILE_DAVINCI_UPSTREAM_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
    if (bundle.palmier?.realMediaHumanQaBindingFingerprintSha256 !== bundle.realMediaHumanQa?.bindingFingerprintSha256) blockers.push('PROFILE_DAVINCI_PALMIER_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
    if (bundle.davinci?.expectedRealMediaHumanQaEvidenceSha256 !== currentRealMediaReviewSha256) blockers.push('PROFILE_DAVINCI_EXPECTED_REAL_MEDIA_HUMAN_QA_SHA_STALE');
    if (bundle.davinci?.expectedRealMediaHumanQaBindingFingerprintSha256 !== bundle.realMediaHumanQa?.bindingFingerprintSha256) blockers.push('PROFILE_DAVINCI_EXPECTED_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
  }

  if (!sameRoutes(bundle.generatedAccents)) blockers.push('PROFILE_DAVINCI_GENERATED_ACCENT_ROUTES_STALE');
  if (!sameRoutes(bundle.davinci?.generatedAccentRoutes)) blockers.push('PROFILE_DAVINCI_DAVINCI_ACCENT_ROUTES_STALE');
  if (bundle.palmier?.generatedAccentAuthority !== 'PROFILE_V1_GENERATED_ACCENT_REGISTRY') blockers.push('PROFILE_DAVINCI_PALMIER_ACCENT_AUTHORITY_MISSING');
  if (bundle.palmier?.timelineCsv !== rel(timelinePath)) blockers.push('PROFILE_DAVINCI_PALMIER_TIMELINE_PATH_MISMATCH');
  if (!existsSync(timelinePath)) blockers.push('PROFILE_DAVINCI_PALMIER_TIMELINE_MISSING');
  else if (bundle.palmier?.timelineCsvSha256 !== sha(timelinePath)) blockers.push('PROFILE_DAVINCI_PALMIER_TIMELINE_SHA_STALE');
  const renderPath = join(root, bundle.finalRender?.path ?? defaultRenderPath);
  if (!existsSync(renderPath)) blockers.push('PROFILE_DAVINCI_SOURCE_RENDER_MISSING');
  else if (bundle.finalRender?.sha256 !== sha(renderPath)) blockers.push('PROFILE_DAVINCI_SOURCE_RENDER_SHA_STALE');
}

if (recoverySidecar) {
  if (recoverySidecar.schemaVersion !== 'wedding-davinci-production-recovery-export/v1') blockers.push('PROFILE_DAVINCI_RECOVERY_SCHEMA_MISMATCH');
  if (recoverySidecar.authority !== 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY') blockers.push('PROFILE_DAVINCI_RECOVERY_AUTHORITY_MISMATCH');
  if (recoverySidecar.sourceBundle?.path !== rel(bundlePath)) blockers.push('PROFILE_DAVINCI_RECOVERY_BUNDLE_PATH_STALE');
  if (recoverySidecar.sourceBundle?.schemaVersion !== bundle?.schemaVersion) blockers.push('PROFILE_DAVINCI_RECOVERY_BUNDLE_SCHEMA_STALE');
  if (recoverySidecar.sourceBundle?.finalRenderPath !== bundle?.finalRender?.path) blockers.push('PROFILE_DAVINCI_RECOVERY_RENDER_PATH_STALE');
  if (recoverySidecar.sourceBundle?.finalRenderSha256 !== bundle?.finalRender?.sha256) blockers.push('PROFILE_DAVINCI_RECOVERY_RENDER_SHA_STALE');
  if (recoverySidecar.sourceBundle?.realMediaHumanQaEvidencePath !== bundle?.realMediaHumanQa?.evidencePath) blockers.push('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_PATH_STALE');
  if (recoverySidecar.sourceBundle?.realMediaHumanQaEvidenceSha256 !== bundle?.realMediaHumanQa?.evidenceSha256) blockers.push('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_SHA_STALE');
  if (recoverySidecar.sourceBundle?.realMediaHumanQaBindingFingerprintSha256 !== bundle?.realMediaHumanQa?.bindingFingerprintSha256) blockers.push('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_FINGERPRINT_STALE');
  if (recoverySidecar.sourceBundle?.realMediaHumanQaPreviewSourceFingerprintSha256 !== bundle?.realMediaHumanQa?.previewSourceFingerprintSha256) blockers.push('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_PREVIEW_SOURCE_STALE');
  if (recoverySidecar.sourceBundle?.realMediaHumanQaCanonicalPlanFingerprint !== bundle?.realMediaHumanQa?.canonicalPlanFingerprint) blockers.push('PROFILE_DAVINCI_RECOVERY_REAL_MEDIA_HUMAN_QA_CANONICAL_PLAN_STALE');
  if (recoverySidecar.recovery?.authority !== 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY') blockers.push('PROFILE_DAVINCI_RECOVERY_INNER_AUTHORITY_MISMATCH');
  if (recoverySidecar.recovery?.movieId !== 'profile') blockers.push('PROFILE_DAVINCI_RECOVERY_MOVIE_MISMATCH');
  if (recoverySidecar.recovery?.stage !== 'davinciFinishing') blockers.push('PROFILE_DAVINCI_RECOVERY_STAGE_MISMATCH');
  if (recoverySidecar.recovery?.artifactPath !== bundle?.davinci?.handoffAsset) blockers.push('PROFILE_DAVINCI_RECOVERY_ARTIFACT_STALE');
  if (recoverySidecar.recovery?.productionReady !== false) blockers.push('PROFILE_DAVINCI_RECOVERY_MUST_FAIL_CLOSED');
  if (recoverySidecar.recovery?.actual?.state !== 'NOT_RUN') blockers.push('PROFILE_DAVINCI_RECOVERY_ACTUAL_MUST_BE_NOT_RUN');
  if (recoverySidecar.recovery?.actual?.evidencePath !== rel(evidencePath)) blockers.push('PROFILE_DAVINCI_RECOVERY_EVIDENCE_PATH_STALE');
  if (recoverySidecar.recovery?.bridge?.macDaVinciActualVerified !== false) blockers.push('PROFILE_DAVINCI_RECOVERY_MUST_NOT_VERIFY_ACTUAL');
  if (recoverySidecar.recovery?.actual?.commands?.strict !== 'pnpm profile:davinci-finishing:strict') blockers.push('PROFILE_DAVINCI_RECOVERY_STRICT_COMMAND_STALE');
  if (!Array.isArray(recoverySidecar.recovery?.blockerCodes) || !recoverySidecar.recovery.blockerCodes.includes('MAC_DAVINCI_ACTUAL_NOT_VERIFIED')) blockers.push('PROFILE_DAVINCI_RECOVERY_BLOCKER_CODES_STALE');
  if (!Array.isArray(recoverySidecar.recovery?.blockerActions) || !recoverySidecar.recovery.blockerActions.some((action: any) => action?.kind === 'HUMAN')) blockers.push('PROFILE_DAVINCI_RECOVERY_HUMAN_ACTION_MISSING');
  if (!Array.isArray(recoverySidecar.recovery?.canonicalRecovery) || recoverySidecar.recovery.canonicalRecovery.length === 0) blockers.push('PROFILE_DAVINCI_RECOVERY_CANONICAL_RECOVERY_MISSING');
}

const report = {
  schemaVersion: 'profile-v1-davinci-handoff/v1',
  authority: 'MOTION_STUDIO_PROFILE_DAVINCI_HANDOFF',
  current: blockers.length === 0,
  sourceAuthorities: [
    'scripts/export-profile-v1-production-bundle.mts#bundle.davinci',
    'scripts/profile-v1-real-media-review.mts',
    'scripts/export-wedding-davinci-production-recovery.mts',
    'src/data/profileV1GeneratedAccentRegistry.ts#profileV1GeneratedAccentImplementations',
    'scripts/profile-v1-davinci-finishing-evidence.mts',
  ],
  requiredHumanFinalRenderReview: {
    path: rel(finalReviewPath),
    schemaVersion: 'profile-v1-final-render-review/v1',
    authority: 'HUMAN_FINAL_RENDER_REVIEW',
    mustMatchBundleFinalRenderSha: true,
    mustPassBeforeDaVinciActual: true,
  },
  requiredRealMediaHumanQa: {
    path: rel(realMediaReviewPath),
    schemaVersion: 'profile-v1-real-media-review/v1',
    authority: 'HUMAN_REAL_MEDIA_PREVIEW_REVIEW',
    evidenceSha256: currentRealMediaReviewSha256,
    bindingFingerprintSha256: bundle?.realMediaHumanQa?.bindingFingerprintSha256 ?? null,
    previewSourceFingerprintSha256: currentRealMediaReview?.previewSourceFingerprintSha256 ?? null,
    canonicalPlanFingerprint: currentRealMediaReview?.canonicalPlanFingerprint ?? null,
    mustRemainCurrentThroughRecoveryExport: true,
  },
  upstreamPalmier: {
    timelinePath: rel(timelinePath),
    generatedAccentAuthority: 'PROFILE_V1_GENERATED_ACCENT_REGISTRY',
    realMediaHumanQaBindingFingerprintSha256: bundle?.palmier?.realMediaHumanQaBindingFingerprintSha256 ?? null,
  },
  handoffAsset: {
    path: bundle?.davinci?.handoffAsset ?? defaultRenderPath,
    expectedSha256: bundle?.davinci?.expectedSha256 ?? null,
    shaBound: true,
    intendedUse: 'FINISHING_AND_OUTPUT_QA',
  },
  generatedAccentRoutes: profileV1GeneratedAccentImplementations.map((route) => ({...route})),
  productionRecovery: {
    path: rel(recoveryPath),
    schemaVersion: 'wedding-davinci-production-recovery-export/v1',
    authority: 'FINAL_RENDER_BOUND_DAVINCI_RECOVERY',
    sourceRenderSha256: recoverySidecar?.sourceBundle?.finalRenderSha256 ?? null,
    realMediaHumanQaEvidenceSha256: recoverySidecar?.sourceBundle?.realMediaHumanQaEvidenceSha256 ?? null,
    realMediaHumanQaBindingFingerprintSha256: recoverySidecar?.sourceBundle?.realMediaHumanQaBindingFingerprintSha256 ?? null,
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
    schemaVersion: 'profile-v1-davinci-finishing-evidence/v1',
    authority: 'MAC_DAVINCI_ACTUAL_EVIDENCE',
    commands: {
      init: 'pnpm profile:davinci-finishing:init',
      status: 'pnpm profile:davinci-finishing',
      strict: 'pnpm profile:davinci-finishing:strict',
    },
    requiredChecks: [
      'source_render_sha_readback',
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
    'FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED',
    'PROFILE_REAL_MEDIA_HUMAN_QA_CHANGED => DAVINCI_RECOVERY_SIDECAR_STALE',
    'PROFILE_REAL_MEDIA_HUMAN_QA_BINDING_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_SIDECAR_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_RECOVERY_ACTION_EXPORTED != RECOVERY_EXECUTED',
    'DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'GENERATED_ACCENT_ROUTE_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
    'DAVINCI_EVIDENCE_TEMPLATE != ACTUAL_EVIDENCE_PASS',
    'MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else console.log(`Profile DaVinci handoff: ${report.current ? 'CURRENT' : 'NOT_EXPORTED_OR_STALE'} / blockers=${blockers.length}`);
if (process.argv.includes('--strict') && !report.current) process.exit(1);
