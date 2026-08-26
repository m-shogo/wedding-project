import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildTypeOnRhythmDaVinciTranslatorSpec } from "./typeOnRhythmDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type TypeOnRhythmActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface TypeOnRhythmDaVinciActualReadbackV1 {
  schemaVersion: "type-on-rhythm-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  followerModifierFound: boolean | null;
  styledText: string | null;
  colorCss: string | null;
  followerUnit: "WORDS" | null;
  followerOrder: "LEFT_TO_RIGHT" | null;
  perWordDelayFrames: number | null;
  wordDurationFrames: number | null;
  translateYFromPixels: number | null;
  translateYToPixels: number | null;
  opacityFrom: number | null;
  opacityTo: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface TypeOnRhythmDaVinciActualComparisonV1 {
  schemaVersion: "type-on-rhythm-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  followerPresent: boolean | null;
  unitMatches: boolean | null;
  orderMatches: boolean | null;
  delayFrameDelta: number | null;
  durationFrameDelta: number | null;
  translateYFromDeltaPixels: number | null;
  translateYToDeltaPixels: number | null;
  opacityFromDelta: number | null;
  opacityToDelta: number | null;
  easingMatches: boolean | null;
}

export interface TypeOnRhythmDaVinciActualArtifactV1 {
  schemaVersion: "type-on-rhythm-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-type-on-rhythm";
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
  expected: ReturnType<typeof buildTypeOnRhythmDaVinciTranslatorSpec>;
  parameterBinding: {
    state: "NOT_VERIFIED";
    rule: string;
  };
  applicationChecklist: readonly string[];
  readback: TypeOnRhythmDaVinciActualReadbackV1 | null;
  comparison: TypeOnRhythmDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: TypeOnRhythmActualState;
    textPlusCreated: TypeOnRhythmActualState;
    followerAttached: TypeOnRhythmActualState;
    wordUnitApplied: TypeOnRhythmActualState;
    sequentialDelayApplied: TypeOnRhythmActualState;
    translationApplied: TypeOnRhythmActualState;
    opacityApplied: TypeOnRhythmActualState;
    easingApplied: TypeOnRhythmActualState;
    sourceReadback: TypeOnRhythmActualState;
    renderCompleted: TypeOnRhythmActualState;
    visualQa1x: TypeOnRhythmActualState;
    visualQaHalfSpeed: TypeOnRhythmActualState;
  };
  productionReady: false;
  rule: string;
}

function delta(expected: number, applied: number | null) {
  return applied === null ? null : Number((applied - expected).toFixed(6));
}

function exactDeltaState(...values: Array<number | null>): TypeOnRhythmActualState {
  if (values.some((value) => value === null)) return "NOT_RUN";
  return values.every((value) => value === 0) ? "PASS" : "FAIL";
}

function booleanComparisonState(value: boolean | null): TypeOnRhythmActualState {
  if (value === null) return "NOT_RUN";
  return value ? "PASS" : "FAIL";
}

function assertTypeOnRhythmSelection(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
) {
  if (selection.patternId !== "type-type-on-rhythm") {
    throw new Error(`Type-on-rhythm Actual requires type-type-on-rhythm selection, got ${selection.patternId}`);
  }
  if (selection.sceneId !== scene.sceneId) {
    throw new Error("Type-on-rhythm route selection belongs to another SceneInstance");
  }
  if (selection.sourceRevision !== scene.updatedAt) {
    throw new Error("STALE_TYPE_ON_RHYTHM_ACTUAL_SELECTION");
  }
}

export function createTypeOnRhythmDaVinciActualArtifact(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TypeOnRhythmDaVinciActualArtifactV1 {
  assertTypeOnRhythmSelection(scene, selection);
  const text = resolveEditableValue(scene.editableIntent.fields.text);
  const intensity = resolveEditableValue(scene.editableIntent.fields.intensity);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text,
    intensity,
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  const expected = buildTypeOnRhythmDaVinciTranslatorSpec(baseline);

  return {
    schemaVersion: "type-on-rhythm-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-type-on-rhythm",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: { ...selection },
    baseline,
    expected,
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Blackmagic documents word-level Follower sequencing, but do not invent live Fusion input/property names. In the first Mac Resolve Actual, configure a real Text+ Follower for word-by-word sequencing through the supported UI and record the live bindings from Resolve before any automation is promoted.",
    },
    applicationChecklist: [
      "Open a disposable Resolve project/timeline; do not modify the wedding master timeline.",
      "Record Resolve product/version and timeline identity before editing.",
      "Create Text+ using the baseline text without changing the Scene HUMAN_SELECTED source.",
      "Attach a real Follower modifier using Resolve/Fusion UI.",
      "Set the Follower sequencing unit to words and confirm left-to-right order from the live UI/readback.",
      "Apply the canonical expected per-word delay and word animation duration.",
      "Apply expected Y translation, opacity animation, and cubic-out easing using live Fusion controls.",
      "Read back the actual values and the live tool/input names instead of assuming parameter bindings.",
      "Render the bounded canary and review at 1x and half speed for word order, delay, travel, opacity, and end state.",
      "Keep every check NOT_RUN unless that exact step was performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      followerAttached: "NOT_RUN",
      wordUnitApplied: "NOT_RUN",
      sequentialDelayApplied: "NOT_RUN",
      translationApplied: "NOT_RUN",
      opacityApplied: "NOT_RUN",
      easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN",
      renderCompleted: "NOT_RUN",
      visualQa1x: "NOT_RUN",
      visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "The official word-level Follower capability and deterministic translator make this Actual testable, not production-ready. Scene/HUMAN_SELECTED remains authority. Promote only after live parameter binding, exact apply/readback, bounded render, and 1x/half-speed visual parity evidence are captured and separately reviewed.",
  };
}

export function compareTypeOnRhythmDaVinciActualReadback(
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
  readback: TypeOnRhythmDaVinciActualReadbackV1,
): TypeOnRhythmDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Type-on-rhythm readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Type-on-rhythm readback is STALE for current artifact");

  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "type-on-rhythm-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    followerPresent: readback.followerModifierFound,
    unitMatches: readback.followerUnit === null ? null : readback.followerUnit === expected.follower.unit,
    orderMatches: readback.followerOrder === null ? null : readback.followerOrder === expected.follower.order,
    delayFrameDelta: delta(expected.follower.delayFrames, readback.perWordDelayFrames),
    durationFrameDelta: delta(expected.animation.endFrame, readback.wordDurationFrames),
    translateYFromDeltaPixels: delta(expected.animation.translateY.fromPixels, readback.translateYFromPixels),
    translateYToDeltaPixels: delta(expected.animation.translateY.toPixels, readback.translateYToPixels),
    opacityFromDelta: delta(expected.animation.opacity.from, readback.opacityFrom),
    opacityToDelta: delta(expected.animation.opacity.to, readback.opacityTo),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachTypeOnRhythmDaVinciActualReadback(
  artifact: TypeOnRhythmDaVinciActualArtifactV1,
  readback: TypeOnRhythmDaVinciActualReadbackV1,
) {
  const comparison = compareTypeOnRhythmDaVinciActualReadback(artifact, readback);
  const hasReadbackIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: readback.textPlusToolFound === true ? "PASS" as const : readback.textPlusToolFound === false ? "FAIL" as const : "NOT_RUN" as const,
      followerAttached: readback.followerModifierFound === true ? "PASS" as const : readback.followerModifierFound === false ? "FAIL" as const : "NOT_RUN" as const,
      wordUnitApplied: booleanComparisonState(comparison.unitMatches),
      sequentialDelayApplied: exactDeltaState(comparison.delayFrameDelta, comparison.durationFrameDelta),
      translationApplied: exactDeltaState(comparison.translateYFromDeltaPixels, comparison.translateYToDeltaPixels),
      opacityApplied: exactDeltaState(comparison.opacityFromDelta, comparison.opacityToDelta),
      easingApplied: booleanComparisonState(comparison.easingMatches),
      sourceReadback: hasReadbackIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
