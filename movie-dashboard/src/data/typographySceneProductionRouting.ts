import { buildMaskRevealSceneProductionBundle } from "./maskRevealSceneProductionBundle";
import {
  getRemotionElementCandidate,
  type RemotionElementCandidateRecord,
  type StudioActualState,
} from "./remotionElementCandidates";
import type { MaskRevealSceneInstance } from "./visualSceneComposer";

export type TypographyProductionPatternId =
  | "type-mask-reveal"
  | "type-char-stagger"
  | "type-type-on-rhythm"
  | "type-word-punch"
  | "type-tracking-burst"
  | "type-vertical-wipe"
  | "type-outline-fill"
  | "type-baseline-hop"
  | "type-triplet";

export type DaVinciTypographyRouteStatus =
  | "DAVINCI_IMPLEMENTATION_AVAILABLE"
  | "DAVINCI_TRANSLATION_NOT_IMPLEMENTED";

export interface TypographyProductionRouteDefinition {
  patternId: TypographyProductionPatternId;
  canonicalMode: RemotionElementCandidateRecord["canonicalMode"];
  palmierCapability: "PALMIER_TIMING_ONLY";
  davinciRouteStatus: DaVinciTypographyRouteStatus;
  davinciImplementationId: string | null;
  translationTarget: "TEXT_PLUS_FUSION";
  rule: string;
}

const route = (
  patternId: TypographyProductionPatternId,
  canonicalMode: RemotionElementCandidateRecord["canonicalMode"],
  davinciRouteStatus: DaVinciTypographyRouteStatus,
  davinciImplementationId: string | null,
  rule: string,
): TypographyProductionRouteDefinition => ({
  patternId,
  canonicalMode,
  palmierCapability: "PALMIER_TIMING_ONLY",
  davinciRouteStatus,
  davinciImplementationId,
  translationTarget: "TEXT_PLUS_FUSION",
  rule,
});

/**
 * Motion Zukan Typography 9候補 → production pipeline の正本。
 * Remotion Element候補であることと、DaVinciで同等表現を実装済みであることを混同しない。
 */
export const typographyProductionRoutes: TypographyProductionRouteDefinition[] = [
  route(
    "type-mask-reveal",
    "mask",
    "DAVINCI_IMPLEMENTATION_AVAILABLE",
    "impl-type-mask-reveal-davinci-text-plus",
    "既存Text+実装とvalue bridgeを再利用できる。Actual applied evidenceが埋まるまではproduction-ready扱いしない。",
  ),
  route(
    "type-char-stagger",
    "stagger",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "文字単位staggerのText+/Fusion translationを実装・検証してからDaVinci routeを昇格する。",
  ),
  route(
    "type-type-on-rhythm",
    "word-stagger",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "語単位timingをPalmier placementとは分離し、Text+/Fusion側のword revealとして実装するまで未対応。",
  ),
  route(
    "type-word-punch",
    "punch",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "scale punchのvisual peakをDaVinci側で一致確認するtranslatorが未実装。",
  ),
  route(
    "type-tracking-burst",
    "tracking",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "tracking animationをText+ character spacingへ翻訳する実装とrender evidenceが未完了。",
  ),
  route(
    "type-vertical-wipe",
    "vertical-wipe",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "clip reveal相当をText+/Fusion maskへ翻訳する実装とrender evidenceが未完了。",
  ),
  route(
    "type-outline-fill",
    "outline",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "outline→fill遷移のstroke/fill parityをDaVinciで再現・検証するまで未対応。",
  ),
  route(
    "type-baseline-hop",
    "hop",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "bounce着地のtiming/easingをDaVinci側へ翻訳する実装とrender evidenceが未完了。",
  ),
  route(
    "type-triplet",
    "triplet",
    "DAVINCI_TRANSLATION_NOT_IMPLEMENTED",
    null,
    "3-hit pulseのvisual peakをDaVinci側で一致させるtranslatorが未実装。",
  ),
];

export const getTypographyProductionRoute = (patternId: string) =>
  typographyProductionRoutes.find((item) => item.patternId === patternId) ?? null;

export interface TypographyProductionSelectionV1 {
  schemaVersion: "typography-production-selection/v1";
  authority: "HUMAN_SELECTED";
  sceneId: string;
  sourceRevision: string;
  patternId: TypographyProductionPatternId;
  selectedAt: string;
}

export function createTypographyProductionSelection(
  scene: MaskRevealSceneInstance,
  patternId: TypographyProductionPatternId,
  selectedAt = new Date().toISOString(),
): TypographyProductionSelectionV1 {
  return {
    schemaVersion: "typography-production-selection/v1",
    authority: "HUMAN_SELECTED",
    sceneId: scene.sceneId,
    sourceRevision: scene.updatedAt,
    patternId,
    selectedAt,
  };
}

export interface TypographySceneProductionBundleV1 {
  schemaVersion: "motion-zukan-typography-production/v1";
  authority: "DERIVED_FROM_HUMAN_MASTER_AND_HUMAN_SELECTED_ROUTE";
  sceneId: string;
  projectId: "opening" | "profile";
  sourceRevision: string;
  patternId: TypographyProductionPatternId;
  routeSelection: TypographyProductionSelectionV1;
  canonical: {
    engine: "TypographyRevealEngine";
    mode: RemotionElementCandidateRecord["canonicalMode"];
  };
  remotion: {
    readiness: RemotionElementCandidateRecord["readiness"];
    payloadSlug: string;
    editableFields: string[];
    standaloneRenderCi: boolean;
    studioInstallActual: StudioActualState;
    studioControlReadbackActual: StudioActualState;
    studioActualReady: boolean;
    rule: string;
  };
  sceneTiming: {
    targetDurationSeconds: number;
    computedDurationSeconds: number;
    durationDeltaSeconds: number;
  };
  palmier: {
    capability: "PALMIER_TIMING_ONLY";
    timelineXmlFileName: string;
    xmlGeneratedExternally: true;
    markerId: string;
    ready: true;
    rule: string;
  };
  davinci: {
    routeStatus: DaVinciTypographyRouteStatus;
    implementationId: string | null;
    translationTarget: "TEXT_PLUS_FUSION";
    visualImplementationReady: boolean;
    actualAppliedEvidence: "NOT_RUN";
    rule: string;
  };
  gate: {
    remotionStudioReady: boolean;
    palmierTimingReady: true;
    davinciVisualReady: boolean;
    productionReady: false;
    blockers: string[];
  };
  freshness: {
    generatedFromSceneUpdatedAt: string;
    routeSelectionSourceRevision: string;
    routeSelectionFresh: true;
    rule: string;
  };
}

function requireTypographyCandidate(patternId: TypographyProductionPatternId) {
  const candidate = getRemotionElementCandidate(patternId);
  if (!candidate) {
    throw new Error(`Missing Remotion Element candidate for production route: ${patternId}`);
  }
  return candidate;
}

function requireTypographyRoute(patternId: TypographyProductionPatternId) {
  const definition = getTypographyProductionRoute(patternId);
  if (!definition) {
    throw new Error(`Missing Typography production route: ${patternId}`);
  }
  return definition;
}

function assertFreshRouteSelection(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
) {
  if (selection.sceneId !== scene.sceneId) {
    throw new Error(`Typography production selection belongs to ${selection.sceneId}, not ${scene.sceneId}`);
  }
  if (selection.sourceRevision !== scene.updatedAt) {
    throw new Error(
      `STALE_TYPOGRAPHY_ROUTE_SELECTION: selected from ${selection.sourceRevision}, current scene is ${scene.updatedAt}`,
    );
  }
}

export function buildTypographySceneProductionBundle(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TypographySceneProductionBundleV1 {
  assertFreshRouteSelection(scene, selection);
  const patternId = selection.patternId;
  const candidate = requireTypographyCandidate(patternId);
  const definition = requireTypographyRoute(patternId);
  const base = buildMaskRevealSceneProductionBundle(scene);
  const remotionStudioReady =
    candidate.readiness === "STUDIO_ACTUAL_VERIFIED" &&
    candidate.studioInstallActual === "PASS" &&
    candidate.studioControlReadbackActual === "PASS";
  const davinciVisualReady = definition.davinciRouteStatus === "DAVINCI_IMPLEMENTATION_AVAILABLE";
  const blockers: string[] = [];

  if (!remotionStudioReady) {
    blockers.push("REMOTION_STUDIO_ACTUAL_NOT_VERIFIED");
  }
  if (!davinciVisualReady) {
    blockers.push("DAVINCI_TRANSLATION_NOT_IMPLEMENTED");
  }
  // Even Mask Reveal still needs real applied-value/readback evidence before final promotion.
  blockers.push("DAVINCI_ACTUAL_APPLIED_EVIDENCE_NOT_RUN");

  return {
    schemaVersion: "motion-zukan-typography-production/v1",
    authority: "DERIVED_FROM_HUMAN_MASTER_AND_HUMAN_SELECTED_ROUTE",
    sceneId: scene.sceneId,
    projectId: scene.projectId,
    sourceRevision: scene.updatedAt,
    patternId,
    routeSelection: { ...selection },
    canonical: {
      engine: candidate.canonicalEngine,
      mode: candidate.canonicalMode,
    },
    remotion: {
      readiness: candidate.readiness,
      payloadSlug: candidate.payloadSlug,
      editableFields: [...candidate.editableFields],
      standaloneRenderCi: candidate.standaloneRenderCi,
      studioInstallActual: candidate.studioInstallActual,
      studioControlReadbackActual: candidate.studioControlReadbackActual,
      studioActualReady: remotionStudioReady,
      rule: "ELEMENT_CANDIDATEやstandalone render成功をStudio GUI Actual成功へ読み替えない。",
    },
    sceneTiming: {
      targetDurationSeconds: scene.targetDurationSeconds,
      computedDurationSeconds: scene.computedDurationSeconds,
      durationDeltaSeconds: scene.durationDeltaSeconds,
    },
    palmier: {
      capability: "PALMIER_TIMING_ONLY",
      timelineXmlFileName: base.timeline.projectTimelineXmlFileName,
      xmlGeneratedExternally: true,
      markerId: base.sceneMarkerId,
      ready: true,
      rule: "PalmierはSceneInstanceのplacement/trim/markerを担当し、Typography visual motion自体の正本にはしない。実NLE XMLはPalmierからexportする。",
    },
    davinci: {
      routeStatus: definition.davinciRouteStatus,
      implementationId: definition.davinciImplementationId,
      translationTarget: definition.translationTarget,
      visualImplementationReady: davinciVisualReady,
      actualAppliedEvidence: "NOT_RUN",
      rule: definition.rule,
    },
    gate: {
      remotionStudioReady,
      palmierTimingReady: true,
      davinciVisualReady,
      productionReady: false,
      blockers,
    },
    freshness: {
      generatedFromSceneUpdatedAt: scene.updatedAt,
      routeSelectionSourceRevision: selection.sourceRevision,
      routeSelectionFresh: true,
      rule: "SceneInstance.updatedAtが変わったらroute selectionを人間が再確認して再選択する。stale selectionを自動適用しない。",
    },
  };
}

export function buildTypographySceneProductionBundleJson(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
) {
  return JSON.stringify(buildTypographySceneProductionBundle(scene, selection), null, 2);
}
