import {
  attachCharStaggerDaVinciActualReadback,
  type CharStaggerActualState,
  type CharStaggerDaVinciActualArtifactV1,
  type CharStaggerDaVinciActualReadbackV1,
} from "./charStaggerDaVinciActualArtifact";

export interface CharStaggerDaVinciLiveParameterBindingV1 {
  role:
    | "TEXT_PLUS_TOOL"
    | "FOLLOWER_MODIFIER"
    | "FOLLOWER_DELAY"
    | "FOLLOWER_ORDER"
    | "TRANSLATE_Y"
    | "OPACITY"
    | "EASING";
  toolName: string;
  inputName: string;
  observedValue: string | number | boolean | null;
}

export interface CharStaggerDaVinciEvidenceCaptureV1 {
  schemaVersion: "char-stagger-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: CharStaggerDaVinciActualReadbackV1;
  liveParameterBindings: CharStaggerDaVinciLiveParameterBindingV1[];
  visualQa: {
    oneX: CharStaggerActualState;
    halfSpeed: CharStaggerActualState;
    reviewedAt: string | null;
    notes: string[];
  };
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
    visualQa: {
      oneX: "NOT_RUN",
      halfSpeed: "NOT_RUN",
      reviewedAt: null,
      notes: [],
    },
    rule: "Fill this file only from a real Mac Resolve Actual. Do not infer live Fusion tool/input names from docs. Keep NOT_RUN for any step that was not actually performed. This capture is evidence only and must never overwrite HUMAN_SELECTED Scene authority automatically.",
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireObject(value: unknown, label: string): Record<string, unknown> {
  if (!isObject(value)) throw new Error(`${label} must be an object`);
  return value;
}

function requireString(value: unknown, label: string): string {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  return value;
}

function nullableString(value: unknown, label: string): string | null {
  if (value === null) return null;
  return requireString(value, label);
}

function nullableBoolean(value: unknown, label: string): boolean | null {
  if (value === null) return null;
  if (typeof value !== "boolean") throw new Error(`${label} must be boolean|null`);
  return value;
}

function nullableNumber(value: unknown, label: string): number | null {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be finite number|null`);
  }
  return value;
}

function requireState(value: unknown, label: string): CharStaggerActualState {
  if (value !== "NOT_RUN" && value !== "PASS" && value !== "FAIL") {
    throw new Error(`${label} must be NOT_RUN|PASS|FAIL`);
  }
  return value;
}

function requireStringArray(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${label} must be string[]`);
  }
  return [...value];
}

function parseReadback(value: unknown): CharStaggerDaVinciActualReadbackV1 {
  const input = requireObject(value, "readback");
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
    sceneId: requireString(input.sceneId, "readback.sceneId"),
    sourceRevision: requireString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: requireString(input.capturedAt, "readback.capturedAt"),
    resolveProduct: requireString(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: requireString(input.resolveVersion, "readback.resolveVersion"),
    transport: requireString(input.transport, "readback.transport"),
    projectName: requireString(input.projectName, "readback.projectName"),
    timelineName: requireString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: nullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    followerModifierFound: nullableBoolean(input.followerModifierFound, "readback.followerModifierFound"),
    styledText: nullableString(input.styledText, "readback.styledText"),
    colorCss: nullableString(input.colorCss, "readback.colorCss"),
    followerOrder,
    perCharacterDelayFrames: nullableNumber(input.perCharacterDelayFrames, "readback.perCharacterDelayFrames"),
    characterDurationFrames: nullableNumber(input.characterDurationFrames, "readback.characterDurationFrames"),
    translateYFromPixels: nullableNumber(input.translateYFromPixels, "readback.translateYFromPixels"),
    translateYToPixels: nullableNumber(input.translateYToPixels, "readback.translateYToPixels"),
    opacityFrom: nullableNumber(input.opacityFrom, "readback.opacityFrom"),
    opacityTo: nullableNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved,
    renderedPreviewPath: nullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: requireStringArray(input.notes, "readback.notes"),
  };
}

function parseBindings(value: unknown): CharStaggerDaVinciLiveParameterBindingV1[] {
  if (!Array.isArray(value)) throw new Error("liveParameterBindings must be an array");
  return value.map((item, index) => {
    const input = requireObject(item, `liveParameterBindings[${index}]`);
    const role = input.role;
    const allowedRoles = [
      "TEXT_PLUS_TOOL",
      "FOLLOWER_MODIFIER",
      "FOLLOWER_DELAY",
      "FOLLOWER_ORDER",
      "TRANSLATE_Y",
      "OPACITY",
      "EASING",
    ] as const;
    if (!allowedRoles.includes(role as (typeof allowedRoles)[number])) {
      throw new Error(`liveParameterBindings[${index}].role is invalid`);
    }
    const observedValue = input.observedValue;
    if (
      observedValue !== null &&
      typeof observedValue !== "string" &&
      typeof observedValue !== "number" &&
      typeof observedValue !== "boolean"
    ) {
      throw new Error(`liveParameterBindings[${index}].observedValue has unsupported type`);
    }
    return {
      role: role as CharStaggerDaVinciLiveParameterBindingV1["role"],
      toolName: requireString(input.toolName, `liveParameterBindings[${index}].toolName`),
      inputName: requireString(input.inputName, `liveParameterBindings[${index}].inputName`),
      observedValue,
    };
  });
}

export function parseCharStaggerDaVinciEvidenceCapture(
  raw: string,
  artifact: CharStaggerDaVinciActualArtifactV1,
): CharStaggerDaVinciEvidenceCaptureV1 {
  const input = requireObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "char-stagger-davinci-evidence-capture/v1") {
    throw new Error("capture.schemaVersion mismatch");
  }
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = requireString(input.sceneId, "capture.sceneId");
  const sourceRevision = requireString(input.sourceRevision, "capture.sourceRevision");
  if (sceneId !== artifact.sceneId) throw new Error("Char Stagger capture sceneId mismatch");
  if (sourceRevision !== artifact.sourceRevision) throw new Error("STALE_CHAR_STAGGER_EVIDENCE_CAPTURE");

  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) {
    throw new Error("capture/readback identity mismatch");
  }
  const visualQaInput = requireObject(input.visualQa, "visualQa");
  return {
    schemaVersion: "char-stagger-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseBindings(input.liveParameterBindings),
    visualQa: {
      oneX: requireState(visualQaInput.oneX, "visualQa.oneX"),
      halfSpeed: requireState(visualQaInput.halfSpeed, "visualQa.halfSpeed"),
      reviewedAt: nullableString(visualQaInput.reviewedAt, "visualQa.reviewedAt"),
      notes: requireStringArray(visualQaInput.notes, "visualQa.notes"),
    },
    rule: requireString(input.rule, "capture.rule"),
  };
}

export function evaluateCharStaggerDaVinciEvidenceCapture(
  artifact: CharStaggerDaVinciActualArtifactV1,
  capture: CharStaggerDaVinciEvidenceCaptureV1,
): CharStaggerDaVinciEvaluatedEvidenceV1 {
  if (capture.sceneId !== artifact.sceneId) throw new Error("Char Stagger capture sceneId mismatch");
  if (capture.sourceRevision !== artifact.sourceRevision) throw new Error("STALE_CHAR_STAGGER_EVIDENCE_CAPTURE");
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
