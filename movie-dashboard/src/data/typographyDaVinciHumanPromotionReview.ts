import type {
  TypographyDaVinciActualEvaluationReportV1,
  TypographyDaVinciActualSessionItemEvaluation,
} from "./typographyDaVinciActualSession";
import type {TypographyProductionPatternId} from "./typographySceneProductionRouting";

export type TypographyDaVinciHumanPromotionDecision = "PENDING" | "APPROVE" | "REJECT";

export interface TypographyDaVinciHumanPromotionReviewItemV1 {
  patternId: TypographyProductionPatternId;
  decision: TypographyDaVinciHumanPromotionDecision;
  reviewer: string | null;
  reviewedAt: string | null;
  note: string | null;
}

export interface TypographyDaVinciHumanPromotionReviewV1 {
  schemaVersion: "typography-davinci-human-promotion-review/v1";
  authority: "HUMAN_PROMOTION_DECISION";
  sourceEvaluation: {
    sessionId: string;
    recordedAt: string;
    resolveVersion: string;
    machine: string;
  };
  items: TypographyDaVinciHumanPromotionReviewItemV1[];
}

export interface TypographyDaVinciHumanPromotionReviewItemEvaluation {
  patternId: TypographyProductionPatternId;
  decision: TypographyDaVinciHumanPromotionDecision;
  sourceEligibleForHumanPromotionReview: boolean;
  humanPromoted: boolean;
  releaseGateRequired: true;
  productionReady: false;
  issues: string[];
}

export interface TypographyDaVinciHumanPromotionReviewEvaluation {
  validEnvelope: boolean;
  completeNinePatternCoverage: boolean;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  automaticPromotionAllowed: false;
  releaseGateRequired: true;
  productionReady: false;
  issues: string[];
  items: TypographyDaVinciHumanPromotionReviewItemEvaluation[];
}

const isDecision = (value: unknown): value is TypographyDaVinciHumanPromotionDecision =>
  value === "PENDING" || value === "APPROVE" || value === "REJECT";

const evaluationByPattern = (report: TypographyDaVinciActualEvaluationReportV1) =>
  new Map(report.items.map((item) => [item.patternId, item] as const));

export function buildTypographyDaVinciHumanPromotionReviewTemplate(
  report: TypographyDaVinciActualEvaluationReportV1,
): TypographyDaVinciHumanPromotionReviewV1 {
  return {
    schemaVersion: "typography-davinci-human-promotion-review/v1",
    authority: "HUMAN_PROMOTION_DECISION",
    sourceEvaluation: {...report.sourceSession},
    items: report.items.map((item) => ({
      patternId: item.patternId,
      decision: "PENDING",
      reviewer: null,
      reviewedAt: null,
      note: item.eligibleForHumanPromotionReview
        ? "Eligible from machine/Actual evidence. Human must explicitly APPROVE or REJECT."
        : "Blocked by Actual evaluation. APPROVE is invalid until source evidence becomes eligible.",
    })),
  };
}

export const buildTypographyDaVinciHumanPromotionReviewTemplateJson = (
  report: TypographyDaVinciActualEvaluationReportV1,
) => JSON.stringify(buildTypographyDaVinciHumanPromotionReviewTemplate(report), null, 2);

function sourceIdentityMatches(
  review: TypographyDaVinciHumanPromotionReviewV1,
  report: TypographyDaVinciActualEvaluationReportV1,
) {
  return (
    review.sourceEvaluation.sessionId === report.sourceSession.sessionId &&
    review.sourceEvaluation.recordedAt === report.sourceSession.recordedAt &&
    review.sourceEvaluation.resolveVersion === report.sourceSession.resolveVersion &&
    review.sourceEvaluation.machine === report.sourceSession.machine
  );
}

function evaluateReviewItem(
  reviewItem: TypographyDaVinciHumanPromotionReviewItemV1,
  sourceItem: TypographyDaVinciActualSessionItemEvaluation | undefined,
): TypographyDaVinciHumanPromotionReviewItemEvaluation {
  const issues: string[] = [];
  if (!sourceItem) issues.push("SOURCE_EVALUATION_ITEM_MISSING");
  if (!isDecision(reviewItem.decision)) issues.push("PROMOTION_DECISION_INVALID");

  if (reviewItem.decision !== "PENDING") {
    if (!reviewItem.reviewer?.trim()) issues.push("DECISION_REQUIRES_REVIEWER");
    if (!reviewItem.reviewedAt?.trim()) issues.push("DECISION_REQUIRES_REVIEWED_AT");
  }
  if (reviewItem.decision === "APPROVE" && !sourceItem?.eligibleForHumanPromotionReview) {
    issues.push("APPROVE_REQUIRES_HUMAN_REVIEW_ELIGIBLE_SOURCE");
  }

  const humanPromoted =
    reviewItem.decision === "APPROVE" &&
    sourceItem?.eligibleForHumanPromotionReview === true &&
    Boolean(reviewItem.reviewer?.trim()) &&
    Boolean(reviewItem.reviewedAt?.trim()) &&
    issues.length === 0;

  return {
    patternId: reviewItem.patternId,
    decision: reviewItem.decision,
    sourceEligibleForHumanPromotionReview: sourceItem?.eligibleForHumanPromotionReview ?? false,
    humanPromoted,
    releaseGateRequired: true,
    productionReady: false,
    issues,
  };
}

export function evaluateTypographyDaVinciHumanPromotionReview(
  review: TypographyDaVinciHumanPromotionReviewV1,
  report: TypographyDaVinciActualEvaluationReportV1,
): TypographyDaVinciHumanPromotionReviewEvaluation {
  const envelopeIssues: string[] = [];
  if (review.schemaVersion !== "typography-davinci-human-promotion-review/v1") envelopeIssues.push("PROMOTION_REVIEW_SCHEMA_VERSION_MISMATCH");
  if (review.authority !== "HUMAN_PROMOTION_DECISION") envelopeIssues.push("PROMOTION_REVIEW_AUTHORITY_MISMATCH");
  if (!sourceIdentityMatches(review, report)) envelopeIssues.push("SOURCE_EVALUATION_IDENTITY_MISMATCH");

  const sourceItems = evaluationByPattern(report);
  const seen = new Set<TypographyProductionPatternId>();
  const items = review.items.map((reviewItem) => {
    const duplicate = seen.has(reviewItem.patternId);
    seen.add(reviewItem.patternId);
    const result = evaluateReviewItem(reviewItem, sourceItems.get(reviewItem.patternId));
    if (duplicate) result.issues.unshift("DUPLICATE_PATTERN_ID");
    return result;
  });

  const expectedIds = new Set(report.items.map((item) => item.patternId));
  const completeNinePatternCoverage =
    seen.size === expectedIds.size &&
    expectedIds.size === 9 &&
    [...expectedIds].every((patternId) => seen.has(patternId));
  if (!completeNinePatternCoverage) envelopeIssues.push("NINE_PATTERN_PROMOTION_REVIEW_COVERAGE_INCOMPLETE");

  return {
    validEnvelope: envelopeIssues.length === 0,
    completeNinePatternCoverage,
    approvedCount: items.filter((item) => item.humanPromoted).length,
    rejectedCount: items.filter((item) => item.decision === "REJECT" && item.issues.length === 0).length,
    pendingCount: items.filter((item) => item.decision === "PENDING").length,
    automaticPromotionAllowed: false,
    releaseGateRequired: true,
    productionReady: false,
    issues: envelopeIssues,
    items,
  };
}

export function parseAndEvaluateTypographyDaVinciHumanPromotionReview(
  json: string,
  report: TypographyDaVinciActualEvaluationReportV1,
) {
  const review = JSON.parse(json) as TypographyDaVinciHumanPromotionReviewV1;
  return {review, evaluation: evaluateTypographyDaVinciHumanPromotionReview(review, report)};
}
