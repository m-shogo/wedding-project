import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildTripletDaVinciTranslatorSpec } from "./tripletDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type TripletActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface TripletDaVinciActualReadbackV1 {
  schemaVersion: "triplet-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  transformBindingRecorded: boolean | null;
  transformBindingIdentity: string | null;
  styledText: string | null;
  colorCss: string | null;
  hitFrames: number[] | null;
  pulseDurationFrames: number | null;
  scaleBase: number | null;
  scalePeakDeltas: number[] | null;
  opacityAppearStartFrame: number | null;
  opacityAppearEndFrame: number | null;
  pulseShapeObserved: "LINEAR_DECAY_PER_HIT_SUMMED" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface TripletDaVinciActualArtifactV1 {
  schemaVersion: "triplet-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-triplet";
  sceneId: string;
  sourceRevision: string;
  routeSelection: TypographyProductionSelectionV1;
  baseline: {authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER"; text: string; intensity: "S" | "M" | "L"; color: "#ffffff"; fps: 30};
  expected: ReturnType<typeof buildTripletDaVinciTranslatorSpec>;
  parameterBinding: {state: "NOT_VERIFIED"; rule: string};
  readback: TripletDaVinciActualReadbackV1 | null;
  checks: {
    resolveIdentity: TripletActualState;
    textPlusCreated: TripletActualState;
    transformBindingRecorded: TripletActualState;
    hitFramesApplied: TripletActualState;
    pulseDurationApplied: TripletActualState;
    scalePeaksApplied: TripletActualState;
    opacityApplied: TripletActualState;
    pulseShapeApplied: TripletActualState;
    sourceReadback: TripletActualState;
    renderCompleted: TripletActualState;
    visualQa1x: TripletActualState;
    visualQaHalfSpeed: TripletActualState;
  };
  productionReady: false;
  rule: string;
}

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-triplet") throw new Error(`Triplet Actual requires type-triplet selection, got ${selection.patternId}`);
  if (selection.sceneId !== scene.sceneId) throw new Error("Triplet route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_TRIPLET_ACTUAL_SELECTION");
}

export function createTripletDaVinciActualArtifact(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1): TripletDaVinciActualArtifactV1 {
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  return {
    schemaVersion: "triplet-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-triplet",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: {...selection},
    baseline,
    expected: buildTripletDaVinciTranslatorSpec(baseline),
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Record the real Text+/Transform binding and all three pulse keyframe groups from Mac Resolve. A single generic punch is not evidence for canonical triplet parity.",
    },
    readback: null,
    checks: {
      resolveIdentity: "NOT_RUN", textPlusCreated: "NOT_RUN", transformBindingRecorded: "NOT_RUN", hitFramesApplied: "NOT_RUN",
      pulseDurationApplied: "NOT_RUN", scalePeaksApplied: "NOT_RUN", opacityApplied: "NOT_RUN", pulseShapeApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN", renderCompleted: "NOT_RUN", visualQa1x: "NOT_RUN", visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "Triplet remains an Actual candidate until three distinct visual peaks, their decay/overlap, exact timing and readback are verified in a bounded Resolve render.",
  };
}
