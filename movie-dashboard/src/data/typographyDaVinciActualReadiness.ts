import type {TypographyDaVinciActualRunItem} from "./typographyDaVinciActualRunPlan";

export type TypographyDaVinciEvidenceState = "PASS" | "FAIL" | "NOT_RUN";
export type TypographyDaVinciActualReadinessStage =
  | "NOT_RUN"
  | "ACTUAL_IN_PROGRESS"
  | "ACTUAL_FAILED"
  | "HUMAN_REVIEW_ELIGIBLE";

export interface TypographyDaVinciActualEvidenceInput {
  implementationId: string;
  macActualState: TypographyDaVinciEvidenceState;
  rawEvidenceFile: string | null;
  machineParity: TypographyDaVinciEvidenceState;
  bindingResults: Record<string, TypographyDaVinciEvidenceState>;
  visualQa: {
    oneX: TypographyDaVinciEvidenceState;
    halfSpeed: TypographyDaVinciEvidenceState;
  };
  reviewedAt: string | null;
}

export interface TypographyDaVinciActualReadinessEvaluation {
  stage: TypographyDaVinciActualReadinessStage;
  valid: boolean;
  machineEvidenceComplete: boolean;
  requiredBindingsComplete: boolean;
  visualQaComplete: boolean;
  reviewMetadataComplete: boolean;
  eligibleForHumanPromotionReview: boolean;
  humanPromotionReviewRequired: true;
  automaticPromotionAllowed: false;
  productionReady: false;
  issues: string[];
}

export const isTypographyDaVinciEvidenceState = (value: unknown): value is TypographyDaVinciEvidenceState =>
  value === "PASS" || value === "FAIL" || value === "NOT_RUN";

function hasAnyActualEvidence(
  item: TypographyDaVinciActualEvidenceInput,
  requiredRoles: readonly string[],
) {
  return Boolean(
    item.rawEvidenceFile ||
      item.reviewedAt ||
      item.macActualState !== "NOT_RUN" ||
      item.machineParity !== "NOT_RUN" ||
      item.visualQa.oneX !== "NOT_RUN" ||
      item.visualQa.halfSpeed !== "NOT_RUN" ||
      requiredRoles.some((role) => item.bindingResults[role] !== undefined && item.bindingResults[role] !== "NOT_RUN"),
  );
}

export function evaluateTypographyDaVinciActualReadiness(
  runItem: TypographyDaVinciActualRunItem,
  item: TypographyDaVinciActualEvidenceInput,
): TypographyDaVinciActualReadinessEvaluation {
  const issues: string[] = [];

  if (item.implementationId !== runItem.implementationId) issues.push("IMPLEMENTATION_ID_MISMATCH");
  if (!isTypographyDaVinciEvidenceState(item.macActualState)) issues.push("MAC_ACTUAL_STATE_INVALID");
  if (!isTypographyDaVinciEvidenceState(item.machineParity)) issues.push("MACHINE_PARITY_STATE_INVALID");
  if (!isTypographyDaVinciEvidenceState(item.visualQa?.oneX)) issues.push("VISUAL_QA_1X_STATE_INVALID");
  if (!isTypographyDaVinciEvidenceState(item.visualQa?.halfSpeed)) issues.push("VISUAL_QA_HALF_SPEED_STATE_INVALID");

  for (const role of runItem.requiredBindingRoles) {
    const state = item.bindingResults?.[role];
    if (!isTypographyDaVinciEvidenceState(state)) issues.push(`REQUIRED_BINDING_STATE_INVALID:${role}`);
    if (state !== "PASS") issues.push(`REQUIRED_BINDING_NOT_PASS:${role}`);
  }

  const machineEvidenceComplete = item.macActualState === "PASS" && item.machineParity === "PASS" && Boolean(item.rawEvidenceFile);
  const requiredBindingsComplete = runItem.requiredBindingRoles.every((role) => item.bindingResults?.[role] === "PASS");
  const visualQaComplete = item.visualQa?.oneX === "PASS" && item.visualQa?.halfSpeed === "PASS";
  const reviewMetadataComplete = Boolean(item.reviewedAt);

  if (item.macActualState === "PASS") {
    if (!item.rawEvidenceFile) issues.push("PASS_REQUIRES_RAW_EVIDENCE_FILE");
    if (item.machineParity !== "PASS") issues.push("PASS_REQUIRES_MACHINE_PARITY");
    if (item.visualQa?.oneX !== "PASS") issues.push("PASS_REQUIRES_1X_VISUAL_QA");
    if (item.visualQa?.halfSpeed !== "PASS") issues.push("PASS_REQUIRES_HALF_SPEED_VISUAL_QA");
    if (!item.reviewedAt) issues.push("PASS_REQUIRES_REVIEWED_AT");
  }

  const eligibleForHumanPromotionReview =
    machineEvidenceComplete &&
    requiredBindingsComplete &&
    visualQaComplete &&
    reviewMetadataComplete &&
    issues.length === 0;

  const containsFailure =
    item.macActualState === "FAIL" ||
    item.machineParity === "FAIL" ||
    item.visualQa?.oneX === "FAIL" ||
    item.visualQa?.halfSpeed === "FAIL" ||
    runItem.requiredBindingRoles.some((role) => item.bindingResults?.[role] === "FAIL");

  const stage: TypographyDaVinciActualReadinessStage = eligibleForHumanPromotionReview
    ? "HUMAN_REVIEW_ELIGIBLE"
    : containsFailure
      ? "ACTUAL_FAILED"
      : hasAnyActualEvidence(item, runItem.requiredBindingRoles)
        ? "ACTUAL_IN_PROGRESS"
        : "NOT_RUN";

  return {
    stage,
    valid: issues.every((issue) => !issue.endsWith("_INVALID") && !issue.includes("STATE_INVALID") && issue !== "IMPLEMENTATION_ID_MISMATCH"),
    machineEvidenceComplete,
    requiredBindingsComplete,
    visualQaComplete,
    reviewMetadataComplete,
    eligibleForHumanPromotionReview,
    humanPromotionReviewRequired: true,
    automaticPromotionAllowed: false,
    productionReady: false,
    issues: [...new Set(issues)],
  };
}
