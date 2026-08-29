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

export type RemotionStudioToolingDependencyStateInput = {
  adopted: boolean;
  studioActualVerified: boolean;
  humanReviewed: boolean;
  dependencyPromoted: boolean;
};

export function resolveRemotionStudioToolingDependencyState({
  adopted,
  studioActualVerified,
  humanReviewed,
  dependencyPromoted,
}: RemotionStudioToolingDependencyStateInput): RemotionStudioToolingDependencyState {
  if (!adopted) return "NOT_ADOPTED";
  if (!studioActualVerified) return "STUDIO_ACTUAL_REQUIRED";
  if (!humanReviewed) return "HUMAN_REVIEW_REQUIRED";
  if (!dependencyPromoted) return "DEPENDENCY_PROMOTION_REQUIRED";
  return "READY";
}

export const remotionStudioToolingDependencyStateScenarios = [
  {label: "unadopted", input: {adopted: false, studioActualVerified: false, humanReviewed: false, dependencyPromoted: false}, expected: "NOT_ADOPTED"},
  {label: "adopted-before-studio-actual", input: {adopted: true, studioActualVerified: false, humanReviewed: false, dependencyPromoted: false}, expected: "STUDIO_ACTUAL_REQUIRED"},
  {label: "studio-actual-before-human-review", input: {adopted: true, studioActualVerified: true, humanReviewed: false, dependencyPromoted: false}, expected: "HUMAN_REVIEW_REQUIRED"},
  {label: "human-review-before-promotion", input: {adopted: true, studioActualVerified: true, humanReviewed: true, dependencyPromoted: false}, expected: "DEPENDENCY_PROMOTION_REQUIRED"},
  {label: "fully-promoted", input: {adopted: true, studioActualVerified: true, humanReviewed: true, dependencyPromoted: true}, expected: "READY"},
] as const satisfies readonly {
  label: string;
  input: RemotionStudioToolingDependencyStateInput;
  expected: RemotionStudioToolingDependencyState;
}[];

export type RemotionStudioToolingDependencyRecoveryAction = {
  kind: "ROUTE" | "COMMAND" | "HUMAN";
  label: string;
  purpose: string;
  route?: string;
  command?: string;
};

const MOTION_LIBRARY_RECOVERY_ROUTE = "/movie-coach/motion-library" as const;

function motionLibraryRecoveryAction(state: RemotionStudioToolingDependencyState): RemotionStudioToolingDependencyRecoveryAction {
  return {
    kind: "ROUTE",
    label: "Open Motion Library",
    purpose: `Motion図鑑で採用Elementと${state}のrecovery evidenceを確認する`,
    route: MOTION_LIBRARY_RECOVERY_ROUTE,
  };
}

function buildRecoveryActions(
  state: RemotionStudioToolingDependencyState,
  tooling: ReturnType<typeof buildRemotionStudioActualToolingEvidence>,
): RemotionStudioToolingDependencyRecoveryAction[] {
  if (state === "NOT_ADOPTED" || state === "READY") return [];
  if (state === "STUDIO_ACTUAL_REQUIRED") {
    return [
      motionLibraryRecoveryAction(state),
      {
        kind: "COMMAND",
        label: "Studio Actual status",
        purpose: "SHA-bound Remotion Studio Actual evidenceのcurrent stateを確認する",
        command: tooling.statusCommand,
      },
      {
        kind: "COMMAND",
        label: "Studio Actual strict",
        purpose: "Mac Remotion Studio GUI Actualの全checkとHuman reviewが揃ったことをfail-closeで検証する",
        command: tooling.strictCommand,
      },
    ];
  }
  if (state === "HUMAN_REVIEW_REQUIRED") {
    return [
      motionLibraryRecoveryAction(state),
      {
        kind: "HUMAN",
        label: "Human Studio review",
        purpose: "current Mac Remotion Studio Actual evidenceを人間が確認し、candidateごとのcheckをreviewする",
      },
    ];
  }
  return [
    motionLibraryRecoveryAction(state),
    {
      kind: "HUMAN",
      label: "Promote production dependency",
      purpose: "Human review済みのcurrent Studio Actual evidenceを確認し、production dependency promotionを明示的に記録する",
    },
  ];
}

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
  const state = resolveRemotionStudioToolingDependencyState({
    adopted,
    studioActualVerified,
    humanReviewed,
    dependencyPromoted,
  });

  const blocking = adopted && state !== "READY";
  const recoveryActions = buildRecoveryActions(state, tooling);

  return {
    authority: "EXPLICIT_WEDDING_REMOTION_STUDIO_TOOLING_DEPENDENCY" as const,
    movieId,
    adopted,
    adoptedCandidateIds,
    adoptedCandidateCount: adoptedCandidateIds.length,
    state,
    blocking,
    studioActualVerified,
    humanReviewed,
    dependencyPromoted,
    summaryPath: tooling.summaryPath,
    evidencePath: tooling.evidencePath,
    statusCommand: tooling.statusCommand,
    strictCommand: tooling.strictCommand,
    recoveryActions,
    recovery: recoveryActions.map((action) => action.route ?? action.command ?? action.purpose),
    guardrails: [
      "ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED",
      "ELEMENT_ADOPTED => STUDIO_ACTUAL_MUST_BE_CURRENT",
      "STUDIO_ACTUAL_VERIFIED != HUMAN_REVIEWED",
      "HUMAN_REVIEWED != PRODUCTION_DEPENDENCY_PROMOTED",
      "UNADOPTED_ELEMENT_TOOLING_STATE_IS_NON_BLOCKING",
      "DEPENDENCY_STATE_RESOLVER_IS_SINGLE_AUTHORITY",
      "RECOVERY_ROUTE_EXPORTED != RECOVERY_EXECUTED",
      "RECOVERY_ACTION_EXPORTED != RECOVERY_EXECUTED",
      "CI_MUST_NOT_PROMOTE_STUDIO_GUI_ACTUAL",
    ],
  };
}
