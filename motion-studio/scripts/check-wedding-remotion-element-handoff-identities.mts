import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {remotionElementCandidates} from '../../movie-dashboard/src/data/remotionElementCandidates.ts';
import {remotionStudioToolingProductionAdoption} from '../../movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const artifactPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');
const blockers: string[] = [];
const block = (code: string) => blockers.push(code);
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const startMarker = 'export type MotionIntensity';
  const endMarker = 'export type CameraTransformMode';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  return source.slice(start, end).trim();
}

if (!existsSync(artifactPath)) {
  console.error('BLOCK / HANDOFF_IDENTITY_ARTIFACT_MISSING');
  process.exit(1);
}

const currentCanonicalSha = sha256(canonicalTypographyBlock());
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8')) as {
  schemaVersion?: string;
  authority?: string;
  canonicalSource?: {path?: string; blockSha256?: string};
  projects?: Array<{
    movieId?: string;
    adopted?: boolean;
    adoptedCandidateIds?: string[];
    identities?: Array<{
      patternId?: string;
      canonicalEngine?: string;
      canonicalMode?: string;
      canonicalSource?: string;
      canonicalBlockSha256?: string;
      readiness?: string;
      studioInstallActual?: string;
      studioControlReadbackActual?: string;
      productionDependencyPromoted?: boolean;
    }>;
  }>;
  macRemotionStudioGuiActualPerformedByThisExport?: boolean;
  macDaVinciGuiActualPerformedByThisExport?: boolean;
  productionDependencyPromotedByThisExport?: boolean;
};

if (artifact.schemaVersion !== 'wedding-remotion-element-handoff-identities/v1') block('HANDOFF_IDENTITY_SCHEMA_MISMATCH');
if (artifact.authority !== 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY') block('HANDOFF_IDENTITY_AUTHORITY_MISMATCH');
if (artifact.canonicalSource?.path !== 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine') block('CANONICAL_SOURCE_IDENTITY_MISMATCH');
if (artifact.canonicalSource?.blockSha256 !== currentCanonicalSha) block('CANONICAL_SOURCE_SHA_STALE');

const candidateById = new Map(remotionElementCandidates.map((candidate) => [candidate.patternId, candidate]));
for (const movieId of ['opening', 'profile'] as const) {
  const project = artifact.projects?.find((item) => item.movieId === movieId);
  if (!project) {
    block(`${movieId}:HANDOFF_IDENTITY_PROJECT_MISSING`);
    continue;
  }
  const expectedIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const actualIds = Array.isArray(project.adoptedCandidateIds) ? project.adoptedCandidateIds : [];
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) block(`${movieId}:ADOPTION_REGISTRY_MISMATCH`);
  if (project.adopted !== (expectedIds.length > 0)) block(`${movieId}:ADOPTED_FLAG_MISMATCH`);
  if ((project.identities?.length ?? 0) !== expectedIds.length) block(`${movieId}:IDENTITY_CARDINALITY_MISMATCH`);

  for (const patternId of expectedIds) {
    const candidate = candidateById.get(patternId);
    const identity = project.identities?.find((item) => item.patternId === patternId);
    if (!candidate) {
      block(`${movieId}:${patternId}:UNKNOWN_CANDIDATE`);
      continue;
    }
    if (!identity) {
      block(`${movieId}:${patternId}:IDENTITY_MISSING`);
      continue;
    }
    if (identity.canonicalEngine !== candidate.canonicalEngine) block(`${movieId}:${patternId}:CANONICAL_ENGINE_MISMATCH`);
    if (identity.canonicalMode !== candidate.canonicalMode) block(`${movieId}:${patternId}:CANONICAL_MODE_MISMATCH`);
    if (identity.canonicalSource !== 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine') block(`${movieId}:${patternId}:CANONICAL_SOURCE_MISMATCH`);
    if (identity.canonicalBlockSha256 !== currentCanonicalSha) block(`${movieId}:${patternId}:CANONICAL_SOURCE_SHA_STALE`);
    if (identity.readiness !== candidate.readiness) block(`${movieId}:${patternId}:READINESS_MISMATCH`);
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
