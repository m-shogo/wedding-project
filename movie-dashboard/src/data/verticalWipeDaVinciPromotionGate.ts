import { capturedDaVinciBindingRoles } from "./davinciFollowerEvidenceContract";
import type {
  VerticalWipeBindingRole,
  VerticalWipeDaVinciEvaluatedEvidenceV1,
} from "./verticalWipeDaVinciEvidenceCapture";

export type VerticalWipePromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "MASK_BINDING_NOT_PASS"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

const requiredBindingRoles: VerticalWipeBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "MASK_TOOL",
  "MASK_INPUT",
  "MASK_COORDINATE_CONVENTION",
  "MASK_INVERSION",
  "REVEAL_START",
  "REVEAL_END",
  "EASING",
];

export function assessVerticalWipeDaVinciPromotionEligibility(
  evidence: VerticalWipeDaVinciEvaluatedEvidenceV1,
) {
  const capturedBindingRoles = capturedDaVinciBindingRoles(
    evidence.liveParameterBindings,
    requiredBindingRoles,
  );
  const blockers: VerticalWipePromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (capturedBindingRoles.length !== requiredBindingRoles.length) blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  if (evidence.checks.maskBindingRecorded !== "PASS") blockers.push("MASK_BINDING_NOT_PASS");
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");

  return {
    schemaVersion: "vertical-wipe-davinci-promotion-assessment/v1" as const,
    authority: "DERIVED_GATE_ONLY" as const,
    patternId: "type-vertical-wipe" as const,
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles,
    blockers,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "ELIGIBLE means the bounded Vertical Wipe package has a real mask graph/binding, normalized reveal parity and visual QA. Never mutate routing or claim a verified Resolve implementation automatically.",
  };
}
