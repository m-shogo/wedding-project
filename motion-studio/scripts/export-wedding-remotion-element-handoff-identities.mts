import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {remotionElementCandidates} from '../../movie-dashboard/src/data/remotionElementCandidates.ts';
import {remotionStudioToolingProductionAdoption} from '../../movie-dashboard/src/data/remotionStudioToolingProductionDependency.ts';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const canonicalEnginePath = join(motionStudioRoot, 'src/motion-kit/engines.tsx');
const outputPath = join(repoRoot, 'movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json');

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

function canonicalTypographyBlock() {
  const source = readFileSync(canonicalEnginePath, 'utf8');
  const startMarker = 'export type MotionIntensity';
  const endMarker = 'export type CameraTransformMode';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0 || end <= start) throw new Error('CANONICAL_TYPOGRAPHY_ENGINE_BLOCK_NOT_ISOLATABLE');
  if (source.indexOf(startMarker, start + startMarker.length) >= 0) throw new Error('CANONICAL_TYPOGRAPHY_START_MARKER_NOT_UNIQUE');
  if (source.indexOf(endMarker, end + endMarker.length) >= 0) throw new Error('CANONICAL_TYPOGRAPHY_END_MARKER_NOT_UNIQUE');
  return source.slice(start, end).trim();
}

const canonicalBlockSha256 = sha256(canonicalTypographyBlock());
const candidateById = new Map(remotionElementCandidates.map((candidate) => [candidate.patternId, candidate]));

function movieIdentity(movieId: 'opening' | 'profile') {
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const unknownCandidateIds = adoptedCandidateIds.filter((id) => !candidateById.has(id));
  if (unknownCandidateIds.length > 0) {
    throw new Error(`UNKNOWN_REMOTION_HANDOFF_IDENTITY:${movieId}:${unknownCandidateIds.join(',')}`);
  }

  return {
    movieId,
    adopted: adoptedCandidateIds.length > 0,
    adoptedCandidateIds,
    identities: adoptedCandidateIds.map((patternId) => {
      const candidate = candidateById.get(patternId)!;
      return {
        patternId: candidate.patternId,
        canonicalEngine: candidate.canonicalEngine,
        canonicalMode: candidate.canonicalMode,
        canonicalSource: 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine',
        canonicalBlockSha256,
        payloadSlug: candidate.payloadSlug,
        readiness: candidate.readiness,
        studioInstallActual: candidate.studioInstallActual,
        studioControlReadbackActual: candidate.studioControlReadbackActual,
        productionDependencyPromoted: candidate.productionDependencyPromoted,
      };
    }),
  };
}

const artifact = {
  schemaVersion: 'wedding-remotion-element-handoff-identities/v1',
  authority: 'SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY',
  generatedAt: new Date().toISOString(),
  canonicalSource: {
    path: 'motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine',
    blockSha256: canonicalBlockSha256,
  },
  projects: [movieIdentity('opening'), movieIdentity('profile')],
  macRemotionStudioGuiActualPerformedByThisExport: false,
  macDaVinciGuiActualPerformedByThisExport: false,
  productionDependencyPromotedByThisExport: false,
  guardrails: [
    'ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED',
    'ADOPTED_ELEMENT_HANDOFF_IDENTITY_MUST_BE_CANONICAL_SOURCE_SHA_BOUND',
    'CANONICAL_ELEMENT_SOURCE_CHANGED => PREVIOUS_HANDOFF_IDENTITY_STALE',
    'HANDOFF_IDENTITY_EXPORTED != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED',
    'HANDOFF_IDENTITY_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED',
    'HANDOFF_IDENTITY_EXPORTED != PRODUCTION_DEPENDENCY_PROMOTED',
  ],
};

mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(`handoffIdentityArtifact=${outputPath.replace(`${repoRoot}/`, '')}`);
console.log(`canonicalBlockSha256=${canonicalBlockSha256}`);
console.log(`openingAdopted=${artifact.projects[0].adoptedCandidateIds.length}`);
console.log(`profileAdopted=${artifact.projects[1].adoptedCandidateIds.length}`);
console.log('macRemotionStudioGuiActualPerformedByThisExport=NO');
console.log('macDaVinciGuiActualPerformedByThisExport=NO');
console.log('productionDependencyPromotedByThisExport=NO');
