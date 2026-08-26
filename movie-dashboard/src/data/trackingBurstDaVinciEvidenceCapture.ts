import {
  attachTrackingBurstDaVinciActualReadback,
  type TrackingBurstActualState,
  type TrackingBurstDaVinciActualArtifactV1,
  type TrackingBurstDaVinciActualReadbackV1,
} from "./trackingBurstDaVinciActualArtifact";
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

export type TrackingBurstBindingRole =
  | "TEXT_PLUS_TOOL"
  | "CHARACTER_SPACING_INPUT"
  | "NATIVE_UNIT_CALIBRATION"
  | "TRACKING_START"
  | "TRACKING_END"
  | "OPACITY"
  | "EASING";

export type TrackingBurstDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<TrackingBurstBindingRole>;

export interface TrackingBurstDaVinciEvidenceCaptureV1 {
  schemaVersion: "tracking-burst-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: TrackingBurstDaVinciActualReadbackV1;
  liveParameterBindings: TrackingBurstDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<TrackingBurstActualState>;
  rule: string;
}

export interface TrackingBurstDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "tracking-burst-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachTrackingBurstDaVinciActualReadback>;
  liveParameterBindings: TrackingBurstDaVinciLiveParameterBindingV1[];
  parameterBindingsCaptured: boolean;
  visualQa: TrackingBurstDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachTrackingBurstDaVinciActualReadback>["checks"] & {
    visualQa1x: TrackingBurstActualState;
    visualQaHalfSpeed: TrackingBurstActualState;
  };
  allMachineComparableChecksPass: boolean;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = [
  "TEXT_PLUS_TOOL",
  "CHARACTER_SPACING_INPUT",
  "NATIVE_UNIT_CALIBRATION",
  "TRACKING_START",
  "TRACKING_END",
  "OPACITY",
  "EASING",
] as const satisfies readonly TrackingBurstBindingRole[];

const blankReadback = (artifact: TrackingBurstDaVinciActualArtifactV1): TrackingBurstDaVinciActualReadbackV1 => ({
  schemaVersion: "tracking-burst-davinci-readback/v1",
  sceneId: artifact.sceneId,
  sourceRevision: artifact.sourceRevision,
  capturedAt: "",
  resolveProduct: "",
  resolveVersion: "",
  transport: "",
  projectName: "",
  timelineName: "",
  textPlusToolFound: null,
  characterSpacingInputFound: null,
  styledText: null,
  colorCss: null,
  durationFrames: null,
  rawTrackingFrom: null,
  rawTrackingTo: null,
  normalizedTrackingFromEm: null,
  normalizedTrackingToEm: null,
  nativeUnitCalibrationRecorded: null,
  opacityFrom: null,
  opacityTo: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createTrackingBurstDaVinciEvidenceCaptureTemplate(
  artifact: TrackingBurstDaVinciActualArtifactV1,
): TrackingBurstDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "tracking-burst-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Record raw native tracking values and the measured normalized calibration; never infer a conversion or overwrite HUMAN_SELECTED Scene authority.",
  };
}

function parseReadback(value: unknown): TrackingBurstDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "tracking-burst-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const easingObserved = input.easingObserved;
  if (easingObserved !== null && easingObserved !== "EASE_OUT_CUBIC" && easingObserved !== "OTHER") {
    throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  }
  return {
    schemaVersion: "tracking-burst-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"),
    sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"),
    timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    characterSpacingInputFound: evidenceNullableBoolean(input.characterSpacingInputFound, "readback.characterSpacingInputFound"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"),
    colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    durationFrames: evidenceNullableFiniteNumber(input.durationFrames, "readback.durationFrames"),
    rawTrackingFrom: evidenceNullableFiniteNumber(input.rawTrackingFrom, "readback.rawTrackingFrom"),
    rawTrackingTo: evidenceNullableFiniteNumber(input.rawTrackingTo, "readback.rawTrackingTo"),
    normalizedTrackingFromEm: evidenceNullableFiniteNumber(input.normalizedTrackingFromEm, "readback.normalizedTrackingFromEm"),
    normalizedTrackingToEm: evidenceNullableFiniteNumber(input.normalizedTrackingToEm, "readback.normalizedTrackingToEm"),
    nativeUnitCalibrationRecorded: evidenceNullableBoolean(input.nativeUnitCalibrationRecorded, "readback.nativeUnitCalibrationRecorded"),
    opacityFrom: evidenceNullableFiniteNumber(input.opacityFrom, "readback.opacityFrom"),
    opacityTo: evidenceNullableFiniteNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseTrackingBurstDaVinciEvidenceCapture(
  raw: string,
  artifact: TrackingBurstDaVinciActualArtifactV1,
): TrackingBurstDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "tracking-burst-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {
    sceneMismatchMessage: "Tracking Burst capture sceneId mismatch",
    staleRevisionMessage: "STALE_TRACKING_BURST_EVIDENCE_CAPTURE",
  });
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) {
    throw new Error("capture/readback identity mismatch");
  }
  return {
    schemaVersion: "tracking-burst-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles),
    visualQa: parseDaVinciVisualQa(input.visualQa),
    rule: evidenceString(input.rule, "capture.rule"),
  };
}

export function evaluateTrackingBurstDaVinciEvidenceCapture(
  artifact: TrackingBurstDaVinciActualArtifactV1,
  capture: TrackingBurstDaVinciEvidenceCaptureV1,
): TrackingBurstDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {
    sceneMismatchMessage: "Tracking Burst capture sceneId mismatch",
    staleRevisionMessage: "STALE_TRACKING_BURST_EVIDENCE_CAPTURE",
  });
  const evaluatedArtifact = attachTrackingBurstDaVinciActualReadback(artifact, capture.readback);
  const checks = {
    ...evaluatedArtifact.checks,
    visualQa1x: capture.visualQa.oneX,
    visualQaHalfSpeed: capture.visualQa.halfSpeed,
  };
  const machineComparable = [
    checks.resolveIdentity,
    checks.textPlusCreated,
    checks.characterSpacingInputAttached,
    checks.nativeUnitCalibrationRecorded,
    checks.durationApplied,
    checks.trackingApplied,
    checks.opacityApplied,
    checks.easingApplied,
    checks.sourceReadback,
    checks.renderCompleted,
  ];
  return {
    schemaVersion: "tracking-burst-davinci-evaluated-evidence/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: {...evaluatedArtifact, checks},
    liveParameterBindings: [...capture.liveParameterBindings],
    parameterBindingsCaptured: capture.liveParameterBindings.length > 0,
    visualQa: {...capture.visualQa, notes: [...capture.visualQa.notes]},
    checks,
    allMachineComparableChecksPass: machineComparable.every((state) => state === "PASS"),
    productionReady: false,
    rule: "Machine comparison is meaningful only after native tracking-unit calibration is actually recorded. Promotion remains a separate human-reviewed gate.",
  };
}
