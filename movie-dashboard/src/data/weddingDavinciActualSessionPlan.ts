import {buildWeddingDavinciOperatorPacket} from "./weddingDavinciFinalDeliveryPreflight";

export const WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_DASHBOARD_SCHEMA = "wedding-davinci-actual-session-plan-dashboard/v1" as const;

type MovieId = "opening" | "profile";

const manualChecklist = [
  "Source render readback SHA が recovery-bound expected SHA と一致することを確認",
  "DaVinci Resolve version / project / timeline / insertion / duration / FPS を記録",
  "color / audio / title-safe・framing / playback 1x / playback 0.5x をMac GUIで実確認",
  "DaVinci export の path / SHA / duration / dimensions / FPS / audio presence / watched-with-sound を記録",
  "全GUI Actual verdictがPASSで reviewer / reviewedAt を記録した後だけ review.overall=PASS にする",
] as const;

const buildActions = (movieId: MovieId) => {
  const prefix = movieId === "opening" ? "opening" : "profile";
  return [
    {
      order: 1,
      kind: "SAFE_PREP" as const,
      label: "Recovery sidecarをCURRENT化",
      command: `cd motion-studio && node --no-warnings scripts/export-wedding-davinci-production-recovery.mts --movie=${movieId}`,
      humanOnly: false,
    },
    {
      order: 2,
      kind: "EVIDENCE_INIT" as const,
      label: "Actual evidence templateを初期化",
      command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --init`,
      humanOnly: false,
      note: "作成時点では全GUI verdictがNOT_RUN。template作成はActual実行ではない。",
    },
    {
      order: 3,
      kind: "MAC_GUI_ACTUAL" as const,
      label: "MacのDaVinci ResolveでActual確認",
      command: null,
      humanOnly: true,
      checklist: manualChecklist,
    },
    {
      order: 4,
      kind: "STRICT_VERIFY" as const,
      label: "Current Actual evidenceをstrict検証",
      command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-davinci-finishing-evidence.mts --strict`,
      humanOnly: false,
    },
    {
      order: 5,
      kind: "HUMAN_FINAL_APPROVAL" as const,
      label: "Human final approvalを別証拠として開始",
      command: `cd motion-studio && node --no-warnings scripts/${prefix}-v1-final-delivery-approval.mts --init`,
      humanOnly: true,
      note: "Actual strict PASS後にのみ開始。init自体はapproval PASSではない。",
    },
  ] as const;
};

export function buildWeddingDavinciActualSessionPlan() {
  const packet = buildWeddingDavinciOperatorPacket();
  const buildProject = (movieId: MovieId) => {
    const project = packet.projects[movieId];
    const nextStage = project.nextGate?.stage ?? "PRODUCTION_READY";
    const actualRecorded = Boolean(project.actualEvidenceSha256);
    const finalApproved = Boolean(project.finalApprovalSha256);
    const sessionState = finalApproved
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
      recoverySha256: project.recoverySha256,
      actualEvidenceSha256: project.actualEvidenceSha256,
      finalApprovalSha256: project.finalApprovalSha256,
      orderedActions: buildActions(movieId),
    } as const;
  };

  return {
    schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_DASHBOARD_SCHEMA,
    authority: "MOTION_ZUKAN_DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN" as const,
    evidenceBoundary: {
      macRemotionStudioGuiActual: "NOT_PROMOTED_BY_DASHBOARD" as const,
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD" as const,
      humanFinalApproval: "NOT_PROMOTED_BY_DASHBOARD" as const,
      productionReady: false as const,
    },
    sessionOrder: ["opening", "profile"] as const,
    projects: {
      opening: buildProject("opening"),
      profile: buildProject("profile"),
    },
    weddingFinalization: [
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness.mts --write",
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-delivery-readiness-snapshot.mts --strict-current",
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-final-delivery-preflight.mts --strict",
    ],
    guardrails: [
      "DASHBOARD_PLAN_EXISTS != GUI_ACTUAL_EXECUTED",
      "EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
      "FINAL_HUMAN_APPROVAL_REQUIRES_STRICT_CURRENT_ACTUAL_EVIDENCE",
    ],
  } as const;
}

export function buildWeddingDavinciActualSessionPlanJson() {
  return JSON.stringify(buildWeddingDavinciActualSessionPlan(), null, 2);
}
