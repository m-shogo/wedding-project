import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const adoptionRegistryPath = join(repoRoot, 'movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts');
const identityArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const gateArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const start = source.indexOf('export type MotionIntensity');
  const end = source.indexOf('export type CameraTransformMode');
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  return source.slice(start, end).trim();
}

function adoptedIds(movieId: 'opening' | 'profile') {
  const source = readFileSync(adoptionRegistryPath, 'utf8');
  const match = source.match(new RegExp(`\\b${movieId}:\\s*\\[([^\\]]*)\\]`));
  if (!match) throw new Error(`ADOPTION_REGISTRY_NOT_PARSEABLE:${movieId}`);
  return [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]);
}

const blockers: string[] = [];
let artifact: any = null;
if (!existsSync(gateArtifactPath)) blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_MISSING');
else {
  try { artifact = JSON.parse(readFileSync(gateArtifactPath, 'utf8')); }
  catch { blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_INVALID_JSON'); }
}

if (artifact) {
  if (artifact.schemaVersion !== 'wedding-remotion-element-identity-production-gate-artifact/v1') blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_SCHEMA_MISMATCH');
  if (artifact.authority !== 'SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT') blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_AUTHORITY_MISMATCH');
  const currentCanonicalSha = sha256(canonicalTypographyBlock());
  if (artifact.canonicalBlockSha256 !== currentCanonicalSha) blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_CANONICAL_SHA_STALE');

  const identitySha = existsSync(identityArtifactPath)
    ? (() => { try { return sha256(JSON.stringify(JSON.parse(readFileSync(identityArtifactPath, 'utf8')))); } catch { return null; } })()
    : null;
  if (artifact.identityArtifactSha256 !== identitySha) blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_IDENTITY_SHA_STALE');

  const stablePayload = {...artifact};
  delete stablePayload.artifactSha256;
  if (artifact.artifactSha256 !== sha256(JSON.stringify(stablePayload))) blockers.push('REMOTION_ELEMENT_GATE_ARTIFACT_SELF_SHA_INVALID');

  for (const movieId of ['opening', 'profile'] as const) {
    const adoptedCandidateIds = adoptedIds(movieId);
    const project = artifact.projects?.find((item: any) => item.movieId === movieId);
    if (!project) {
      blockers.push(`REMOTION_ELEMENT_GATE_ARTIFACT_PROJECT_MISSING:${movieId}`);
      continue;
    }
    if (JSON.stringify(project.adoptedCandidateIds ?? []) !== JSON.stringify(adoptedCandidateIds)) blockers.push(`REMOTION_ELEMENT_GATE_ARTIFACT_ADOPTION_STALE:${movieId}`);
    const required = adoptedCandidateIds.length > 0;
    if (Boolean(project.identityRequired) !== required) blockers.push(`REMOTION_ELEMENT_GATE_ARTIFACT_REQUIRED_STATE_STALE:${movieId}`);
    if (!required && project.gateState !== 'NON_BLOCKING_UNADOPTED') blockers.push(`REMOTION_ELEMENT_GATE_ARTIFACT_UNADOPTED_STATE_INVALID:${movieId}`);
    if (required && project.gateState !== 'CURRENT') blockers.push(`REMOTION_ELEMENT_GATE_ARTIFACT_NOT_CURRENT:${movieId}`);
  }
}

const blockerCodes = [...new Set(blockers)].sort();
const current = blockerCodes.length === 0;
console.log(JSON.stringify({
  schemaVersion: 'wedding-remotion-element-identity-production-gate-artifact-currentness/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT_CURRENTNESS',
  current,
  effectivePalmierCurrentAllowed: current,
  effectiveDavinciCurrentAllowed: current,
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
  ],
}, null, 2));
console.log(`gateArtifactCurrent=${current ? 'YES' : 'NO'}`);
console.log(`effectivePalmierCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log(`effectiveDavinciCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log(`effectiveDavinciRecoveryCurrentAllowed=${current ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
for (const blocker of blockerCodes) console.error(`BLOCK / ${blocker}`);
if (!current) process.exit(1);
