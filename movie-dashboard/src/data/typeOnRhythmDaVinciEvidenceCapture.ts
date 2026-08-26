import {
  attachTypeOnRhythmDaVinciActualReadback,
  type TypeOnRhythmActualState,
  type TypeOnRhythmDaVinciActualArtifactV1,
  type TypeOnRhythmDaVinciActualReadbackV1,
} from "./typeOnRhythmDaVinciActualArtifact";

export type TypeOnRhythmBindingRole =
  | "TEXT_PLUS_TOOL"
  | "FOLLOWER_MODIFIER"
  | "FOLLOWER_UNIT"
  | "FOLLOWER_DELAY"
  | "FOLLOWER_ORDER"
  | "TRANSLATE_Y"
  | "OPACITY"
  | "EASING";

export interface TypeOnRhythmLiveParameterBindingV1 {
  role: TypeOnRhythmBindingRole;
  toolName: string;
  inputName: string;
  observedValue: string | number | boolean | null;
}

export interface TypeOnRhythmDaVinciEvidenceCaptureV1 {
  schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: TypeOnRhythmDaVinciActualReadbackV1;
  liveParameterBindings: TypeOnRhythmLiveParameterBindingV1[];
  visualQa: {
    oneX: TypeOnRhythmActualState;
    halfSpeed: TypeOnRhythmActualState;
    reviewedAt: string | null;
    notes: string[];
  };
  rule: string;
}

export interface TypeOnRhythmDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "type-on-rhythm-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachTypeOnRhythmDaVinciActualReadback>;
  liveParameterBindings: TypeOnRhythmLiveParameterBindingV1[];
  capturedBindingRoles: TypeOnRhythmBindingRole[];
  visualQa: TypeOnRhythmDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachTypeOnRhythmDaVinciActualReadback>["checks"];
  allMachineComparableChecksPass: boolean;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles: TypeOnRhythmBindingRole[] = [
  "TEXT_PLUS_TOOL",
  "FOLLOWER_MODIFIER",
  "FOLLOWER_UNIT",
  "FOLLOWER_DELAY",
  "FOLLOWER_ORDER",
  "TRANSLATE_Y",
  "OPACITY",
  "EASING",
];

const blankReadback = (
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
): TypeOnRhythmDaVinciActualReadbackV1 => ({
  schemaVersion: "type-on-rhythm-davinci-readback/v1",
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
  followerUnit: null,
  followerOrder: null,
  perWordDelayFrames: null,
  wordDurationFrames: null,
  translateYFromPixels: null,
  translateYToPixels: null,
  opacityFrom: null,
  opacityTo: null,
  easingObserved: null,
  renderedPreviewPath: null,
  notes: [],
});

export function createTypeOnRhythmDaVinciEvidenceCaptureTemplate(
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
): TypeOnRhythmDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact),
    liveParameterBindings: [],
    visualQa: { oneX: "NOT_RUN", halfSpeed: "NOT_RUN", reviewedAt: null, notes: [] },
    rule: "Fill only from a real Mac Resolve Actual. Record the live word-level Follower unit/input names and measured values. Do not infer bindings from documentation, do not convert NOT_RUN to PASS without evidence, and never overwrite Scene/HUMAN_SELECTED authority from this file.",
  };
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}
function string(value: unknown, label: string) {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  return value;
}
function nullableString(value: unknown, label: string) { return value === null ? null : string(value, label); }
function nullableBoolean(value: unknown, label: string) {
  if (value === null) return null;
  if (typeof value !== "boolean") throw new Error(`${label} must be boolean|null`);
  return value;
}
function nullableNumber(value: unknown, label: string) {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${label} must be finite number|null`);
  return value;
}
function strings(value: unknown, label: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new Error(`${label} must be string[]`);
  return [...value] as string[];
}
function state(value: unknown, label: string): TypeOnRhythmActualState {
  if (value !== "NOT_RUN" && value !== "PASS" && value !== "FAIL") throw new Error(`${label} must be NOT_RUN|PASS|FAIL`);
  return value;
}

function parseReadback(value: unknown): TypeOnRhythmDaVinciActualReadbackV1 {
  const input = object(value, "readback");
  if (input.schemaVersion !== "type-on-rhythm-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  if (input.followerUnit !== null && input.followerUnit !== "WORDS") throw new Error("readback.followerUnit must be WORDS|null");
  if (input.followerOrder !== null && input.followerOrder !== "LEFT_TO_RIGHT") throw new Error("readback.followerOrder must be LEFT_TO_RIGHT|null");
  if (input.easingObserved !== null && input.easingObserved !== "EASE_OUT_CUBIC" && input.easingObserved !== "OTHER") {
    throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  }
  return {
    schemaVersion: "type-on-rhythm-davinci-readback/v1",
    sceneId: string(input.sceneId, "readback.sceneId"),
    sourceRevision: string(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: string(input.capturedAt, "readback.capturedAt"),
    resolveProduct: string(input.resolveProduct, "readback.resolveProduct"),
    resolveVersion: string(input.resolveVersion, "readback.resolveVersion"),
    transport: string(input.transport, "readback.transport"),
    projectName: string(input.projectName, "readback.projectName"),
    timelineName: string(input.timelineName, "readback.timelineName"),
    textPlusToolFound: nullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"),
    followerModifierFound: nullableBoolean(input.followerModifierFound, "readback.followerModifierFound"),
    styledText: nullableString(input.styledText, "readback.styledText"),
    colorCss: nullableString(input.colorCss, "readback.colorCss"),
    followerUnit: input.followerUnit as "WORDS" | null,
    followerOrder: input.followerOrder as "LEFT_TO_RIGHT" | null,
    perWordDelayFrames: nullableNumber(input.perWordDelayFrames, "readback.perWordDelayFrames"),
    wordDurationFrames: nullableNumber(input.wordDurationFrames, "readback.wordDurationFrames"),
    translateYFromPixels: nullableNumber(input.translateYFromPixels, "readback.translateYFromPixels"),
    translateYToPixels: nullableNumber(input.translateYToPixels, "readback.translateYToPixels"),
    opacityFrom: nullableNumber(input.opacityFrom, "readback.opacityFrom"),
    opacityTo: nullableNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved: input.easingObserved as "EASE_OUT_CUBIC" | "OTHER" | null,
    renderedPreviewPath: nullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"),
    notes: strings(input.notes, "readback.notes"),
  };
}

function parseBindings(value: unknown) {
  if (!Array.isArray(value)) throw new Error("liveParameterBindings must be an array");
  return value.map((entry, index): TypeOnRhythmLiveParameterBindingV1 => {
    const input = object(entry, `liveParameterBindings[${index}]`);
    if (!allowedBindingRoles.includes(input.role as TypeOnRhythmBindingRole)) throw new Error(`liveParameterBindings[${index}].role is invalid`);
    const observedValue = input.observedValue;
    if (observedValue !== null && !["string", "number", "boolean"].includes(typeof observedValue)) {
      throw new Error(`liveParameterBindings[${index}].observedValue has unsupported type`);
    }
    return {
      role: input.role as TypeOnRhythmBindingRole,
      toolName: string(input.toolName, `liveParameterBindings[${index}].toolName`),
      inputName: string(input.inputName, `liveParameterBindings[${index}].inputName`),
      observedValue: observedValue as string | number | boolean | null,
    };
  });
}

export function parseTypeOnRhythmDaVinciEvidenceCapture(
  raw: string,
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
): TypeOnRhythmDaVinciEvidenceCaptureV1 {
  const input = object(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "type-on-rhythm-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = string(input.sceneId, "capture.sceneId");
  const sourceRevision = string(input.sourceRevision, "capture.sourceRevision");
  if (sceneId !== artifact.sceneId) throw new Error("Type-on-rhythm capture sceneId mismatch");
  if (sourceRevision !== artifact.sourceRevision) throw new Error("STALE_TYPE_ON_RHYTHM_EVIDENCE_CAPTURE");
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  const visualQa = object(input.visualQa, "visualQa");
  return {
    schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1",
    authority: "EVIDENCE_ONLY",
    sceneId,
    sourceRevision,
    readback,
    liveParameterBindings: parseBindings(input.liveParameterBindings),
    visualQa: {
      oneX: state(visualQa.oneX, "visualQa.oneX"),
      halfSpeed: state(visualQa.halfSpeed, "visualQa.halfSpeed"),
      reviewedAt: nullableString(visualQa.reviewedAt, "visualQa.reviewedAt"),
      notes: strings(visualQa.notes, "visualQa.notes"),
    },
    rule: string(input.rule, "capture.rule"),
  };
}

export function evaluateTypeOnRhythmDaVinciEvidenceCapture(
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
  capture: TypeOnRhythmDaVinciEvidenceCaptureV1,
): TypeOnRhythmDaVinciEvaluatedEvidenceV1 {
  if (capture.sceneId !== artifact.sceneId) throw new Error("Type-on-rhythm capture sceneId mismatch");
  if (capture.sourceRevision !== artifact.sourceRevision) throw new Error("STALE_TYPE_ON_RHYTHM_EVIDENCE_CAPTURE");
  const evaluatedArtifact = attachTypeOnRhythmDaVinciActualReadback(artifact, capture.readback);
  const checks = { ...evaluatedArtifact.checks, visualQa1x: capture.visualQa.oneX, visualQaHalfSpeed: capture.visualQa.halfSpeed };
  const machineComparable = [
    checks.resolveIdentity, checks.textPlusCreated, checks.followerAttached, checks.wordUnitApplied,
    checks.sequentialDelayApplied, checks.translationApplied, checks.opacityApplied, checks.easingApplied,
    checks.sourceReadback, checks.renderCompleted,
  ];
  const capturedBindingRoles = allowedBindingRoles.filter((role) =>
    capture.liveParameterBindings.some((binding) => binding.role === role && binding.toolName.trim() && binding.inputName.trim()),
  );
  return {
    schemaVersion: "type-on-rhythm-davinci-evaluated-evidence/v1",
    authority: "EVIDENCE_ONLY",
    sceneId: artifact.sceneId,
    sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: { ...evaluatedArtifact, checks },
    liveParameterBindings: [...capture.liveParameterBindings],
    capturedBindingRoles,
    visualQa: { ...capture.visualQa, notes: [...capture.visualQa.notes] },
    checks,
    allMachineComparableChecksPass: machineComparable.every((item) => item === "PASS"),
    productionReady: false,
    rule: "Readback equality, word-unit confirmation, binding completeness, and visual QA are evidence only. Production routing remains a separate human-reviewed promotion after real Mac Resolve Actual.",
  };
}
