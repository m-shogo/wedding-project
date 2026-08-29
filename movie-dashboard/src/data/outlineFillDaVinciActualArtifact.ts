import { resolveEditableValue } from "./humanEditableMotionIntent";
import { buildOutlineFillDaVinciTranslatorSpec } from "./outlineFillDaVinciTranslator";
import type { TypographyProductionSelectionV1 } from "./typographySceneProductionRouting";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type OutlineFillActualState = "NOT_RUN" | "PASS" | "FAIL";

export interface OutlineFillDaVinciActualReadbackV1 {
  schemaVersion: "outline-fill-davinci-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  transport: string;
  projectName: string;
  timelineName: string;
  textPlusToolFound: boolean | null;
  shadingBindingRecorded: boolean | null;
  fillBindingIdentity: string | null;
  strokeBindingIdentity: string | null;
  strokeWidthUnit: string | null;
  styledText: string | null;
  colorCss: string | null;
  outlineAppearEndFrame: number | null;
  fillStartFrame: number | null;
  fillEndFrame: number | null;
  fillOpacityFrom: number | null;
  fillOpacityTo: number | null;
  normalizedStrokeWidthFromPx: number | null;
  normalizedStrokeWidthToPx: number | null;
  rawStrokeWidthFrom: number | null;
  rawStrokeWidthTo: number | null;
  easingObserved: "EASE_OUT_CUBIC" | "OTHER" | null;
  renderedPreviewPath: string | null;
  notes: string[];
}

export interface OutlineFillDaVinciActualComparisonV1 {
  schemaVersion: "outline-fill-davinci-comparison/v1";
  expectedSource: "CANONICAL_TRANSLATOR_SPEC";
  textMatches: boolean | null;
  colorMatches: boolean | null;
  shadingBindingRecorded: boolean | null;
  outlineAppearEndFrameDelta: number | null;
  fillStartFrameDelta: number | null;
  fillEndFrameDelta: number | null;
  fillOpacityFromDelta: number | null;
  fillOpacityToDelta: number | null;
  strokeWidthFromPxDelta: number | null;
  strokeWidthToPxDelta: number | null;
  easingMatches: boolean | null;
}

export interface OutlineFillDaVinciActualArtifactV1 {
  schemaVersion: "outline-fill-davinci-actual-artifact/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-outline-fill";
  sceneId: string;
  sourceRevision: string;
  routeSelection: TypographyProductionSelectionV1;
  baseline: {authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER"; text: string; intensity: "S" | "M" | "L"; color: "#ffffff"; fps: 30};
  expected: ReturnType<typeof buildOutlineFillDaVinciTranslatorSpec>;
  parameterBinding: {state: "NOT_VERIFIED"; rule: string};
  applicationChecklist: readonly string[];
  readback: OutlineFillDaVinciActualReadbackV1 | null;
  comparison: OutlineFillDaVinciActualComparisonV1 | null;
  checks: {
    resolveIdentity: OutlineFillActualState;
    textPlusCreated: OutlineFillActualState;
    shadingBindingRecorded: OutlineFillActualState;
    outlineAppearApplied: OutlineFillActualState;
    fillTimingApplied: OutlineFillActualState;
    fillOpacityApplied: OutlineFillActualState;
    strokeWidthApplied: OutlineFillActualState;
    easingApplied: OutlineFillActualState;
    sourceReadback: OutlineFillActualState;
    renderCompleted: OutlineFillActualState;
    visualQa1x: OutlineFillActualState;
    visualQaHalfSpeed: OutlineFillActualState;
  };
  productionReady: false;
  rule: string;
}

const delta = (expected: number, actual: number | null) => actual === null ? null : Number((actual - expected).toFixed(6));
const exact = (...values: Array<number | null>): OutlineFillActualState => values.some((value) => value === null) ? "NOT_RUN" : values.every((value) => value === 0) ? "PASS" : "FAIL";
const bool = (value: boolean | null): OutlineFillActualState => value === null ? "NOT_RUN" : value ? "PASS" : "FAIL";

function assertSelection(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1) {
  if (selection.patternId !== "type-outline-fill") throw new Error(`Outline Fill Actual requires type-outline-fill selection, got ${selection.patternId}`);
  if (selection.sceneId !== scene.sceneId) throw new Error("Outline Fill route selection belongs to another SceneInstance");
  if (selection.sourceRevision !== scene.updatedAt) throw new Error("STALE_OUTLINE_FILL_ACTUAL_SELECTION");
}

export function createOutlineFillDaVinciActualArtifact(scene: MaskRevealSceneInstance, selection: TypographyProductionSelectionV1): OutlineFillDaVinciActualArtifactV1 {
  assertSelection(scene, selection);
  const baseline = {
    authority: "BOUNDED_ACTUAL_TEST_BASELINE_NOT_HUMAN_MASTER" as const,
    text: resolveEditableValue(scene.editableIntent.fields.text),
    intensity: resolveEditableValue(scene.editableIntent.fields.intensity),
    color: "#ffffff" as const,
    fps: 30 as const,
  };
  return {
    schemaVersion: "outline-fill-davinci-actual-artifact/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-outline-fill",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    routeSelection: {...selection},
    baseline,
    expected: buildOutlineFillDaVinciTranslatorSpec(baseline),
    parameterBinding: {
      state: "NOT_VERIFIED",
      rule: "Record the actual Text+ Shading fill/stroke controls and stroke-width unit from Mac Resolve. Preserve raw values plus canonical px-normalized comparison values.",
    },
    applicationChecklist: [
      "Use a disposable Resolve project/timeline; never modify the wedding master timeline.",
      "Create Text+ and record the exact Shading fill/stroke binding identities before editing.",
      "Record the live stroke-width unit/calibration instead of treating canonical CSS px as a native Text+ unit.",
      "Apply outline appearance through frame 4, fill from 35% of the 0.5s reveal through the reveal end, and stroke width from canonical 2.5×intensity px-equivalent to zero.",
      "Read back raw/native and normalized values, then render the bounded canary.",
      "Review at 1x and half speed: the treatment must read as outline becoming fill, not a generic opacity fade.",
      "Keep all unperformed checks NOT_RUN.",
    ],
    readback: null,
    comparison: null,
    checks: {
      resolveIdentity: "NOT_RUN", textPlusCreated: "NOT_RUN", shadingBindingRecorded: "NOT_RUN", outlineAppearApplied: "NOT_RUN",
      fillTimingApplied: "NOT_RUN", fillOpacityApplied: "NOT_RUN", strokeWidthApplied: "NOT_RUN", easingApplied: "NOT_RUN",
      sourceReadback: "NOT_RUN", renderCompleted: "NOT_RUN", visualQa1x: "NOT_RUN", visualQaHalfSpeed: "NOT_RUN",
    },
    productionReady: false,
    rule: "The outline/fill curves are canonical-derived, but production promotion requires real Text+ Shading bindings, stroke-unit calibration, exact readback and visual parity.",
  };
}

export function compareOutlineFillDaVinciActualReadback(artifact: OutlineFillDaVinciActualArtifactV1, readback: OutlineFillDaVinciActualReadbackV1): OutlineFillDaVinciActualComparisonV1 {
  if (readback.sceneId !== artifact.sceneId) throw new Error("Outline Fill readback sceneId mismatch");
  if (readback.sourceRevision !== artifact.sourceRevision) throw new Error("Outline Fill readback is STALE for current artifact");
  const expected = artifact.expected.implementation;
  return {
    schemaVersion: "outline-fill-davinci-comparison/v1",
    expectedSource: "CANONICAL_TRANSLATOR_SPEC",
    textMatches: readback.styledText === null ? null : readback.styledText === expected.text,
    colorMatches: readback.colorCss === null ? null : readback.colorCss.toLowerCase() === expected.color.toLowerCase(),
    shadingBindingRecorded: readback.shadingBindingRecorded,
    outlineAppearEndFrameDelta: delta(expected.animation.outlineAppear.endFrame, readback.outlineAppearEndFrame),
    fillStartFrameDelta: delta(expected.animation.fill.startFrame, readback.fillStartFrame),
    fillEndFrameDelta: delta(expected.animation.fill.endFrame, readback.fillEndFrame),
    fillOpacityFromDelta: delta(expected.animation.fill.opacityFrom, readback.fillOpacityFrom),
    fillOpacityToDelta: delta(expected.animation.fill.opacityTo, readback.fillOpacityTo),
    strokeWidthFromPxDelta: delta(expected.animation.stroke.widthFromPx, readback.normalizedStrokeWidthFromPx),
    strokeWidthToPxDelta: delta(expected.animation.stroke.widthToPx, readback.normalizedStrokeWidthToPx),
    easingMatches: readback.easingObserved === null ? null : readback.easingObserved === expected.animation.easing,
  };
}

export function attachOutlineFillDaVinciActualReadback(artifact: OutlineFillDaVinciActualArtifactV1, readback: OutlineFillDaVinciActualReadbackV1) {
  const comparison = compareOutlineFillDaVinciActualReadback(artifact, readback);
  const hasIdentity = Boolean(readback.capturedAt && readback.transport && readback.projectName && readback.timelineName);
  return {
    ...artifact,
    readback,
    comparison,
    checks: {
      ...artifact.checks,
      resolveIdentity: readback.resolveProduct && readback.resolveVersion ? "PASS" as const : "FAIL" as const,
      textPlusCreated: bool(readback.textPlusToolFound),
      shadingBindingRecorded: bool(comparison.shadingBindingRecorded),
      outlineAppearApplied: exact(comparison.outlineAppearEndFrameDelta),
      fillTimingApplied: exact(comparison.fillStartFrameDelta, comparison.fillEndFrameDelta),
      fillOpacityApplied: exact(comparison.fillOpacityFromDelta, comparison.fillOpacityToDelta),
      strokeWidthApplied: exact(comparison.strokeWidthFromPxDelta, comparison.strokeWidthToPxDelta),
      easingApplied: bool(comparison.easingMatches),
      sourceReadback: hasIdentity ? "PASS" as const : "FAIL" as const,
      renderCompleted: readback.renderedPreviewPath ? "PASS" as const : "NOT_RUN" as const,
    },
    productionReady: false as const,
  };
}
