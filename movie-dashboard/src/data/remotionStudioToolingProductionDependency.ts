import {remotionElementCandidates} from "./remotionElementCandidates";
import {buildRemotionStudioActualToolingEvidence} from "./remotionStudioActualToolingEvidence";

export type WeddingMovieId = "opening" | "profile";

/**
 * Explicit adoption registry for Remotion Elements used by the actual Wedding movies.
 * Empty means tooling remains optional/non-blocking. Adding an id here intentionally promotes
 * that candidate into the movie production dependency graph; CI must then fail closed until
 * current Mac Remotion Studio Actual evidence and Human review are verified.
 */
export const remotionStudioToolingProductionAdoption: Record<WeddingMovieId, readonly string[]> = {
  opening: [],
  profile: [],
} as const;

export type RemotionStudioToolingDependencyState =
  | "NOT_ADOPTED"
  | "STUDIO_ACTUAL_REQUIRED"
  | "HUMAN_REVIEW_REQUIRED"
  | "DEPENDENCY_PROMOTION_REQUIRED"
  | "READY";

export function buildRemotionStudioToolingProductionDependency(movieId: WeddingMovieId) {
  const tooling = buildRemotionStudioActualToolingEvidence();
  const adoptedCandidateIds = [...remotionStudioToolingProductionAdoption[movieId]];
  const knownCandidateIds = new Set(remotionElementCandidates.map((candidate) => candidate.patternId));
  const unknownCandidateIds = adoptedCandidateIds.filter((candidateId) => !knownCandidateIds.has(candidateId));

  if (unknownCandidateIds.length > 0) {
    throw new Error(`Unknown Remotion production dependency for ${movieId}: ${unknownCandidateIds.join(", ")}`);
  }

  const adopted = adoptedCandidateIds.length > 0;
  const studioActualVerified = tooling.currentRepoState === "VERIFIED";
  const humanReviewed = tooling.humanReviewed;
  const dependencyPromoted = tooling.productionDependencyPromoted;

  const state: RemotionStudioToolingDependencyState = !adopted
    ? "NOT_ADOPTED"
    : !studioActualVerified
      ? "STUDIO_ACTUAL_REQUIRED"
      : !humanReviewed
        ? "HUMAN_REVIEW_REQUIRED"
        : !dependencyPromoted
          ? "DEPENDENCY_PROMOTION_REQUIRED"
          : "READY";

  const blocking = adopted && state !== "READY";

  return {
    authority: "EXPLICIT_WEDDING_REMOTION_STUDIO_TOOLING_DEPENDENCY" as const,
    movieId,
    adopted,
    adoptedCandidateIds,
    state,
    blocking,
    studioActualVerified,
    humanReviewed,
    dependencyPromoted,
    summaryPath: tooling.summaryPath,
    evidencePath: tooling.evidencePath,
    statusCommand: tooling.statusCommand,
    strictCommand: tooling.strictCommand,
    recovery: !blocking
      ? []
      : state === "DEPENDENCY_PROMOTION_REQUIRED"
        ? ["Human review済みのcurrent Studio Actual evidenceを確認し、production dependency promotionを明示的に記録する"]
        : [tooling.statusCommand, tooling.strictCommand],
    guardrails: [
      "ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED",
      "ELEMENT_ADOPTED => STUDIO_ACTUAL_MUST_BE_CURRENT",
      "STUDIO_ACTUAL_VERIFIED != HUMAN_REVIEWED",
      "HUMAN_REVIEWED != PRODUCTION_DEPENDENCY_PROMOTED",
      "UNADOPTED_ELEMENT_TOOLING_STATE_IS_NON_BLOCKING",
      "CI_MUST_NOT_PROMOTE_STUDIO_GUI_ACTUAL",
    ],
  };
}
