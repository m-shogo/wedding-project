import { buildCharStaggerDaVinciTranslatorSpec } from "./charStaggerDaVinciTranslator";
import { resolveEditableValue } from "./humanEditableMotionIntent";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type CharStaggerActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface CharStaggerDaVinciActualReadbackV1 {
  schemaVersion: "char-stagger-davinci-readback/v1";
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
  followerOrder: "LEFT_TO_RIGHT" | null;
  perCharacterDelayFrames: number | null;
  characterDurationFrames: number | null;
  translateYFromPixels: number | null;
  translateYToPixels: number | null;
  opacityFrom: number | null;
  opacityTo: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface CharStaggerDaVinciActualComparisonV1 {
  schemaVersion: "char-stagger-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  followerPresent: boolean | null;
  orderMatches: boolean | null;
  delayFrameDelta: number | null;
  durationFrameDelta: number | null;
  translateYFromDeltaPixels: number | null;
  translateYToDeltaPixels: number | null;
  opacityFromDelta: number | null;
  opacityToDelta: number | null;
  easingMatches: boolean | null;
}

export interface CharStaggerDaVinciActualArtifactV1 {
  schemaVersion: "char-stagger-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-char-stagger";
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
  expected: ReturnType<typeof buildCharStaggerDaVinciTranslatorSpec>;
  parameterBinding: {
    state: "NOT_VERIFIED";
    rule: string;
  };
  applicationChecklist: readonly string[];
  readback: CharStaggerDaVinciActualReadbackV1 | null;
  comparison: CharStaggerDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: CharStaggerActualState;
    textPlusCreated: CharStaggerActualState;
    followerAttached: CharStaggerActualState;
    sequentialDelayApplied: CharStaggerActualState;
    translationApplied: CharStaggerActualState;
    opacityApplied: CharStaggerActualState;
    easingApplied: CharStaggerActualState;
    sourceReadback: CharStaggerActualState;
    renderCompleted: CharStaggerActualState;
    visualQa1x: CharStaggerActualState;
    visualQaHalfSpeed: CharStaggerActualState;
  };
  productionReady: false;
  rule: string;
}

function delta(expected: number, applied: number | null) {
  return applied === null ? null : Number((applied - expected).toFixed(6));
}

function assertCharStaggerSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-char-stagger") {
    throw new Error(`Char Stagger Actual requires type-char-stagger selection, got ${selection.patternId}`);
  }
  if (selection.sceneId !== scene.sceneId) {
    throw new Error("Char Stagger route selection belongs to another SceneInstance");
  }
  if (selection.sourceRevision !== scene.updatedAt) {
    throw new Error("STALE_CHAR_STAGGER_ACTUAL_SELECTION");
  }
}

export function createCharStaggerDaVinciActualArtifact(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): CharStaggerDaVinciActualArtifactV1 {
  assertCharStaggerSelection(scene, selection);
  const text = resolveEditableValue(scene.editableIntent.fields.text);
  const intensity = resolveEditableValue(scene.editableIntent.fields.intensity);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text,
    intensity,
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  const expected = buildCharStaggerDaVinciTranslatorSpec(baseline);

  return {
    schemaVersion: "char-stagger-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-char-stagger",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: { ...selection },
    baseline,
    expected,
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Do not invent Fusion input/property names from docs or source speculation. In the first Mac Resolve Actual, attach a real Text+ Follower through the GUI, inspect the live tool/input names, then record the bindings before automation is promoted.",
    },
    applicationChecklist: [
      "Open a disposable Resolve project/timeline; do not modify the wedding master timeline.",
      "Record Resolve product/version and timeline identity before editing.",
      "Create a Text+ title containing the baseline text.",
      "Attach a real Follower modifier to the Text+ through the supported Resolve/Fusion UI.",
      "Configure left-to-right sequential character animation and the expected inter-character delay.",
      "Apply the expected Y translation, opacity animation, and cubic-out easing using live Fusion controls.",
      "Read back the actual Text+/Follower values and live input/property names instead of assuming parameter bindings.",
      "Render the bounded canary and review at 1x and half speed for character order, delay, travel, opacity, and end state.",
      "Keep every check NOT_RUN unless that exact step was performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      followerAttached: "NOT_RUN",
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
    rule: "Scene/HUMAN_SELECTED values remain authority. This artifact is evidence-only. A deterministic translator spec, documented Follower capability, or a generated checklist is not proof of a Resolve application. Promote the production route only after real parameter binding, apply/readback, render, and visual parity evidence are captured.",
  };
}

export function compareCharStaggerDaVinciActualReadback(
  artifact: CharStaggerDaVinciActualArtifactV1,
  readback: CharStaggerDaVinciActualReadbackV1,
): CharStaggerDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Char Stagger readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Char Stagger readback is STALE for current artifact");

  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "char-stagger-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    followerPresent: readback.followerModifierFound,
    orderMatches: readback.followerOrder === null ? null : readback.followerOrder === expected.follower.order,
    delayFrameDelta: delta(expected.follower.delayFrames, readback.perCharacterDelayFrames),
    durationFrameDelta: delta(expected.animation.endFrame, readback.characterDurationFrames),
    translateYFromDeltaPixels: delta(expected.animation.translateY.fromPixels, readback.translateYFromPixels),
    translateYToDeltaPixels: delta(expected.animation.translateY.toPixels, readback.translateYToPixels),
    opacityFromDelta: delta(expected.animation.opacity.from, readback.opacityFrom),
    opacityToDelta: delta(expected.animation.opacity.to, readback.opacityTo),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachCharStaggerDaVinciActualReadback(
  artifact: CharStaggerDaVinciActualArtifactV1,
  readback: CharStaggerDaVinciActualReadbackV1,
) {
  const comparison = compareCharStaggerDaVinciActualReadback(artifact, readback);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: readback.textPlusToolFound === true ? "PASS" as const : readback.textPlusToolFound === false ? "FAIL" as const : "NOT_RUN" as const,
      followerAttached: readback.followerModifierFound === true ? "PASS" as const : readback.followerModifierFound === false ? "FAIL" as const : "NOT_RUN" as const,
      sequentialDelayApplied: readback.perCharacterDelayFrames !== null ? "PASS" as const : "NOT_RUN" as const,
      translationApplied: readback.translateYFromPixels !== null && readback.translateYToPixels !== null ? "PASS" as const : "NOT_RUN" as const,
      opacityApplied: readback.opacityFrom !== null && readback.opacityTo !== null ? "PASS" as const : "NOT_RUN" as const,
      easingApplied: readback.easingObserved !== null ? "PASS" as const : "NOT_RUN" as const,
      sourceReadback: "PASS" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
