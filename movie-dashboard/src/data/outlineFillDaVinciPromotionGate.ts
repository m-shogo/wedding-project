import { capturedDaVinciBindingRoles } from "./davinciFollowerEvidenceContract";
import type { OutlineFillBindingRole, OutlineFillDaVinciEvaluatedEvidenceV1 } from "./outlineFillDaVinciEvidenceCapture";

export type OutlineFillPromotionBlocker =
  | "MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS"
  | "LIVE_PARAMETER_BINDINGS_INCOMPLETE"
  | "SHADING_BINDING_NOT_PASS"
  | "VISUAL_QA_1X_NOT_PASS"
  | "VISUAL_QA_HALF_SPEED_NOT_PASS"
  | "VISUAL_QA_REVIEW_TIMESTAMP_MISSING";

const requiredBindingRoles: OutlineFillBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "FILL_SHADING_BINDING",
  "STROKE_SHADING_BINDING",
  "STROKE_WIDTH_UNIT_CALIBRATION",
  "OUTLINE_APPEAR",
  "FILL_OPACITY",
  "STROKE_WIDTH",
  "EASING",
];

export function assessOutlineFillDaVinciPromotionEligibility(evidence: OutlineFillDaVinciEvaluatedEvidenceV1) {
  const capturedBindingRoles = capturedDaVinciBindingRoles(evidence.liveParameterBindings, requiredBindingRoles);
  const blockers: OutlineFillPromotionBlocker[] = [];
  if (!evidence.allMachineComparableChecksPass) blockers.push("MACHINE_COMPARABLE_CHECKS_NOT_ALL_PASS");
  if (capturedBindingRoles.length !== requiredBindingRoles.length) blockers.push("LIVE_PARAMETER_BINDINGS_INCOMPLETE");
  if (evidence.checks.shadingBindingRecorded !== "PASS") blockers.push("SHADING_BINDING_NOT_PASS");
  if (evidence.visualQa.oneX !== "PASS") blockers.push("VISUAL_QA_1X_NOT_PASS");
  if (evidence.visualQa.halfSpeed !== "PASS") blockers.push("VISUAL_QA_HALF_SPEED_NOT_PASS");
  if (!evidence.visualQa.reviewedAt?.trim()) blockers.push("VISUAL_QA_REVIEW_TIMESTAMP_MISSING");
  return {
    schemaVersion: "outline-fill-davinci-promotion-assessment/v1" as const,
    authority: "DERIVED_GATE_ONLY" as const,
    patternId: "type-outline-fill" as const,
    sceneId: evidence.sceneId,
    sourceRevision: evidence.sourceRevision,
    eligibleForHumanPromotionReview: blockers.length === 0,
    requiredBindingRoles: [...requiredBindingRoles],
    capturedBindingRoles,
    blockers,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "ELIGIBLE requires live Shading bindings, stroke-unit calibration, exact canonical readback and visual QA; it never promotes routing automatically.",
  };
}
