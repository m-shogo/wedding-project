import {
  buildMaskRevealDaVinciValueBridge,
  MASK_REVEAL_VERTICAL_SLICE_CONTEXT,
  resolveCanonicalMaskRevealState,
  type DaVinciProjectContext,
} from "./maskRevealPresetBridge";
import type { MaskRevealDirection } from "./humanEditableMotionIntent";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type MaskRevealEvidenceProperty = "Transform" | "Mask";

export interface MaskRevealPropertyLocalReviewV1 {
  reviewedProperties: MaskRevealEvidenceProperty[];
  unrelatedPropertiesChanged: boolean | null;
  secondaryDependencies: string[];
}

export interface MaskRevealDaVinciAppliedReadbackV1 {
  schemaVersion: "davinci-applied-readback/v1";
  sceneId: string;
  sourceRevision: string;
  capturedAt: string;
  resolveProduct: string;
  resolveVersion: string;
  mcpVersion: string | null;
  transport: string;
  projectName: string;
  timelineName: string;
  projectContext: DaVinciProjectContext;
  styledText: string | null;
  maskConnected: boolean | null;
  timingFrames: {
    layerDelay: number | null;
    motionDelay: number | null;
    enterDuration: number | null;
    holdDuration: number | null;
    exitDuration: number | null;
  };
  finalPositionNormalized: {
    x: number;
    y: number;
  } | null;
  direction: MaskRevealDirection | null;
  distanceNormalized: number | null;
  scale: {
    from: number;
    to: number;
  } | null;
  reviewedLockedFields: string[];
  lockedPreserved: boolean | null;
  propertyLocalReview: MaskRevealPropertyLocalReviewV1;
  automationGap: "KEYFRAME_AUTHORING" | null;
  notes: string[];
}

export interface MaskRevealDaVinciComparisonV1 {
  schemaVersion: "davinci-applied-comparison/v1";
  expectedSource: "CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT";
  textMatches: boolean | null;
  maskConnected: boolean | null;
  timingFrameDelta: {
    layerDelay: number | null;
    motionDelay: number | null;
    enterDuration: number | null;
    holdDuration: number | null;
    exitDuration: number | null;
  };
  positionDeltaNormalized: {
    x: number;
    y: number;
  } | null;
  directionMatches: boolean | null;
  distanceDeltaNormalized: number | null;
  scaleDelta: {
    from: number;
    to: number;
  } | null;
  lockedPreserved: boolean | null;
  propertyLocalIntegrity: boolean | null;
}

export interface MaskRevealDaVinciAppliedEvidenceV1 {
  schemaVersion: "davinci-applied-evidence/v1";
  authority: "EVIDENCE_ONLY";
  patternId: "type-mask-reveal";
  sceneId: string;
  sourceRevision: string;
  status: "PENDING_LOCAL_DAVINCI" | "READBACK_CAPTURED";
  canonicalHumanState: ReturnType<typeof resolveCanonicalMaskRevealState>;
  humanSelectedFields: string[];
  lockedFields: string[];
  activePropertyUnits: readonly ["Transform", "Mask"];
  previewTargetContext: DaVinciProjectContext;
  previewTargetValueBridge: ReturnType<typeof buildMaskRevealDaVinciValueBridge>;
  liveProjectContext: DaVinciProjectContext | null;
  expectedFromLiveContext: ReturnType<typeof buildMaskRevealDaVinciValueBridge> | null;
  appliedReadback: MaskRevealDaVinciAppliedReadbackV1 | null;
  comparison: MaskRevealDaVinciComparisonV1 | null;
  checks: {
    liveResolveIdentityCaptured: boolean;
    liveProjectContextCaptured: boolean;
    textReadbackCaptured: boolean;
    maskConnectionReadbackCaptured: boolean;
    timingReadbackCaptured: boolean;
    positionReadbackCaptured: boolean;
    lockedFieldsReviewed: boolean;
    propertyLocalReviewCaptured: boolean;
    renderTested: false;
    visualQa1x: false;
    visualQaHalfSpeed: false;
  };
  productionReady: false;
  rule: string;
}

function delta(expected: number, applied: number | null) {
  return applied === null ? null : Number((applied - expected).toFixed(6));
}

export function createMaskRevealDaVinciAppliedEvidenceTemplate(
  scene: MaskRevealSceneInstance,
): MaskRevealDaVinciAppliedEvidenceV1 {
  return {
    schemaVersion: "davinci-applied-evidence/v1",
    authority: "EVIDENCE_ONLY",
    patternId: "type-mask-reveal",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    status: "PENDING_LOCAL_DAVINCI",
    canonicalHumanState: resolveCanonicalMaskRevealState(scene.editableIntent),
    humanSelectedFields: [...scene.humanSelectedFields],
    lockedFields: [...scene.lockedFields],
    activePropertyUnits: ["Transform", "Mask"],
    previewTargetContext: { ...MASK_REVEAL_VERTICAL_SLICE_CONTEXT },
    previewTargetValueBridge: buildMaskRevealDaVinciValueBridge(scene.editableIntent, MASK_REVEAL_VERTICAL_SLICE_CONTEXT),
    liveProjectContext: null,
    expectedFromLiveContext: null,
    appliedReadback: null,
    comparison: null,
    checks: {
      liveResolveIdentityCaptured: false,
      liveProjectContextCaptured: false,
      textReadbackCaptured: false,
      maskConnectionReadbackCaptured: false,
      timingReadbackCaptured: false,
      positionReadbackCaptured: false,
      lockedFieldsReviewed: false,
      propertyLocalReviewCaptured: false,
      renderTested: false,
      visualQa1x: false,
      visualQaHalfSpeed: false,
    },
    productionReady: false,
    rule: "Human-readable Scene/Canonical values remain authority. Resolve readback and rendered media are evidence only. Recompute expected implementation values from the live Resolve project context before comparing; never write readback values back into HUMAN_SELECTED/LOCKED automatically. For Mask Reveal v1, review only the active Transform and Mask property units and preserve property-local overrides.",
  };
}

export function buildMaskRevealDaVinciAppliedComparison(
  scene: MaskRevealSceneInstance,
  readback: MaskRevealDaVinciAppliedReadbackV1,
): {
  expectedFromLiveContext: ReturnType<typeof buildMaskRevealDaVinciValueBridge>;
  comparison: MaskRevealDaVinciComparisonV1;
} {
  if (readback.sceneId !== scene.sceneId) throw new Error("DaVinci readback sceneId does not match SceneInstance");
  if (readback.sourceRevision !== scene.updatedAt) throw new Error("DaVinci readback is STALE for the current SceneInstance revision");

  const canonical = resolveCanonicalMaskRevealState(scene.editableIntent);
  const expected = buildMaskRevealDaVinciValueBridge(scene.editableIntent, readback.projectContext);
  const timing = readback.timingFrames;

  return {
    expectedFromLiveContext: expected,
    comparison: {
      schemaVersion: "davinci-applied-comparison/v1",
      expectedSource: "CANONICAL_SCENE_STATE_WITH_LIVE_PROJECT_CONTEXT",
      textMatches: readback.styledText === null ? null : readback.styledText === canonical.text,
      maskConnected: readback.maskConnected,
      timingFrameDelta: {
        layerDelay: delta(expected.timing.layerDelay.resolvedFrames, timing.layerDelay),
        motionDelay: delta(expected.timing.motionDelay.resolvedFrames, timing.motionDelay),
        enterDuration: delta(expected.timing.enterDuration.resolvedFrames, timing.enterDuration),
        holdDuration: delta(expected.timing.holdDuration.resolvedFrames, timing.holdDuration),
        exitDuration: delta(expected.timing.exitDuration.resolvedFrames, timing.exitDuration),
      },
      positionDeltaNormalized: readback.finalPositionNormalized === null
        ? null
        : {
            x: delta(expected.position.xNormalized, readback.finalPositionNormalized.x) ?? 0,
            y: delta(expected.position.yNormalized, readback.finalPositionNormalized.y) ?? 0,
          },
      directionMatches: readback.direction === null ? null : readback.direction === expected.motion.direction,
      distanceDeltaNormalized: delta(expected.motion.distanceNormalized, readback.distanceNormalized),
      scaleDelta: readback.scale === null
        ? null
        : {
            from: delta(expected.scale.from, readback.scale.from) ?? 0,
            to: delta(expected.scale.to, readback.scale.to) ?? 0,
          },
      lockedPreserved: readback.lockedPreserved,
      propertyLocalIntegrity: readback.propertyLocalReview.unrelatedPropertiesChanged === null
        ? null
        : !readback.propertyLocalReview.unrelatedPropertiesChanged,
    },
  };
}

export function attachMaskRevealDaVinciReadback(
  scene: MaskRevealSceneInstance,
  readback: MaskRevealDaVinciAppliedReadbackV1,
): MaskRevealDaVinciAppliedEvidenceV1 {
  const base = createMaskRevealDaVinciAppliedEvidenceTemplate(scene);
  const { expectedFromLiveContext, comparison } = buildMaskRevealDaVinciAppliedComparison(scene, readback);
  const timingValues = Object.values(readback.timingFrames);

  return {
    ...base,
    status: "READBACK_CAPTURED",
    liveProjectContext: { ...readback.projectContext },
    expectedFromLiveContext,
    appliedReadback: readback,
    comparison,
    checks: {
      ...base.checks,
      liveResolveIdentityCaptured: Boolean(readback.resolveProduct && readback.resolveVersion),
      liveProjectContextCaptured: true,
      textReadbackCaptured: readback.styledText !== null,
      maskConnectionReadbackCaptured: readback.maskConnected !== null,
      timingReadbackCaptured: timingValues.some((value) => value !== null),
      positionReadbackCaptured: readback.finalPositionNormalized !== null,
      lockedFieldsReviewed: readback.lockedPreserved !== null,
      propertyLocalReviewCaptured: readback.propertyLocalReview.unrelatedPropertiesChanged !== null,
    },
  };
}
