import {buildWeddingMovieProductionCriticalPath} from "./weddingMovieProductionCriticalPath";
import type {
  WeddingDavinciGuiActualStartGateAudit,
  WeddingMovieId,
} from "./weddingDavinciGuiActualStartGateAudit";

export const WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_RUNTIME_SNAPSHOT_SCHEMA =
  "wedding-movie-production-critical-path-runtime-snapshot/v1" as const;

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

export function buildWeddingMovieProductionCriticalPathRuntimeSnapshot(
  audits: WeddingDavinciGuiActualStartGateRuntimeAuditMap,
) {
  return {
    schemaVersion: WEDDING_MOVIE_PRODUCTION_CRITICAL_PATH_RUNTIME_SNAPSHOT_SCHEMA,
    authority: "DASHBOARD_RUNTIME_CRITICAL_PATH_WITH_LIVE_DAVINCI_START_GATE_AUDIT" as const,
    stableCriticalPath: buildWeddingMovieProductionCriticalPath(),
    liveDavinciStartGate: {
      opening: startGateRuntimeSnapshot(audits.opening),
      profile: startGateRuntimeSnapshot(audits.profile),
    },
    evidenceBoundary: {
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT" as const,
      remotionStudioGuiActual: "NOT_PROMOTED_BY_RUNTIME_SNAPSHOT" as const,
      productionReady: false as const,
      note: "Runtime Start Gate visibility, GUI_ACTUAL_ALLOWED state, commands, hashes, and export do not prove that a human executed or passed Mac/Studio GUI Actual.",
    },
    guardrails: [
      "RUNTIME_SNAPSHOT_EXPORTED != MAC_DAVINCI_GUI_ACTUAL_EXECUTED",
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
