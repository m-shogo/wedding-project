import {
  attachBaselineHopDaVinciActualReadback,
  type BaselineHopActualState,
  type BaselineHopDaVinciActualArtifactV1,
  type BaselineHopDaVinciActualReadbackV1,
} from "./baselineHopDaVinciActualArtifact";
import {
  assertDaVinciEvidenceIdentity,
  blankDaVinciVisualQa,
  evidenceNullableBoolean,
  evidenceNullableFiniteNumber,
  evidenceNullableString,
  evidenceObject,
  evidenceString,
  evidenceStringArray,
  parseDaVinciLiveParameterBindings,
  parseDaVinciVisualQa,
  type DaVinciLiveParameterBindingV1,
  type DaVinciVisualQaV1,
} from "./davinciFollowerEvidenceContract";
import {evaluateTypographyDaVinciHumanPromotionGate} from "./typographyDaVinciPromotionPolicy";

export type BaselineHopBindingRole = "TEXT_PLUS_TOOL" | "BASELINE_POSITION_BINDING" | "POSITION_UNIT_CALIBRATION" | "OPACITY" | "HOP_POSITION" | "OPACITY_EASING" | "BOUNCE_SPLINE";
export type BaselineHopDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<BaselineHopBindingRole>;

export interface BaselineHopDaVinciEvidenceCaptureV1 {
  schemaVersion: "baseline-hop-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: BaselineHopDaVinciActualReadbackV1;
  liveParameterBindings: BaselineHopDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<BaselineHopActualState>;
  rule: string;
}

const allowedBindingRoles = ["TEXT_PLUS_TOOL", "BASELINE_POSITION_BINDING", "POSITION_UNIT_CALIBRATION", "OPACITY", "HOP_POSITION", "OPACITY_EASING", "BOUNCE_SPLINE"] as const satisfies readonly BaselineHopBindingRole[];

export function createBaselineHopDaVinciEvidenceCaptureTemplate(artifact: BaselineHopDaVinciActualArtifactV1): BaselineHopDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "baseline-hop-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: {
      schemaVersion: "baseline-hop-davinci-readback/v1", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
      capturedAt: "", resolveProduct: "", resolveVersion: "", transport: "", projectName: "", timelineName: "",
      textPlusToolFound: null, baselineBindingRecorded: null, baselineBindingIdentity: null, positionUnit: null, styledText: null,
      colorCss: null, opacityEndFrame: null, hopEndFrame: null, normalizedTranslateYFromPx: null, normalizedTranslateYToPx: null,
      rawPositionFrom: null, rawPositionTo: null, opacityEasingObserved: null, hopEasingObserved: null, renderedPreviewPath: null, notes: [],
    },
    liveParameterBindings: [], visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Preserve raw position values and the measured conversion to canonical pixel-equivalent vertical displacement; record the actual bounce spline rather than assuming Remotion Easing.bounce maps 1:1.",
  };
}

function parseReadback(value: unknown): BaselineHopDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "baseline-hop-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const opacityEasingObserved = input.opacityEasingObserved;
  if (opacityEasingObserved !== null && opacityEasingObserved !== "EASE_OUT_CUBIC" && opacityEasingObserved !== "OTHER") throw new Error("readback.opacityEasingObserved invalid");
  const hopEasingObserved = input.hopEasingObserved;
  if (hopEasingObserved !== null && hopEasingObserved !== "REMOTION_EASING_BOUNCE" && hopEasingObserved !== "OTHER") throw new Error("readback.hopEasingObserved invalid");
  return {
    schemaVersion: "baseline-hop-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"), sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"), resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"), transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"), timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"), baselineBindingRecorded: evidenceNullableBoolean(input.baselineBindingRecorded, "readback.baselineBindingRecorded"),
    baselineBindingIdentity: evidenceNullableString(input.baselineBindingIdentity, "readback.baselineBindingIdentity"), positionUnit: evidenceNullableString(input.positionUnit, "readback.positionUnit"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"), colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    opacityEndFrame: evidenceNullableFiniteNumber(input.opacityEndFrame, "readback.opacityEndFrame"), hopEndFrame: evidenceNullableFiniteNumber(input.hopEndFrame, "readback.hopEndFrame"),
    normalizedTranslateYFromPx: evidenceNullableFiniteNumber(input.normalizedTranslateYFromPx, "readback.normalizedTranslateYFromPx"), normalizedTranslateYToPx: evidenceNullableFiniteNumber(input.normalizedTranslateYToPx, "readback.normalizedTranslateYToPx"),
    rawPositionFrom: evidenceNullableFiniteNumber(input.rawPositionFrom, "readback.rawPositionFrom"), rawPositionTo: evidenceNullableFiniteNumber(input.rawPositionTo, "readback.rawPositionTo"),
    opacityEasingObserved, hopEasingObserved, renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"), notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseBaselineHopDaVinciEvidenceCapture(raw: string, artifact: BaselineHopDaVinciActualArtifactV1): BaselineHopDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "baseline-hop-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {sceneMismatchMessage: "Baseline Hop capture sceneId mismatch", staleRevisionMessage: "STALE_BASELINE_HOP_EVIDENCE_CAPTURE"});
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  return {schemaVersion: "baseline-hop-davinci-evidence-capture/v1", authority: "EVIDENCE_ONLY", sceneId, sourceRevision, readback, liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles), visualQa: parseDaVinciVisualQa(input.visualQa), rule: evidenceString(input.rule, "capture.rule")};
}

export function evaluateBaselineHopDaVinciEvidenceCapture(
  artifact: BaselineHopDaVinciActualArtifactV1,
  capture: BaselineHopDaVinciEvidenceCaptureV1,
) {
  assertDaVinciEvidenceIdentity(capture, artifact, {sceneMismatchMessage: "Baseline Hop capture sceneId mismatch", staleRevisionMessage: "STALE_BASELINE_HOP_EVIDENCE_CAPTURE"});
  const evaluatedArtifact = attachBaselineHopDaVinciActualReadback(artifact, capture.readback);
  const checks = {
    ...evaluatedArtifact.checks,
    visualQa1x: capture.visualQa.oneX,
    visualQaHalfSpeed: capture.visualQa.halfSpeed,
  };
  const promotionGate = evaluateTypographyDaVinciHumanPromotionGate({
    patternId: "type-baseline-hop",
    machineChecks: [
      checks.resolveIdentity,
      checks.textPlusCreated,
      checks.baselineBindingRecorded,
      checks.opacityTimingApplied,
      checks.hopTimingApplied,
      checks.positionApplied,
      checks.opacityEasingApplied,
      checks.hopEasingApplied,
      checks.sourceReadback,
      checks.renderCompleted,
    ],
    bindings: capture.liveParameterBindings,
    visualQa: capture.visualQa,
  });
  return {
    schemaVersion: "baseline-hop-davinci-evaluated-evidence/v1" as const,
    authority: "EVIDENCE_ONLY" as const,
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: {...evaluatedArtifact, checks},
    liveParameterBindings: [...capture.liveParameterBindings],
    visualQa: {...capture.visualQa, notes: [...capture.visualQa.notes]},
    promotionGate,
    eligibleForHumanReview: promotionGate.eligibleForHumanReview,
    automaticPromotionAllowed: false as const,
    productionReady: false as const,
    rule: "Baseline Hop can become eligible for a separate human promotion review only after canonical readback parity, all required live bindings, and 1x/half-speed QA pass. No automatic route promotion is allowed.",
  };
}
