import {buildMaskRevealSceneProductionBundle} from "./maskRevealSceneProductionBundle";
import type {StudioActualState} from "./remotionElementCandidates";
import {
  buildTypographySceneProductionBundle,
  getTypographyProductionRoute,
  type TypographyProductionSelectionV1,
} from "./typographySceneProductionRouting";
import {
  getTypographyDaVinciActualWorkflow,
  type TypographyDaVinciActualWorkflowRecord,
} from "./typographyDaVinciActualWorkflowRegistry";
import type {MaskRevealSceneInstance} from "./visualSceneComposer";

export interface TypographySceneDeliveryPackageV1 {
  schemaVersion: "wedding-movie-typography-scene-delivery/v1";
  authority: "DERIVED_DELIVERY_PACKAGE";
  identity: {
    sceneId: string;
    projectId: "opening" | "profile";
    sourceRevision: string;
    patternId: TypographyProductionSelectionV1["patternId"];
    routeSelectedAt: string;
  };
  canonical: {
    engine: "TypographyRevealEngine";
    mode: string;
    humanMasterPreserved: true;
    humanState: ReturnType<typeof buildMaskRevealSceneProductionBundle>["humanState"];
    rule: string;
  };
  timeline: {
    owner: "Palmier";
    capability: "PALMIER_TIMING_ONLY";
    expectedXmlFileName: string;
    sceneMarkerId: string;
    xmlGeneratedExternally: true;
    instruction: string;
    rule: string;
  };
  davinci: {
    routeStatus: string;
    implementationId: string | null;
    translationTarget: "TEXT_PLUS_FUSION";
    translatorSpecAvailable: boolean;
    actualWorkflow: null | TypographyDaVinciActualWorkflowRecord;
    actualEvidenceState: "NOT_RUN";
    rule: string;
  };
  remotion: {
    payloadSlug: string;
    standaloneRenderCi: boolean;
    studioInstallActual: StudioActualState;
    studioControlReadbackActual: StudioActualState;
    rule: string;
  };
  execution: {
    order: readonly [
      "CONFIRM_CURRENT_SCENE_REVISION",
      "EXPORT_PALMIER_TIMELINE_WITH_MARKER",
      "APPLY_DAVINCI_TRANSLATOR",
      "CAPTURE_MAC_ACTUAL_EVIDENCE",
      "RUN_HUMAN_PROMOTION_REVIEW",
      "EVALUATE_SCENE_BOUND_RELEASE_GATE",
    ];
    currentStopReason: string;
    rule: string;
  };
  release: {
    productionReady: false;
    releaseDecisionEmbedded: false;
    requiredInputs: readonly [
      "CURRENT_SCENE_REVISION",
      "CURRENT_HUMAN_SELECTED_ROUTE",
      "MAC_ACTUAL_EVALUATION",
      "HUMAN_PROMOTION_REVIEW",
      "SCENE_BOUND_RELEASE_GATE",
    ];
    blockers: string[];
    rule: string;
  };
  files: {
    deliverySidecarFileName: string;
    palmierTimelineXmlFileName: string;
    davinciActualArtifactHint: string | null;
    davinciEvidenceCaptureHint: string | null;
  };
  freshness: {
    sceneRevision: string;
    selectionRevision: string;
    fresh: true;
    rule: string;
  };
}

const safeFileToken = (value: string) =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "scene";

function resolveActualWorkflow(patternId: TypographyProductionSelectionV1["patternId"]) {
  if (patternId === "type-mask-reveal") return null;
  return getTypographyDaVinciActualWorkflow(patternId);
}

export function buildTypographySceneDeliveryPackage(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TypographySceneDeliveryPackageV1 {
  const production = buildTypographySceneProductionBundle(scene, selection);
  const base = buildMaskRevealSceneProductionBundle(scene);
  const route = getTypographyProductionRoute(selection.patternId);
  if (!route) throw new Error(`Missing Typography production route: ${selection.patternId}`);
  const actualWorkflow = resolveActualWorkflow(selection.patternId);
  const sceneToken = safeFileToken(scene.sceneId);
  const patternToken = safeFileToken(selection.patternId);

  return {
    schemaVersion: "wedding-movie-typography-scene-delivery/v1",
    authority: "DERIVED_DELIVERY_PACKAGE",
    identity: {
      sceneId: scene.sceneId,
      projectId: scene.projectId,
      sourceRevision: scene.updatedAt,
      patternId: selection.patternId,
      routeSelectedAt: selection.selectedAt,
    },
    canonical: {
      engine: "TypographyRevealEngine",
      mode: production.canonical.mode,
      humanMasterPreserved: true,
      humanState: base.humanState,
      rule: "このpackageはScene/Human MasterとHuman-selected routeから導出する。canonical motion値を別正本として再定義しない。",
    },
    timeline: {
      owner: "Palmier",
      capability: "PALMIER_TIMING_ONLY",
      expectedXmlFileName: production.palmier.timelineXmlFileName,
      sceneMarkerId: production.palmier.markerId,
      xmlGeneratedExternally: true,
      instruction: base.palmier.instruction,
      rule: "placement/trim/markerはPalmier実timelineが担当する。NLE XMLをDashboard側で捏造せず、Palmierからexportする。",
    },
    davinci: {
      routeStatus: route.davinciRouteStatus,
      implementationId: route.davinciImplementationId,
      translationTarget: route.translationTarget,
      translatorSpecAvailable: route.translatorSpecAvailable,
      actualWorkflow: actualWorkflow ? {...actualWorkflow} : null,
      actualEvidenceState: "NOT_RUN",
      rule:
        selection.patternId === "type-mask-reveal"
          ? "Mask Revealは既存DaVinci Text+ implementation/value bridgeを使う。Mac Resolve applied/readback evidenceなしにActual verifiedへ昇格しない。"
          : "registryのtranslator/Actual artifact/evidence captureを使う。workflowファイルの存在をMac GUI Actual成功へ読み替えない。",
    },
    remotion: {
      payloadSlug: production.remotion.payloadSlug,
      standaloneRenderCi: production.remotion.standaloneRenderCi,
      studioInstallActual: production.remotion.studioInstallActual,
      studioControlReadbackActual: production.remotion.studioControlReadbackActual,
      rule: "standalone render CIとRemotion Studio GUI Actualは別証拠。未実行・blockedはcanonical StudioActualStateのまま保持する。",
    },
    execution: {
      order: [
        "CONFIRM_CURRENT_SCENE_REVISION",
        "EXPORT_PALMIER_TIMELINE_WITH_MARKER",
        "APPLY_DAVINCI_TRANSLATOR",
        "CAPTURE_MAC_ACTUAL_EVIDENCE",
        "RUN_HUMAN_PROMOTION_REVIEW",
        "EVALUATE_SCENE_BOUND_RELEASE_GATE",
      ],
      currentStopReason: production.gate.blockers[0] ?? "AWAITING_SCENE_BOUND_RELEASE_GATE",
      rule: "順序を飛ばさない。特にtranslator/CIの存在だけでMac Actual、Human review、Releaseを済ませた扱いにしない。",
    },
    release: {
      productionReady: false,
      releaseDecisionEmbedded: false,
      requiredInputs: [
        "CURRENT_SCENE_REVISION",
        "CURRENT_HUMAN_SELECTED_ROUTE",
        "MAC_ACTUAL_EVALUATION",
        "HUMAN_PROMOTION_REVIEW",
        "SCENE_BOUND_RELEASE_GATE",
      ],
      blockers: [...production.gate.blockers],
      rule: "delivery packageを書き出しただけではRELEASEしない。Production Release Gateはscene revisionとroute selectionへ別途bindingし、古いRELEASEは再利用しない。",
    },
    files: {
      deliverySidecarFileName: `${sceneToken}-${patternToken}-production-package.json`,
      palmierTimelineXmlFileName: base.timeline.projectTimelineXmlFileName,
      davinciActualArtifactHint: actualWorkflow?.actualArtifactFile ?? null,
      davinciEvidenceCaptureHint: actualWorkflow?.evidenceCaptureFile ?? null,
    },
    freshness: {
      sceneRevision: scene.updatedAt,
      selectionRevision: selection.sourceRevision,
      fresh: true,
      rule: "SceneInstance.updatedAtとselection.sourceRevisionが一致した状態でのみ生成する。Scene編集後は人間がrouteを再選択してpackageを再生成する。",
    },
  };
}

export function buildTypographySceneDeliveryPackageJson(
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
) {
  return JSON.stringify(buildTypographySceneDeliveryPackage(scene, selection), null, 2);
}

export function parseAndValidateTypographySceneDeliveryPackage(
  raw: string,
  scene: MaskRevealSceneInstance,
  selection: TypographyProductionSelectionV1,
): TypographySceneDeliveryPackageV1 {
  const parsed = JSON.parse(raw) as Partial<TypographySceneDeliveryPackageV1>;
  if (
    parsed.schemaVersion !== "wedding-movie-typography-scene-delivery/v1" ||
    parsed.authority !== "DERIVED_DELIVERY_PACKAGE"
  ) {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_ENVELOPE_MISMATCH");
  }
  if (parsed.identity?.sceneId !== scene.sceneId || parsed.identity?.projectId !== scene.projectId) {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_SCENE_MISMATCH");
  }
  if (
    parsed.identity?.sourceRevision !== scene.updatedAt ||
    parsed.freshness?.sceneRevision !== scene.updatedAt ||
    parsed.freshness?.selectionRevision !== selection.sourceRevision
  ) {
    throw new Error("STALE_TYPOGRAPHY_SCENE_DELIVERY_PACKAGE");
  }
  if (
    parsed.identity?.patternId !== selection.patternId ||
    parsed.identity?.routeSelectedAt !== selection.selectedAt
  ) {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_ROUTE_MISMATCH");
  }
  if (parsed.timeline?.xmlGeneratedExternally !== true || parsed.timeline?.owner !== "Palmier") {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_TIMELINE_AUTHORITY_MISMATCH");
  }
  if (parsed.davinci?.actualEvidenceState !== "NOT_RUN") {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_ACTUAL_PASS");
  }
  if (
    parsed.release?.productionReady !== false ||
    parsed.release?.releaseDecisionEmbedded !== false
  ) {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_MUST_NOT_EMBED_RELEASE");
  }
  if (parsed.freshness?.fresh !== true) {
    throw new Error("TYPOGRAPHY_SCENE_DELIVERY_FRESHNESS_NOT_CONFIRMED");
  }
  return parsed as TypographySceneDeliveryPackageV1;
}
