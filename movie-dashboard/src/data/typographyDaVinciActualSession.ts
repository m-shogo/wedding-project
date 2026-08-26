import {
  getTypographyDaVinciActualRunItem,
  typographyDaVinciActualRunPlan,
} from "./typographyDaVinciActualRunPlan";
import type {TypographyProductionPatternId} from "./typographySceneProductionRouting";

export type ActualEvidenceState = "PASS" | "FAIL" | "NOT_RUN";

export interface TypographyDaVinciActualSessionItemV1 {
  patternId: TypographyProductionPatternId;
  implementationId: string;
  macActualState: ActualEvidenceState;
  rawEvidenceFile: string | null;
  machineParity: ActualEvidenceState;
  bindingResults: Record<string, ActualEvidenceState>;
  visualQa: {
    oneX: ActualEvidenceState;
    halfSpeed: ActualEvidenceState;
  };
  reviewedAt: string | null;
}

export interface TypographyDaVinciActualSessionV1 {
  schemaVersion: "typography-davinci-actual-session/v1";
  authority: "MAC_ACTUAL_EVIDENCE_SESSION";
  sessionId: string;
  recordedAt: string;
  resolveVersion: string;
  machine: string;
  items: TypographyDaVinciActualSessionItemV1[];
}

export interface TypographyDaVinciActualSessionItemEvaluation {
  patternId: TypographyProductionPatternId;
  valid: boolean;
  eligibleForHumanPromotionReview: boolean;
  productionReady: false;
  issues: string[];
}

export interface TypographyDaVinciActualSessionEvaluation {
  validEnvelope: boolean;
  completeNinePatternCoverage: boolean;
  humanPromotionReviewRequired: true;
  automaticPromotionAllowed: false;
  productionReady: false;
  issues: string[];
  items: TypographyDaVinciActualSessionItemEvaluation[];
}

const isEvidenceState = (value: unknown): value is ActualEvidenceState =>
  value === "PASS" || value === "FAIL" || value === "NOT_RUN";

export function evaluateTypographyDaVinciActualSession(
  session: TypographyDaVinciActualSessionV1,
): TypographyDaVinciActualSessionEvaluation {
  const envelopeIssues: string[] = [];
  if (session.schemaVersion !== "typography-davinci-actual-session/v1") envelopeIssues.push("SESSION_SCHEMA_VERSION_MISMATCH");
  if (session.authority !== "MAC_ACTUAL_EVIDENCE_SESSION") envelopeIssues.push("SESSION_AUTHORITY_MISMATCH");
  if (!session.sessionId) envelopeIssues.push("SESSION_ID_MISSING");
  if (!session.recordedAt) envelopeIssues.push("RECORDED_AT_MISSING");
  if (!session.resolveVersion) envelopeIssues.push("RESOLVE_VERSION_MISSING");
  if (!session.machine) envelopeIssues.push("MACHINE_IDENTITY_MISSING");

  const seen = new Set<string>();
  const evaluations = session.items.map((item) => {
    const issues: string[] = [];
    const runItem = getTypographyDaVinciActualRunItem(item.patternId);
    if (!runItem) issues.push("UNKNOWN_PATTERN_ID");
    if (seen.has(item.patternId)) issues.push("DUPLICATE_PATTERN_ID");
    seen.add(item.patternId);
    if (runItem && item.implementationId !== runItem.implementationId) issues.push("IMPLEMENTATION_ID_MISMATCH");
    if (!isEvidenceState(item.macActualState)) issues.push("MAC_ACTUAL_STATE_INVALID");
    if (!isEvidenceState(item.machineParity)) issues.push("MACHINE_PARITY_STATE_INVALID");
    if (!isEvidenceState(item.visualQa?.oneX)) issues.push("VISUAL_QA_1X_STATE_INVALID");
    if (!isEvidenceState(item.visualQa?.halfSpeed)) issues.push("VISUAL_QA_HALF_SPEED_STATE_INVALID");

    const requiredRoles = runItem?.requiredBindingRoles ?? [];
    for (const role of requiredRoles) {
      if (item.bindingResults?.[role] !== "PASS") issues.push(`REQUIRED_BINDING_NOT_PASS:${role}`);
    }

    if (item.macActualState === "PASS") {
      if (!item.rawEvidenceFile) issues.push("PASS_REQUIRES_RAW_EVIDENCE_FILE");
      if (item.machineParity !== "PASS") issues.push("PASS_REQUIRES_MACHINE_PARITY");
      if (item.visualQa?.oneX !== "PASS") issues.push("PASS_REQUIRES_1X_VISUAL_QA");
      if (item.visualQa?.halfSpeed !== "PASS") issues.push("PASS_REQUIRES_HALF_SPEED_VISUAL_QA");
      if (!item.reviewedAt) issues.push("PASS_REQUIRES_REVIEWED_AT");
    }

    const eligibleForHumanPromotionReview =
      item.macActualState === "PASS" &&
      item.machineParity === "PASS" &&
      item.visualQa?.oneX === "PASS" &&
      item.visualQa?.halfSpeed === "PASS" &&
      Boolean(item.reviewedAt) &&
      Boolean(item.rawEvidenceFile) &&
      requiredRoles.every((role) => item.bindingResults?.[role] === "PASS") &&
      issues.length === 0;

    return {
      patternId: item.patternId,
      valid: issues.length === 0,
      eligibleForHumanPromotionReview,
      productionReady: false as const,
      issues,
    };
  });

  const expectedIds = new Set(typographyDaVinciActualRunPlan.map((item) => item.patternId));
  const completeNinePatternCoverage =
    seen.size === expectedIds.size && [...expectedIds].every((patternId) => seen.has(patternId));
  if (!completeNinePatternCoverage) envelopeIssues.push("NINE_PATTERN_COVERAGE_INCOMPLETE");

  return {
    validEnvelope: envelopeIssues.length === 0,
    completeNinePatternCoverage,
    humanPromotionReviewRequired: true,
    automaticPromotionAllowed: false,
    productionReady: false,
    issues: envelopeIssues,
    items: evaluations,
  };
}

export function parseAndEvaluateTypographyDaVinciActualSession(json: string) {
  const parsed = JSON.parse(json) as TypographyDaVinciActualSessionV1;
  return {
    session: parsed,
    evaluation: evaluateTypographyDaVinciActualSession(parsed),
  };
}
