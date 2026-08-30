import {remotionElementCandidates} from "./remotionElementCandidates";
import {
  remotionStudioToolingProductionAdoption,
  type WeddingMovieId,
} from "./remotionStudioToolingProductionDependency";

export const WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_SCHEMA = "wedding-remotion-element-handoff-identities/v2" as const;
export const WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_ARTIFACT = "movie-dashboard/out/remotion-element-handoff/wedding-remotion-element-identities.json" as const;
export const WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_EXPORT_COMMAND = "cd motion-studio && node --no-warnings scripts/export-wedding-remotion-element-handoff-identities.mts" as const;
export const WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_CHECK_COMMAND = "cd motion-studio && node --no-warnings scripts/check-wedding-remotion-element-handoff-identities.mts" as const;
export const WEDDING_REMOTION_ELEMENT_CANONICAL_SOURCE = "motion-studio/src/motion-kit/engines.tsx#TypographyRevealEngine" as const;

function requireCandidate(patternId: string) {
  const candidate = remotionElementCandidates.find((item) => item.patternId === patternId);
  if (!candidate) throw new Error(`Unknown Remotion handoff identity candidate: ${patternId}`);
  return candidate;
}

export function buildRemotionElementCandidateHandoffIdentityReference(movieId: WeddingMovieId, patternId: string) {
  const candidate = requireCandidate(patternId);
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  return {
    schemaVersion: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_SCHEMA,
    authority: "SHA_BOUND_WEDDING_REMOTION_ELEMENT_CATALOG_IDENTITY_REFERENCE" as const,
    movieId,
    patternId: candidate.patternId,
    canonicalIdentity: {
      canonicalEngine: candidate.canonicalEngine,
      canonicalMode: candidate.canonicalMode,
      canonicalSource: WEDDING_REMOTION_ELEMENT_CANONICAL_SOURCE,
      payloadSlug: candidate.payloadSlug,
    },
    adoptedForMovie: adoptedCandidateIds.includes(candidate.patternId),
    shaBinding: {
      artifactPath: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_ARTIFACT,
      exportCommand: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_EXPORT_COMMAND,
      checkCommand: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_CHECK_COMMAND,
      catalogIdentityStoredInArtifact: true,
      canonicalBlockShaStoredInArtifact: true,
      currentnessMustBeCheckedBeforeSceneHandoffUse: true,
    },
    macRemotionStudioGuiActual: "NOT_RUN" as const,
    macDaVinciGuiActual: "NOT_RUN" as const,
    productionDependencyPromotedByIdentityReference: false,
    guardrails: [
      "CATALOG_IDENTITY_REFERENCE != WEDDING_PROJECT_ADOPTED",
      "SCENE_SELECTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_CATALOG_IDENTITY",
      "CATALOG_IDENTITY_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED",
      "CATALOG_IDENTITY_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
    ],
  };
}

export function buildRemotionElementHandoffIdentityReference(movieId: WeddingMovieId) {
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const candidateById = new Map(remotionElementCandidates.map((candidate) => [candidate.patternId, candidate]));
  const unknownCandidateIds = adoptedCandidateIds.filter((patternId) => !candidateById.has(patternId));
  if (unknownCandidateIds.length > 0) {
    throw new Error(`Unknown Remotion handoff identity for ${movieId}: ${unknownCandidateIds.join(", ")}`);
  }

  return {
    schemaVersion: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_SCHEMA,
    authority: "SHA_BOUND_WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY" as const,
    movieId,
    adopted: adoptedCandidateIds.length > 0,
    adoptedCandidateIds,
    canonicalIdentity: adoptedCandidateIds.map((patternId) => {
      const candidate = candidateById.get(patternId)!;
      return {
        patternId: candidate.patternId,
        canonicalEngine: candidate.canonicalEngine,
        canonicalMode: candidate.canonicalMode,
        canonicalSource: WEDDING_REMOTION_ELEMENT_CANONICAL_SOURCE,
        payloadSlug: candidate.payloadSlug,
      };
    }),
    shaBinding: {
      artifactPath: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_ARTIFACT,
      exportCommand: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_EXPORT_COMMAND,
      checkCommand: WEDDING_REMOTION_ELEMENT_HANDOFF_IDENTITY_CHECK_COMMAND,
      catalogIdentitiesStoredInArtifact: true,
      canonicalBlockShaStoredInArtifact: true,
      currentnessRequiredWhenAdopted: adoptedCandidateIds.length > 0,
    },
    macRemotionStudioGuiActual: "NOT_RUN" as const,
    macDaVinciGuiActual: "NOT_RUN" as const,
    productionDependencyPromotedByIdentityReference: false,
    guardrails: [
      "ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED",
      "ADOPTED_ELEMENT_IDENTITY_REFERENCE != SHA_CURRENT_HANDOFF_ARTIFACT",
      "ADOPTED_ELEMENT_REQUIRES_CURRENT_SHA_BOUND_HANDOFF_IDENTITY",
      "CANONICAL_ELEMENT_SOURCE_CHANGED => PREVIOUS_HANDOFF_IDENTITY_STALE",
      "HANDOFF_IDENTITY_REFERENCE_EXPORTED != REMOTION_STUDIO_GUI_ACTUAL_VERIFIED",
      "HANDOFF_IDENTITY_REFERENCE_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
    ],
  };
}
