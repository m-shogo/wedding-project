import {createTrackingBurstDaVinciActualArtifact} from "./trackingBurstDaVinciActualArtifact";
import {
  createTrackingBurstDaVinciEvidenceCaptureTemplate,
  evaluateTrackingBurstDaVinciEvidenceCapture,
  parseTrackingBurstDaVinciEvidenceCapture,
} from "./trackingBurstDaVinciEvidenceCapture";
import {createVerticalWipeDaVinciActualArtifact} from "./verticalWipeDaVinciActualArtifact";
import {
  createVerticalWipeDaVinciEvidenceCaptureTemplate,
  evaluateVerticalWipeDaVinciEvidenceCapture,
  parseVerticalWipeDaVinciEvidenceCapture,
} from "./verticalWipeDaVinciEvidenceCapture";
import {createOutlineFillDaVinciActualArtifact} from "./outlineFillDaVinciActualArtifact";
import {
  createOutlineFillDaVinciEvidenceCaptureTemplate,
  evaluateOutlineFillDaVinciEvidenceCapture,
  parseOutlineFillDaVinciEvidenceCapture,
} from "./outlineFillDaVinciEvidenceCapture";
import {createBaselineHopDaVinciActualArtifact} from "./baselineHopDaVinciActualArtifact";
import {
  createBaselineHopDaVinciEvidenceCaptureTemplate,
  evaluateBaselineHopDaVinciEvidenceCapture,
  parseBaselineHopDaVinciEvidenceCapture,
} from "./baselineHopDaVinciEvidenceCapture";
import {createTripletDaVinciActualArtifact} from "./tripletDaVinciActualArtifact";
import {
  createTripletDaVinciEvidenceCaptureTemplate,
  evaluateTripletDaVinciEvidenceCapture,
  parseTripletDaVinciEvidenceCapture,
} from "./tripletDaVinciEvidenceCapture";
import type {
  TypographyProductionPatternId,
  TypographyProductionSelectionV1,
} from "./typographySceneProductionRouting";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export type GenericTypographyEvidencePatternId =
  | "type-tracking-burst"
  | "type-vertical-wipe"
  | "type-outline-fill"
  | "type-baseline-hop"
  | "type-triplet";

export interface TypographyDaVinciEvidenceEvaluationSummaryV1 {
  schemaVersion: "typography-davinci-evidence-evaluation-summary/v1";
  authority: "DERIVED_EVIDENCE_SUMMARY";
  patternId: GenericTypographyEvidencePatternId;
  machineChecksPass: boolean;
  bindingsComplete: boolean;
  visualQaComplete: boolean;
  eligibleForHumanReview: boolean;
  automaticPromotionAllowed: false;
  productionReady: false;
  blockers: string[];
}

export interface TypographyDaVinciEvidenceEvaluationResultV1 {
  evaluatedJson: string;
  summary: TypographyDaVinciEvidenceEvaluationSummaryV1;
}

export interface TypographyDaVinciEvidenceWorkflowV1 {
  patternId: GenericTypographyEvidencePatternId;
  label: string;
  actualFileSuffix: string;
  captureFileSuffix: string;
  evaluatedFileSuffix: string;
  createActualJson: (scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) => string;
  createCaptureTemplateJson: (scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) => string;
  evaluateCaptureJson: (
    scene: MaskRevealSceneInstance,
    selection: TypographyProductionSelectionV1,
    raw: string,
  ) => TypographyDaVinciEvidenceEvaluationResultV1;
}

type EvaluatedEvidenceShape = {
  promotionGate: {
    machineChecksPass: boolean;
    bindingsComplete: boolean;
    visualQaComplete: boolean;
    blockers: string[];
  };
  eligibleForHumanReview: boolean;
  automaticPromotionAllowed: false;
  productionReady: false;
};

const serialize = (value: unknown) => JSON.stringify(value, null, 2);

function summarize(
  patternId: GenericTypographyEvidencePatternId,
  evaluated: EvaluatedEvidenceShape,
): TypographyDaVinciEvidenceEvaluationSummaryV1 {
  return {
    schemaVersion: "typography-davinci-evidence-evaluation-summary/v1",
    authority: "DERIVED_EVIDENCE_SUMMARY",
    patternId,
    machineChecksPass: evaluated.promotionGate.machineChecksPass,
    bindingsComplete: evaluated.promotionGate.bindingsComplete,
    visualQaComplete: evaluated.promotionGate.visualQaComplete,
    eligibleForHumanReview: evaluated.eligibleForHumanReview,
    automaticPromotionAllowed: false,
    productionReady: false,
    blockers: [...evaluated.promotionGate.blockers],
  };
}

function requireSelection(
  selection: TypographyProductionSelectionV1,
  patternId: GenericTypographyEvidencePatternId,
) {
  if (selection.patternId !== patternId) {
    throw new Error(`Typography evidence workflow ${patternId} cannot evaluate selection ${selection.patternId}`);
  }
}

const workflows: Record<GenericTypographyEvidencePatternId, TypographyDaVinciEvidenceWorkflowV1> = {
  "type-tracking-burst": {
    patternId: "type-tracking-burst",
    label: "Tracking Burst",
    actualFileSuffix: "type-tracking-burst-davinci-actual.json",
    captureFileSuffix: "type-tracking-burst-davinci-evidence-capture.json",
    evaluatedFileSuffix: "type-tracking-burst-davinci-evaluated-evidence.json",
    createActualJson(scene, selection) {
      requireSelection(selection, "type-tracking-burst");
      return serialize(createTrackingBurstDaVinciActualArtifact(scene, selection));
    },
    createCaptureTemplateJson(scene, selection) {
      requireSelection(selection, "type-tracking-burst");
      const artifact = createTrackingBurstDaVinciActualArtifact(scene, selection);
      return serialize(createTrackingBurstDaVinciEvidenceCaptureTemplate(artifact));
    },
    evaluateCaptureJson(scene, selection, raw) {
      requireSelection(selection, "type-tracking-burst");
      const artifact = createTrackingBurstDaVinciActualArtifact(scene, selection);
      const capture = parseTrackingBurstDaVinciEvidenceCapture(raw, artifact);
      const evaluated = evaluateTrackingBurstDaVinciEvidenceCapture(artifact, capture);
      return {evaluatedJson: serialize(evaluated), summary: summarize("type-tracking-burst", evaluated)};
    },
  },
  "type-vertical-wipe": {
    patternId: "type-vertical-wipe",
    label: "Vertical Wipe",
    actualFileSuffix: "type-vertical-wipe-davinci-actual.json",
    captureFileSuffix: "type-vertical-wipe-davinci-evidence-capture.json",
    evaluatedFileSuffix: "type-vertical-wipe-davinci-evaluated-evidence.json",
    createActualJson(scene, selection) {
      requireSelection(selection, "type-vertical-wipe");
      return serialize(createVerticalWipeDaVinciActualArtifact(scene, selection));
    },
    createCaptureTemplateJson(scene, selection) {
      requireSelection(selection, "type-vertical-wipe");
      const artifact = createVerticalWipeDaVinciActualArtifact(scene, selection);
      return serialize(createVerticalWipeDaVinciEvidenceCaptureTemplate(artifact));
    },
    evaluateCaptureJson(scene, selection, raw) {
      requireSelection(selection, "type-vertical-wipe");
      const artifact = createVerticalWipeDaVinciActualArtifact(scene, selection);
      const capture = parseVerticalWipeDaVinciEvidenceCapture(raw, artifact);
      const evaluated = evaluateVerticalWipeDaVinciEvidenceCapture(artifact, capture);
      return {evaluatedJson: serialize(evaluated), summary: summarize("type-vertical-wipe", evaluated)};
    },
  },
  "type-outline-fill": {
    patternId: "type-outline-fill",
    label: "Outline Fill",
    actualFileSuffix: "type-outline-fill-davinci-actual.json",
    captureFileSuffix: "type-outline-fill-davinci-evidence-capture.json",
    evaluatedFileSuffix: "type-outline-fill-davinci-evaluated-evidence.json",
    createActualJson(scene, selection) {
      requireSelection(selection, "type-outline-fill");
      return serialize(createOutlineFillDaVinciActualArtifact(scene, selection));
    },
    createCaptureTemplateJson(scene, selection) {
      requireSelection(selection, "type-outline-fill");
      const artifact = createOutlineFillDaVinciActualArtifact(scene, selection);
      return serialize(createOutlineFillDaVinciEvidenceCaptureTemplate(artifact));
    },
    evaluateCaptureJson(scene, selection, raw) {
      requireSelection(selection, "type-outline-fill");
      const artifact = createOutlineFillDaVinciActualArtifact(scene, selection);
      const capture = parseOutlineFillDaVinciEvidenceCapture(raw, artifact);
      const evaluated = evaluateOutlineFillDaVinciEvidenceCapture(artifact, capture);
      return {evaluatedJson: serialize(evaluated), summary: summarize("type-outline-fill", evaluated)};
    },
  },
  "type-baseline-hop": {
    patternId: "type-baseline-hop",
    label: "Baseline Hop",
    actualFileSuffix: "type-baseline-hop-davinci-actual.json",
    captureFileSuffix: "type-baseline-hop-davinci-evidence-capture.json",
    evaluatedFileSuffix: "type-baseline-hop-davinci-evaluated-evidence.json",
    createActualJson(scene, selection) {
      requireSelection(selection, "type-baseline-hop");
      return serialize(createBaselineHopDaVinciActualArtifact(scene, selection));
    },
    createCaptureTemplateJson(scene, selection) {
      requireSelection(selection, "type-baseline-hop");
      const artifact = createBaselineHopDaVinciActualArtifact(scene, selection);
      return serialize(createBaselineHopDaVinciEvidenceCaptureTemplate(artifact));
    },
    evaluateCaptureJson(scene, selection, raw) {
      requireSelection(selection, "type-baseline-hop");
      const artifact = createBaselineHopDaVinciActualArtifact(scene, selection);
      const capture = parseBaselineHopDaVinciEvidenceCapture(raw, artifact);
      const evaluated = evaluateBaselineHopDaVinciEvidenceCapture(artifact, capture);
      return {evaluatedJson: serialize(evaluated), summary: summarize("type-baseline-hop", evaluated)};
    },
  },
  "type-triplet": {
    patternId: "type-triplet",
    label: "Triplet",
    actualFileSuffix: "type-triplet-davinci-actual.json",
    captureFileSuffix: "type-triplet-davinci-evidence-capture.json",
    evaluatedFileSuffix: "type-triplet-davinci-evaluated-evidence.json",
    createActualJson(scene, selection) {
      requireSelection(selection, "type-triplet");
      return serialize(createTripletDaVinciActualArtifact(scene, selection));
    },
    createCaptureTemplateJson(scene, selection) {
      requireSelection(selection, "type-triplet");
      const artifact = createTripletDaVinciActualArtifact(scene, selection);
      return serialize(createTripletDaVinciEvidenceCaptureTemplate(artifact));
    },
    evaluateCaptureJson(scene, selection, raw) {
      requireSelection(selection, "type-triplet");
      const artifact = createTripletDaVinciActualArtifact(scene, selection);
      const capture = parseTripletDaVinciEvidenceCapture(raw, artifact);
      const evaluated = evaluateTripletDaVinciEvidenceCapture(artifact, capture);
      return {evaluatedJson: serialize(evaluated), summary: summarize("type-triplet", evaluated)};
    },
  },
};

export function isGenericTypographyEvidencePatternId(
  patternId: TypographyProductionPatternId,
): patternId is GenericTypographyEvidencePatternId {
  return patternId in workflows;
}

export function getTypographyDaVinciEvidenceWorkflow(
  patternId: GenericTypographyEvidencePatternId,
): TypographyDaVinciEvidenceWorkflowV1 {
  return workflows[patternId];
}
