import {buildWeddingDavinciOperatorPacket} from "./weddingDavinciFinalDeliveryPreflight";
import {weddingProjectRemotionIdentityPreflight} from "./weddingProjectRemotionIdentityPreflight.generated";
import {weddingProjectRemotionStageStatus} from "../generated/weddingProjectRemotionStageStatus";

export const WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_DASHBOARD_SCHEMA = "wedding-davinci-actual-session-plan-dashboard/v2" as const;

type MovieId = "opening" | "profile";
type ProjectRemotionIdentityPreflight = {
  state: "CURRENT" | "NOT_APPLICABLE" | "INVALID";
  current: boolean;
  applicable: boolean;
  command: string;
  resolveSidecarSha256: string | null;
  receiptSha256: string | null;
  sourceBatchSha256: string | null;
  error: string | null;
};

type PalmierTimelinePreflight = {
  state: "CURRENT" | "NOT_APPLICABLE" | "INVALID";
  current: boolean;
  applicable: boolean;
  command: string;
  receiptSha256: string | null;
  assemblyPlanSha256: string | null;
  palmierFcpxmlSha256: string | null;
  error: string | null;
};

const manualChecklist = [
  "Source render readback SHA が recovery-bound expected SHA と一致することを確認",
  "Project Motion / Project Remotion identityのtransported SHA authorityを確認",
  "Palmier timeline receipt / Assembly Plan SHA / real FCPXML SHA がtransported preflightと一致することを確認",
  "DaVinci Resolve version / project / timeline / insertion / duration / FPS を記録",
  "color / audio / title-safe・framing / playback 1x / playback 0.5x をMac GUIで実確認",
  "DaVinci export の path / SHA / duration / dimensions / FPS / audio presence / watched-with-sound を記録",
  "全GUI Actual verdictがPASSで reviewer / reviewedAt を記録した後だけ review.overall=PASS にする",
] as const;

const buildPalmierTimelinePreflight = (
  movieId: MovieId,
  projectRemotionApplicable: boolean,
): PalmierTimelinePreflight => {
  const timeline = weddingProjectRemotionStageStatus[movieId].palmierTimelineExport;
  const applicable = projectRemotionApplicable || timeline.state !== "MISSING";
  const command = `node --no-warnings scripts/check-wedding-palmier-typography-timeline-export-receipt.mts --movie=${movieId} --strict`;
  if (!applicable) {
    return {
      state: "NOT_APPLICABLE",
      current: false,
      applicable: false,
      command,
      receiptSha256: null,
      assemblyPlanSha256: null,
      palmierFcpxmlSha256: null,
      error: null,
    };
  }
  if (timeline.state === "CURRENT") {
    return {
      state: "CURRENT",
      current: true,
      applicable: true,
      command,
      receiptSha256: timeline.receiptSha256,
      assemblyPlanSha256: timeline.source.assemblyPlanSha256,
      palmierFcpxmlSha256: timeline.source.palmierFcpxmlSha256,
      error: null,
    };
  }
  return {
    state: "INVALID",
    current: false,
    applicable: true,
    command,
    receiptSha256: null,
    assemblyPlanSha256: null,
    palmierFcpxmlSha256: null,
    error: timeline.detail ?? `PALMIER_TIMELINE_${timeline.state}`,
  };
};

const buildActions = (
  movieId: MovieId,
  projectMotionCommand: string,
  projectRemotionIdentityCommand: string,
  palmierTimelineCommand: string,
) => {
  const prefix = movieId === "opening" ? "opening" : "profile";
  return [
    {order: 1, kind: "SAFE_PREP" as const, label: "Recovery sidecarをCURRENT化", command: `cd motion-studio && node --no-warnings scripts/export-wedding-davinci-production-recovery.mts --movie=${movieId}`, humanOnly: false},
    {order: 2, kind: "PROJECT_MOTION_PREFLIGHT" as const, label: "Project Motion provenanceを再検証", command: `cd motion-studio && ${projectMotionCommand}`, humanOnly: false, note: "CURRENT / NOT_APPLICABLE / INVALID のlive判定をMac Actual開始前に再確認する。browser表示だけでCURRENTとは扱わない。"},
    {order: 3, kind: "PROJECT_REMOTION_IDENTITY_PREFLIGHT" as const, label: "Project Remotion identityを再検証", command: `cd motion-studio && ${projectRemotionIdentityCommand}`, humanOnly: false, note: "Project Typography batch / identity receipt / Resolve sidecar / recovery chainをMac Actual開始前に再検証する。generated snapshot表示だけでCURRENTとは扱わない。"},
    {order: 4, kind: "PALMIER_TIMELINE_PREFLIGHT" as const, label: "Palmier timeline / real FCPXMLを再検証", command: `cd motion-studio && ${palmierTimelineCommand}`, humanOnly: false, note: "Project Remotion typography使用時はreceipt / Assembly Plan / real FCPXML SHAがCURRENTであることをActual evidence init前に確認する。CURRENT表示はPalmier GUI Actual証明ではない。"},
    {order: 5, kind: "EVIDENCE_INIT" as const, label: "Actual evidence templateを初期化", command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --init`, humanOnly: false, note: "作成時点では全GUI verdictがNOT_RUN。template作成はActual実行ではない。"},
    {order: 6, kind: "MAC_GUI_ACTUAL" as const, label: "MacのDaVinci ResolveでActual確認", command: null, humanOnly: true, checklist: manualChecklist},
    {order: 7, kind: "STRICT_VERIFY" as const, label: "Current Actual evidenceをstrict検証", command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --strict`, humanOnly: false},
    {order: 8, kind: "HUMAN_FINAL_APPROVAL" as const, label: "Human final approvalを別証拠として開始", command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-final-delivery-approval.mts --init`, humanOnly: true, note: "Actual strict PASS後にのみ開始。init自体はapproval PASSではない。"},
  ] as const;
};

export function buildWeddingDavinciActualSessionPlan() {
  const packet = buildWeddingDavinciOperatorPacket();
  const buildProject = (movieId: MovieId) => {
    const project = packet.projects[movieId];
    const projectMotionPreflight = packet.projectMotionPreflight[movieId];
    const projectRemotionIdentityPreflight: ProjectRemotionIdentityPreflight = weddingProjectRemotionIdentityPreflight[movieId];
    const palmierTimelinePreflight = buildPalmierTimelinePreflight(movieId, projectRemotionIdentityPreflight.applicable);
    const nextStage = project.nextGate?.stage ?? "PRODUCTION_READY";
    const actualRecorded = Boolean(project.actualEvidenceSha256);
    const finalApproved = Boolean(project.finalApprovalSha256);
    const sessionState = projectMotionPreflight.state === "INVALID"
      ? "BLOCKED_PROJECT_MOTION_PREFLIGHT"
      : projectRemotionIdentityPreflight.state === "INVALID"
        ? "BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT"
        : palmierTimelinePreflight.state === "INVALID"
          ? "BLOCKED_PALMIER_TIMELINE_PREFLIGHT"
          : finalApproved
            ? "FINAL_APPROVAL_RECORDED"
            : actualRecorded
              ? "ACTUAL_EVIDENCE_RECORDED"
              : project.recoverySha256
                ? "READY_FOR_ACTUAL_WHEN_UPSTREAM_CURRENT"
                : "BLOCKED_UPSTREAM";

    return {
      movieId,
      sessionState,
      readinessState: project.state,
      currentNextGate: nextStage,
      projectMotionPreflight: {
        state: projectMotionPreflight.state,
        applicable: projectMotionPreflight.applicable,
        current: projectMotionPreflight.current,
        command: projectMotionPreflight.command,
        error: projectMotionPreflight.error ?? null,
      },
      projectRemotionIdentityPreflight: {
        state: projectRemotionIdentityPreflight.state,
        applicable: projectRemotionIdentityPreflight.applicable,
        current: projectRemotionIdentityPreflight.current,
        command: projectRemotionIdentityPreflight.command,
        resolveSidecarSha256: projectRemotionIdentityPreflight.resolveSidecarSha256,
        receiptSha256: projectRemotionIdentityPreflight.receiptSha256,
        sourceBatchSha256: projectRemotionIdentityPreflight.sourceBatchSha256,
        error: projectRemotionIdentityPreflight.error ?? null,
      },
      palmierTimelinePreflight,
      recoverySha256: project.recoverySha256,
      actualEvidenceSha256: project.actualEvidenceSha256,
      finalApprovalSha256: project.finalApprovalSha256,
      orderedActions: buildActions(movieId, projectMotionPreflight.command, projectRemotionIdentityPreflight.command, palmierTimelinePreflight.command),
    } as const;
  };

  return {
    schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_DASHBOARD_SCHEMA,
    authority: "MOTION_ZUKAN_DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN" as const,
    projectRemotionIdentitySnapshot: {schemaVersion: weddingProjectRemotionIdentityPreflight.schemaVersion, authority: weddingProjectRemotionIdentityPreflight.authority},
    palmierTimelineSnapshot: {schemaVersion: weddingProjectRemotionStageStatus.schemaVersion, authority: weddingProjectRemotionStageStatus.authority},
    evidenceBoundary: {
      palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD" as const,
      macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD" as const,
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD" as const,
      humanFinalApproval: "NOT_PROMOTED_BY_DASHBOARD" as const,
      productionReady: false as const,
    },
    sessionOrder: ["opening", "profile"] as const,
    projects: {opening: buildProject("opening"), profile: buildProject("profile")},
    weddingFinalization: [
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write",
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current",
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-final-delivery-preflight.mts --strict",
    ],
    guardrails: [
      "DASHBOARD_PLAN_EXISTS != GUI_ACTUAL_EXECUTED",
      "PROJECT_MOTION_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN",
      "PROJECT_MOTION_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
      "PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS",
      "PROJECT_REMOTION_IDENTITY_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN",
      "PROJECT_REMOTION_IDENTITY_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
      "PROJECT_REMOTION_IDENTITY_CURRENT != GUI_ACTUAL_PASS",
      "PALMIER_TIMELINE_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN",
      "PALMIER_TIMELINE_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
      "PALMIER_TIMELINE_CURRENT != PALMIER_GUI_ACTUAL_PROVEN",
      "PALMIER_TIMELINE_CURRENT != GUI_ACTUAL_PASS",
      "EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
      "FINAL_HUMAN_APPROVAL_REQUIRES_STRICT_CURRENT_ACTUAL_EVIDENCE",
    ],
  } as const;
}

export function buildWeddingDavinciActualSessionPlanJson() {
  return JSON.stringify(buildWeddingDavinciActualSessionPlan(), null, 2);
}
