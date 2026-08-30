import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const adoptionRegistryPath = join(repoRoot, 'movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts');
const identityArtifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const outputPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-production-gate.json');
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

function readIdentityArtifact() {
  if (!existsSync(identityArtifactPath)) return null;
  try {
    return JSON.parse(readFileSync(identityArtifactPath, 'utf8'));
  } catch {
    return null;
  }
}

const canonicalBlockSha256 = sha256(canonicalTypographyBlock());
const identityArtifact = readIdentityArtifact();
const identityArtifactSha256 = identityArtifact ? sha256(JSON.stringify(identityArtifact)) : null;

function evaluate(movieId: 'opening' | 'profile') {
  const adoptedCandidateIds = adoptedIds(movieId);
  const identityRequired = adoptedCandidateIds.length > 0;
  if (!identityRequired) {
    return {
      movieId,
      adoptedCandidateIds,
      identityRequired,
      identityCurrent: true,
      gateState: 'NON_BLOCKING_UNADOPTED' as const,
      effectivePalmierCurrentAllowed: true,
      effectiveDavinciCurrentAllowed: true,
      effectiveDavinciRecoveryCurrentAllowed: true,
      blockerCodes: [] as string[],
    };
  }

  const blockers: string[] = [];
  if (!identityArtifact) blockers.push('REMOTION_ELEMENT_IDENTITY_ARTIFACT_MISSING_OR_INVALID');
  if (identityArtifact && identityArtifact.schemaVersion !== 'wedding-remotion-element-handoff-identities/v2') blockers.push('REMOTION_ELEMENT_IDENTITY_SCHEMA_MISMATCH');
  if (identityArtifact && identityArtifact.authority !== 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY') blockers.push('REMOTION_ELEMENT_IDENTITY_AUTHORITY_MISMATCH');
  if (identityArtifact && identityArtifact.canonicalSource?.blockSha256 !== canonicalBlockSha256) blockers.push('REMOTION_ELEMENT_CANONICAL_SOURCE_SHA_STALE');
  if (identityArtifact && (identityArtifact.catalogIdentities?.length ?? 0) === 0) blockers.push('REMOTION_ELEMENT_CATALOG_IDENTITIES_MISSING');

  const project = identityArtifact?.projects?.find((item: any) => item.movieId === movieId);
  if (identityArtifact && !project) blockers.push('REMOTION_ELEMENT_IDENTITY_PROJECT_MISSING');
  if (project) {
    const artifactIds = Array.isArray(project.adoptedCandidateIds) ? project.adoptedCandidateIds : [];
    if (JSON.stringify(artifactIds) !== JSON.stringify(adoptedCandidateIds)) blockers.push('REMOTION_ELEMENT_ADOPTION_IDENTITY_STALE');
    if ((project.identities?.length ?? 0) !== adoptedCandidateIds.length) blockers.push('REMOTION_ELEMENT_IDENTITY_CARDINALITY_MISMATCH');
    for (const patternId of adoptedCandidateIds) {
      const identity = project.identities?.find((item: any) => item.patternId === patternId);
      const catalogIdentity = identityArtifact?.catalogIdentities?.find((item: any) => item.patternId === patternId);
      if (!identity) blockers.push(`REMOTION_ELEMENT_IDENTITY_MISSING:${patternId}`);
      if (!catalogIdentity) blockers.push(`REMOTION_ELEMENT_CATALOG_IDENTITY_MISSING:${patternId}`);
      if (identity && catalogIdentity && JSON.stringify(identity) !== JSON.stringify(catalogIdentity)) blockers.push(`REMOTION_ELEMENT_ADOPTED_IDENTITY_CATALOG_MISMATCH:${patternId}`);
      if (identity && identity.canonicalBlockSha256 !== canonicalBlockSha256) blockers.push(`REMOTION_ELEMENT_CANONICAL_SOURCE_SHA_STALE:${patternId}`);
    }
  }

  const blockerCodes = [...new Set(blockers)].sort();
  const identityCurrent = blockerCodes.length === 0;
  return {
    movieId,
    adoptedCandidateIds,
    identityRequired,
    identityCurrent,
    gateState: identityCurrent ? 'CURRENT' as const : 'BLOCKED' as const,
    effectivePalmierCurrentAllowed: identityCurrent,
    effectiveDavinciCurrentAllowed: identityCurrent,
    effectiveDavinciRecoveryCurrentAllowed: identityCurrent,
    blockerCodes,
  };
}

const projects = [evaluate('opening'), evaluate('profile')];
const stablePayload = {
  schemaVersion: 'wedding-remotion-element-identity-production-gate-artifact/v1',
  authority: 'SHA_BOUND_REMOTION_ELEMENT_IDENTITY_PRODUCTION_GATE_ARTIFACT',
  canonicalBlockSha256,
  identityArtifactPath: 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json',
  identityArtifactSha256,
  identityArtifactSchemaVersion: identityArtifact?.schemaVersion ?? null,
  catalogIdentityCount: identityArtifact?.catalogIdentities?.length ?? 0,
  projects,
  productionGateBlocked: projects.some((project) => project.identityRequired && !project.identityCurrent),
  macRemotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  productionDependencyPromotedByArtifactExport: false,
  guardrails: [
    'UNADOPTED_REMOTION_ELEMENT_IDENTITY_GATE_ARTIFACT_IS_NON_BLOCKING',
    'CATALOG_IDENTITY_EXISTS != WEDDING_PROJECT_ADOPTED',
    'ADOPTED_ELEMENT_GATE_ARTIFACT_STALE => EFFECTIVE_PALMIER_CURRENT_FALSE',
    'ADOPTED_ELEMENT_GATE_ARTIFACT_STALE => EFFECTIVE_DAVINCI_CURRENT_FALSE',
    'ADOPTED_ELEMENT_GATE_ARTIFACT_STALE => DAVINCI_RECOVERY_CURRENT_FALSE',
    'GATE_ARTIFACT_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'GATE_ARTIFACT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_VERIFIED',
  ],
};
const artifact = {...stablePayload, artifactSha256: sha256(JSON.stringify(stablePayload))};
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(`wrote=${outputPath}`);
console.log(`artifactSha256=${artifact.artifactSha256}`);
console.log(`identityArtifactSchemaVersion=${artifact.identityArtifactSchemaVersion ?? 'MISSING'}`);
console.log(`catalogIdentityCount=${artifact.catalogIdentityCount}`);
console.log(`productionGateBlocked=${artifact.productionGateBlocked ? 'YES' : 'NO'}`);
console.log('macRemotionStudioGuiActual=NOT_RUN');
console.log('macDaVinciGuiActual=NOT_RUN');
