import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const adoptionRegistryPath = join(repoRoot, 'movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts');
const artifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
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

type ProjectGate = {
  movieId: 'opening' | 'profile';
  adoptedCandidateIds: string[];
  identityRequired: boolean;
  identityCurrent: boolean;
  state: 'NON_BLOCKING_UNADOPTED' | 'CURRENT' | 'BLOCKED';
  effectivePalmierCurrentAllowed: boolean;
  effectiveDavinciCurrentAllowed: boolean;
  blockerCodes: string[];
  recovery: string[];
};

const currentCanonicalSha = sha256(canonicalTypographyBlock());
let artifact: any = null;
if (existsSync(artifactPath)) {
  try {
    artifact = JSON.parse(readFileSync(artifactPath, 'utf8'));
  } catch {
    artifact = null;
  }
}

function evaluate(movieId: 'opening' | 'profile'): ProjectGate {
  const adoptedCandidateIds = adoptedIds(movieId);
  if (adoptedCandidateIds.length === 0) {
    return {
      movieId,
      adoptedCandidateIds,
      identityRequired: false,
      identityCurrent: true,
      state: 'NON_BLOCKING_UNADOPTED',
      effectivePalmierCurrentAllowed: true,
      effectiveDavinciCurrentAllowed: true,
      blockerCodes: [],
      recovery: [],
    };
  }

  const blockers: string[] = [];
  if (!artifact) blockers.push('REMOTION_ELEMENT_IDENTITY_ARTIFACT_MISSING_OR_INVALID');
  if (artifact && artifact.schemaVersion !== 'wedding-remotion-element-handoff-identities/v2') blockers.push('REMOTION_ELEMENT_IDENTITY_SCHEMA_MISMATCH');
  if (artifact && artifact.authority !== 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY') blockers.push('REMOTION_ELEMENT_IDENTITY_AUTHORITY_MISMATCH');
  if (artifact && artifact.canonicalSource?.blockSha256 !== currentCanonicalSha) blockers.push('REMOTION_ELEMENT_CANONICAL_SOURCE_SHA_STALE');
  if (artifact && (artifact.catalogIdentities?.length ?? 0) === 0) blockers.push('REMOTION_ELEMENT_CATALOG_IDENTITIES_MISSING');

  const project = artifact?.projects?.find((item: any) => item.movieId === movieId);
  if (artifact && !project) blockers.push('REMOTION_ELEMENT_IDENTITY_PROJECT_MISSING');
  if (project) {
    const artifactIds = Array.isArray(project.adoptedCandidateIds) ? project.adoptedCandidateIds : [];
    if (JSON.stringify(artifactIds) !== JSON.stringify(adoptedCandidateIds)) blockers.push('REMOTION_ELEMENT_ADOPTION_IDENTITY_STALE');
    if ((project.identities?.length ?? 0) !== adoptedCandidateIds.length) blockers.push('REMOTION_ELEMENT_IDENTITY_CARDINALITY_MISMATCH');
    for (const patternId of adoptedCandidateIds) {
      const identity = project.identities?.find((item: any) => item.patternId === patternId);
      const catalogIdentity = artifact?.catalogIdentities?.find((item: any) => item.patternId === patternId);
      if (!identity) {
        blockers.push(`REMOTION_ELEMENT_IDENTITY_MISSING:${patternId}`);
        continue;
      }
      if (!catalogIdentity) blockers.push(`REMOTION_ELEMENT_CATALOG_IDENTITY_MISSING:${patternId}`);
      if (catalogIdentity && JSON.stringify(identity) !== JSON.stringify(catalogIdentity)) blockers.push(`REMOTION_ELEMENT_ADOPTED_IDENTITY_CATALOG_MISMATCH:${patternId}`);
      if (identity.canonicalBlockSha256 !== currentCanonicalSha) blockers.push(`REMOTION_ELEMENT_CANONICAL_SOURCE_SHA_STALE:${patternId}`);
      if (identity.studioInstallActual !== 'NOT_RUN' && identity.studioInstallActual !== 'PASS') blockers.push(`REMOTION_ELEMENT_STUDIO_ACTUAL_INVALID:${patternId}`);
    }
  }

  const blockerCodes = [...new Set(blockers)].sort();
  const identityCurrent = blockerCodes.length === 0;
  return {
    movieId,
    adoptedCandidateIds,
    identityRequired: true,
    identityCurrent,
    state: identityCurrent ? 'CURRENT' : 'BLOCKED',
    effectivePalmierCurrentAllowed: identityCurrent,
    effectiveDavinciCurrentAllowed: identityCurrent,
    blockerCodes,
    recovery: identityCurrent ? [] : [
      'cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts',
      'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts',
      'cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-production-gate.mts',
    ],
  };
}

const projects = [evaluate('opening'), evaluate('profile')];
const gate = {
  schemaVersion: 'wedding-remotion-element-identity-production-gate/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE',
  canonicalBlockSha256: currentCanonicalSha,
  projects,
  productionGateBlocked: projects.some((project) => project.identityRequired && !project.identityCurrent),
  macRemotionStudioGuiActualPerformedByThisCheck: false,
  macDaVinciGuiActualPerformedByThisCheck: false,
  productionDependencyPromotedByThisCheck: false,
  guardrails: [
    'UNADOPTED_REMOTION_ELEMENT_IDENTITY_GATE_IS_NON_BLOCKING',
    'ADOPTED_ELEMENT_IDENTITY_STALE => EFFECTIVE_PALMIER_CURRENT_FALSE',
    'ADOPTED_ELEMENT_IDENTITY_STALE => EFFECTIVE_DAVINCI_CURRENT_FALSE',
    'IDENTITY_GATE_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'IDENTITY_GATE_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
  ],
};

console.log(JSON.stringify(gate, null, 2));
for (const project of projects) {
  console.log(`${project.movieId}IdentityGate=${project.state}`);
  console.log(`${project.movieId}EffectivePalmierCurrentAllowed=${project.effectivePalmierCurrentAllowed ? 'YES' : 'NO'}`);
  console.log(`${project.movieId}EffectiveDavinciCurrentAllowed=${project.effectiveDavinciCurrentAllowed ? 'YES' : 'NO'}`);
  for (const blocker of project.blockerCodes) console.error(`BLOCK / ${project.movieId}:${blocker}`);
}
console.log('macRemotionStudioGuiActualPerformedByThisCheck=NO');
console.log('macDaVinciGuiActualPerformedByThisCheck=NO');
console.log('productionDependencyPromotedByThisCheck=NO');

if (gate.productionGateBlocked) process.exit(1);
