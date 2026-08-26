import { resolveEditableValue } from "./humanEditableMotionIntent";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";
import { buildWordPunchDaVinciTranslatorSpec } from "./wordPunchDaVinciTranslator";

export type WordPunchActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface WordPunchDaVinciActualReadbackV1 {
  schemaVersion: "word-punch-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  transformToolFound: boolean | null;
  styledText: string | null;
  colorCss: string | null;
  animationStartFrame: number | null;
  animationEndFrame: number | null;
  scaleFrom: number | null;
  scaleTo: number | null;
  opacityFrom: number | null;
  opacityTo: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface WordPunchDaVinciActualComparisonV1 {
  schemaVersion: "word-punch-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  transformPresent: boolean | null;
  startFrameDelta: number | null;
  endFrameDelta: number | null;
  scaleFromDelta: number | null;
  scaleToDelta: number | null;
  opacityFromDelta: number | null;
  opacityToDelta: number | null;
  easingMatches: boolean | null;
}

export interface WordPunchDaVinciActualArtifactV1 {
  schemaVersion: "word-punch-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-word-punch";
  sceneId: string;
  sourceRevision: string;
  routeSelection: TypographyProductionSelectionV1;
  baseline: {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER";
    text: string;
    intensity: "S" | "M" | "L";
    color: "#ffffff";
    fps: 30;
  };
  expected: ReturnType<typeof buildWordPunchDaVinciTranslatorSpec>;
  parameterBinding: { state: "NOT_VERIFIED"; rule: string };
  applicationChecklist: readonly string[];
  readback: WordPunchDaVinciActualReadbackV1 | null;
  comparison: WordPunchDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: WordPunchActualState;
    textPlusCreated: WordPunchActualState;
    transformCreated: WordPunchActualState;
    timingApplied: WordPunchActualState;
    scaleApplied: WordPunchActualState;
    opacityApplied: WordPunchActualState;
    easingApplied: WordPunchActualState;
    sourceReadback: WordPunchActualState;
    renderCompleted: WordPunchActualState;
    visualQa1x: WordPunchActualState;
    visualQaHalfSpeed: WordPunchActualState;
  };
  productionReady: false;
  rule: string;
}

function delta(expected: number, actual: number | null) {
  return actual === null ? null : Number((actual - expected).toFixed(6));
}
function exactDeltaState(...values: Array<number | null>): WordPunchActualState {
  if (values.some((value) => value === null)) return "NOT_RUN";
  return values.every((value) => value === 0) ? "PASS" : "FAIL";
}
function booleanState(value: boolean | null): WordPunchActualState {
  return value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";
}

function assertWordPunchSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-word-punch") {
    throw new Error(`Word Punch Actual requires type-word-punch selection, got ${selection.patternId}`);
  }
  if (selection.sceneId !== scene.sceneId) throw new Error("Word Punch route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_WORD_PUNCH_ACTUAL_SELECTION");
}

export function createWordPunchDaVinciActualArtifact(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): WordPunchDaVinciActualArtifactV1 {
  assertWordPunchSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  return {
    schemaVersion: "word-punch-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-word-punch",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: { ...selection },
    baseline,
    expected: buildWordPunchDaVinciTranslatorSpec(baseline),
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Do not invent the live Text+/Transform input names. Discover them in a disposable Mac Resolve Actual and record the exact bindings before any automation or production-route promotion.",
    },
    applicationChecklist: [
      "Open a disposable Resolve project/timeline; do not modify the wedding master timeline.",
      "Create Text+ with the baseline text and color.",
      "Create/attach a whole-title Fusion Transform path; do not use a character Follower for this pattern.",
      "Apply canonical start/end frames, scale and opacity values with cubic-out easing.",
      "Read back live Text+/Transform tool and input names plus applied values.",
      "Render the bounded canary and review at 1x and half speed for punch peak, opacity, centering and final rest state.",
      "Keep every check NOT_RUN unless that exact step was actually performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      transformCreated: "NOT_RUN",
      timingApplied: "NOT_RUN",
      scaleApplied: "NOT_RUN",
      opacityApplied: "NOT_RUN",
      easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN",
      renderCompleted: "NOT_RUN",
      visualQa1x: "NOT_RUN",
      visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "This is a bounded evidence artifact, not Human Master and not proof of Resolve application. Translator math may be deterministic, but live bindings, apply/readback and visual parity require a real Mac Resolve Actual before route promotion.",
  };
}

export function compareWordPunchDaVinciActualReadback(
  artifact: WordPunchDaVinciActualArtifactV1,
  readback: WordPunchDaVinciActualReadbackV1,
): WordPunchDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Word Punch readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Word Punch readback is STALE for current artifact");
  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "word-punch-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    transformPresent: readback.transformToolFound,
    startFrameDelta: delta(expected.animation.startFrame, readback.animationStartFrame),
    endFrameDelta: delta(expected.animation.endFrame, readback.animationEndFrame),
    scaleFromDelta: delta(expected.animation.scale.from, readback.scaleFrom),
    scaleToDelta: delta(expected.animation.scale.to, readback.scaleTo),
    opacityFromDelta: delta(expected.animation.opacity.from, readback.opacityFrom),
    opacityToDelta: delta(expected.animation.opacity.to, readback.opacityTo),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachWordPunchDaVinciActualReadback(
  artifact: WordPunchDaVinciActualArtifactV1,
  readback: WordPunchDaVinciActualReadbackV1,
) {
  const comparison = compareWordPunchDaVinciActualReadback(artifact, readback);
  const hasReadbackIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: readback.textPlusToolFound === true ? "PASS" as const : readback.textPlusToolFound === false ? "FAIL" as const : "NOT_RUN" as const,
      transformCreated: readback.transformToolFound === true ? "PASS" as const : readback.transformToolFound === false ? "FAIL" as const : "NOT_RUN" as const,
      timingApplied: exactDeltaState(comparison.startFrameDelta, comparison.endFrameDelta),
      scaleApplied: exactDeltaState(comparison.scaleFromDelta, comparison.scaleToDelta),
      opacityApplied: exactDeltaState(comparison.opacityFromDelta, comparison.opacityToDelta),
      easingApplied: booleanState(comparison.easingMatches),
      sourceReadback: hasReadbackIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
