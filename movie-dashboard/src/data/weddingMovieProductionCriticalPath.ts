import {openingProductionStatus} from "./openingProductionStatus.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";

export const WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_SCHEMA = "wedding-movie-production-critical-path-dashboard/v1" as const;

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
      {label: "Profile素材設計を開く", route: "/movie-coach/profile", purpose: "Profile V1の5章・17素材roleと不足素材を確認する"},
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
          recovery: [...current.recovery],
          actionTargets: actionTargetsFor(projectId, current.name),
        }
      : null,
    downstreamBlockedStages: currentIndex >= 0
      ? ordered.slice(currentIndex + 1).map((stage) => ({name: stage.name, state: stage.state, detail: stage.detail}))
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
    authority: "DERIVED_FROM_MOTION_STUDIO_PRODUCTION_STATUS" as const,
    productionReady: opening.productionReady && profile.productionReady,
    projects: {opening, profile},
    guardrails: [
      "CRITICAL_PATH_VISIBLE != PRODUCTION_APPROVED",
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
