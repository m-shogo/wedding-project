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
  | "DAVINCI_TRANSLATION_NOT_IMPLEMENTED"
  | "DAVINCI_ACTUAL_CANDIDATE"
  | "DAVINCI_IMPLEMENTATION_AVAILABLE"
  | "DAVINCI_ACTUAL_VERIFIED";

export interface TypographyProductionRouteDefinition {
  patternId: TypographyProductionPatternId;
  canonicalMode: RemotionElementCandidateRecord["canonicalMode"];
  palmierCapability: "PALMIER_TIMING_ONLY";
  davinciRouteStatus: DaVinciTypographyRouteStatus;
  davinciImplementationId: string | null;
  translationTarget: "TEXT_PLUS_FUSION";
  translatorSpecAvailable: boolean;
  actualEvidenceWorkflowAvailable: boolean;
  liveImplementationAvailable: boolean;
  actualVerified: boolean;
  rule: string;
}

const route = (
  patternId: TypographyProductionPatternId,
  canonicalMode: RemotionElementCandidateRecord["canonicalMode"],
  davinciRouteStatus: DaVinciTypographyRouteStatus,
  davinciImplementationId: string | null,
  rule: string,
): TypographyProductionRouteDefinition => {
  const translatorSpecAvailable = davinciRouteStatus !== "DAVINCI_TRANSLATION_NOT_IMPLEMENTED";
  const actualEvidenceWorkflowAvailable = davinciRouteStatus !== "DAVINCI_TRANSLATION_NOT_IMPLEMENTED";
  const liveImplementationAvailable =
    davinciRouteStatus === "DAVINCI_IMPLEMENTATION_AVAILABLE" ||
    davinciRouteStatus === "DAVINCI_ACTUAL_VERIFIED";
  const actualVerified = davinciRouteStatus === "DAVINCI_ACTUAL_VERIFIED";

  return {
    patternId,
    canonicalMode,
    palmierCapability: "PALMIER_TIMING_ONLY",
    davinciRouteStatus,
    davinciImplementationId,
    translationTarget: "TEXT_PLUS_FUSION",
    translatorSpecAvailable,
    actualEvidenceWorkflowAvailable,
    liveImplementationAvailable,
    actualVerified,
    rule,
  };
};

/**
 * Motion Zukan Typography 9候補 → production pipeline の正本。
 * Remotion Element候補、translator spec、Actual workflow、live implementation、Actual verification
 * を別状態として扱い、前段の成功を後段の成功へ読み替えない。
 */
export const typographyProductionRoutes: TypographyProductionRouteDefinition[] = [
  route(
    "type-mask-reveal",
    "mask",
    "DAVINCI_IMPLEMENTATION_AVAILABLE",
    "impl-type-mask-reveal-davinci-text-plus",
    "既存Text+実装とvalue bridgeを再利用できる。live implementationはあるが、実Resolve applied-value/readback evidenceが埋まるまではActual verified / production-ready扱いしない。",
  ),
  route(
    "type-char-stagger",
    "stagger",
    "DAVINCI_ACTUAL_CANDIDATE",
    "impl-type-char-stagger-davinci-text-plus-follower",
    "canonical stagger→Text+ Follower translatorとActual evidence workflowは実装済み。live Resolve binding/readback/render parityが未検証なのでimplementation availableへはまだ昇格しない。",
  ),
  route(
    "type-type-on-rhythm",
    "word-stagger",
    "DAVINCI_ACTUAL_CANDIDATE",
    "impl-type-type-on-rhythm-davinci-text-plus-follower-words",
    "canonical word-stagger→Text+ Follower WORDS translatorとActual evidence workflowは実装済み。FOLLOWER_UNIT=WORDSを含むlive binding/readback/render parityが未検証なのでimplementation availableへはまだ昇格しない。",
  ),
  route(
    "type-word-punch",
    "punch",
    "DAVINCI_ACTUAL_CANDIDATE",
    "impl-type-word-punch-davinci-text-plus-transform",
    "canonical punch→Text+ + whole-title Transform translatorとbounded Actual evidence workflowは実装済み。live Transform input binding/readback/render parityが未検証なのでimplementation availableへはまだ昇格しない。",
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
    translatorSpecAvailable: boolean;
    actualEvidenceWorkflowAvailable: boolean;
    liveImplementationAvailable: boolean;
    actualVerified: boolean;
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
  const davinciVisualReady = definition.liveImplementationAvailable;
  const blockers: string[] = [];

  if (!remotionStudioReady) blockers.push("REMOTION_STUDIO_ACTUAL_NOT_VERIFIED");
  if (!definition.translatorSpecAvailable) {
    blockers.push("DAVINCI_TRANSLATION_NOT_IMPLEMENTED");
  } else if (!definition.liveImplementationAvailable) {
    blockers.push("DAVINCI_ACTUAL_CANDIDATE_NOT_LIVE_IMPLEMENTATION");
  }
  if (!definition.actualVerified) blockers.push("DAVINCI_ACTUAL_APPLIED_EVIDENCE_NOT_RUN");

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
      translatorSpecAvailable: definition.translatorSpecAvailable,
      actualEvidenceWorkflowAvailable: definition.actualEvidenceWorkflowAvailable,
      liveImplementationAvailable: definition.liveImplementationAvailable,
      actualVerified: definition.actualVerified,
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
