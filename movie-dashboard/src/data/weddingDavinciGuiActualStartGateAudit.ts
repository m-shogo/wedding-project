import {buildWeddingDavinciActualSessionPlan} from "./weddingDavinciActualSessionPlan";

export const WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_AUDIT_SCHEMA =
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v5" as const;

export const CANONICAL_WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_SCHEMA =
  "wedding-davinci-gui-actual-start-gate/v1" as const;

export type WeddingMovieId = "opening" | "profile";

export const canonicalWeddingDavinciGuiActualStartGateArtifactPath = (movieId: WeddingMovieId) =>
  `out/handoff/wedding/${movieId}-davinci-gui-actual-start-gate.json`;

export type WeddingDavinciGuiActualStartGateAuditState =
  | "NOT_RUN"
  | "TRANSPORT_NOT_CURRENT"
  | "PROJECT_MOTION_BLOCKED"
  | "PROJECT_REMOTION_IDENTITY_BLOCKED"
  | "PALMIER_TIMELINE_BLOCKED"
  | "UPSTREAM_BLOCKED"
  | "EVIDENCE_INIT_REQUIRED"
  | "GUI_ACTUAL_ALLOWED"
  | "GUI_ACTUAL_COMPLETE"
  | "EVIDENCE_BLOCKED"
  | "STALE"
  | "INVALID";

type ProjectPreflight = {
  state: string | null;
  applicable: boolean;
  current: boolean;
  command: string | null;
  error: string | null;
};

type ProjectRemotionIdentityPreflight = ProjectPreflight & {
  resolveSidecarSha256: string | null;
  receiptSha256: string | null;
  sourceBatchSha256: string | null;
};

type PalmierTransitionProofEdge = {
  order: number | null;
  edgeId: string;
  fromSceneId: string;
  toSceneId: string;
  transition: "HARD_CUT" | "CROSS_DISSOLVE";
  durationFrames: number;
  transitionOccurrenceCountBetweenMarkers: number;
  matchedDurationFrames: number;
  state: "CURRENT";
};

type PalmierTimelinePreflight = ProjectPreflight & {
  receiptSha256: string | null;
  assemblyPlanSha256: string | null;
  palmierFcpxmlSha256: string | null;
  transitionEdgeCount: number | null;
  verifiedTransitionEdgeCount: number | null;
  crossDissolveCount: number | null;
  transitionProofSha256: string | null;
  recoveryTransitionProofSha256: string | null;
  transitionProofCurrent: boolean;
  transitionProof: PalmierTransitionProofEdge[];
};

export type WeddingDavinciGuiActualStartGateAudit = {
  schemaVersion: typeof WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_AUDIT_SCHEMA;
  movieId: WeddingMovieId;
  state: WeddingDavinciGuiActualStartGateAuditState;
  guiActualStartAllowed: boolean;
  canonicalGateLoaded: boolean;
  liveProjectMotionMatch: boolean;
  liveProjectRemotionIdentityMatch: boolean;
  livePalmierTimelineMatch: boolean;
  canonicalArtifactPath: string;
  transport: {
    state: string;
    current: boolean;
    mismatches: string[];
    transportedIdentitySha256: string | null;
    liveIdentitySha256: string | null;
  };
  project: {
    sessionState: string | null;
    projectMotionPreflight: ProjectPreflight;
    projectRemotionIdentityPreflight: ProjectRemotionIdentityPreflight;
    palmierTimelinePreflight: PalmierTimelinePreflight;
    evidenceState: string | null;
    handoffIdentitySha256: string | null;
    actualRecoverySha256: string | null;
    currentNextGate: unknown;
  };
  nextAction: {
    kind: string;
    command: string | null;
    humanOnly: boolean;
    reason: string;
  };
  mismatches: string[];
  inspectCommand: string;
  strictGuiStartCommand: string;
  note: string;
  evidenceBoundary: {
    palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT";
    palmierTransitionAppliedGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT";
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT";
    productionReady: false;
  };
};

const canonicalAuthority = "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE";
const shaPattern = /^[a-f0-9]{64}$/;
const allowedStates = new Set<WeddingDavinciGuiActualStartGateAuditState>([
  "TRANSPORT_NOT_CURRENT",
  "PROJECT_MOTION_BLOCKED",
  "PROJECT_REMOTION_IDENTITY_BLOCKED",
  "PALMIER_TIMELINE_BLOCKED",
  "UPSTREAM_BLOCKED",
  "EVIDENCE_INIT_REQUIRED",
  "GUI_ACTUAL_ALLOWED",
  "GUI_ACTUAL_COMPLETE",
  "EVIDENCE_BLOCKED",
]);

const commandFor = (movieId: WeddingMovieId, strict: boolean) => {
  const artifactPath = canonicalWeddingDavinciGuiActualStartGateArtifactPath(movieId);
  return `cd motion-studio && node --no-warnings scripts/wedding-davinci-gui-actual-start-gate.mts --movie=${movieId} --snapshot=out/handoff/wedding/wedding-davinci-actual-session-plan.json --output=${artifactPath} --write${strict ? " --strict-gui-start" : ""} --json`;
};

const emptyTransport = () => ({
  state: "NOT_RUN",
  current: false,
  mismatches: [] as string[],
  transportedIdentitySha256: null,
  liveIdentitySha256: null,
});

const emptyPreflight = (): ProjectPreflight => ({
  state: null,
  applicable: false,
  current: false,
  command: null,
  error: null,
});

const emptyRemotionIdentityPreflight = (): ProjectRemotionIdentityPreflight => ({
  ...emptyPreflight(),
  resolveSidecarSha256: null,
  receiptSha256: null,
  sourceBatchSha256: null,
});

const emptyPalmierTimelinePreflight = (): PalmierTimelinePreflight => ({
  ...emptyPreflight(),
  receiptSha256: null,
  assemblyPlanSha256: null,
  palmierFcpxmlSha256: null,
  transitionEdgeCount: null,
  verifiedTransitionEdgeCount: null,
  crossDissolveCount: null,
  transitionProofSha256: null,
  recoveryTransitionProofSha256: null,
  transitionProofCurrent: false,
  transitionProof: [],
});

const emptyProject = () => ({
  sessionState: null,
  projectMotionPreflight: emptyPreflight(),
  projectRemotionIdentityPreflight: emptyRemotionIdentityPreflight(),
  palmierTimelinePreflight: emptyPalmierTimelinePreflight(),
  evidenceState: null,
  handoffIdentitySha256: null,
  actualRecoverySha256: null,
  currentNextGate: null as unknown,
});

const result = (
  movieId: WeddingMovieId,
  state: WeddingDavinciGuiActualStartGateAuditState,
  mismatches: string[],
  overrides: Partial<WeddingDavinciGuiActualStartGateAudit> = {},
): WeddingDavinciGuiActualStartGateAudit => ({
  schemaVersion: WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_AUDIT_SCHEMA,
  movieId,
  state,
  guiActualStartAllowed: false,
  canonicalGateLoaded: false,
  liveProjectMotionMatch: false,
  liveProjectRemotionIdentityMatch: false,
  livePalmierTimelineMatch: false,
  canonicalArtifactPath: canonicalWeddingDavinciGuiActualStartGateArtifactPath(movieId),
  transport: emptyTransport(),
  project: emptyProject(),
  nextAction: {
    kind: "RUN_CANONICAL_START_GATE",
    command: commandFor(movieId, false),
    humanOnly: false,
    reason: "Generate and load the canonical start-gate JSON artifact before relying on a GUI Actual next action.",
  },
  mismatches,
  inspectCommand: commandFor(movieId, false),
  strictGuiStartCommand: commandFor(movieId, true),
  note: "Motion Zukan audits the canonical gate artifact and rechecks transported Project Motion, Project Remotion identity, Palmier real FCPXML SHA authority, and verified transition proof/counts against current Dashboard authorities. GUI_ACTUAL_ALLOWED means a human may start the real Mac GUI review; it never means GUI Actual was executed or passed.",
  evidenceBoundary: {
    palmierGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
    palmierTransitionAppliedGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
    productionReady: false,
  },
  ...overrides,
});

const normalizeTransitionProof = (value: unknown): PalmierTransitionProofEdge[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw): PalmierTransitionProofEdge[] => {
    if (!raw || typeof raw !== "object") return [];
    const edge = raw as Record<string, unknown>;
    if (
      typeof edge.edgeId !== "string" || typeof edge.fromSceneId !== "string" || typeof edge.toSceneId !== "string" ||
      (edge.transition !== "HARD_CUT" && edge.transition !== "CROSS_DISSOLVE") || edge.state !== "CURRENT"
    ) return [];
    return [{
      order: typeof edge.order === "number" ? edge.order : null,
      edgeId: edge.edgeId,
      fromSceneId: edge.fromSceneId,
      toSceneId: edge.toSceneId,
      transition: edge.transition,
      durationFrames: typeof edge.durationFrames === "number" ? edge.durationFrames : 0,
      transitionOccurrenceCountBetweenMarkers: typeof edge.transitionOccurrenceCountBetweenMarkers === "number" ? edge.transitionOccurrenceCountBetweenMarkers : 0,
      matchedDurationFrames: typeof edge.matchedDurationFrames === "number" ? edge.matchedDurationFrames : 0,
      state: "CURRENT",
    }];
  });
};

export function auditWeddingDavinciGuiActualStartGate(
  movieId: WeddingMovieId,
  input: unknown,
): WeddingDavinciGuiActualStartGateAudit {
  if (!input || typeof input !== "object") {
    return result(movieId, "INVALID", ["GUI_START_GATE_INVALID_JSON_OBJECT"]);
  }

  const gate = input as Record<string, any>;
  const mismatches: string[] = [];
  if (gate.schemaVersion !== CANONICAL_WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_SCHEMA) mismatches.push("GUI_START_GATE_SCHEMA_MISMATCH");
  if (gate.authority !== canonicalAuthority) mismatches.push("GUI_START_GATE_AUTHORITY_MISMATCH");
  if (gate.movieId !== movieId) mismatches.push("GUI_START_GATE_MOVIE_ID_MISMATCH");
  if (!allowedStates.has(gate.state)) mismatches.push("GUI_START_GATE_STATE_INVALID");
  if (gate.evidenceBoundary?.productionReady !== false) mismatches.push("GUI_START_GATE_PRODUCTION_READY_BOUNDARY_INVALID");
  if (gate.evidenceBoundary?.palmierTransitionAppliedGuiActual !== "NOT_PROMOTED_BY_START_GATE") mismatches.push("GUI_START_GATE_TRANSITION_GUI_ACTUAL_BOUNDARY_INVALID");

  const claimedAllowed = gate.guiActualStartAllowed === true;
  if (claimedAllowed !== (gate.state === "GUI_ACTUAL_ALLOWED")) mismatches.push("GUI_START_GATE_ALLOWED_FLAG_STATE_MISMATCH");
  if (gate.state === "GUI_ACTUAL_ALLOWED" && gate.nextAction?.humanOnly !== true) mismatches.push("GUI_START_GATE_HUMAN_ONLY_BOUNDARY_INVALID");
  if (gate.state === "GUI_ACTUAL_ALLOWED" && gate.nextAction?.command != null) mismatches.push("GUI_START_GATE_HUMAN_ACTION_MUST_NOT_HAVE_COMMAND");

  const projectMotion = gate.project?.projectMotionPreflight;
  if (!projectMotion || typeof projectMotion !== "object") {
    mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_MISSING");
  } else {
    if (!["CURRENT", "NOT_APPLICABLE", "INVALID"].includes(projectMotion.state)) mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_STATE_INVALID");
    if (typeof projectMotion.command !== "string") mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_COMMAND_MISSING");
    if (projectMotion.state === "INVALID" && gate.state !== "PROJECT_MOTION_BLOCKED") mismatches.push("GUI_START_GATE_PROJECT_MOTION_INVALID_NOT_BLOCKED");
    if (gate.state === "PROJECT_MOTION_BLOCKED" && projectMotion.state !== "INVALID") mismatches.push("GUI_START_GATE_PROJECT_MOTION_BLOCK_WITHOUT_INVALID_STATE");
    if (gate.state === "PROJECT_MOTION_BLOCKED" && gate.nextAction?.kind !== "REVALIDATE_PROJECT_MOTION") mismatches.push("GUI_START_GATE_PROJECT_MOTION_RECOVERY_ACTION_INVALID");
    if (gate.state === "PROJECT_MOTION_BLOCKED" && gate.nextAction?.command !== projectMotion.command) mismatches.push("GUI_START_GATE_PROJECT_MOTION_RECOVERY_COMMAND_MISMATCH");
  }

  const projectRemotionIdentity = gate.project?.projectRemotionIdentityPreflight;
  if (!projectRemotionIdentity || typeof projectRemotionIdentity !== "object") {
    mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_PREFLIGHT_MISSING");
  } else {
    if (!["CURRENT", "NOT_APPLICABLE", "INVALID"].includes(projectRemotionIdentity.state)) mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_PREFLIGHT_STATE_INVALID");
    if (typeof projectRemotionIdentity.command !== "string") mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_PREFLIGHT_COMMAND_MISSING");
    if (projectRemotionIdentity.state === "INVALID" && gate.state !== "PROJECT_REMOTION_IDENTITY_BLOCKED" && projectMotion?.state !== "INVALID") mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_INVALID_NOT_BLOCKED");
    if (gate.state === "PROJECT_REMOTION_IDENTITY_BLOCKED" && projectRemotionIdentity.state !== "INVALID") mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_BLOCK_WITHOUT_INVALID_STATE");
    if (gate.state === "PROJECT_REMOTION_IDENTITY_BLOCKED" && gate.nextAction?.kind !== "REVALIDATE_PROJECT_REMOTION_IDENTITY") mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECOVERY_ACTION_INVALID");
    if (gate.state === "PROJECT_REMOTION_IDENTITY_BLOCKED" && gate.nextAction?.command !== projectRemotionIdentity.command) mismatches.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECOVERY_COMMAND_MISMATCH");
  }

  const palmierTimeline = gate.project?.palmierTimelinePreflight;
  if (!palmierTimeline || typeof palmierTimeline !== "object") {
    mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_PREFLIGHT_MISSING");
  } else {
    if (!["CURRENT", "NOT_APPLICABLE", "INVALID"].includes(palmierTimeline.state)) mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_PREFLIGHT_STATE_INVALID");
    if (typeof palmierTimeline.command !== "string") mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_PREFLIGHT_COMMAND_MISSING");
    if (palmierTimeline.state === "CURRENT") {
      for (const key of ["receiptSha256", "assemblyPlanSha256", "palmierFcpxmlSha256", "transitionProofSha256", "recoveryTransitionProofSha256"]) {
        if (!shaPattern.test(palmierTimeline[key] ?? "")) mismatches.push(`GUI_START_GATE_PALMIER_TIMELINE_${key.toUpperCase()}_INVALID`);
      }
      if (palmierTimeline.transitionProofCurrent !== true) mismatches.push("GUI_START_GATE_PALMIER_TRANSITION_PROOF_NOT_CURRENT");
      if (palmierTimeline.transitionProofSha256 !== palmierTimeline.recoveryTransitionProofSha256) mismatches.push("GUI_START_GATE_PALMIER_TRANSITION_PROOF_SHA_MISMATCH");
      if (!Number.isInteger(palmierTimeline.transitionEdgeCount) || !Number.isInteger(palmierTimeline.crossDissolveCount)) mismatches.push("GUI_START_GATE_PALMIER_TRANSITION_COUNTS_INVALID");
      const transitionProof = normalizeTransitionProof(palmierTimeline.transitionProof);
      if (transitionProof.length !== palmierTimeline.transitionEdgeCount) mismatches.push("GUI_START_GATE_PALMIER_TRANSITION_PROOF_EDGE_COUNT_INVALID");
      if (transitionProof.filter((edge) => edge.transition === "CROSS_DISSOLVE").length !== palmierTimeline.crossDissolveCount) mismatches.push("GUI_START_GATE_PALMIER_CROSS_DISSOLVE_COUNT_INVALID");
    }
    if (palmierTimeline.state === "INVALID" && gate.state !== "PALMIER_TIMELINE_BLOCKED" && projectMotion?.state !== "INVALID" && projectRemotionIdentity?.state !== "INVALID") mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_INVALID_NOT_BLOCKED");
    if (gate.state === "PALMIER_TIMELINE_BLOCKED" && palmierTimeline.state !== "INVALID" && palmierTimeline.transitionProofCurrent !== false) mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_BLOCK_WITHOUT_INVALID_STATE");
    if (gate.state === "PALMIER_TIMELINE_BLOCKED" && gate.nextAction?.kind !== "REVALIDATE_PALMIER_TIMELINE") mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_ACTION_INVALID");
    if (gate.state === "PALMIER_TIMELINE_BLOCKED" && gate.nextAction?.command !== palmierTimeline.command) mismatches.push("GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_COMMAND_MISMATCH");
  }

  const liveProject = buildWeddingDavinciActualSessionPlan().projects[movieId];
  const liveProjectMotion = liveProject.projectMotionPreflight;
  const liveProjectRemotionIdentity = liveProject.projectRemotionIdentityPreflight;
  const livePalmierTimeline = liveProject.palmierTimelinePreflight;
  const liveMismatchCodes: string[] = [];
  if (projectMotion && typeof projectMotion === "object") {
    if (projectMotion.state !== liveProjectMotion.state) liveMismatchCodes.push("GUI_START_GATE_PROJECT_MOTION_STATE_STALE");
    if (Boolean(projectMotion.applicable) !== liveProjectMotion.applicable) liveMismatchCodes.push("GUI_START_GATE_PROJECT_MOTION_APPLICABILITY_STALE");
    if (Boolean(projectMotion.current) !== liveProjectMotion.current) liveMismatchCodes.push("GUI_START_GATE_PROJECT_MOTION_CURRENTNESS_STALE");
    if ((projectMotion.command ?? null) !== liveProjectMotion.command) liveMismatchCodes.push("GUI_START_GATE_PROJECT_MOTION_COMMAND_STALE");
    if ((projectMotion.error ?? null) !== liveProjectMotion.error) liveMismatchCodes.push("GUI_START_GATE_PROJECT_MOTION_ERROR_STALE");
  }
  if (projectRemotionIdentity && typeof projectRemotionIdentity === "object") {
    if (projectRemotionIdentity.state !== liveProjectRemotionIdentity.state) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_STATE_STALE");
    if (Boolean(projectRemotionIdentity.applicable) !== liveProjectRemotionIdentity.applicable) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_APPLICABILITY_STALE");
    if (Boolean(projectRemotionIdentity.current) !== liveProjectRemotionIdentity.current) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_CURRENTNESS_STALE");
    if ((projectRemotionIdentity.command ?? null) !== liveProjectRemotionIdentity.command) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_COMMAND_STALE");
    if ((projectRemotionIdentity.resolveSidecarSha256 ?? null) !== liveProjectRemotionIdentity.resolveSidecarSha256) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RESOLVE_SIDECAR_SHA_STALE");
    if ((projectRemotionIdentity.receiptSha256 ?? null) !== liveProjectRemotionIdentity.receiptSha256) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECEIPT_SHA_STALE");
    if ((projectRemotionIdentity.sourceBatchSha256 ?? null) !== liveProjectRemotionIdentity.sourceBatchSha256) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_SOURCE_BATCH_SHA_STALE");
    if ((projectRemotionIdentity.error ?? null) !== liveProjectRemotionIdentity.error) liveMismatchCodes.push("GUI_START_GATE_PROJECT_REMOTION_IDENTITY_ERROR_STALE");
  }
  if (palmierTimeline && typeof palmierTimeline === "object") {
    if (palmierTimeline.state !== livePalmierTimeline.state) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_STATE_STALE");
    if (Boolean(palmierTimeline.applicable) !== livePalmierTimeline.applicable) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_APPLICABILITY_STALE");
    if (Boolean(palmierTimeline.current) !== livePalmierTimeline.current) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_CURRENTNESS_STALE");
    if ((palmierTimeline.command ?? null) !== livePalmierTimeline.command) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_COMMAND_STALE");
    if ((palmierTimeline.receiptSha256 ?? null) !== livePalmierTimeline.receiptSha256) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_RECEIPT_SHA_STALE");
    if ((palmierTimeline.assemblyPlanSha256 ?? null) !== livePalmierTimeline.assemblyPlanSha256) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_ASSEMBLY_PLAN_SHA_STALE");
    if ((palmierTimeline.palmierFcpxmlSha256 ?? null) !== livePalmierTimeline.palmierFcpxmlSha256) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_FCPXML_SHA_STALE");
    if ((palmierTimeline.transitionEdgeCount ?? null) !== livePalmierTimeline.transitionEdgeCount) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TRANSITION_EDGE_COUNT_STALE");
    if ((palmierTimeline.crossDissolveCount ?? null) !== livePalmierTimeline.crossDissolveCount) liveMismatchCodes.push("GUI_START_GATE_PALMIER_CROSS_DISSOLVE_COUNT_STALE");
    if ((palmierTimeline.transitionProofSha256 ?? null) !== livePalmierTimeline.transitionProofSha256) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TRANSITION_PROOF_SHA_STALE");
    if ((palmierTimeline.error ?? null) !== livePalmierTimeline.error) liveMismatchCodes.push("GUI_START_GATE_PALMIER_TIMELINE_ERROR_STALE");
  }
  mismatches.push(...liveMismatchCodes);

  const contractInvalid = mismatches.some((code) =>
    code.includes("MISMATCH") || code.includes("INVALID") || code.includes("MISSING") || code.includes("NOT_BLOCKED") || code.includes("WITHOUT_INVALID_STATE") || code.includes("NOT_CURRENT"),
  );
  if (contractInvalid) return result(movieId, "INVALID", mismatches);
  if (liveMismatchCodes.length > 0) {
    return result(movieId, "STALE", mismatches, {
      canonicalGateLoaded: true,
      liveProjectMotionMatch: !liveMismatchCodes.some((code) => code.includes("PROJECT_MOTION_")),
      liveProjectRemotionIdentityMatch: !liveMismatchCodes.some((code) => code.includes("PROJECT_REMOTION_IDENTITY_")),
      livePalmierTimelineMatch: !liveMismatchCodes.some((code) => code.includes("PALMIER_TIMELINE_") || code.includes("PALMIER_TRANSITION_") || code.includes("PALMIER_CROSS_DISSOLVE_")),
      nextAction: {
        kind: "REGENERATE_CANONICAL_START_GATE",
        command: commandFor(movieId, false),
        humanOnly: false,
        reason: "The loaded canonical start-gate JSON carries an older Project Motion, Project Remotion identity, Palmier timeline, and/or transition-proof authority than the current Dashboard snapshot. Regenerate the canonical artifact and rerun strict GUI-start verification before Mac GUI Actual.",
      },
    });
  }

  const transitionProof = normalizeTransitionProof(palmierTimeline?.transitionProof);
  return result(movieId, gate.state, [], {
    guiActualStartAllowed: claimedAllowed,
    canonicalGateLoaded: true,
    liveProjectMotionMatch: true,
    liveProjectRemotionIdentityMatch: true,
    livePalmierTimelineMatch: true,
    transport: {
      state: String(gate.transport?.state ?? "UNKNOWN"),
      current: gate.transport?.current === true,
      mismatches: Array.isArray(gate.transport?.mismatches) ? [...gate.transport.mismatches] : [],
      transportedIdentitySha256: typeof gate.transport?.transportedIdentitySha256 === "string" ? gate.transport.transportedIdentitySha256 : null,
      liveIdentitySha256: typeof gate.transport?.liveIdentitySha256 === "string" ? gate.transport.liveIdentitySha256 : null,
    },
    project: {
      sessionState: typeof gate.project?.sessionState === "string" ? gate.project.sessionState : null,
      projectMotionPreflight: {
        state: typeof projectMotion.state === "string" ? projectMotion.state : null,
        applicable: projectMotion.applicable === true,
        current: projectMotion.current === true,
        command: typeof projectMotion.command === "string" ? projectMotion.command : null,
        error: typeof projectMotion.error === "string" ? projectMotion.error : null,
      },
      projectRemotionIdentityPreflight: {
        state: typeof projectRemotionIdentity.state === "string" ? projectRemotionIdentity.state : null,
        applicable: projectRemotionIdentity.applicable === true,
        current: projectRemotionIdentity.current === true,
        command: typeof projectRemotionIdentity.command === "string" ? projectRemotionIdentity.command : null,
        resolveSidecarSha256: typeof projectRemotionIdentity.resolveSidecarSha256 === "string" ? projectRemotionIdentity.resolveSidecarSha256 : null,
        receiptSha256: typeof projectRemotionIdentity.receiptSha256 === "string" ? projectRemotionIdentity.receiptSha256 : null,
        sourceBatchSha256: typeof projectRemotionIdentity.sourceBatchSha256 === "string" ? projectRemotionIdentity.sourceBatchSha256 : null,
        error: typeof projectRemotionIdentity.error === "string" ? projectRemotionIdentity.error : null,
      },
      palmierTimelinePreflight: {
        state: typeof palmierTimeline.state === "string" ? palmierTimeline.state : null,
        applicable: palmierTimeline.applicable === true,
        current: palmierTimeline.current === true,
        command: typeof palmierTimeline.command === "string" ? palmierTimeline.command : null,
        receiptSha256: typeof palmierTimeline.receiptSha256 === "string" ? palmierTimeline.receiptSha256 : null,
        assemblyPlanSha256: typeof palmierTimeline.assemblyPlanSha256 === "string" ? palmierTimeline.assemblyPlanSha256 : null,
        palmierFcpxmlSha256: typeof palmierTimeline.palmierFcpxmlSha256 === "string" ? palmierTimeline.palmierFcpxmlSha256 : null,
        transitionEdgeCount: Number.isInteger(palmierTimeline.transitionEdgeCount) ? palmierTimeline.transitionEdgeCount : null,
        verifiedTransitionEdgeCount: transitionProof.length,
        crossDissolveCount: Number.isInteger(palmierTimeline.crossDissolveCount) ? palmierTimeline.crossDissolveCount : null,
        transitionProofSha256: typeof palmierTimeline.transitionProofSha256 === "string" ? palmierTimeline.transitionProofSha256 : null,
        recoveryTransitionProofSha256: typeof palmierTimeline.recoveryTransitionProofSha256 === "string" ? palmierTimeline.recoveryTransitionProofSha256 : null,
        transitionProofCurrent: palmierTimeline.transitionProofCurrent === true,
        transitionProof,
        error: typeof palmierTimeline.error === "string" ? palmierTimeline.error : null,
      },
      evidenceState: typeof gate.project?.evidenceState === "string" ? gate.project.evidenceState : null,
      handoffIdentitySha256: typeof gate.project?.handoffIdentitySha256 === "string" ? gate.project.handoffIdentitySha256 : null,
      actualRecoverySha256: typeof gate.project?.actualRecoverySha256 === "string" ? gate.project.actualRecoverySha256 : null,
      currentNextGate: gate.project?.currentNextGate ?? null,
    },
    nextAction: {
      kind: typeof gate.nextAction?.kind === "string" ? gate.nextAction.kind : "UNKNOWN",
      command: typeof gate.nextAction?.command === "string" ? gate.nextAction.command : null,
      humanOnly: gate.nextAction?.humanOnly === true,
      reason: typeof gate.nextAction?.reason === "string" ? gate.nextAction.reason : "No canonical reason was recorded.",
    },
  });
}

export const defaultWeddingDavinciGuiActualStartGateAudits = {
  opening: result("opening", "NOT_RUN", []),
  profile: result("profile", "NOT_RUN", []),
} as const;
