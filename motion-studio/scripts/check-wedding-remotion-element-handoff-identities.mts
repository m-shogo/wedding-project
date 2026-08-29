import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {remotionElementCandidates} from '../../movie-dashboard/src/data/remotionElementCandidates.ts';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const adoptionRegistryPath = join(repoRoot, 'movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts');
const artifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const blockers: string[] = [];
const block = (code: string) => blockers.push(code);
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

if (!existsSync(artifactPath)) {
  console.error('BLOCK / HANDOFF_IDENTITY_ARTIFACT_MISSING');
  process.exit(1);
}

const currentCanonicalSha = sha256(canonicalTypographyBlock());
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as any;
if (artifact.schemaVersion !== 'wedding-remotion-element-handoff-identities/v1') block('HANDOFF_IDENTITY_SCHEMA_MISMATCH');
if (artifact.authority !== 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY') block('HANDOFF_IDENTITY_AUTHORITY_MISMATCH');
if (artifact.canonicalSource?.path !== 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine') block('CANONICAL_SOURCE_IDENTITY_MISMATCH');
if (artifact.canonicalSource?.blockSha256 !== currentCanonicalSha) block('CANONICAL_SOURCE_SHA_STALE');

const candidateById = new Map(remotionElementCandidates.map((candidate) => [candidate.patternId, candidate]));
for (const movieId of ['opening', 'profile'] as const) {
  const project = artifact.projects?.find((item: any) => item.movieId === movieId);
  const expectedIds = adoptedIds(movieId);
  if (!project) { block(`${movieId}:HANDOFF_IDENTITY_PROJECT_MISSING`); continue; }
  const actualIds = Array.isArray(project.adoptedCandidateIds) ? project.adoptedCandidateIds : [];
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) block(`${movieId}:ADOPTION_REGISTRY_MISMATCH`);
  if (project.adopted !== (expectedIds.length > 0)) block(`${movieId}:ADOPTED_FLAG_MISMATCH`);
  if ((project.identities?.length ?? 0) !== expectedIds.length) block(`${movieId}:IDENTITY_CARDINALITY_MISMATCH`);
  for (const patternId of expectedIds) {
    const candidate = candidateById.get(patternId);
    const identity = project.identities?.find((item: any) => item.patternId === patternId);
    if (!candidate) { block(`${movieId}:${patternId}:UNKNOWN_CANDIDATE`); continue; }
    if (!identity) { block(`${movieId}:${patternId}:IDENTITY_MISSING`); continue; }
    if (identity.canonicalEngine !== candidate.canonicalEngine) block(`${movieId}:${patternId}:CANONICAL_ENGINE_MISMATCH`);
    if (identity.canonicalMode !== candidate.canonicalMode) block(`${movieId}:${patternId}:CANONICAL_MODE_MISMATCH`);
    if (identity.canonicalSource !== 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine') block(`${movieId}:${patternId}:CANONICAL_SOURCE_MISMATCH`);
    if (identity.canonicalBlockSha256 !== currentCanonicalSha) block(`${movieId}:${patternId}:CANONICAL_SOURCE_SHA_STALE`);
    if (identity.studioInstallActual !== candidate.studioInstallActual) block(`${movieId}:${patternId}:STUDIO_INSTALL_ACTUAL_MISMATCH`);
    if (identity.studioControlReadbackActual !== candidate.studioControlReadbackActual) block(`${movieId}:${patternId}:STUDIO_CONTROL_READBACK_ACTUAL_MISMATCH`);
    if (identity.productionDependencyPromoted !== candidate.productionDependencyPromoted) block(`${movieId}:${patternId}:DEPENDENCY_PROMOTION_MISMATCH`);
  }
}
if (artifact.macRemotionStudioGuiActualPerformedByThisExport !== false) block('EXPORT_MUST_NOT_CLAIM_REMOTION_STUDIO_GUI_ACTUAL');
if (artifact.macDaVinciGuiActualPerformedByThisExport !== false) block('EXPORT_MUST_NOT_CLAIM_MAC_DAVINCI_GUI_ACTUAL');
if (artifact.productionDependencyPromotedByThisExport !== false) block('EXPORT_MUST_NOT_PROMOTE_PRODUCTION_DEPENDENCY');
for (const code of [...new Set(blockers)].sort()) console.error(`BLOCK / ${code}`);
if (blockers.length > 0) process.exit(1);
console.log('weddingRemotionElementHandoffIdentity=CURRENT_SHA_BOUND');
console.log(`canonicalBlockSha256=${currentCanonicalSha}`);
console.log('macRemotionStudioGuiActualPerformedByThisCheck=NO');
console.log('macDaVinciGuiActualPerformedByThisCheck=NO');
console.log('productionDependencyPromotedByThisCheck=NO');
