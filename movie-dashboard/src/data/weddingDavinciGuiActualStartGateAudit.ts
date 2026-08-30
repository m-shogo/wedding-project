export const WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_AUDIT_SCHEMA =
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v2" as const;

export const CANONICAL_WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_SCHEMA =
  "wedding-davinci-gui-actual-start-gate/v1" as const;

export type WeddingMovieId = "opening" | "profile";

export type WeddingDavinciGuiActualStartGateAuditState =
  | "NOT_RUN"
  | "TRANSPORT_NOT_CURRENT"
  | "PROJECT_MOTION_BLOCKED"
  | "UPSTREAM_BLOCKED"
  | "EVIDENCE_INIT_REQUIRED"
  | "GUI_ACTUAL_ALLOWED"
  | "GUI_ACTUAL_COMPLETE"
  | "EVIDENCE_BLOCKED"
  | "INVALID";

export type WeddingDavinciGuiActualStartGateAudit = {
  schemaVersion: typeof WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_AUDIT_SCHEMA;
  movieId: WeddingMovieId;
  state: WeddingDavinciGuiActualStartGateAuditState;
  guiActualStartAllowed: boolean;
  canonicalGateLoaded: boolean;
  transport: {
    state: string;
    current: boolean;
    mismatches: string[];
    transportedIdentitySha256: string | null;
    liveIdentitySha256: string | null;
  };
  project: {
    sessionState: string | null;
    projectMotionPreflight: {
      state: string | null;
      applicable: boolean;
      current: boolean;
      command: string | null;
      error: string | null;
    };
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
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT";
    productionReady: false;
  };
};

const canonicalAuthority = "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE";
const allowedStates = new Set<WeddingDavinciGuiActualStartGateAuditState>([
  "TRANSPORT_NOT_CURRENT",
  "PROJECT_MOTION_BLOCKED",
  "UPSTREAM_BLOCKED",
  "EVIDENCE_INIT_REQUIRED",
  "GUI_ACTUAL_ALLOWED",
  "GUI_ACTUAL_COMPLETE",
  "EVIDENCE_BLOCKED",
]);

const commandFor = (movieId: WeddingMovieId, strict: boolean) =>
  `cd motion-studio && node --no-warnings scripts/wedding-davinci-gui-actual-start-gate.mts --movie=${movieId} --snapshot=out/handoff/wedding/wedding-davinci-actual-session-plan.json${strict ? " --strict-gui-start" : ""} --json`;

const emptyTransport = () => ({
  state: "NOT_RUN",
  current: false,
  mismatches: [] as string[],
  transportedIdentitySha256: null,
  liveIdentitySha256: null,
});

const emptyProject = () => ({
  sessionState: null,
  projectMotionPreflight: {
    state: null,
    applicable: false,
    current: false,
    command: null,
    error: null,
  },
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
  transport: emptyTransport(),
  project: emptyProject(),
  nextAction: {
    kind: "RUN_CANONICAL_START_GATE",
    command: commandFor(movieId, false),
    humanOnly: false,
    reason: "Load the canonical start-gate JSON before relying on a GUI Actual next action.",
  },
  mismatches,
  inspectCommand: commandFor(movieId, false),
  strictGuiStartCommand: commandFor(movieId, true),
  note: "Motion Zukan only audits the canonical gate output. GUI_ACTUAL_ALLOWED means a human may start the real Mac GUI review; it never means GUI Actual was executed or passed.",
  evidenceBoundary: {
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
    productionReady: false,
  },
  ...overrides,
});

export function auditWeddingDavinciGuiActualStartGate(
  movieId: WeddingMovieId,
  input: unknown,
): WeddingDavinciGuiActualStartGateAudit {
  if (!input || typeof input !== "object") {
    return result(movieId, "INVALID", ["GUI_START_GATE_INVALID_JSON_OBJECT"]);
  }

  const gate = input as Record<string, any>;
  const mismatches: string[] = [];
  if (gate.schemaVersion !== CANONICAL_WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_SCHEMA) {
    mismatches.push("GUI_START_GATE_SCHEMA_MISMATCH");
  }
  if (gate.authority !== canonicalAuthority) mismatches.push("GUI_START_GATE_AUTHORITY_MISMATCH");
  if (gate.movieId !== movieId) mismatches.push("GUI_START_GATE_MOVIE_ID_MISMATCH");
  if (!allowedStates.has(gate.state)) mismatches.push("GUI_START_GATE_STATE_INVALID");
  if (gate.evidenceBoundary?.productionReady !== false) mismatches.push("GUI_START_GATE_PRODUCTION_READY_BOUNDARY_INVALID");

  const claimedAllowed = gate.guiActualStartAllowed === true;
  if (claimedAllowed !== (gate.state === "GUI_ACTUAL_ALLOWED")) {
    mismatches.push("GUI_START_GATE_ALLOWED_FLAG_STATE_MISMATCH");
  }
  if (gate.state === "GUI_ACTUAL_ALLOWED" && gate.nextAction?.humanOnly !== true) {
    mismatches.push("GUI_START_GATE_HUMAN_ONLY_BOUNDARY_INVALID");
  }
  if (gate.state === "GUI_ACTUAL_ALLOWED" && gate.nextAction?.command != null) {
    mismatches.push("GUI_START_GATE_HUMAN_ACTION_MUST_NOT_HAVE_COMMAND");
  }

  const projectMotion = gate.project?.projectMotionPreflight;
  if (!projectMotion || typeof projectMotion !== "object") {
    mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_MISSING");
  } else {
    if (!["CURRENT", "NOT_APPLICABLE", "INVALID"].includes(projectMotion.state)) {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_STATE_INVALID");
    }
    if (typeof projectMotion.command !== "string") {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_COMMAND_MISSING");
    }
    if (projectMotion.state === "INVALID" && gate.state !== "PROJECT_MOTION_BLOCKED") {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_INVALID_NOT_BLOCKED");
    }
    if (gate.state === "PROJECT_MOTION_BLOCKED" && projectMotion.state !== "INVALID") {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_BLOCK_WITHOUT_INVALID_STATE");
    }
    if (gate.state === "PROJECT_MOTION_BLOCKED" && gate.nextAction?.kind !== "REVALIDATE_PROJECT_MOTION") {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_RECOVERY_ACTION_INVALID");
    }
    if (gate.state === "PROJECT_MOTION_BLOCKED" && gate.nextAction?.command !== projectMotion.command) {
      mismatches.push("GUI_START_GATE_PROJECT_MOTION_RECOVERY_COMMAND_MISMATCH");
    }
  }

  if (mismatches.length > 0) return result(movieId, "INVALID", mismatches);

  return result(movieId, gate.state, [], {
    guiActualStartAllowed: claimedAllowed,
    canonicalGateLoaded: true,
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
