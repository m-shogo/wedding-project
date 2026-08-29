import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildWordPunchDaVinciTranslatorSpec } from "./wordPunchDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

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
  durationFrames: number | null;
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
  durationFrameDelta: number | null;
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
    transformAttached: WordPunchActualState;
    durationApplied: WordPunchActualState;
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

const delta = (expected: number, actual: number | null) =>
  actual === null ? null : Number((actual - expected).toFixed(6));

const exactDeltaState = (...values: Array<number | null>): WordPunchActualState => {
  if (values.some((value) => value === null)) return "NOT_RUN";
  return values.every((value) => value === 0) ? "PASS" : "FAIL";
};

const booleanState = (value: boolean | null): WordPunchActualState =>
  value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
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
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  const expected = buildWordPunchDaVinciTranslatorSpec(baseline);
  return {
    schemaVersion: "word-punch-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-word-punch",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: { ...selection },
    baseline,
    expected,
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Do not invent live Fusion input/property names. Configure a real Text+ + Transform canary in Resolve and record the actual tool/input names from the Mac Actual before automation is promoted.",
    },
    applicationChecklist: [
      "Use a disposable Resolve project/timeline; never modify the wedding master timeline.",
      "Record Resolve product/version and timeline identity before editing.",
      "Create Text+ with the baseline text and color.",
      "Add the live Fusion transform/control used to scale the whole title, recording its real tool/input names.",
      "Apply canonical start/end scale and opacity over the expected duration with cubic-out easing.",
      "Read back all applied values from Resolve instead of assuming parameter bindings.",
      "Render the bounded canary and review at 1x and half speed for punch peak, settling, opacity and end state.",
      "Keep every check NOT_RUN unless that exact step was actually performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      transformAttached: "NOT_RUN",
      durationApplied: "NOT_RUN",
      scaleApplied: "NOT_RUN",
      opacityApplied: "NOT_RUN",
      easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN",
      renderCompleted: "NOT_RUN",
      visualQa1x: "NOT_RUN",
      visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "A deterministic canonical translator makes Word Punch testable, not production-ready. Promote only after live binding, exact apply/readback, bounded render and separate 1x/half-speed visual review.",
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
    durationFrameDelta: delta(expected.animation.endFrame, readback.durationFrames),
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
  const hasIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: readback.textPlusToolFound === true ? "PASS" as const : readback.textPlusToolFound === false ? "FAIL" as const : "NOT_RUN" as const,
      transformAttached: booleanState(comparison.transformPresent),
      durationApplied: exactDeltaState(comparison.durationFrameDelta),
      scaleApplied: exactDeltaState(comparison.scaleFromDelta, comparison.scaleToDelta),
      opacityApplied: exactDeltaState(comparison.opacityFromDelta, comparison.opacityToDelta),
      easingApplied: booleanState(comparison.easingMatches),
      sourceReadback: hasIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
