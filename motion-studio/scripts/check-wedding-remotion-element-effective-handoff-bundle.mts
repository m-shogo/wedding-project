import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const gateArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json');
const bundlePath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-effective-handoff-bundle.json');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

const blockers: string[] = [];
let gate: any = null;
let bundle: any = null;
let rawGate = '';

if (!existsSync(gateArtifactPath)) blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_MISSING');
else {
  try {
    rawGate = readFileSync(gateArtifactPath, 'utf8');
    gate = JSON.parse(rawGate);
  } catch {
    blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_INVALID');
  }
}

if (!existsSync(bundlePath)) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_MISSING');
else {
  try { bundle = JSON.parse(readFileSync(bundlePath, 'utf8')); }
  catch { blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_INVALID'); }
}

if (bundle) {
  if (bundle.schemaVersion !== 'wedding-remotion-element-effective-handoff-bundle/v1') blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'SHA_BOUND_REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE') blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_AUTHORITY_MISMATCH');
  const stablePayload = {...bundle};
  delete stablePayload.bundleSha256;
  if (bundle.bundleSha256 !== sha256(JSON.stringify(stablePayload))) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BUNDLE_SELF_SHA_INVALID');
}

if (gate && bundle) {
  if (bundle.sourceGateArtifactSha256 !== gate.artifactSha256) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_SOURCE_GATE_SHA_STALE');
  if (bundle.sourceGateFileSha256 !== sha256(rawGate)) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_SOURCE_GATE_FILE_SHA_STALE');
  if (Boolean(bundle.productionGateBlocked) !== Boolean(gate.productionGateBlocked)) blockers.push('REMOTION_ELEMENT_EFFECTIVE_HANDOFF_BLOCKED_STATE_STALE');

  for (const gateProject of gate.projects ?? []) {
    const project = bundle.projects?.find((item: any) => item.movieId === gateProject.movieId);
    if (!project) {
      blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_PROJECT_MISSING:${gateProject.movieId}`);
      continue;
    }
    if (JSON.stringify(project.adoptedCandidateIds ?? []) !== JSON.stringify(gateProject.adoptedCandidateIds ?? [])) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_ADOPTION_STALE:${gateProject.movieId}`);
    if (project.gateState !== gateProject.gateState) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_GATE_STATE_STALE:${gateProject.movieId}`);
    if (Boolean(project.palmier?.currentAllowed) !== Boolean(gateProject.effectivePalmierCurrentAllowed)) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_PALMIER_STATE_STALE:${gateProject.movieId}`);
    if (Boolean(project.davinci?.handoffCurrentAllowed) !== Boolean(gateProject.effectiveDavinciCurrentAllowed)) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_DAVINCI_STATE_STALE:${gateProject.movieId}`);
    if (Boolean(project.davinci?.recoveryCurrentAllowed) !== Boolean(gateProject.effectiveDavinciRecoveryCurrentAllowed)) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_DAVINCI_RECOVERY_STATE_STALE:${gateProject.movieId}`);
    if (project.palmier?.gateArtifactSha256 !== gate.artifactSha256) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_PALMIER_SHA_STALE:${gateProject.movieId}`);
    if (project.davinci?.gateArtifactSha256 !== gate.artifactSha256) blockers.push(`REMOTION_ELEMENT_EFFECTIVE_HANDOFF_DAVINCI_SHA_STALE:${gateProject.movieId}`);
  }
}

const blockerCodes = [...new Set(blockers)].sort();
const current = blockerCodes.length === 0;
console.log(JSON.stringify({
  schemaVersion: 'wedding-remotion-element-effective-handoff-currentness/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_EFFECTIVE_HANDOFF_CURRENTNESS',
  current,
  effectivePalmierCurrentAllowed: current,
  effectiveDavinciHandoffCurrentAllowed: current,
  effectiveDavinciRecoveryCurrentAllowed: current,
  blockerCodes,
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionDependencyPromotedByThisCheck: false,
  recovery: current ? [] : [
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts',
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-production-gate-artifact.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate-artifact.mts',
    'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-effective-handoff-bundle.mts',
    'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-effective-handoff-bundle.mts',
  ],
}, null, 2));
console.log(`effectiveHandoffBundleCurrent=${current ? 'YES' : 'NO'}`);
console.log(`effectivePalmierCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log(`effectiveDavinciHandoffCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log(`effectiveDavinciRecoveryCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
for (const blocker of blockerCodes) console.error(`BLOCK / ${blocker}`);
if (!current) process.exit(1);
