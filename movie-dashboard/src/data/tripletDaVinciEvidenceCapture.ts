import {
  attachTripletDaVinciActualReadback,
  type TripletActualState,
  type TripletDaVinciActualArtifactV1,
  type TripletDaVinciActualReadbackV1,
} from "./tripletDaVinciActualArtifact";
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

export type TripletBindingRole = "TEXT_PLUS_TOOL" | "TRANSFORM_BINDING" | "HIT_1" | "HIT_2" | "HIT_3" | "PULSE_DECAY" | "OPACITY";
export type TripletDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<TripletBindingRole>;

export interface TripletDaVinciEvidenceCaptureV1 {
  schemaVersion: "triplet-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: TripletDaVinciActualReadbackV1;
  liveParameterBindings: TripletDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<TripletActualState>;
  rule: string;
}

const allowedBindingRoles = ["TEXT_PLUS_TOOL", "TRANSFORM_BINDING", "HIT_1", "HIT_2", "HIT_3", "PULSE_DECAY", "OPACITY"] as const satisfies readonly TripletBindingRole[];

export function createTripletDaVinciEvidenceCaptureTemplate(artifact: TripletDaVinciActualArtifactV1): TripletDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "triplet-davinci-evidence-capture/v1", authority: "EVIDENCE_ONLY", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
    readback: {
      schemaVersion: "triplet-davinci-readback/v1", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
      capturedAt: "", resolveProduct: "", resolveVersion: "", transport: "", projectName: "", timelineName: "",
      textPlusToolFound: null, transformBindingRecorded: null, transformBindingIdentity: null, styledText: null, colorCss: null,
      hitFrames: null, pulseDurationFrames: null, scaleBase: null, scalePeakDeltas: null, opacityAppearStartFrame: null,
      opacityAppearEndFrame: null, pulseShapeObserved: null, renderedPreviewPath: null, notes: [],
    },
    liveParameterBindings: [], visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from real Mac Resolve evidence. Capture all three hit bindings/keyframe groups and render at 1x plus half speed; one visible pulse cannot satisfy triplet parity.",
  };
}

export function parseTripletDaVinciEvidenceCapture(raw: string, artifact: TripletDaVinciActualArtifactV1): TripletDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "triplet-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {sceneMismatchMessage: "Triplet capture sceneId mismatch", staleRevisionMessage: "STALE_TRIPLET_EVIDENCE_CAPTURE"});
  const r = evidenceObject(input.readback, "readback");
  if (r.schemaVersion !== "triplet-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const hitFrames = r.hitFrames === null ? null : Array.isArray(r.hitFrames) ? r.hitFrames.map((v, i) => evidenceNullableFiniteNumber(v, `readback.hitFrames[${i}]`) as number) : (() => {throw new Error("readback.hitFrames must be an array or null");})();
  const scalePeakDeltas = r.scalePeakDeltas === null ? null : Array.isArray(r.scalePeakDeltas) ? r.scalePeakDeltas.map((v, i) => evidenceNullableFiniteNumber(v, `readback.scalePeakDeltas[${i}]`) as number) : (() => {throw new Error("readback.scalePeakDeltas must be an array or null");})();
  const pulseShapeObserved = r.pulseShapeObserved;
  if (pulseShapeObserved !== null && pulseShapeObserved !== "LINEAR_DECAY_PER_HIT_SUMMED" && pulseShapeObserved !== "OTHER") throw new Error("readback.pulseShapeObserved invalid");
  const readback: TripletDaVinciActualReadbackV1 = {
    schemaVersion: "triplet-davinci-readback/v1", sceneId: evidenceString(r.sceneId, "readback.sceneId"), sourceRevision: evidenceString(r.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(r.capturedAt, "readback.capturedAt"), resolveProduct: evidenceString(r.resolveProduct, "readback.resolveProduct"), resolveVersion: evidenceString(r.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(r.transport, "readback.transport"), projectName: evidenceString(r.projectName, "readback.projectName"), timelineName: evidenceString(r.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(r.textPlusToolFound, "readback.textPlusToolFound"), transformBindingRecorded: evidenceNullableBoolean(r.transformBindingRecorded, "readback.transformBindingRecorded"),
    transformBindingIdentity: evidenceNullableString(r.transformBindingIdentity, "readback.transformBindingIdentity"), styledText: evidenceNullableString(r.styledText, "readback.styledText"), colorCss: evidenceNullableString(r.colorCss, "readback.colorCss"),
    hitFrames, pulseDurationFrames: evidenceNullableFiniteNumber(r.pulseDurationFrames, "readback.pulseDurationFrames"), scaleBase: evidenceNullableFiniteNumber(r.scaleBase, "readback.scaleBase"), scalePeakDeltas,
    opacityAppearStartFrame: evidenceNullableFiniteNumber(r.opacityAppearStartFrame, "readback.opacityAppearStartFrame"), opacityAppearEndFrame: evidenceNullableFiniteNumber(r.opacityAppearEndFrame, "readback.opacityAppearEndFrame"),
    pulseShapeObserved, renderedPreviewPath: evidenceNullableString(r.renderedPreviewPath, "readback.renderedPreviewPath"), notes: evidenceStringArray(r.notes, "readback.notes"),
  };
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  return {schemaVersion: "triplet-davinci-evidence-capture/v1", authority: "EVIDENCE_ONLY", sceneId, sourceRevision, readback, liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles), visualQa: parseDaVinciVisualQa(input.visualQa), rule: evidenceString(input.rule, "capture.rule")};
}

export function evaluateTripletDaVinciEvidenceCapture(
  artifact: TripletDaVinciActualArtifactV1,
  capture: TripletDaVinciEvidenceCaptureV1,
) {
  assertDaVinciEvidenceIdentity(capture, artifact, {sceneMismatchMessage: "Triplet capture sceneId mismatch", staleRevisionMessage: "STALE_TRIPLET_EVIDENCE_CAPTURE"});
  const evaluatedArtifact = attachTripletDaVinciActualReadback(artifact, capture.readback);
  const checks = {
    ...evaluatedArtifact.checks,
    visualQa1x: capture.visualQa.oneX,
    visualQaHalfSpeed: capture.visualQa.halfSpeed,
  };
  const promotionGate = evaluateTypographyDaVinciHumanPromotionGate({
    patternId: "type-triplet",
    machineChecks: [
      checks.resolveIdentity,
      checks.textPlusCreated,
      checks.transformBindingRecorded,
      checks.hitFramesApplied,
      checks.pulseDurationApplied,
      checks.scalePeaksApplied,
      checks.opacityApplied,
      checks.pulseShapeApplied,
      checks.sourceReadback,
      checks.renderCompleted,
    ],
    bindings: capture.liveParameterBindings,
    visualQa: capture.visualQa,
  });
  return {
    schemaVersion: "triplet-davinci-evaluated-evidence/v1" as const,
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
    rule: "Triplet can become eligible for a separate human promotion review only when all three hits, decay, opacity, live bindings and 1x/half-speed visual parity pass. A single visible pulse is never sufficient.",
  };
}
