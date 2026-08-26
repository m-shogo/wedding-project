import {
  attachWordPunchDaVinciActualReadback,
  type WordPunchActualState,
  type WordPunchDaVinciActualArtifactV1,
  type WordPunchDaVinciActualReadbackV1,
} from "./wordPunchDaVinciActualArtifact";
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

export type WordPunchBindingRole =
  | "TEXT_PLUS_TOOL"
  | "TRANSFORM_TOOL"
  | "SCALE"
  | "OPACITY"
  | "EASING";

export type WordPunchDaVinciLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<WordPunchBindingRole>;

export interface WordPunchDaVinciEvidenceCaptureV1 {
  schemaVersion: "word-punch-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: WordPunchDaVinciActualReadbackV1;
  liveParameterBindings: WordPunchDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<WordPunchActualState>;
  rule: string;
}

export interface WordPunchDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "word-punch-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachWordPunchDaVinciActualReadback>;
  liveParameterBindings: WordPunchDaVinciLiveParameterBindingV1[];
  parameterBindingsCaptured: boolean;
  visualQa: WordPunchDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachWordPunchDaVinciActualReadback>["checks"] & {
    visualQa1x: WordPunchActualState;
    visualQaHalfSpeed: WordPunchActualState;
  };
  allMachineComparableChecksPass: boolean;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = [
  "TEXT_PLUS_TOOL",
  "TRANSFORM_TOOL",
  "SCALE",
  "OPACITY",
  "EASING",
] as const satisfies readonly WordPunchBindingRole[];

const blankReadback = (artifact: WordPunchDaVinciActualArtifactV1): WordPunchDaVinciActualReadbackV1 => ({
  schemaVersion: "word-punch-davinci-readback/v1",
  sceneId: artifact.sceneId,
  sourceRevision: artifact.sourceRevision,
  capturedAt: "",
  resolveProduct: "",
  resolveVersion: "",
  transport: "",
  projectName: "",
  timelineName: "",
  textPlusToolFound: null,
  transformToolFound: null,
  styledText: null,
  colorCss: null,
  durationFrames: null,
  scaleFrom: null,
  scaleTo: null,
  opacityFrom: null,
  opacityTo: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createWordPunchDaVinciEvidenceCaptureTemplate(
  artifact: WordPunchDaVinciActualArtifactV1,
): WordPunchDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "word-punch-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Never infer live Fusion tool/input names. Keep NOT_RUN for every unperformed step and never overwrite HUMAN_SELECTED Scene authority automatically.",
  };
}

function parseReadback(value: unknown): WordPunchDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "word-punch-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  const easingObserved = input.easingObserved;
  if (easingObserved !== null && easingObserved !== "EASE_OUT_CUBIC" && easingObserved !== "OTHER") {
    throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  }
  return {
    schemaVersion: "word-punch-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"),
    sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"),
    timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    transformToolFound: evidenceNullableBoolean(input.transformToolFound, "readback.transformToolFound"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"),
    colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    durationFrames: evidenceNullableFiniteNumber(input.durationFrames, "readback.durationFrames"),
    scaleFrom: evidenceNullableFiniteNumber(input.scaleFrom, "readback.scaleFrom"),
    scaleTo: evidenceNullableFiniteNumber(input.scaleTo, "readback.scaleTo"),
    opacityFrom: evidenceNullableFiniteNumber(input.opacityFrom, "readback.opacityFrom"),
    opacityTo: evidenceNullableFiniteNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseWordPunchDaVinciEvidenceCapture(
  raw: string,
  artifact: WordPunchDaVinciActualArtifactV1,
): WordPunchDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "word-punch-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({ sceneId, sourceRevision }, artifact, {
    sceneMismatchMessage: "Word Punch capture sceneId mismatch",
    staleRevisionMessage: "STALE_WORD_PUNCH_EVIDENCE_CAPTURE",
  });
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) {
    throw new Error("capture/readback identity mismatch");
  }
  return {
    schemaVersion: "word-punch-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles),
    visualQa: parseDaVinciVisualQa(input.visualQa),
    rule: evidenceString(input.rule, "capture.rule"),
  };
}

export function evaluateWordPunchDaVinciEvidenceCapture(
  artifact: WordPunchDaVinciActualArtifactV1,
  capture: WordPunchDaVinciEvidenceCaptureV1,
): WordPunchDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {
    sceneMismatchMessage: "Word Punch capture sceneId mismatch",
    staleRevisionMessage: "STALE_WORD_PUNCH_EVIDENCE_CAPTURE",
  });
  const evaluatedArtifact = attachWordPunchDaVinciActualReadback(artifact, capture.readback);
  const checks = {
    ...evaluatedArtifact.checks,
    visualQa1x: capture.visualQa.oneX,
    visualQaHalfSpeed: capture.visualQa.halfSpeed,
  };
  const machineComparable = [
    checks.resolveIdentity,
    checks.textPlusCreated,
    checks.transformAttached,
    checks.durationApplied,
    checks.scaleApplied,
    checks.opacityApplied,
    checks.easingApplied,
    checks.sourceReadback,
    checks.renderCompleted,
  ];
  return {
    schemaVersion: "word-punch-davinci-evaluated-evidence/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: { ...evaluatedArtifact, checks },
    liveParameterBindings: [...capture.liveParameterBindings],
    parameterBindingsCaptured: capture.liveParameterBindings.length > 0,
    visualQa: { ...capture.visualQa, notes: [...capture.visualQa.notes] },
    checks,
    allMachineComparableChecksPass: machineComparable.every((state) => state === "PASS"),
    productionReady: false,
    rule: "Exact readback and visual QA can be evaluated here, but promotion remains separate. Machine PASS must never silently convert EVIDENCE_ONLY data into a production route.",
  };
}
