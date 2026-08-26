import {
  attachOutlineFillDaVinciActualReadback,
  type OutlineFillActualState,
  type OutlineFillDaVinciActualArtifactV1,
  type OutlineFillDaVinciActualReadbackV1,
} from "./outlineFillDaVinciActualArtifact";
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

export type OutlineFillBindingRole =
  | "TEXT_PLUS_TOOL"
  | "FILL_SHADING_BINDING"
  | "STROKE_SHADING_BINDING"
  | "STROKE_WIDTH_UNIT_CALIBRATION"
  | "OUTLINE_APPEAR"
  | "FILL_OPACITY"
  | "STROKE_WIDTH"
  | "EASING";

export type OutlineFillDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<OutlineFillBindingRole>;

export interface OutlineFillDaVinciEvidenceCaptureV1 {
  schemaVersion: "outline-fill-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: OutlineFillDaVinciActualReadbackV1;
  liveParameterBindings: OutlineFillDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<OutlineFillActualState>;
  rule: string;
}

export interface OutlineFillDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "outline-fill-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachOutlineFillDaVinciActualReadback>;
  liveParameterBindings: OutlineFillDaVinciLiveParameterBindingV1[];
  parameterBindingsCaptured: boolean;
  visualQa: OutlineFillDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachOutlineFillDaVinciActualReadback>["checks"] & {
    visualQa1x: OutlineFillActualState;
    visualQaHalfSpeed: OutlineFillActualState;
  };
  allMachineComparableChecksPass: boolean;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = [
  "TEXT_PLUS_TOOL",
  "FILL_SHADING_BINDING",
  "STROKE_SHADING_BINDING",
  "STROKE_WIDTH_UNIT_CALIBRATION",
  "OUTLINE_APPEAR",
  "FILL_OPACITY",
  "STROKE_WIDTH",
  "EASING",
] as const satisfies readonly OutlineFillBindingRole[];

const blankReadback = (artifact: OutlineFillDaVinciActualArtifactV1): OutlineFillDaVinciActualReadbackV1 => ({
  schemaVersion: "outline-fill-davinci-readback/v1",
  sceneId: artifact.sceneId,
  sourceRevision: artifact.sourceRevision,
  capturedAt: "",
  resolveProduct: "",
  resolveVersion: "",
  transport: "",
  projectName: "",
  timelineName: "",
  textPlusToolFound: null,
  shadingBindingRecorded: null,
  fillBindingIdentity: null,
  strokeBindingIdentity: null,
  strokeWidthUnit: null,
  styledText: null,
  colorCss: null,
  outlineAppearEndFrame: null,
  fillStartFrame: null,
  fillEndFrame: null,
  fillOpacityFrom: null,
  fillOpacityTo: null,
  normalizedStrokeWidthFromPx: null,
  normalizedStrokeWidthToPx: null,
  rawStrokeWidthFrom: null,
  rawStrokeWidthTo: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createOutlineFillDaVinciEvidenceCaptureTemplate(artifact: OutlineFillDaVinciActualArtifactV1): OutlineFillDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "outline-fill-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Record actual Shading binding identities and raw stroke-width unit values before normalizing to canonical px-equivalent evidence.",
  };
}

function parseReadback(value: unknown): OutlineFillDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "outline-fill-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const easingObserved = input.easingObserved;
  if (easingObserved !== null && easingObserved !== "EASE_OUT_CUBIC" && easingObserved !== "OTHER") throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  return {
    schemaVersion: "outline-fill-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"),
    sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"),
    timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    shadingBindingRecorded: evidenceNullableBoolean(input.shadingBindingRecorded, "readback.shadingBindingRecorded"),
    fillBindingIdentity: evidenceNullableString(input.fillBindingIdentity, "readback.fillBindingIdentity"),
    strokeBindingIdentity: evidenceNullableString(input.strokeBindingIdentity, "readback.strokeBindingIdentity"),
    strokeWidthUnit: evidenceNullableString(input.strokeWidthUnit, "readback.strokeWidthUnit"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"),
    colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    outlineAppearEndFrame: evidenceNullableFiniteNumber(input.outlineAppearEndFrame, "readback.outlineAppearEndFrame"),
    fillStartFrame: evidenceNullableFiniteNumber(input.fillStartFrame, "readback.fillStartFrame"),
    fillEndFrame: evidenceNullableFiniteNumber(input.fillEndFrame, "readback.fillEndFrame"),
    fillOpacityFrom: evidenceNullableFiniteNumber(input.fillOpacityFrom, "readback.fillOpacityFrom"),
    fillOpacityTo: evidenceNullableFiniteNumber(input.fillOpacityTo, "readback.fillOpacityTo"),
    normalizedStrokeWidthFromPx: evidenceNullableFiniteNumber(input.normalizedStrokeWidthFromPx, "readback.normalizedStrokeWidthFromPx"),
    normalizedStrokeWidthToPx: evidenceNullableFiniteNumber(input.normalizedStrokeWidthToPx, "readback.normalizedStrokeWidthToPx"),
    rawStrokeWidthFrom: evidenceNullableFiniteNumber(input.rawStrokeWidthFrom, "readback.rawStrokeWidthFrom"),
    rawStrokeWidthTo: evidenceNullableFiniteNumber(input.rawStrokeWidthTo, "readback.rawStrokeWidthTo"),
    easingObserved,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseOutlineFillDaVinciEvidenceCapture(raw: string, artifact: OutlineFillDaVinciActualArtifactV1): OutlineFillDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "outline-fill-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {sceneMismatchMessage: "Outline Fill capture sceneId mismatch", staleRevisionMessage: "STALE_OUTLINE_FILL_EVIDENCE_CAPTURE"});
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  return {
    schemaVersion: "outline-fill-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles),
    visualQa: parseDaVinciVisualQa(input.visualQa),
    rule: evidenceString(input.rule, "capture.rule"),
  };
}

export function evaluateOutlineFillDaVinciEvidenceCapture(artifact: OutlineFillDaVinciActualArtifactV1, capture: OutlineFillDaVinciEvidenceCaptureV1): OutlineFillDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {sceneMismatchMessage: "Outline Fill capture sceneId mismatch", staleRevisionMessage: "STALE_OUTLINE_FILL_EVIDENCE_CAPTURE"});
  const evaluatedArtifact = attachOutlineFillDaVinciActualReadback(artifact, capture.readback);
  const checks = {...evaluatedArtifact.checks, visualQa1x: capture.visualQa.oneX, visualQaHalfSpeed: capture.visualQa.halfSpeed};
  const machineComparable = [checks.resolveIdentity, checks.textPlusCreated, checks.shadingBindingRecorded, checks.outlineAppearApplied, checks.fillTimingApplied, checks.fillOpacityApplied, checks.strokeWidthApplied, checks.easingApplied, checks.sourceReadback, checks.renderCompleted];
  return {
    schemaVersion: "outline-fill-davinci-evaluated-evidence/v1",
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
    rule: "Machine parity is meaningful only after live Shading bindings and stroke-width calibration are recorded; promotion remains a separate human-reviewed gate.",
  };
}
