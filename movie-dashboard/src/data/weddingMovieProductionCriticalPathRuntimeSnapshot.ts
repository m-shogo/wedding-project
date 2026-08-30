import {weddingProjectRemotionStageStatus} from "../generated/weddingProjectRemotionStageStatus";
import {buildWeddingMovieProductionCriticalPath} from "./weddingMovieProductionCriticalPath";
import type {
  WeddingDavinciGuiActualStartGateAudit,
  WeddingMovieId,
} from "./weddingDavinciGuiActualStartGateAudit";

export const WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_RUNTIME_SNAPSHOT_SCHEMA =
  "wedding-movie-production-critical-path-runtime-snapshot/v3" as const;

export type WeddingDavinciGuiActualStartGateRuntimeAuditMap = Record<
  WeddingMovieId,
  WeddingDavinciGuiActualStartGateAudit
>;

function projectMotionRuntimeSnapshot(audit: WeddingDavinciGuiActualStartGateAudit) {
  return {
    state: audit.project.projectMotionPreflight.state,
    applicable: audit.project.projectMotionPreflight.applicable,
    current: audit.project.projectMotionPreflight.current,
    command: audit.project.projectMotionPreflight.command,
    error: audit.project.projectMotionPreflight.error,
    liveMatch: audit.liveProjectMotionMatch,
  };
}

function startGateRuntimeSnapshot(audit: WeddingDavinciGuiActualStartGateAudit) {
  return {
    state: audit.state,
    guiActualStartAllowed: audit.guiActualStartAllowed,
    canonicalGateLoaded: audit.canonicalGateLoaded,
    canonicalArtifactPath: audit.canonicalArtifactPath,
    inspectCommand: audit.inspectCommand,
    strictGuiStartCommand: audit.strictGuiStartCommand,
    transport: {
      state: audit.transport.state,
      current: audit.transport.current,
      mismatches: [...audit.transport.mismatches],
      transportedIdentitySha256: audit.transport.transportedIdentitySha256,
      liveIdentitySha256: audit.transport.liveIdentitySha256,
    },
    projectMotion: projectMotionRuntimeSnapshot(audit),
    nextAction: {...audit.nextAction},
    mismatches: [...audit.mismatches],
    evidenceBoundary: {...audit.evidenceBoundary},
  };
}

function projectRemotionCanonicalStageSnapshot(movieId: WeddingMovieId) {
  const status = weddingProjectRemotionStageStatus[movieId];
  return {
    state: status.state,
    blocker: status.blocker,
    detail: status.detail,
    stageVerification: status.checks.stageVerification,
    handoffVerification: status.checks.handoffVerification,
    canonicalArtifacts: {...status.canonicalArtifacts},
    palmierTimelineExport: {
      state: status.palmierTimelineExport.state,
      detail: status.palmierTimelineExport.detail,
      receiptPath: status.palmierTimelineExport.receiptPath,
      source: {...status.palmierTimelineExport.source},
      nextAction: {...status.palmierTimelineExport.next},
    },
    nextAction: {...status.next},
  };
}

export function buildWeddingMovieProductionCriticalPathRuntimeSnapshot(
  audits: WeddingDavinciGuiActualStartGateRuntimeAuditMap,
) {
  return {
    schemaVersion: WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_RUNTIME_SNAPSHOT_SCHEMA,
    authority: "DASHBOARD_RUNTIME_CRITICAL_PATH_WITH_CANONICAL_REMOTION_STAGE_PALMIER_TIMELINE_AND_LIVE_DAVINCI_START_GATE_AUDIT" as const,
    stableCriticalPath: buildWeddingMovieProductionCriticalPath(),
    canonicalProjectRemotionStage: {
      authority: weddingProjectRemotionStageStatus.authority,
      opening: projectRemotionCanonicalStageSnapshot("opening"),
      profile: projectRemotionCanonicalStageSnapshot("profile"),
    },
    liveDavinciStartGate: {
      opening: startGateRuntimeSnapshot(audits.opening),
      profile: startGateRuntimeSnapshot(audits.profile),
    },
    evidenceBoundary: {
      palmierGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT" as const,
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT" as const,
      remotionStudioGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT" as const,
      productionReady: false as const,
      note: "Canonical Remotion stage status, Palmier FCPXML receipt currentness, Runtime Start Gate visibility, GUI_ACTUAL_ALLOWED state, commands, hashes, and export do not prove that a human executed or passed Palmier/Mac/Studio GUI Actual.",
    },
    guardrails: [
      "RUNTIME_SNAPSHOT_EXPORTED != PALMIER_GUI_ACTUAL_EXECUTED",
      "RUNTIME_SNAPSHOT_EXPORTED != MAC_DAVINCI_GUI_ACTUAL_EXECUTED",
      "PALMIER_TIMELINE_RECEIPT_CURRENT != PALMIER_GUI_ACTUAL_EXECUTED",
      "PALMIER_TIMELINE_RECEIPT_CURRENT != MAC_DAVINCI_GUI_ACTUAL_EXECUTED",
      "REMOTION_STAGE_HANDOFF_CURRENT != REMOTION_STUDIO_GUI_ACTUAL_EXECUTED",
      "REMOTION_STAGE_HANDOFF_CURRENT != MAC_DAVINCI_GUI_ACTUAL_EXECUTED",
      "GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED",
      "START_GATE_ARTIFACT_LOADED != GUI_ACTUAL_EXECUTED",
      "PROJECT_MOTION_LIVE_MATCH != HUMAN_GUI_REVIEW_PASSED",
      "STRICT_COMMAND_EXPORTED != STRICT_COMMAND_EXECUTED",
      "RUNTIME_SNAPSHOT_PRODUCTION_READY_ALWAYS_FALSE",
    ],
  };
}

export function buildWeddingMovieProductionCriticalPathRuntimeSnapshotJson(
  audits: WeddingDavinciGuiActualStartGateRuntimeAuditMap,
) {
  return JSON.stringify(buildWeddingMovieProductionCriticalPathRuntimeSnapshot(audits), null, 2);
}
