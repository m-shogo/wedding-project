import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildTrackingBurstDaVinciTranslatorSpec } from "./trackingBurstDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type TrackingBurstActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface TrackingBurstDaVinciActualReadbackV1 {
  schemaVersion: "tracking-burst-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  characterSpacingInputFound: boolean | null;
  styledText: string | null;
  colorCss: string | null;
  durationFrames: number | null;
  rawTrackingFrom: number | null;
  rawTrackingTo: number | null;
  normalizedTrackingFromEm: number | null;
  normalizedTrackingToEm: number | null;
  nativeUnitCalibrationRecorded: boolean | null;
  opacityFrom: number | null;
  opacityTo: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface TrackingBurstDaVinciActualComparisonV1 {
  schemaVersion: "tracking-burst-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  characterSpacingPresent: boolean | null;
  nativeUnitCalibrationRecorded: boolean | null;
  durationFrameDelta: number | null;
  normalizedTrackingFromEmDelta: number | null;
  normalizedTrackingToEmDelta: number | null;
  opacityFromDelta: number | null;
  opacityToDelta: number | null;
  easingMatches: boolean | null;
}

export interface TrackingBurstDaVinciActualArtifactV1 {
  schemaVersion: "tracking-burst-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-tracking-burst";
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
  expected: ReturnType<typeof buildTrackingBurstDaVinciTranslatorSpec>;
  parameterBinding: { state: "NOT_VERIFIED"; rule: string };
  applicationChecklist: readonly string[];
  readback: TrackingBurstDaVinciActualReadbackV1 | null;
  comparison: TrackingBurstDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: TrackingBurstActualState;
    textPlusCreated: TrackingBurstActualState;
    characterSpacingInputAttached: TrackingBurstActualState;
    nativeUnitCalibrationRecorded: TrackingBurstActualState;
    durationApplied: TrackingBurstActualState;
    trackingApplied: TrackingBurstActualState;
    opacityApplied: TrackingBurstActualState;
    easingApplied: TrackingBurstActualState;
    sourceReadback: TrackingBurstActualState;
    renderCompleted: TrackingBurstActualState;
    visualQa1x: TrackingBurstActualState;
    visualQaHalfSpeed: TrackingBurstActualState;
  };
  productionReady: false;
  rule: string;
}

const delta = (expected: number, actual: number | null) =>
  actual === null ? null : Number((actual - expected).toFixed(6));

const exactDeltaState = (...values: Array<number | null>): TrackingBurstActualState => {
  if (values.some((value) => value === null)) return "NOT_RUN";
  return values.every((value) => value === 0) ? "PASS" : "FAIL";
};

const booleanState = (value: boolean | null): TrackingBurstActualState =>
  value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-tracking-burst") {
    throw new Error(`Tracking Burst Actual requires type-tracking-burst selection, got ${selection.patternId}`);
  }
  if (selection.sceneId !== scene.sceneId) throw new Error("Tracking Burst route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_TRACKING_BURST_ACTUAL_SELECTION");
}

export function createTrackingBurstDaVinciActualArtifact(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TrackingBurstDaVinciActualArtifactV1 {
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  const expected = buildTrackingBurstDaVinciTranslatorSpec(baseline);
  return {
    schemaVersion: "tracking-burst-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-tracking-burst",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: { ...selection },
    baseline,
    expected,
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Record the real Text+ character-spacing input and its native numeric unit from Mac Resolve. Never infer a conversion factor from the canonical CSS-em values.",
    },
    applicationChecklist: [
      "Use a disposable Resolve project/timeline; never modify the wedding master timeline.",
      "Record Resolve product/version and timeline identity before editing.",
      "Create Text+ with the baseline text and color.",
      "Locate the live character-spacing/tracking control and record its real tool/input identity.",
      "Calibrate the native control against the canonical normalized em-equivalent start/end values; preserve both raw and normalized values in readback.",
      "Apply the canonical 0.5s tracking burst and opacity entrance using cubic-out easing.",
      "Read back duration, raw/native tracking, normalized tracking, opacity and easing from Resolve.",
      "Render the bounded canary and review at 1x and half speed for readable initial spread, convergence and stable final spacing.",
      "Keep every check NOT_RUN unless that exact step was actually performed and evidenced.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN",
      textPlusCreated: "NOT_RUN",
      characterSpacingInputAttached: "NOT_RUN",
      nativeUnitCalibrationRecorded: "NOT_RUN",
      durationApplied: "NOT_RUN",
      trackingApplied: "NOT_RUN",
      opacityApplied: "NOT_RUN",
      easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN",
      renderCompleted: "NOT_RUN",
      visualQa1x: "NOT_RUN",
      visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "A canonical normalized tracking translator is testable, not production-ready. Promotion requires live input identity, native-unit calibration, exact normalized readback, bounded render and separate visual review.",
  };
}

export function compareTrackingBurstDaVinciActualReadback(
  artifact: TrackingBurstDaVinciActualArtifactV1,
  readback: TrackingBurstDaVinciActualReadbackV1,
): TrackingBurstDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Tracking Burst readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Tracking Burst readback is STALE for current artifact");
  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "tracking-burst-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    characterSpacingPresent: readback.characterSpacingInputFound,
    nativeUnitCalibrationRecorded: readback.nativeUnitCalibrationRecorded,
    durationFrameDelta: delta(expected.animation.endFrame, readback.durationFrames),
    normalizedTrackingFromEmDelta: delta(expected.animation.normalizedTrackingEm.from, readback.normalizedTrackingFromEm),
    normalizedTrackingToEmDelta: delta(expected.animation.normalizedTrackingEm.to, readback.normalizedTrackingToEm),
    opacityFromDelta: delta(expected.animation.opacity.from, readback.opacityFrom),
    opacityToDelta: delta(expected.animation.opacity.to, readback.opacityTo),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachTrackingBurstDaVinciActualReadback(
  artifact: TrackingBurstDaVinciActualArtifactV1,
  readback: TrackingBurstDaVinciActualReadbackV1,
) {
  const comparison = compareTrackingBurstDaVinciActualReadback(artifact, readback);
  const hasIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: booleanState(readback.textPlusToolFound),
      characterSpacingInputAttached: booleanState(comparison.characterSpacingPresent),
      nativeUnitCalibrationRecorded: booleanState(comparison.nativeUnitCalibrationRecorded),
      durationApplied: exactDeltaState(comparison.durationFrameDelta),
      trackingApplied: exactDeltaState(comparison.normalizedTrackingFromEmDelta, comparison.normalizedTrackingToEmDelta),
      opacityApplied: exactDeltaState(comparison.opacityFromDelta, comparison.opacityToDelta),
      easingApplied: booleanState(comparison.easingMatches),
      sourceReadback: hasIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
