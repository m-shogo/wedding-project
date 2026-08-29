import {buildWeddingDavinciActualSessionPlan} from "./weddingDavinciActualSessionPlan";

export const WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA =
  "wedding-davinci-actual-session-plan-transport-audit-dashboard/v1" as const;

export type WeddingDavinciActualSessionPlanTransportAuditState =
  | "NOT_RUN"
  | "CLI_REQUIRED"
  | "STALE"
  | "INVALID";

const canonicalSchema = "wedding-davinci-actual-session-plan/v1";
const canonicalAuthority = "DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN";

const projectGateStage = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "stage" in value) {
    const stage = (value as {stage?: unknown}).stage;
    return typeof stage === "string" ? stage : null;
  }
  return null;
};

export function auditTransportedWeddingDavinciActualSessionPlan(input: unknown) {
  const mismatches: string[] = [];
  const live = buildWeddingDavinciActualSessionPlan();

  if (!input || typeof input !== "object") {
    return {
      schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA,
      state: "INVALID" as const,
      currentCommonBindings: false,
      mismatches: ["SESSION_PLAN_INVALID_JSON_OBJECT"],
      strictCommand:
        "cd motion-studio && node --no-warnings scripts/wedding-davinci-actual-session-plan-snapshot.mts --strict-current --snapshot <path>",
      evidenceBoundary: {macDavinciResolveGuiActual: "NOT_PROMOTED_BY_BROWSER_AUDIT" as const, productionReady: false as const},
    };
  }

  const transported = input as Record<string, any>;
  if (transported.schemaVersion !== canonicalSchema || transported.authority !== canonicalAuthority) {
    mismatches.push("SESSION_PLAN_CONTRACT_MISMATCH");
  }
  if (transported.evidenceBoundary?.productionReady !== false) {
    mismatches.push("SESSION_PLAN_EVIDENCE_BOUNDARY_INVALID");
  }

  for (const movieId of ["opening", "profile"] as const) {
    const oldProject = transported.projects?.[movieId];
    const currentProject = live.projects[movieId];
    if (!oldProject) {
      mismatches.push(`${movieId.toUpperCase()}_PROJECT_MISSING`);
      continue;
    }

    const oldGate = projectGateStage(oldProject.currentNextGate);
    if (oldGate !== currentProject.currentNextGate) {
      mismatches.push(`${movieId.toUpperCase()}_CURRENT_NEXT_GATE_STALE`);
    }
    if ((oldProject.actualEvidence?.recoverySha256 ?? null) !== currentProject.recoverySha256) {
      mismatches.push(`${movieId.toUpperCase()}_ACTUAL_RECOVERY_SHA_STALE`);
    }
    if ((oldProject.expectedDavinciActualEvidenceSha256 ?? null) !== currentProject.actualEvidenceSha256) {
      mismatches.push(`${movieId.toUpperCase()}_EXPECTED_ACTUAL_EVIDENCE_SHA_STALE`);
    }
  }

  const invalid = mismatches.some((item) => item.includes("CONTRACT") || item.includes("INVALID") || item.includes("MISSING"));
  const state: WeddingDavinciActualSessionPlanTransportAuditState = invalid
    ? "INVALID"
    : mismatches.length > 0
      ? "STALE"
      : "CLI_REQUIRED";

  return {
    schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA,
    state,
    currentCommonBindings: state === "CLI_REQUIRED",
    mismatches,
    note:
      state === "CLI_REQUIRED"
        ? "Browser audit matched the bindings available to Motion Zukan. Run the canonical motion-studio strict-current command before starting Mac GUI Actual; browser audit cannot prove handoffIdentitySha256."
        : "Do not start Mac GUI Actual from this transported plan until the mismatch is resolved and canonical strict-current passes.",
    strictCommand:
      "cd motion-studio && node --no-warnings scripts/wedding-davinci-actual-session-plan-snapshot.mts --strict-current --snapshot <path>",
    evidenceBoundary: {
      macDavinciResolveGuiActual: "NOT_PROMOTED_BY_BROWSER_AUDIT" as const,
      productionReady: false as const,
    },
  };
}

export const defaultWeddingDavinciActualSessionPlanTransportAudit = {
  schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA,
  state: "NOT_RUN" as const,
  currentCommonBindings: false,
  mismatches: [] as string[],
  note: "Load the canonical Motion Studio session-plan JSON to inspect transported common bindings. Canonical CLI strict-current remains authoritative.",
  strictCommand:
    "cd motion-studio && node --no-warnings scripts/wedding-davinci-actual-session-plan-snapshot.mts --strict-current --snapshot <path>",
  evidenceBoundary: {
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_BROWSER_AUDIT" as const,
    productionReady: false as const,
  },
};
