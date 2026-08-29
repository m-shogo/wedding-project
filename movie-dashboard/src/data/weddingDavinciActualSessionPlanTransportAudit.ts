import {buildWeddingDavinciActualSessionPlan} from "./weddingDavinciActualSessionPlan";

export const WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA =
  "wedding-davinci-actual-session-plan-transport-audit-dashboard/v2" as const;

export type WeddingDavinciActualSessionPlanTransportAuditState =
  | "NOT_RUN"
  | "CLI_REQUIRED"
  | "STALE"
  | "INVALID";

export type WeddingDavinciActualSessionPlanTransportAudit = {
  schemaVersion: typeof WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA;
  state: WeddingDavinciActualSessionPlanTransportAuditState;
  currentCommonBindings: boolean;
  transportIdentityVerified: boolean;
  transportedIdentitySha256: string | null;
  recomputedIdentitySha256: string | null;
  mismatches: string[];
  note: string;
  strictCommand: string;
  evidenceBoundary: {
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_BROWSER_AUDIT";
    productionReady: false;
  };
};

const canonicalSchema = "wedding-davinci-actual-session-plan/v1";
const canonicalAuthority = "DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN";
const strictCommand =
  "cd motion-studio && node --no-warnings scripts/wedding-davinci-actual-session-plan-snapshot.mts --strict-current --snapshot <path>";

const projectGateStage = (value: unknown) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "stage" in value) {
    const stage = (value as {stage?: unknown}).stage;
    return typeof stage === "string" ? stage : null;
  }
  return null;
};

const sha256 = async (text: string) => {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const result = (
  state: WeddingDavinciActualSessionPlanTransportAuditState,
  mismatches: string[],
  note: string,
  identity: {transported: string | null; recomputed: string | null; verified: boolean} = {
    transported: null,
    recomputed: null,
    verified: false,
  },
): WeddingDavinciActualSessionPlanTransportAudit => ({
  schemaVersion: WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA,
  state,
  currentCommonBindings: state === "CLI_REQUIRED",
  transportIdentityVerified: identity.verified,
  transportedIdentitySha256: identity.transported,
  recomputedIdentitySha256: identity.recomputed,
  mismatches,
  note,
  strictCommand,
  evidenceBoundary: {
    macDavinciResolveGuiActual: "NOT_PROMOTED_BY_BROWSER_AUDIT",
    productionReady: false,
  },
});

export async function auditTransportedWeddingDavinciActualSessionPlan(
  input: unknown,
): Promise<WeddingDavinciActualSessionPlanTransportAudit> {
  const mismatches: string[] = [];
  const live = buildWeddingDavinciActualSessionPlan();

  if (!input || typeof input !== "object") {
    return result(
      "INVALID",
      ["SESSION_PLAN_INVALID_JSON_OBJECT"],
      "The selected file is not a valid canonical session-plan JSON object. Do not start Mac GUI Actual.",
    );
  }

  const transported = input as Record<string, any>;
  const declaredIdentity = typeof transported.transportIdentitySha256 === "string"
    ? transported.transportIdentitySha256
    : null;
  const {transportIdentitySha256: _ignored, ...transportBody} = transported;
  const recomputedIdentity = await sha256(JSON.stringify(transportBody));
  const identityVerified = declaredIdentity !== null && declaredIdentity === recomputedIdentity;

  if (transported.schemaVersion !== canonicalSchema || transported.authority !== canonicalAuthority) {
    mismatches.push("SESSION_PLAN_CONTRACT_MISMATCH");
  }
  if (transported.evidenceBoundary?.productionReady !== false) {
    mismatches.push("SESSION_PLAN_EVIDENCE_BOUNDARY_INVALID");
  }
  if (!declaredIdentity) {
    mismatches.push("SESSION_PLAN_TRANSPORT_IDENTITY_MISSING");
  } else if (!identityVerified) {
    mismatches.push("SESSION_PLAN_TRANSPORT_IDENTITY_INVALID");
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

  const invalid = mismatches.some((item) =>
    item.includes("CONTRACT") || item.includes("INVALID") || item.includes("MISSING"),
  );
  const state: WeddingDavinciActualSessionPlanTransportAuditState = invalid
    ? "INVALID"
    : mismatches.length > 0
      ? "STALE"
      : "CLI_REQUIRED";

  return result(
    state,
    mismatches,
    state === "CLI_REQUIRED"
      ? "Browser verified the transport identity and matched the bindings available to Motion Zukan. Run canonical motion-studio strict-current before starting Mac GUI Actual; browser audit still cannot prove the live handoffIdentitySha256 chain."
      : "Do not start Mac GUI Actual from this transported plan until the mismatch is resolved and canonical strict-current passes.",
    {transported: declaredIdentity, recomputed: recomputedIdentity, verified: identityVerified},
  );
}

export const defaultWeddingDavinciActualSessionPlanTransportAudit: WeddingDavinciActualSessionPlanTransportAudit = result(
  "NOT_RUN",
  [],
  "Load the canonical Motion Studio session-plan JSON to verify its transport identity and inspect transported common bindings. Canonical CLI strict-current remains authoritative.",
);
