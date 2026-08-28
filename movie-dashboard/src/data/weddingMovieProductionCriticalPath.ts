import {movieProductionStageBlockerCodes} from "./movieProductionStageBlockerCodes.generated";
import {openingProductionGate} from "./openingProductionGate.generated";
import {openingProductionStatus} from "./openingProductionStatus.generated";
import {profileProductionGate} from "./profileProductionGate.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";

export const WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_SCHEMA = "wedding-movie-production-critical-path-dashboard/v2" as const;

type StageSnapshot = {
  state: string;
  detail: string;
  path?: string;
  recovery: readonly string[];
};

type ActionTarget = {
  label: string;
  route: string;
  purpose: string;
};

type InputLane = {
  id: string;
  label: string;
  state: "READY" | "BLOCKED";
  detail: string;
  intakePath?: string;
  receiptCurrent?: boolean;
  blockerCodes?: readonly string[];
};

type BlockerProvenance = "RAW_STAGE_STATUS" | "INPUT_GATE" | "SOURCE_REVALIDATION" | "NORMALIZED_STAGE_STATE" | "NONE";

const openingOrder = ["media", "previewRender", "previewSourceBinding", "previewReview", "finalRender", "finalRenderReview", "productionBundle", "davinciFinishing", "finalDeliveryApproval"] as const;
const profileOrder = ["assembly", "finalRender", "finalRenderReview", "productionBundle", "davinciFinishing", "finalDeliveryApproval"] as const;

function actionTargetsFor(projectId: "opening" | "profile", stageName: string): ActionTarget[] {
  if (projectId === "opening" && stageName === "media") {
    return [
      {label: "写真11枚を選ぶ", route: "/opening-photo-intake", purpose: "Opening V1 canonical photo slotsを埋める"},
      {label: "BGM Gateを進める", route: "/opening-bgm-intake", purpose: "上映条件を確認したBGM実ファイルを接続する"},
    ];
  }
  if (projectId === "profile" && stageName === "assembly") {
    return [
      {label: "Profile 17素材を確認", route: "/profile-media-intake", purpose: "Profile V1の5章・17素材のcanonical intake状態を確認する"},
      {label: "Profile BGM Gateを進める", route: "/profile-bgm-intake", purpose: "BGM実ファイル・intake receipt・上映権利確認をcurrent SHAへ固定する"},
      {label: "Profile Plannerを開く", route: "/profile-planner", purpose: "実写真・動画を章構成へ割り当てる"},
    ];
  }
  if (stageName === "previewReview" || stageName === "finalRenderReview") {
    return [
      {label: "比較・Human QAを開く", route: "/movie-coach/compare", purpose: "current renderを人間が比較・確認する"},
    ];
  }
  if (stageName === "productionBundle") {
    return [
      {label: "Palmier Handoffを開く", route: "/palmier-handoff", purpose: "current production bundleとtimeline handoffを確認する"},
    ];
  }
  if (stageName === "davinciFinishing") {
    return [
      {label: "DaVinci/Fusion導線を開く", route: "/movie-coach/fusion", purpose: "Mac Actual前のnative handoffとverification routeを確認する"},
    ];
  }
  return [];
}

function inputLanesFor(projectId: "opening" | "profile", stageName: string): InputLane[] {
  if (projectId === "opening" && stageName === "media") {
    const openingBgmStatus = String(openingProductionGate.bgm.status);
    return [
      {
        id: "photos",
        label: "写真11枠",
        state: openingProductionGate.photos.ready ? "READY" : "BLOCKED",
        detail: `${openingProductionGate.resolvedPhotoCount}/${openingProductionGate.expectedPhotoCount} files / receipt=${openingProductionGate.photos.intakeReceiptCurrent ? "CURRENT" : "MISSING_OR_STALE"}`,
        intakePath: openingProductionGate.photos.intakeReceiptPath,
        receiptCurrent: openingProductionGate.photos.intakeReceiptCurrent,
        blockerCodes: [...openingProductionGate.photos.intakeReceiptBlockerCodes],
      },
      {
        id: "bgm",
        label: "Opening BGM",
        state: openingProductionGate.bgm.ready ? "READY" : "BLOCKED",
        detail: `file=${openingProductionGate.bgm.fileExists ? "FOUND" : "MISSING"} / status=${openingBgmStatus} / receipt=${openingProductionGate.bgm.intakeReceiptCurrent ? "CURRENT" : "MISSING_OR_STALE"}`,
        intakePath: openingProductionGate.bgm.intakeReceiptPath,
        receiptCurrent: openingProductionGate.bgm.intakeReceiptCurrent,
        blockerCodes: [
          ...openingProductionGate.bgm.intakeReceiptBlockerCodes,
          ...(openingProductionGate.bgm.fileExists ? [] : ["OPENING_BGM_FILE_MISSING"]),
          ...(openingProductionGate.bgm.ready ? [] : [`OPENING_BGM_STATUS_${openingBgmStatus}`]),
        ],
      },
    ];
  }
  if (projectId === "profile" && stageName === "assembly") {
    const profileBgmRightsState = String(profileProductionGate.bgm.rightsState);
    return [
      {
        id: "media",
        label: "Profile 17素材",
        state: profileProductionGate.media.ready ? "READY" : "BLOCKED",
        detail: `${profileProductionGate.resolvedMediaCount}/${profileProductionGate.expectedMediaCount} media / receipt=${profileProductionGate.media.intakeReceiptCurrent ? "CURRENT" : "MISSING_OR_STALE"}`,
        intakePath: profileProductionGate.media.intakeReceiptPath,
        receiptCurrent: profileProductionGate.media.intakeReceiptCurrent,
        blockerCodes: [...profileProductionGate.media.intakeReceiptBlockerCodes],
      },
      {
        id: "bgm",
        label: "Profile BGM",
        state: profileProductionGate.bgm.ready ? "READY" : "BLOCKED",
        detail: `file=${profileProductionGate.bgm.fileExists ? "FOUND" : "MISSING"} / receipt=${profileProductionGate.bgm.intakeReceiptCurrent ? "CURRENT" : "MISSING_OR_STALE"} / rights=${profileBgmRightsState}`,
        intakePath: profileProductionGate.bgm.intakeReceiptPath,
        receiptCurrent: profileProductionGate.bgm.intakeReceiptCurrent,
        blockerCodes: [
          ...profileProductionGate.bgm.intakeReceiptBlockerCodes,
          ...(profileProductionGate.bgm.fileExists ? [] : ["PROFILE_BGM_FILE_MISSING"]),
          ...(profileBgmRightsState === "CLEARED" ? [] : [`PROFILE_BGM_RIGHTS_${profileBgmRightsState}`]),
        ],
      },
    ];
  }
  return [];
}

function rawStageBlockerCodesFor(projectId: "opening" | "profile", stageName: string): string[] {
  const stages = movieProductionStageBlockerCodes.projects[projectId].stages as unknown as Record<string, readonly string[]>;
  return [...(stages[stageName] ?? [])];
}

function stageBlockerInfoFor(projectId: "opening" | "profile", stageName: string, inputLanes: readonly InputLane[]): {codes: string[]; provenance: BlockerProvenance} {
  const rawStageCodes = rawStageBlockerCodesFor(projectId, stageName);
  if (rawStageCodes.length > 0) return {codes: rawStageCodes, provenance: "RAW_STAGE_STATUS"};

  const laneCodes = inputLanes.flatMap((lane) => lane.blockerCodes ?? []);
  if (laneCodes.length > 0) return {codes: [...new Set(laneCodes)], provenance: "INPUT_GATE"};

  if (projectId === "opening") {
    if (stageName === "previewSourceBinding" || stageName === "previewReview") {
      const codes = [...openingProductionStatus.sourceRevalidation.realMediaPreview.blockers];
      if (codes.length > 0) return {codes, provenance: "SOURCE_REVALIDATION"};
    }
    if (stageName === "finalRenderReview") {
      const codes = [...openingProductionStatus.sourceRevalidation.finalRender.blockers];
      if (codes.length > 0) return {codes, provenance: "SOURCE_REVALIDATION"};
    }
  }

  if (projectId === "profile") {
    if (stageName === "finalRenderReview") {
      const codes = [...profileProductionStatus.sourceRevalidation.finalRender.blockers];
      if (codes.length > 0) return {codes, provenance: "SOURCE_REVALIDATION"};
    }
    if (stageName === "assembly") {
      const codes = [...profileProductionStatus.sourceRevalidation.realMediaPreview.blockers];
      if (codes.length > 0) return {codes, provenance: "SOURCE_REVALIDATION"};
    }
  }

  return {codes: [], provenance: "NONE"};
}

function normalizedStageBlockerCodes(stageName: string, stage: StageSnapshot, rawCodes: readonly string[], upstreamStageName?: string) {
  if (rawCodes.length > 0) return [...new Set(rawCodes)];
  if (stage.state === "PASS") return [];
  if (stage.state === "MISSING") return [`ARTIFACT_MISSING:${stageName}`];
  if (stage.state === "STALE") return [`ARTIFACT_STALE:${stageName}`];
  if (stage.state === "BLOCKED") return [`STAGE_BLOCKED:${stageName}`];
  if (stage.state === "NOT_RUN" && upstreamStageName) return [`UPSTREAM_BLOCKED:${upstreamStageName}`];
  return [`STAGE_${stage.state}:${stageName}`];
}

function blockerProvenanceFor(stage: StageSnapshot, info: {codes: readonly string[]; provenance: BlockerProvenance}): BlockerProvenance {
  if (info.codes.length > 0) return info.provenance;
  return stage.state === "PASS" ? "NONE" : "NORMALIZED_STAGE_STATE";
}

function summarizeProject(
  projectId: "opening" | "profile",
  overallState: string,
  readiness: {productionReady: boolean},
  stages: Record<string, StageSnapshot>,
  order: readonly string[],
  nextActions: readonly string[],
) {
  const ordered = order.map((name) => ({name, ...stages[name]}));
  const currentIndex = ordered.findIndex((stage) => stage.state !== "PASS");
  const current = currentIndex >= 0 ? ordered[currentIndex] : null;
  const inputLanes = current ? inputLanesFor(projectId, current.name) : [];
  const currentBlockerInfo = current ? stageBlockerInfoFor(projectId, current.name, inputLanes) : {codes: [], provenance: "NONE" as const};
  return {
    projectId,
    overallState,
    productionReady: readiness.productionReady,
    currentCriticalStage: current
      ? {
          name: current.name,
          state: current.state,
          detail: current.detail,
          ...(current.path ? {path: current.path} : {}),
          blockerCodes: normalizedStageBlockerCodes(current.name, current, currentBlockerInfo.codes),
          blockerProvenance: blockerProvenanceFor(current, currentBlockerInfo),
          recovery: [...current.recovery],
          actionTargets: actionTargetsFor(projectId, current.name),
          inputLanes,
        }
      : null,
    downstreamBlockedStages: currentIndex >= 0
      ? ordered.slice(currentIndex + 1).map((stage, offset) => {
          const stageInputLanes = inputLanesFor(projectId, stage.name);
          const blockerInfo = stageBlockerInfoFor(projectId, stage.name, stageInputLanes);
          const upstreamStageName = ordered[currentIndex + offset]?.name ?? current?.name;
          return {
            name: stage.name,
            state: stage.state,
            detail: stage.detail,
            ...(stage.path ? {path: stage.path} : {}),
            blockerCodes: normalizedStageBlockerCodes(stage.name, stage, blockerInfo.codes, upstreamStageName),
            blockerProvenance: blockerProvenanceFor(stage, blockerInfo),
            recovery: [...stage.recovery],
            actionTargets: actionTargetsFor(projectId, stage.name),
          };
        })
      : [],
    nextActions: [...nextActions],
  };
}

export function buildWeddingMovieProductionCriticalPath() {
  const opening = summarizeProject(
    "opening",
    openingProductionStatus.overallState,
    openingProductionStatus.readiness,
    openingProductionStatus.stages,
    openingOrder,
    openingProductionStatus.nextActions,
  );
  const profile = summarizeProject(
    "profile",
    profileProductionStatus.overallState,
    profileProductionStatus.readiness,
    profileProductionStatus.stages,
    profileOrder,
    profileProductionStatus.nextActions,
  );

  return {
    schemaVersion: WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_SCHEMA,
    authority: "DERIVED_FROM_MOTION_STUDIO_PRODUCTION_STATUS_AND_INPUT_GATES" as const,
    productionReady: opening.productionReady && profile.productionReady,
    projects: {opening, profile},
    guardrails: [
      "CRITICAL_PATH_VISIBLE != PRODUCTION_APPROVED",
      "BLOCKER_CODE_VISIBLE != BLOCKER_RESOLVED",
      "RAW_STAGE_STATUS_BLOCKER_CODE != RAW_BLOCKER_DETAIL",
      "NORMALIZED_BLOCKER_CODE != RAW_MOTION_STUDIO_EVIDENCE",
      "BLOCKER_PROVENANCE_RAW_STAGE_STATUS != RAW_LOG_OR_ABSOLUTE_PATH",
      "BLOCKER_PROVENANCE_INPUT_GATE != RAW_STAGE_BLOCKERS",
      "BLOCKER_PROVENANCE_SOURCE_REVALIDATION != FULL_STAGE_EVIDENCE",
      "INPUT_LANE_READY != PROJECT_PRODUCTION_READY",
      "RECOVERY_COMMAND_VISIBLE != RECOVERY_EXECUTED",
      "ACTION_TARGET_VISIBLE != ACTION_COMPLETED",
      "DOWNSTREAM_WAITING != DOWNSTREAM_FAILED",
      "CI_STATUS != MAC_DAVINCI_ACTUAL",
    ],
  };
}

export function buildWeddingMovieProductionCriticalPathJson() {
  return JSON.stringify(buildWeddingMovieProductionCriticalPath(), null, 2);
}
