import {buildWeddingDavinciActualSessionPlan} from "./weddingDavinciActualSessionPlan";

export const WEDDING_DAVINCI_ACTUAL_SESSION_PLAN_TRANSPORT_AUDIT_SCHEMA =
  "wedding-davinci-actual-session-plan-transport-audit-dashboard/v3" as const;

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

// Dependency-free SHA-256 for browser-side transport integrity preflight.
// Canonical CURRENT authority remains the Motion Studio Node verifier.
const sha256 = (input: string) => {
  const rightRotate = (value: number, amount: number) => (value >>> amount) | (value << (32 - amount));
  const maxWord = 2 ** 32;
  const words: number[] = [];
  const ascii = unescape(encodeURIComponent(input));
  const bitLength = ascii.length * 8;
  const hash: number[] = [];
  const constants: number[] = [];
  let primeCounter = 0;
  const isComposite: Record<number, boolean> = {};

  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (isComposite[candidate]) continue;
    for (let multiple = candidate * candidate; multiple < 313; multiple += candidate) isComposite[multiple] = true;
    if (primeCounter < 8) hash[primeCounter] = (Math.sqrt(candidate) * maxWord) | 0;
    constants[primeCounter] = (Math.cbrt(candidate) * maxWord) | 0;
    primeCounter += 1;
  }

  let padded = `${ascii}\x80`;
  while ((padded.length % 64) !== 56) padded += "\x00";
  for (let index = 0; index < padded.length; index += 1) {
    const code = padded.charCodeAt(index);
    words[index >> 2] = (words[index >> 2] || 0) | (code << ((3 - index) % 4) * 8);
  }
  words.push(Math.floor(bitLength / maxWord), bitLength);

  for (let block = 0; block < words.length; block += 16) {
    const oldHash = hash.slice(0);
    const schedule = words.slice(block, block + 16);
    for (let index = 16; index < 64; index += 1) {
      const w15 = schedule[index - 15];
      const w2 = schedule[index - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      schedule[index] = (schedule[index - 16] + s0 + schedule[index - 7] + s1) | 0;
    }
    for (let index = 0; index < 64; index += 1) {
      const e = hash[4];
      const a = hash[0];
      const sigma1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const choice = (e & hash[5]) ^ (~e & hash[6]);
      const temp1 = (hash[7] + sigma1 + choice + constants[index] + schedule[index]) | 0;
      const sigma0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const majority = (a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (sigma0 + majority) | 0;
      hash.pop();
      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (let index = 0; index < 8; index += 1) hash[index] = (hash[index] + oldHash[index]) | 0;
  }

  return hash.map((value) => (value >>> 0).toString(16).padStart(8, "0")).join("");
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

export function auditTransportedWeddingDavinciActualSessionPlan(
  input: unknown,
): WeddingDavinciActualSessionPlanTransportAudit {
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
  const recomputedIdentity = sha256(JSON.stringify(transportBody));
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
    const prefix = movieId.toUpperCase();
    if (!oldProject) {
      mismatches.push(`${prefix}_PROJECT_MISSING`);
      continue;
    }

    const oldGate = projectGateStage(oldProject.currentNextGate);
    if (oldGate !== currentProject.currentNextGate) {
      mismatches.push(`${prefix}_CURRENT_NEXT_GATE_STALE`);
    }
    if ((oldProject.actualEvidence?.recoverySha256 ?? null) !== currentProject.recoverySha256) {
      mismatches.push(`${prefix}_ACTUAL_RECOVERY_SHA_STALE`);
    }
    if ((oldProject.expectedDavinciActualEvidenceSha256 ?? null) !== currentProject.actualEvidenceSha256) {
      mismatches.push(`${prefix}_EXPECTED_ACTUAL_EVIDENCE_SHA_STALE`);
    }

    const transportedProjectMotion = oldProject.projectMotionPreflight;
    const currentProjectMotion = currentProject.projectMotionPreflight;
    if (!transportedProjectMotion || typeof transportedProjectMotion !== "object") {
      mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_MISSING`);
    } else {
      if (transportedProjectMotion.state !== currentProjectMotion.state) {
        mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_STATE_STALE`);
      }
      if (Boolean(transportedProjectMotion.applicable) !== currentProjectMotion.applicable) {
        mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_APPLICABILITY_STALE`);
      }
      if (Boolean(transportedProjectMotion.current) !== currentProjectMotion.current) {
        mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_CURRENTNESS_STALE`);
      }
      if ((transportedProjectMotion.command ?? null) !== currentProjectMotion.command) {
        mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_COMMAND_STALE`);
      }
      if ((transportedProjectMotion.error ?? null) !== currentProjectMotion.error) {
        mismatches.push(`${prefix}_PROJECT_MOTION_PREFLIGHT_ERROR_STALE`);
      }
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
      ? "Browser verified the transport identity plus Project Motion preflight state and matched the bindings available to Motion Zukan. Run canonical motion-studio strict-current before starting Mac GUI Actual; browser audit still cannot prove the live handoffIdentitySha256 chain."
      : "Do not start Mac GUI Actual from this transported plan until the mismatch is resolved and canonical strict-current passes.",
    {transported: declaredIdentity, recomputed: recomputedIdentity, verified: identityVerified},
  );
}

export const defaultWeddingDavinciActualSessionPlanTransportAudit: WeddingDavinciActualSessionPlanTransportAudit = result(
  "NOT_RUN",
  [],
  "Load the canonical Motion Studio session-plan JSON to verify its transport identity, Project Motion preflight state, and transported common bindings. Canonical CLI strict-current remains authoritative.",
);
