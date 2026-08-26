import {
  attachCharStaggerDaVinciActualReadback,
  type CharStaggerActualState,
  type CharStaggerDaVinciActualArtifactV1,
  type CharStaggerDaVinciActualReadbackV1,
} from "./charStaggerDaVinciActualArtifact";
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

export type CharStaggerBindingRole =
  | "TEXT_PLUS_TOOL"
  | "FOLLOWER_MODIFIER"
  | "FOLLOWER_DELAY"
  | "FOLLOWER_ORDER"
  | "TRANSLATE_Y"
  | "OPACITY"
  | "EASING";

export type CharStaggerDaVinciLiveParameterBindingV1 =
  DaVinciLiveParameterBindingV1<CharStaggerBindingRole>;

export interface CharStaggerDaVinciEvidenceCaptureV1 {
  schemaVersion: "char-stagger-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: CharStaggerDaVinciActualReadbackV1;
  liveParameterBindings: CharStaggerDaVinciLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<CharStaggerActualState>;
  rule: string;
}

export interface CharStaggerDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "char-stagger-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachCharStaggerDaVinciActualReadback>;
  liveParameterBindings: CharStaggerDaVinciLiveParameterBindingV1[];
  parameterBindingsCaptured: boolean;
  visualQa: CharStaggerDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachCharStaggerDaVinciActualReadback>["checks"];
  allMachineComparableChecksPass: boolean;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = [
  "TEXT_PLUS_TOOL",
  "FOLLOWER_MODIFIER",
  "FOLLOWER_DELAY",
  "FOLLOWER_ORDER",
  "TRANSLATE_Y",
  "OPACITY",
  "EASING",
] as const satisfies readonly CharStaggerBindingRole[];

const blankReadback = (
  artifact: CharStaggerDaVinciActualArtifactV1,
): CharStaggerDaVinciActualReadbackV1 => ({
  schemaVersion: "char-stagger-davinci-readback/v1",
  sceneId: artifact.sceneId,
  sourceRevision: artifact.sourceRevision,
  capturedAt: "",
  resolveProduct: "",
  resolveVersion: "",
  transport: "",
  projectName: "",
  timelineName: "",
  textPlusToolFound: null,
  followerModifierFound: null,
  styledText: null,
  colorCss: null,
  followerOrder: null,
  perCharacterDelayFrames: null,
  characterDurationFrames: null,
  translateYFromPixels: null,
  translateYToPixels: null,
  opacityFrom: null,
  opacityTo: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createCharStaggerDaVinciEvidenceCaptureTemplate(
  artifact: CharStaggerDaVinciActualArtifactV1,
): CharStaggerDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "char-stagger-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: blankDaVinciVisualQa(),
    rule: "Fill this file only from a real Mac Resolve Actual. Do not infer live Fusion tool/input names from docs. Keep NOT_RUN for any step that was not actually performed. This capture is evidence only and must never overwrite HUMAN_SELECTED Scene authority automatically.",
  };
}

function parseReadback(value: unknown): CharStaggerDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "char-stagger-davinci-readback/v1") {
    throw new Error("readback.schemaVersion mismatch");
  }
  const followerOrder = input.followerOrder;
  if (followerOrder !== null && followerOrder !== "LEFT_TO_RIGHT") {
    throw new Error("readback.followerOrder must be LEFT_TO_RIGHT|null");
  }
  const easingObserved = input.easingObserved;
  if (easingObserved !== null && easingObserved !== "EASE_OUT_CUBIC" && easingObserved !== "OTHER") {
    throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  }
  return {
    schemaVersion: "char-stagger-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"),
    sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"),
    projectName: evidenceString(input.projectName, "readback.projectName"),
    timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    followerModifierFound: evidenceNullableBoolean(input.followerModifierFound, "readback.followerModifierFound"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"),
    colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    followerOrder,
    perCharacterDelayFrames: evidenceNullableFiniteNumber(input.perCharacterDelayFrames, "readback.perCharacterDelayFrames"),
    characterDurationFrames: evidenceNullableFiniteNumber(input.characterDurationFrames, "readback.characterDurationFrames"),
    translateYFromPixels: evidenceNullableFiniteNumber(input.translateYFromPixels, "readback.translateYFromPixels"),
    translateYToPixels: evidenceNullableFiniteNumber(input.translateYToPixels, "readback.translateYToPixels"),
    opacityFrom: evidenceNullableFiniteNumber(input.opacityFrom, "readback.opacityFrom"),
    opacityTo: evidenceNullableFiniteNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseCharStaggerDaVinciEvidenceCapture(
  raw: string,
  artifact: CharStaggerDaVinciActualArtifactV1,
): CharStaggerDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "char-stagger-davinci-evidence-capture/v1") {
    throw new Error("capture.schemaVersion mismatch");
  }
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity(
    { sceneId, sourceRevision },
    artifact,
    {
      sceneMismatchMessage: "Char Stagger capture sceneId mismatch",
      staleRevisionMessage: "STALE_CHAR_STAGGER_EVIDENCE_CAPTURE",
    },
  );

  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) {
    throw new Error("capture/readback identity mismatch");
  }
  return {
    schemaVersion: "char-stagger-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles),
    visualQa: parseDaVinciVisualQa(input.visualQa),
    rule: evidenceString(input.rule, "capture.rule"),
  };
}

export function evaluateCharStaggerDaVinciEvidenceCapture(
  artifact: CharStaggerDaVinciActualArtifactV1,
  capture: CharStaggerDaVinciEvidenceCaptureV1,
): CharStaggerDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {
    sceneMismatchMessage: "Char Stagger capture sceneId mismatch",
    staleRevisionMessage: "STALE_CHAR_STAGGER_EVIDENCE_CAPTURE",
  });
  const evaluatedArtifact = attachCharStaggerDaVinciActualReadback(artifact, capture.readback);
  const checks = {
    ...evaluatedArtifact.checks,
    visualQa1x: capture.visualQa.oneX,
    visualQaHalfSpeed: capture.visualQa.halfSpeed,
  };
  const machineComparable = [
    checks.resolveIdentity,
    checks.textPlusCreated,
    checks.followerAttached,
    checks.sequentialDelayApplied,
    checks.translationApplied,
    checks.opacityApplied,
    checks.easingApplied,
    checks.sourceReadback,
    checks.renderCompleted,
  ];

  return {
    schemaVersion: "char-stagger-davinci-evaluated-evidence/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: {
      ...evaluatedArtifact,
      checks,
    },
    liveParameterBindings: [...capture.liveParameterBindings],
    parameterBindingsCaptured: capture.liveParameterBindings.length > 0,
    visualQa: { ...capture.visualQa, notes: [...capture.visualQa.notes] },
    checks,
    allMachineComparableChecksPass: machineComparable.every((state) => state === "PASS"),
    productionReady: false,
    rule: "Exact readback equality and visual QA evidence can be evaluated here, but this evidence remains non-authoritative. Production routing must be promoted separately only after live parameter bindings are reviewed and all required Actual checks are accepted.",
  };
}
