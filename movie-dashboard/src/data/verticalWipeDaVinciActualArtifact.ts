import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildVerticalWipeDaVinciTranslatorSpec } from "./verticalWipeDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type VerticalWipeActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface VerticalWipeDaVinciActualReadbackV1 {
  schemaVersion: "vertical-wipe-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  maskToolFound: boolean | null;
  maskBindingRecorded: boolean | null;
  maskToolType: string | null;
  maskInputName: string | null;
  coordinateConvention: string | null;
  maskInverted: boolean | null;
  styledText: string | null;
  colorCss: string | null;
  durationFrames: number | null;
  directionObserved: "TOP_TO_BOTTOM" | "OTHER" | null;
  normalizedTopInsetFrom: number | null;
  normalizedTopInsetTo: number | null;
  textOpacity: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface VerticalWipeDaVinciActualComparisonV1 {
  schemaVersion: "vertical-wipe-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  maskPresent: boolean | null;
  maskBindingRecorded: boolean | null;
  directionMatches: boolean | null;
  durationFrameDelta: number | null;
  topInsetFromDelta: number | null;
  topInsetToDelta: number | null;
  textOpacityDelta: number | null;
  easingMatches: boolean | null;
}

export interface VerticalWipeDaVinciActualArtifactV1 {
  schemaVersion: "vertical-wipe-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-vertical-wipe";
  sceneId: string;
  sourceRevision: string;
  routeSelection: TypographyProductionSelectionV1;
  baseline: {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER";
    text: string;
    color: "#ffffff";
    fps: 30;
  };
  expected: ReturnType<typeof buildVerticalWipeDaVinciTranslatorSpec>;
  parameterBinding: { state: "NOT_VERIFIED"; rule: string };
  applicationChecklist: readonly string[];
  readback: VerticalWipeDaVinciActualReadbackV1 | null;
  comparison: VerticalWipeDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: VerticalWipeActualState;
    textPlusCreated: VerticalWipeActualState;
    maskAttached: VerticalWipeActualState;
    maskBindingRecorded: VerticalWipeActualState;
    durationApplied: VerticalWipeActualState;
    directionApplied: VerticalWipeActualState;
    revealBoundsApplied: VerticalWipeActualState;
    textOpacityApplied: VerticalWipeActualState;
    easingApplied: VerticalWipeActualState;
    sourceReadback: VerticalWipeActualState;
    renderCompleted: VerticalWipeActualState;
    visualQa1x: VerticalWipeActualState;
    visualQaHalfSpeed: VerticalWipeActualState;
  };
  productionReady: false;
  rule: string;
}

const delta = (expected: number, actual: number | null) =>
  actual === null ? null : Number((actual - expected).toFixed(6));
const exactDeltaState = (...values: Array<number | null>): VerticalWipeActualState => {
  if (values.some((value) => value === null)) return "NOT_RUN";
  return values.every((value) => value === 0) ? "PASS" : "FAIL";
};
const booleanState = (value: boolean | null): VerticalWipeActualState =>
  value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-vertical-wipe") {
    throw new Error(`Vertical Wipe Actual requires type-vertical-wipe selection, got ${selection.patternId}`);
  }
  if (selection.sceneId !== scene.sceneId) throw new Error("Vertical Wipe route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_VERTICAL_WIPE_ACTUAL_SELECTION");
}

export function createVerticalWipeDaVinciActualArtifact(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): VerticalWipeDaVinciActualArtifactV1 {
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  const expected = buildVerticalWipeDaVinciTranslatorSpec(baseline);
  return {
    schemaVersion: "vertical-wipe-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-vertical-wipe",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: {...selection},
    baseline,
    expected,
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Record the real Fusion mask tool, input identity, coordinate convention and inversion state from Mac Resolve. Never infer those details from the canonical CSS clip-path.",
    },
    applicationChecklist: [
      "Use a disposable Resolve project/timeline; never modify the wedding master timeline.",
      "Record Resolve product/version and timeline identity before editing.",
      "Create Text+ with the baseline text and color at constant opacity 1.",
      "Attach the simplest live mask graph that can reproduce a top-to-bottom reveal; record actual tool/input names before claiming the binding.",
      "Record mask coordinate convention and inversion state so normalized top-inset values can be compared honestly.",
      "Apply normalized top inset 1 → 0 over 0.5 seconds with cubic-out easing.",
      "Read back duration, reveal bounds, direction, text opacity and easing from Resolve.",
      "Render the bounded canary and review at 1x and half speed for a physical top-to-bottom reveal with no text translation or opacity fade.",
      "Keep every check NOT_RUN unless that exact step was actually performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      maskAttached: "NOT_RUN",
      maskBindingRecorded: "NOT_RUN",
      durationApplied: "NOT_RUN",
      directionApplied: "NOT_RUN",
      revealBoundsApplied: "NOT_RUN",
      textOpacityApplied: "NOT_RUN",
      easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN",
      renderCompleted: "NOT_RUN",
      visualQa1x: "NOT_RUN",
      visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "A normalized clip-reveal translator is only a bounded hypothesis until the Fusion mask graph and coordinates are read back from real Resolve and visual parity is reviewed.",
  };
}

export function compareVerticalWipeDaVinciActualReadback(
  artifact: VerticalWipeDaVinciActualArtifactV1,
  readback: VerticalWipeDaVinciActualReadbackV1,
): VerticalWipeDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Vertical Wipe readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Vertical Wipe readback is STALE for current artifact");
  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "vertical-wipe-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    maskPresent: readback.maskToolFound,
    maskBindingRecorded: readback.maskBindingRecorded,
    directionMatches: readback.directionObserved === null ? null : readback.directionObserved === expected.animation.direction,
    durationFrameDelta: delta(expected.animation.endFrame, readback.durationFrames),
    topInsetFromDelta: delta(expected.animation.normalizedTopInset.from, readback.normalizedTopInsetFrom),
    topInsetToDelta: delta(expected.animation.normalizedTopInset.to, readback.normalizedTopInsetTo),
    textOpacityDelta: delta(expected.animation.textOpacity, readback.textOpacity),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachVerticalWipeDaVinciActualReadback(
  artifact: VerticalWipeDaVinciActualArtifactV1,
  readback: VerticalWipeDaVinciActualReadbackV1,
) {
  const comparison = compareVerticalWipeDaVinciActualReadback(artifact, readback);
  const hasIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: booleanState(readback.textPlusToolFound),
      maskAttached: booleanState(comparison.maskPresent),
      maskBindingRecorded: booleanState(comparison.maskBindingRecorded),
      durationApplied: exactDeltaState(comparison.durationFrameDelta),
      directionApplied: booleanState(comparison.directionMatches),
      revealBoundsApplied: exactDeltaState(comparison.topInsetFromDelta, comparison.topInsetToDelta),
      textOpacityApplied: exactDeltaState(comparison.textOpacityDelta),
      easingApplied: booleanState(comparison.easingMatches),
      sourceReadback: hasIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
