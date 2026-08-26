import { capturedDaVinciBindingRoles } from "./davinciFollowerEvidenceContract";
import type {
  WordPunchBindingRole,
  WordPunchDaVinciEvaluatedEvidenceV1,
} from "./wordPunchDaVinciEvidenceCapture";

export type WordPunchPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

const requiredBindingRoles: WordPunchBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "TRANSFORM_TOOL",
  "SCALE",
  "OPACITY",
  "EASING",
];

export function assessWordPunchDaVinciPromotionEligibility(
  evidence: WordPunchDaVinciEvaluatedEvidenceV1,
) {
  const capturedBindingRoles = capturedDaVinciBindingRoles(
    evidence.liveParameterBindings,
    requiredBindingRoles,
  );
  const blockers: WordPunchPromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (capturedBindingRoles.length !== requiredBindingRoles.length) blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");

  return {
    schemaVersion: "word-punch-davinci-promotion-assessment/v1" as const,
    authority: "DERIVED_GATE_ONLY" as const,
    patternId: "type-word-punch" as const,
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles,
    blockers,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "ELIGIBLE only means the bounded Word Punch evidence package is complete enough for human review. Never mutate routing or claim a live/verified DaVinci implementation automatically.",
  };
}
