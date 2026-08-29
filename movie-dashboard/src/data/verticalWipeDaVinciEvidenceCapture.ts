import {
  attachVerticalWipeDaVinciActualReadback,
  type VerticalWipeActualState,
  type VerticalWipeDaVinciActualArtifactV1,
  type VerticalWipeDaVinciActualReadbackV1,
} from "./verticalWipeDaVinciActualArtifact";
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

export type VerticalWipeBindingRole =
  | "TEXT_PLUS_TOOL"
  | "MASK_TOOL"
  | "MASK_INPUT"
  | "MASK_COORDINATE_CONVENTION"
  | "MASK_INVERSION"
  | "REVEAL_START"
  | "REVEAL_END"
  | "EASING";

export type VerticalWipeDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<VerticalWipeBindingRole>;

export interface VerticalWipeDaVinciEvidenceCaptureV1 {
  schemaVersion: "vertical-wipe-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: VerticalWipeDaVinciActualReadbackV1;
  liveParameterBindings: VerticalWipeDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<VerticalWipeActualState>;
  rule: string;
}

export interface VerticalWipeDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "vertical-wipe-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachVerticalWipeDaVinciActualReadback>;
  liveParameterBindings: VerticalWipeDaVinciLiveParameterBindingV1[];
  parameterBindingsCaptured: boolean;
  visualQa: VerticalWipeDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachVerticalWipeDaVinciActualReadback>["checks"] & {
    visualQa1x: VerticalWipeActualState;
    visualQaHalfSpeed: VerticalWipeActualState;
  };
  allMachineComparableChecksPass: boolean;
  promotionGate: ReturnType<typeof evaluateTypographyDaVinciHumanPromotionGate>;
  eligibleForHumanReview: boolean;
  automaticPromotionAllowed: false;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = [
  "TEXT_PLUS_TOOL",
  "MASK_TOOL",
  "MASK_INPUT",
  "MASK_COORDINATE_CONVENTION",
  "MASK_INVERSION",
  "REVEAL_START",
  "REVEAL_END",
  "EASING",
] as const satisfies readonly VerticalWipeBindingRole[];

const blankReadback = (artifact: VerticalWipeDaVinciActualArtifactV1): VerticalWipeDaVinciActualReadbackV1 => ({
  schemaVersion: "vertical-wipe-davinci-readback/v1",
  sceneId: artifact.sceneId,
  sourceRevision: artifact.sourceRevision,
  capturedAt: "",
  resolveProduct: "",
  resolveVersion: "",
  transport: "",
  projectName: "",
  timelineName: "",
  textPlusToolFound: null,
  maskToolFound: null,
  maskBindingRecorded: null,
  maskToolType: null,
  maskInputName: null,
  coordinateConvention: null,
  maskInverted: null,
  styledText: null,
  colorCss: null,
  durationFrames: null,
  directionObserved: null,
  normalizedTopInsetFrom: null,
  normalizedTopInsetTo: null,
  textOpacity: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createVerticalWipeDaVinciEvidenceCaptureTemplate(artifact: VerticalWipeDaVinciActualArtifactV1): VerticalWipeDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "vertical-wipe-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Record the real mask graph, input, coordinate convention and inversion before normalizing reveal bounds. Never infer live Fusion bindings from the Remotion clip-path.",
  };
}

function parseReadback(value: unknown): VerticalWipeDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "vertical-wipe-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const directionObserved = input.directionObserved;
  if (directionObserved !== null && directionObserved !== "TOP_TO_BOTTOM" && directionObserved !== "OTHER") throw new Error("readback.directionObserved must be TOP_TO_BOTTOM|OTHER|null");
  const easingObserved = input.easingObserved;
  if (easingObserved !== null && easingObserved !== "EASE_OUT_CUBIC" && easingObserved !== "OTHER") throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  return {
    schemaVersion: "vertical-wipe-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"),
    sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"),
    timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    maskToolFound: evidenceNullableBoolean(input.maskToolFound, "readback.maskToolFound"),
    maskBindingRecorded: evidenceNullableBoolean(input.maskBindingRecorded, "readback.maskBindingRecorded"),
    maskToolType: evidenceNullableString(input.maskToolType, "readback.maskToolType"),
    maskInputName: evidenceNullableString(input.maskInputName, "readback.maskInputName"),
    coordinateConvention: evidenceNullableString(input.coordinateConvention, "readback.coordinateConvention"),
    maskInverted: evidenceNullableBoolean(input.maskInverted, "readback.maskInverted"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"),
    colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    durationFrames: evidenceNullableFiniteNumber(input.durationFrames, "readback.durationFrames"),
    directionObserved,
    normalizedTopInsetFrom: evidenceNullableFiniteNumber(input.normalizedTopInsetFrom, "readback.normalizedTopInsetFrom"),
    normalizedTopInsetTo: evidenceNullableFiniteNumber(input.normalizedTopInsetTo, "readback.normalizedTopInsetTo"),
    textOpacity: evidenceNullableFiniteNumber(input.textOpacity, "readback.textOpacity"),
    easingObserved,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseVerticalWipeDaVinciEvidenceCapture(raw: string, artifact: VerticalWipeDaVinciActualArtifactV1): VerticalWipeDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "vertical-wipe-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {sceneMismatchMessage: "Vertical Wipe capture sceneId mismatch", staleRevisionMessage: "STALE_VERTICAL_WIPE_EVIDENCE_CAPTURE"});
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  return {
    schemaVersion: "vertical-wipe-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles),
    visualQa: parseDaVinciVisualQa(input.visualQa),
    rule: evidenceString(input.rule, "capture.rule"),
  };
}

export function evaluateVerticalWipeDaVinciEvidenceCapture(artifact: VerticalWipeDaVinciActualArtifactV1, capture: VerticalWipeDaVinciEvidenceCaptureV1): VerticalWipeDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {sceneMismatchMessage: "Vertical Wipe capture sceneId mismatch", staleRevisionMessage: "STALE_VERTICAL_WIPE_EVIDENCE_CAPTURE"});
  const evaluatedArtifact = attachVerticalWipeDaVinciActualReadback(artifact, capture.readback);
  const checks = {...evaluatedArtifact.checks, visualQa1x: capture.visualQa.oneX, visualQaHalfSpeed: capture.visualQa.halfSpeed};
  const machineComparable = [checks.resolveIdentity, checks.textPlusCreated, checks.maskAttached, checks.maskBindingRecorded, checks.durationApplied, checks.directionApplied, checks.revealBoundsApplied, checks.textOpacityApplied, checks.easingApplied, checks.sourceReadback, checks.renderCompleted];
  const promotionGate = evaluateTypographyDaVinciHumanPromotionGate({
    patternId: "type-vertical-wipe",
    machineChecks: machineComparable,
    bindings: capture.liveParameterBindings,
    visualQa: capture.visualQa,
  });
  return {
    schemaVersion: "vertical-wipe-davinci-evaluated-evidence/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: {...evaluatedArtifact, checks},
    liveParameterBindings: [...capture.liveParameterBindings],
    parameterBindingsCaptured: capture.liveParameterBindings.length > 0,
    visualQa: {...capture.visualQa, notes: [...capture.visualQa.notes]},
    checks,
    allMachineComparableChecksPass: promotionGate.machineChecksPass,
    promotionGate,
    eligibleForHumanReview: promotionGate.eligibleForHumanReview,
    automaticPromotionAllowed: false,
    productionReady: false,
    rule: "Exact normalized reveal comparison is meaningful only after the live Fusion mask graph and coordinate convention are actually recorded. Complete evidence may only enter a separate human promotion review and cannot auto-promote the route.",
  };
}
