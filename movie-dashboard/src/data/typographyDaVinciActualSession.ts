import {
  getTypographyDaVinciActualRunItem,
  typographyDaVinciActualRunPlan,
} from "./typographyDaVinciActualRunPlan";
import {
  evaluateTypographyDaVinciActualReadiness,
  type TypographyDaVinciActualReadinessStage,
  type TypographyDaVinciEvidenceState,
} from "./typographyDaVinciActualReadiness";
import type {TypographyProductionPatternId} from "./typographySceneProductionRouting";

export type ActualEvidenceState = TypographyDaVinciEvidenceState;

export interface TypographyDaVinciActualSessionItemV1 {
  patternId: TypographyProductionPatternId;
  implementationId: string;
  macActualState: ActualEvidenceState;
  rawEvidenceFile: string | null;
  machineParity: ActualEvidenceState;
  bindingResults: Record<string, ActualEvidenceState>;
  visualQa: {oneX: ActualEvidenceState; halfSpeed: ActualEvidenceState};
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

export interface TypographyDaVinciActualSessionEvaluation {
  validEnvelope: boolean;
  completeNinePatternCoverage: boolean;
  stageCounts: Record<TypographyDaVinciActualReadinessStage, number>;
  humanPromotionReviewRequired: true;
  automaticPromotionAllowed: false;
  productionReady: false;
  issues: string[];
  items: TypographyDaVinciActualSessionItemEvaluation[];
}

export interface TypographyDaVinciActualEvaluationReportV1 {
  schemaVersion: "typography-davinci-actual-evaluation/v1";
  authority: "DERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION";
  sourceSession: {sessionId: string; recordedAt: string; resolveVersion: string; machine: string};
  summary: {
    validEnvelope: boolean;
    completeNinePatternCoverage: boolean;
    stageCounts: Record<TypographyDaVinciActualReadinessStage, number>;
    eligibleForHumanPromotionReviewCount: number;
    blockedCount: number;
    humanPromotionReviewRequired: true;
    automaticPromotionAllowed: false;
    productionReady: false;
  };
  items: TypographyDaVinciActualSessionItemEvaluation[];
  issues: string[];
  guardrails: readonly string[];
}

export function buildTypographyDaVinciActualSessionTemplate(): TypographyDaVinciActualSessionV1 {
  return {
    schemaVersion: "typography-davinci-actual-session/v1",
    authority: "MAC_ACTUAL_EVIDENCE_SESSION",
    sessionId: "FILL_FROM_MAC_ACTUAL_SESSION",
    recordedAt: "",
    resolveVersion: "",
    machine: "",
    items: typographyDaVinciActualRunPlan.map((runItem) => ({
      patternId: runItem.patternId,
      implementationId: runItem.implementationId,
      macActualState: "NOT_RUN",
      rawEvidenceFile: null,
      machineParity: "NOT_RUN",
      bindingResults: Object.fromEntries(runItem.requiredBindingRoles.map((role) => [role, "NOT_RUN" as const])),
      visualQa: {oneX: "NOT_RUN", halfSpeed: "NOT_RUN"},
      reviewedAt: null,
    })),
  };
}

export const buildTypographyDaVinciActualSessionTemplateJson = () =>
  JSON.stringify(buildTypographyDaVinciActualSessionTemplate(), null, 2);

const emptyStageCounts = (): Record<TypographyDaVinciActualReadinessStage, number> => ({
  NOT_RUN: 0,
  ACTUAL_IN_PROGRESS: 0,
  ACTUAL_FAILED: 0,
  HUMAN_REVIEW_ELIGIBLE: 0,
});

export function evaluateTypographyDaVinciActualSession(session: TypographyDaVinciActualSessionV1): TypographyDaVinciActualSessionEvaluation {
  const envelopeIssues: string[] = [];
  if (session.schemaVersion !== "typography-davinci-actual-session/v1") envelopeIssues.push("SESSION_SCHEMA_VERSION_MISMATCH");
  if (session.authority !== "MAC_ACTUAL_EVIDENCE_SESSION") envelopeIssues.push("SESSION_AUTHORITY_MISMATCH");
  if (!session.sessionId || session.sessionId === "FILL_FROM_MAC_ACTUAL_SESSION") envelopeIssues.push("SESSION_ID_MISSING");
  if (!session.recordedAt) envelopeIssues.push("RECORDED_AT_MISSING");
  if (!session.resolveVersion) envelopeIssues.push("RESOLVE_VERSION_MISSING");
  if (!session.machine) envelopeIssues.push("MACHINE_IDENTITY_MISSING");

  const seen = new Set<string>();
  const evaluations = session.items.map((item): TypographyDaVinciActualSessionItemEvaluation => {
    const sessionIssues: string[] = [];
    const runItem = getTypographyDaVinciActualRunItem(item.patternId);
    if (!runItem) sessionIssues.push("UNKNOWN_PATTERN_ID");
    if (seen.has(item.patternId)) sessionIssues.push("DUPLICATE_PATTERN_ID");
    seen.add(item.patternId);

    if (!runItem) {
      return {
        patternId: item.patternId,
        stage: "ACTUAL_FAILED",
        valid: false,
        machineEvidenceComplete: false,
        requiredBindingsComplete: false,
        visualQaComplete: false,
        reviewMetadataComplete: false,
        eligibleForHumanPromotionReview: false,
        humanPromotionReviewRequired: true,
        automaticPromotionAllowed: false,
        productionReady: false,
        issues: sessionIssues,
      };
    }

    const readiness = evaluateTypographyDaVinciActualReadiness(runItem, item);
    return {
      patternId: item.patternId,
      ...readiness,
      valid: readiness.valid && sessionIssues.length === 0,
      issues: [...sessionIssues, ...readiness.issues],
    };
  });

  const expectedIds = new Set(typographyDaVinciActualRunPlan.map((item) => item.patternId));
  const completeNinePatternCoverage = seen.size === expectedIds.size && [...expectedIds].every((patternId) => seen.has(patternId));
  if (!completeNinePatternCoverage) envelopeIssues.push("NINE_PATTERN_COVERAGE_INCOMPLETE");

  const stageCounts = evaluations.reduce((counts, item) => {
    counts[item.stage] += 1;
    return counts;
  }, emptyStageCounts());

  return {
    validEnvelope: envelopeIssues.length === 0,
    completeNinePatternCoverage,
    stageCounts,
    humanPromotionReviewRequired: true,
    automaticPromotionAllowed: false,
    productionReady: false,
    issues: envelopeIssues,
    items: evaluations,
  };
}

export function buildTypographyDaVinciActualEvaluationReport(session: TypographyDaVinciActualSessionV1): TypographyDaVinciActualEvaluationReportV1 {
  const evaluation = evaluateTypographyDaVinciActualSession(session);
  const eligibleForHumanPromotionReviewCount = evaluation.items.filter((item) => item.eligibleForHumanPromotionReview).length;
  return {
    schemaVersion: "typography-davinci-actual-evaluation/v1",
    authority: "DERIVED_FROM_MAC_ACTUAL_EVIDENCE_SESSION",
    sourceSession: {sessionId: session.sessionId, recordedAt: session.recordedAt, resolveVersion: session.resolveVersion, machine: session.machine},
    summary: {
      validEnvelope: evaluation.validEnvelope,
      completeNinePatternCoverage: evaluation.completeNinePatternCoverage,
      stageCounts: {...evaluation.stageCounts},
      eligibleForHumanPromotionReviewCount,
      blockedCount: evaluation.items.length - eligibleForHumanPromotionReviewCount,
      humanPromotionReviewRequired: true,
      automaticPromotionAllowed: false,
      productionReady: false,
    },
    items: evaluation.items,
    issues: evaluation.issues,
    guardrails: [
      "EVALUATION_REPORT != RAW_MAC_EVIDENCE",
      "ACTUAL_IN_PROGRESS != ACTUAL_PASS",
      "HUMAN_REVIEW_ELIGIBLE != HUMAN_PROMOTED",
      "HUMAN_PROMOTED != PRODUCTION_READY_WITHOUT_SEPARATE_RELEASE_GATE",
    ],
  };
}

export const buildTypographyDaVinciActualEvaluationReportJson = (session: TypographyDaVinciActualSessionV1) =>
  JSON.stringify(buildTypographyDaVinciActualEvaluationReport(session), null, 2);

export function parseAndEvaluateTypographyDaVinciActualSession(json: string) {
  const parsed = JSON.parse(json) as TypographyDaVinciActualSessionV1;
  return {session: parsed, evaluation: evaluateTypographyDaVinciActualSession(parsed)};
}
