import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildBaselineHopDaVinciTranslatorSpec } from "./baselineHopDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type BaselineHopActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface BaselineHopDaVinciActualReadbackV1 {
  schemaVersion: "baseline-hop-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  baselineBindingRecorded: boolean | null;
  baselineBindingIdentity: string | null;
  positionUnit: string | null;
  styledText: string | null;
  colorCss: string | null;
  opacityEndFrame: number | null;
  hopEndFrame: number | null;
  normalizedTranslateYFromPx: number | null;
  normalizedTranslateYToPx: number | null;
  rawPositionFrom: number | null;
  rawPositionTo: number | null;
  opacityEasingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  hopEasingObserved: "REMOTION_EASING_BOUNCE" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface BaselineHopDaVinciActualComparisonV1 {
  schemaVersion: "baseline-hop-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  baselineBindingRecorded: boolean | null;
  opacityEndFrameDelta: number | null;
  hopEndFrameDelta: number | null;
  translateYFromPxDelta: number | null;
  translateYToPxDelta: number | null;
  opacityEasingMatches: boolean | null;
  hopEasingMatches: boolean | null;
}

export interface BaselineHopDaVinciActualArtifactV1 {
  schemaVersion: "baseline-hop-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-baseline-hop";
  sceneId: string;
  sourceRevision: string;
  routeSelection: TypographyProductionSelectionV1;
  baseline: {authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER"; text: string; intensity: "S" | "M" | "L"; color: "#ffffff"; fps: 30};
  expected: ReturnType<typeof buildBaselineHopDaVinciTranslatorSpec>;
  parameterBinding: {state: "NOT_VERIFIED"; rule: string};
  readback: BaselineHopDaVinciActualReadbackV1 | null;
  comparison: BaselineHopDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: BaselineHopActualState;
    textPlusCreated: BaselineHopActualState;
    baselineBindingRecorded: BaselineHopActualState;
    opacityTimingApplied: BaselineHopActualState;
    hopTimingApplied: BaselineHopActualState;
    positionApplied: BaselineHopActualState;
    opacityEasingApplied: BaselineHopActualState;
    hopEasingApplied: BaselineHopActualState;
    sourceReadback: BaselineHopActualState;
    renderCompleted: BaselineHopActualState;
    visualQa1x: BaselineHopActualState;
    visualQaHalfSpeed: BaselineHopActualState;
  };
  productionReady: false;
  rule: string;
}

const delta = (expected: number, actual: number | null) => actual === null ? null : Number((actual - expected).toFixed(6));
const exact = (...values: Array<number | null>): BaselineHopActualState => values.some((value) => value === null) ? "NOT_RUN" : values.every((value) => value === 0) ? "PASS" : "FAIL";
const bool = (value: boolean | null): BaselineHopActualState => value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-baseline-hop") throw new Error(`Baseline Hop Actual requires type-baseline-hop selection, got ${selection.patternId}`);
  if (selection.sceneId !== scene.sceneId) throw new Error("Baseline Hop route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_BASELINE_HOP_ACTUAL_SELECTION");
}

export function createBaselineHopDaVinciActualArtifact(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1): BaselineHopDaVinciActualArtifactV1 {
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  return {
    schemaVersion: "baseline-hop-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-baseline-hop",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: {...selection},
    baseline,
    expected: buildBaselineHopDaVinciTranslatorSpec(baseline),
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Record the real Resolve/Fusion position input, coordinate system and unit conversion before claiming Baseline Hop is implementable. The canonical -90px×intensity offset is comparison evidence, not a native Fusion value.",
    },
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN", textPlusCreated: "NOT_RUN", baselineBindingRecorded: "NOT_RUN", opacityTimingApplied: "NOT_RUN",
      hopTimingApplied: "NOT_RUN", positionApplied: "NOT_RUN", opacityEasingApplied: "NOT_RUN", hopEasingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN", renderCompleted: "NOT_RUN", visualQa1x: "NOT_RUN", visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "A canonical-derived bounce target is only an Actual candidate. Production promotion requires live input identity/unit calibration, apply/readback and 1x/half-speed visual parity.",
  };
}

export function compareBaselineHopDaVinciActualReadback(
  artifact: BaselineHopDaVinciActualArtifactV1,
  readback: BaselineHopDaVinciActualReadbackV1,
): BaselineHopDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Baseline Hop readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Baseline Hop readback is STALE for current artifact");
  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "baseline-hop-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    baselineBindingRecorded: readback.baselineBindingRecorded,
    opacityEndFrameDelta: delta(expected.animation.opacity.endFrame, readback.opacityEndFrame),
    hopEndFrameDelta: delta(expected.animation.baselineY.endFrame, readback.hopEndFrame),
    translateYFromPxDelta: delta(expected.animation.baselineY.fromPx, readback.normalizedTranslateYFromPx),
    translateYToPxDelta: delta(expected.animation.baselineY.toPx, readback.normalizedTranslateYToPx),
    opacityEasingMatches: readback.opacityEasingObserved === null ? null : readback.opacityEasingObserved === expected.animation.opacity.easing,
    hopEasingMatches: readback.hopEasingObserved === null ? null : readback.hopEasingObserved === expected.animation.baselineY.easing,
  };
}

export function attachBaselineHopDaVinciActualReadback(
  artifact: BaselineHopDaVinciActualArtifactV1,
  readback: BaselineHopDaVinciActualReadbackV1,
) {
  const comparison = compareBaselineHopDaVinciActualReadback(artifact, readback);
  const sourceReadbackComplete = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: bool(readback.textPlusToolFound),
      baselineBindingRecorded: bool(comparison.baselineBindingRecorded),
      opacityTimingApplied: exact(comparison.opacityEndFrameDelta),
      hopTimingApplied: exact(comparison.hopEndFrameDelta),
      positionApplied: exact(comparison.translateYFromPxDelta, comparison.translateYToPxDelta),
      opacityEasingApplied: bool(comparison.opacityEasingMatches),
      hopEasingApplied: bool(comparison.hopEasingMatches),
      sourceReadback: sourceReadbackComplete ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
