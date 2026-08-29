import type {TypographyDaVinciActualEvaluationReportV1} from "./typographyDaVinciActualSession";
import {
  evaluateTypographyDaVinciHumanPromotionReview,
  type TypographyDaVinciHumanPromotionReviewV1,
} from "./typographyDaVinciHumanPromotionReview";
import type {TypographyProductionSelectionV1} from "./typographySceneProductionRouting";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export type TypographyDaVinciProductionReleaseDecision = "HOLD" | "RELEASE";

export interface TypographyDaVinciProductionReleaseGateV1 {
  schemaVersion: "typography-davinci-production-release-gate/v1";
  authority: "HUMAN_PRODUCTION_RELEASE_DECISION";
  scene: {
    sceneId: string;
    sourceRevision: string;
    patternId: TypographyProductionSelectionV1["patternId"];
    selectionSelectedAt: string;
  };
  promotionSource: {
    sessionId: string;
    recordedAt: string;
    resolveVersion: string;
    machine: string;
  };
  decision: TypographyDaVinciProductionReleaseDecision;
  releaseReviewer: string | null;
  releasedAt: string | null;
  note: string | null;
}

export interface TypographyDaVinciProductionReleaseEvaluation {
  validEnvelope: boolean;
  selectionFresh: boolean;
  patternMatchesCurrentSelection: boolean;
  humanPromotionVerified: boolean;
  releaseDecisionComplete: boolean;
  productionReady: boolean;
  issues: string[];
}

export function buildTypographyDaVinciProductionReleaseGateTemplate(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  report: TypographyDaVinciActualEvaluationReportV1,
): TypographyDaVinciProductionReleaseGateV1 {
  if (selection.sceneId !== scene.sceneId || selection.sourceRevision !== scene.updatedAt) {
    throw new Error("STALE_TYPOGRAPHY_ROUTE_SELECTION");
  }
  return {
    schemaVersion: "typography-davinci-production-release-gate/v1",
    authority: "HUMAN_PRODUCTION_RELEASE_DECISION",
    scene: {
      sceneId: scene.sceneId,
      sourceRevision: scene.updatedAt,
      patternId: selection.patternId,
      selectionSelectedAt: selection.selectedAt,
    },
    promotionSource: {...report.sourceSession},
    decision: "HOLD",
    releaseReviewer: null,
    releasedAt: null,
    note: "HOLD by default. Set RELEASE only after the matching Human promotion review is APPROVE and the current Scene revision/route selection remain unchanged.",
  };
}

export const buildTypographyDaVinciProductionReleaseGateTemplateJson = (
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  report: TypographyDaVinciActualEvaluationReportV1,
) => JSON.stringify(buildTypographyDaVinciProductionReleaseGateTemplate(scene, selection, report), null, 2);

const promotionIdentityMatches = (
  gate: TypographyDaVinciProductionReleaseGateV1,
  report: TypographyDaVinciActualEvaluationReportV1,
) =>
  gate.promotionSource.sessionId === report.sourceSession.sessionId &&
  gate.promotionSource.recordedAt === report.sourceSession.recordedAt &&
  gate.promotionSource.resolveVersion === report.sourceSession.resolveVersion &&
  gate.promotionSource.machine === report.sourceSession.machine;

export function evaluateTypographyDaVinciProductionReleaseGate(
  gate: TypographyDaVinciProductionReleaseGateV1,
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  report: TypographyDaVinciActualEvaluationReportV1,
  promotionReview: TypographyDaVinciHumanPromotionReviewV1,
): TypographyDaVinciProductionReleaseEvaluation {
  const issues: string[] = [];
  if (gate.schemaVersion !== "typography-davinci-production-release-gate/v1") issues.push("RELEASE_GATE_SCHEMA_VERSION_MISMATCH");
  if (gate.authority !== "HUMAN_PRODUCTION_RELEASE_DECISION") issues.push("RELEASE_GATE_AUTHORITY_MISMATCH");
  if (!promotionIdentityMatches(gate, report)) issues.push("PROMOTION_SOURCE_IDENTITY_MISMATCH");

  const selectionFresh =
    selection.sceneId === scene.sceneId &&
    selection.sourceRevision === scene.updatedAt &&
    gate.scene.sceneId === scene.sceneId &&
    gate.scene.sourceRevision === scene.updatedAt &&
    gate.scene.selectionSelectedAt === selection.selectedAt;
  if (!selectionFresh) issues.push("STALE_SCENE_OR_ROUTE_SELECTION");

  const patternMatchesCurrentSelection =
    gate.scene.patternId === selection.patternId &&
    report.items.some((item) => item.patternId === selection.patternId);
  if (!patternMatchesCurrentSelection) issues.push("RELEASE_PATTERN_MISMATCH");

  const promotionEvaluation = evaluateTypographyDaVinciHumanPromotionReview(promotionReview, report);
  const promotionItem = promotionEvaluation.items.find((item) => item.patternId === selection.patternId);
  const humanPromotionVerified =
    promotionEvaluation.validEnvelope &&
    promotionEvaluation.completeNinePatternCoverage &&
    promotionItem?.humanPromoted === true &&
    promotionItem.issues.length === 0;
  if (!humanPromotionVerified) issues.push("HUMAN_PROMOTION_NOT_VERIFIED_FOR_SELECTED_PATTERN");

  if (gate.decision !== "HOLD" && gate.decision !== "RELEASE") issues.push("RELEASE_DECISION_INVALID");
  if (gate.decision === "RELEASE") {
    if (!gate.releaseReviewer?.trim()) issues.push("RELEASE_REQUIRES_REVIEWER");
    if (!gate.releasedAt?.trim()) issues.push("RELEASE_REQUIRES_RELEASED_AT");
  }

  const releaseDecisionComplete =
    gate.decision === "RELEASE" &&
    Boolean(gate.releaseReviewer?.trim()) &&
    Boolean(gate.releasedAt?.trim());

  const productionReady =
    issues.length === 0 &&
    selectionFresh &&
    patternMatchesCurrentSelection &&
    humanPromotionVerified &&
    releaseDecisionComplete;

  return {
    validEnvelope: !issues.some((issue) => issue === "RELEASE_GATE_SCHEMA_VERSION_MISMATCH" || issue === "RELEASE_GATE_AUTHORITY_MISMATCH" || issue === "PROMOTION_SOURCE_IDENTITY_MISMATCH"),
    selectionFresh,
    patternMatchesCurrentSelection,
    humanPromotionVerified,
    releaseDecisionComplete,
    productionReady,
    issues: [...new Set(issues)],
  };
}

export function parseAndEvaluateTypographyDaVinciProductionReleaseGate(
  json: string,
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
  report: TypographyDaVinciActualEvaluationReportV1,
  promotionReview: TypographyDaVinciHumanPromotionReviewV1,
) {
  const gate = JSON.parse(json) as TypographyDaVinciProductionReleaseGateV1;
  return {gate, evaluation: evaluateTypographyDaVinciProductionReleaseGate(gate, scene, selection, report, promotionReview)};
}
