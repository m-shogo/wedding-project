import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';

type QaState = 'NOT_RUN' | 'PASS' | 'FAIL';
type TargetId = 'PRIMARY_USB' | 'BACKUP_USB' | 'CLOUD_BACKUP';
type CurrentnessCopy = {
  targetId: TargetId;
  path: string | null;
  state: 'CURRENT' | 'STALE';
  projectionManifestSha256: string | null;
  deliveryManifestSha256: string | null;
  openingSha256: string | null;
  profileSha256: string | null;
};
type Currentness = {
  schemaVersion: 'wedding-venue-delivery-redundancy-currentness/v1';
  authority: 'DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS';
  state: 'NOT_RUN' | 'CURRENT' | 'STALE';
  current: boolean;
  receiptSha256: string | null;
  mismatches: string[];
  source: {
    projectionManifestSha256: string | null;
    deliveryManifestSha256: string | null;
    openingSha256: string | null;
    profileSha256: string | null;
  } | null;
  copies: CurrentnessCopy[];
};
type HumanActual = {
  state: QaState;
  reviewer: string | null;
  reviewedAt: string | null;
  notes: string;
};
type VenueEvidence = {
  schemaVersion: 'wedding-venue-delivery-actual-evidence/v1';
  authority: 'HUMAN_VENUE_DELIVERY_ACTUAL';
  boundAt: string;
  sourceCurrentness: {
    path: string;
    sha256: string;
    receiptSha256: string;
  };
  targets: Array<{
    targetId: TargetId;
    path: string | null;
    projectionManifestSha256: string | null;
    deliveryManifestSha256: string | null;
    openingSha256: string | null;
    profileSha256: string | null;
    actual: HumanActual;
  }>;
  venuePlayback: {
    openingFullPlayback: HumanActual;
    profileFullPlayback: HumanActual;
    audioAudibleAndClean: HumanActual;
    fullscreenAndAspectCorrect: HumanActual;
    venueDevice: string | null;
  };
  review: HumanActual;
  evidenceBoundary: {
    remotionStudioGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE';
    palmierGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE';
    macDaVinciResolveGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE';
    humanFinalApproval: 'NOT_PROMOTED_BY_VENUE_EVIDENCE';
    productionReady: false;
  };
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const argValue = (name: string, fallback: string) => {
  const prefix = `--${name}=`;
  const hit = args.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : fallback;
};
const currentnessPath = resolve(root, argValue('currentness', 'out/handoff/wedding/wedding-venue-delivery-redundancy-currentness.json'));
const evidencePath = resolve(root, argValue('evidence', 'out/qa/wedding-venue-delivery-actual-evidence.json'));
const init = args.includes('--init');
const strict = args.includes('--strict');
const json = args.includes('--json');
const selfTest = args.includes('--self-test');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const expectedTargets: TargetId[] = ['PRIMARY_USB', 'BACKUP_USB', 'CLOUD_BACKUP'];

const loadCurrentness = (path: string) => {
  if (!existsSync(path)) throw new Error('VENUE_ACTUAL_CURRENTNESS_MISSING');
  let value: Currentness;
  try { value = JSON.parse(readFileSync(path, 'utf8')) as Currentness; }
  catch { throw new Error('VENUE_ACTUAL_CURRENTNESS_INVALID_JSON'); }
  if (value.schemaVersion !== 'wedding-venue-delivery-redundancy-currentness/v1'
    || value.authority !== 'DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS') throw new Error('VENUE_ACTUAL_CURRENTNESS_CONTRACT_INVALID');
  const ids = value.copies?.map((copy) => copy.targetId) ?? [];
  const targetSetOk = ids.length === expectedTargets.length
    && expectedTargets.every((id) => ids.filter((valueId) => valueId === id).length === 1);
  if (value.state !== 'CURRENT' || value.current !== true || value.mismatches?.length !== 0 || !value.receiptSha256 || !value.source || !targetSetOk || value.copies.some((copy) => copy.state !== 'CURRENT')) {
    throw new Error('VENUE_ACTUAL_CURRENTNESS_NOT_CURRENT');
  }
  return {value, sha256: shaFile(path)};
};

const blankActual = (): HumanActual => ({state: 'NOT_RUN', reviewer: null, reviewedAt: null, notes: ''});

const buildInitial = (currentness: Currentness, currentnessSha: string, currentnessFile: string): VenueEvidence => ({
  schemaVersion: 'wedding-venue-delivery-actual-evidence/v1',
  authority: 'HUMAN_VENUE_DELIVERY_ACTUAL',
  boundAt: new Date().toISOString(),
  sourceCurrentness: {
    path: rel(currentnessFile),
    sha256: currentnessSha,
    receiptSha256: currentness.receiptSha256!,
  },
  targets: expectedTargets.map((targetId) => {
    const copy = currentness.copies.find((item) => item.targetId === targetId)!;
    return {
      targetId,
      path: copy.path,
      projectionManifestSha256: copy.projectionManifestSha256,
      deliveryManifestSha256: copy.deliveryManifestSha256,
      openingSha256: copy.openingSha256,
      profileSha256: copy.profileSha256,
      actual: blankActual(),
    };
  }),
  venuePlayback: {
    openingFullPlayback: blankActual(),
    profileFullPlayback: blankActual(),
    audioAudibleAndClean: blankActual(),
    fullscreenAndAspectCorrect: blankActual(),
    venueDevice: null,
  },
  review: blankActual(),
  evidenceBoundary: {
    remotionStudioGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
    palmierGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
    macDaVinciResolveGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
    humanFinalApproval: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
    productionReady: false,
  },
});

const verifyActual = (label: string, actual: HumanActual | undefined, boundAtMs: number, errors: string[]) => {
  if (!actual) { errors.push(`${label}_MISSING`); return; }
  if (actual.state !== 'PASS') errors.push(`${label}_${actual.state ?? 'INVALID'}`);
  if (!actual.reviewer?.trim()) errors.push(`${label}_REVIEWER_MISSING`);
  const reviewedAtMs = actual.reviewedAt ? Date.parse(actual.reviewedAt) : Number.NaN;
  if (!actual.reviewedAt || Number.isNaN(reviewedAtMs)) errors.push(`${label}_REVIEWED_AT_INVALID`);
  else if (!Number.isNaN(boundAtMs) && reviewedAtMs < boundAtMs) errors.push(`${label}_REVIEWED_BEFORE_BINDING`);
};

const verifyEvidence = (evidence: VenueEvidence, currentness: Currentness, currentnessSha: string, currentnessFile: string) => {
  const errors: string[] = [];
  if (evidence.schemaVersion !== 'wedding-venue-delivery-actual-evidence/v1' || evidence.authority !== 'HUMAN_VENUE_DELIVERY_ACTUAL') errors.push('VENUE_ACTUAL_EVIDENCE_CONTRACT_INVALID');
  if (evidence.evidenceBoundary?.productionReady !== false
    || evidence.evidenceBoundary?.remotionStudioGuiActual !== 'NOT_PROMOTED_BY_VENUE_EVIDENCE'
    || evidence.evidenceBoundary?.palmierGuiActual !== 'NOT_PROMOTED_BY_VENUE_EVIDENCE'
    || evidence.evidenceBoundary?.macDaVinciResolveGuiActual !== 'NOT_PROMOTED_BY_VENUE_EVIDENCE'
    || evidence.evidenceBoundary?.humanFinalApproval !== 'NOT_PROMOTED_BY_VENUE_EVIDENCE') errors.push('VENUE_ACTUAL_EVIDENCE_BOUNDARY_INVALID');
  const boundAtMs = Date.parse(evidence.boundAt);
  if (!evidence.boundAt || Number.isNaN(boundAtMs)) errors.push('VENUE_ACTUAL_BOUND_AT_INVALID');
  if (evidence.sourceCurrentness?.path !== rel(currentnessFile)) errors.push('VENUE_ACTUAL_CURRENTNESS_PATH_STALE');
  if (evidence.sourceCurrentness?.sha256 !== currentnessSha) errors.push('VENUE_ACTUAL_CURRENTNESS_SHA_STALE');
  if (evidence.sourceCurrentness?.receiptSha256 !== currentness.receiptSha256) errors.push('VENUE_ACTUAL_RECEIPT_SHA_STALE');

  const ids = evidence.targets?.map((target) => target.targetId) ?? [];
  if (ids.length !== expectedTargets.length || !expectedTargets.every((id) => ids.filter((value) => value === id).length === 1)) errors.push('VENUE_ACTUAL_TARGET_SET_INVALID');
  for (const targetId of expectedTargets) {
    const carried = evidence.targets?.find((item) => item.targetId === targetId);
    const live = currentness.copies.find((item) => item.targetId === targetId);
    if (!carried || !live) { errors.push(`${targetId}_ACTUAL_BINDING_MISSING`); continue; }
    if (carried.path !== live.path) errors.push(`${targetId}_ACTUAL_PATH_STALE`);
    if (carried.projectionManifestSha256 !== live.projectionManifestSha256) errors.push(`${targetId}_ACTUAL_PROJECTION_SHA_STALE`);
    if (carried.deliveryManifestSha256 !== live.deliveryManifestSha256) errors.push(`${targetId}_ACTUAL_DELIVERY_SHA_STALE`);
    if (carried.openingSha256 !== live.openingSha256) errors.push(`${targetId}_ACTUAL_OPENING_SHA_STALE`);
    if (carried.profileSha256 !== live.profileSha256) errors.push(`${targetId}_ACTUAL_PROFILE_SHA_STALE`);
    verifyActual(`${targetId}_DELIVERY_ACTUAL`, carried.actual, boundAtMs, errors);
  }

  verifyActual('VENUE_OPENING_PLAYBACK_ACTUAL', evidence.venuePlayback?.openingFullPlayback, boundAtMs, errors);
  verifyActual('VENUE_PROFILE_PLAYBACK_ACTUAL', evidence.venuePlayback?.profileFullPlayback, boundAtMs, errors);
  verifyActual('VENUE_AUDIO_ACTUAL', evidence.venuePlayback?.audioAudibleAndClean, boundAtMs, errors);
  verifyActual('VENUE_FULLSCREEN_ASPECT_ACTUAL', evidence.venuePlayback?.fullscreenAndAspectCorrect, boundAtMs, errors);
  if (!evidence.venuePlayback?.venueDevice?.trim()) errors.push('VENUE_PLAYBACK_DEVICE_MISSING');
  verifyActual('VENUE_DELIVERY_OVERALL_ACTUAL', evidence.review, boundAtMs, errors);
  return errors;
};

const emit = (report: unknown, ok: boolean) => {
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    const value = report as {state?: string; errors?: string[]};
    console.log(`Wedding venue delivery Human Actual: ${value.state ?? 'INVALID'} / errors=${value.errors?.length ?? 0}`);
    for (const error of value.errors ?? []) console.log(`BLOCK / ${error}`);
  }
  if (strict && !ok) process.exitCode = 1;
};

function runSelfTest() {
  const dir = mkdtempSync(join(tmpdir(), 'wedding-venue-actual-'));
  try {
    const currentPath = join(dir, 'currentness.json');
    const current: Currentness = {
      schemaVersion: 'wedding-venue-delivery-redundancy-currentness/v1',
      authority: 'DERIVED_THREE_COPY_REDUNDANCY_CURRENTNESS',
      state: 'CURRENT', current: true, receiptSha256: 'receipt-sha', mismatches: [],
      source: {projectionManifestSha256: 'projection', deliveryManifestSha256: 'delivery', openingSha256: 'opening', profileSha256: 'profile'},
      copies: expectedTargets.map((targetId) => ({targetId, path: `/Volumes/${targetId}`, state: 'CURRENT', projectionManifestSha256: 'projection', deliveryManifestSha256: 'delivery', openingSha256: 'opening', profileSha256: 'profile'})),
    };
    writeFileSync(currentPath, `${JSON.stringify(current, null, 2)}\n`);
    const currentSha = shaFile(currentPath);
    const evidence = buildInitial(current, currentSha, currentPath);
    if (evidence.targets.some((target) => target.actual.state !== 'NOT_RUN') || evidence.review.state !== 'NOT_RUN' || evidence.venuePlayback.openingFullPlayback.state !== 'NOT_RUN') throw new Error('SELF_TEST_INIT_PROMOTED_ACTUAL');
    const reviewedAt = new Date(Date.parse(evidence.boundAt) + 1000).toISOString();
    const pass = (actual: HumanActual) => Object.assign(actual, {state: 'PASS' as const, reviewer: 'HUMAN_FIXTURE_ONLY', reviewedAt});
    evidence.targets.forEach((target) => pass(target.actual));
    pass(evidence.venuePlayback.openingFullPlayback);
    pass(evidence.venuePlayback.profileFullPlayback);
    pass(evidence.venuePlayback.audioAudibleAndClean);
    pass(evidence.venuePlayback.fullscreenAndAspectCorrect);
    evidence.venuePlayback.venueDevice = 'CI_FIXTURE_DEVICE';
    pass(evidence.review);
    if (verifyEvidence(evidence, current, currentSha, currentPath).length !== 0) throw new Error('SELF_TEST_PASS_FIXTURE_REJECTED');

    const stale = structuredClone(evidence);
    stale.targets[1]!.openingSha256 = 'tampered-opening';
    if (!verifyEvidence(stale, current, currentSha, currentPath).includes('BACKUP_USB_ACTUAL_OPENING_SHA_STALE')) throw new Error('SELF_TEST_STALE_TARGET_NOT_BLOCKED');

    const notRun = structuredClone(evidence);
    notRun.venuePlayback.profileFullPlayback.state = 'NOT_RUN';
    if (!verifyEvidence(notRun, current, currentSha, currentPath).includes('VENUE_PROFILE_PLAYBACK_ACTUAL_NOT_RUN')) throw new Error('SELF_TEST_NOT_RUN_NOT_BLOCKED');

    console.log('✅ Wedding venue delivery Human Actual self-test passed');
    console.log('✅ initial evidence keeps PRIMARY_USB/BACKUP_USB/CLOUD_BACKUP and venue playback Actual at NOT_RUN');
    console.log('✅ explicit Human PASS fixture verifies only when bound live SHAs remain CURRENT');
    console.log('✅ stale target hash and NOT_RUN playback both fail closed');
    console.log('✅ self-test PASS values are fixtures only and do not represent real physical/cloud/venue Actual');
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
}

if (selfTest) {
  runSelfTest();
} else {
  const current = loadCurrentness(currentnessPath);
  if (init) {
    const evidence = buildInitial(current.value, current.sha256, currentnessPath);
    mkdirSync(dirname(evidencePath), {recursive: true});
    writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
    console.log(`Wedding venue delivery Human Actual evidence initialized: ${rel(evidencePath)}`);
    console.log('PRIMARY_USB / BACKUP_USB / CLOUD_BACKUP delivery Actual = NOT_RUN');
    console.log('Venue Opening/Profile playback, audio, fullscreen/aspect Actual = NOT_RUN');
    console.log('Edit only after the Human has truly performed each external Actual step.');
  } else {
    if (!existsSync(evidencePath)) {
      emit({schemaVersion: 'wedding-venue-delivery-actual-evidence-verification/v1', authority: 'HUMAN_VENUE_DELIVERY_ACTUAL_VERIFICATION', state: 'NOT_RUN', actualVerified: false, errors: ['VENUE_ACTUAL_EVIDENCE_MISSING']}, false);
    } else {
      let evidence: VenueEvidence;
      try { evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as VenueEvidence; }
      catch { throw new Error('VENUE_ACTUAL_EVIDENCE_INVALID_JSON'); }
      const errors = verifyEvidence(evidence, current.value, current.sha256, currentnessPath);
      const ok = errors.length === 0;
      emit({
        schemaVersion: 'wedding-venue-delivery-actual-evidence-verification/v1',
        authority: 'HUMAN_VENUE_DELIVERY_ACTUAL_VERIFICATION',
        state: ok ? 'ACTUAL_VERIFIED' : 'BLOCKED',
        actualVerified: ok,
        sourceCurrentnessSha256: current.sha256,
        receiptSha256: current.value.receiptSha256,
        targetCount: evidence.targets?.length ?? 0,
        venuePlaybackVerified: ok,
        errors,
        evidenceBoundary: {
          productionReady: false,
          humanFinalApproval: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
          macDaVinciResolveGuiActual: 'NOT_PROMOTED_BY_VENUE_EVIDENCE',
        },
      }, ok);
    }
  }
}
