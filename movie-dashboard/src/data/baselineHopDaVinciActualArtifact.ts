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
    checks: {
      resolveIdentity: "NOT_RUN", textPlusCreated: "NOT_RUN", baselineBindingRecorded: "NOT_RUN", opacityTimingApplied: "NOT_RUN",
      hopTimingApplied: "NOT_RUN", positionApplied: "NOT_RUN", opacityEasingApplied: "NOT_RUN", hopEasingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN", renderCompleted: "NOT_RUN", visualQa1x: "NOT_RUN", visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "A canonical-derived bounce target is only an Actual candidate. Production promotion requires live input identity/unit calibration, apply/readback and 1x/half-speed visual parity.",
  };
}
