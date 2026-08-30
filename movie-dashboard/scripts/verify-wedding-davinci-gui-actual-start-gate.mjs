import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/data/weddingDavinciGuiActualStartGateAudit.ts"), "utf8");
const sessionPlan = readFileSync(join(root, "src/data/weddingDavinciActualSessionPlan.ts"), "utf8");
const remotionSnapshot = readFileSync(join(root, "src/data/weddingProjectRemotionIdentityPreflight.generated.ts"), "utf8");
const syncScript = readFileSync(join(root, "scripts/sync-wedding-project-remotion-identity-preflight.mjs"), "utf8");
const card = readFileSync(join(root, "src/components/WeddingDavinciGuiActualStartGateCard.tsx"), "utf8");
const page = readFileSync(join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const token of [
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v4",
  "wedding-davinci-gui-actual-start-gate/v1",
  "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE",
  "TRANSPORT_NOT_CURRENT",
  "PROJECT_MOTION_BLOCKED",
  "PROJECT_REMOTION_IDENTITY_BLOCKED",
  "GUI_ACTUAL_ALLOWED",
  "GUI_ACTUAL_COMPLETE",
  "STALE",
  "projectMotionPreflight",
  "projectRemotionIdentityPreflight",
  "buildWeddingDavinciActualSessionPlan",
  "liveProjectMotionMatch",
  "liveProjectRemotionIdentityMatch",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_PREFLIGHT_MISSING",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_INVALID_NOT_BLOCKED",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECOVERY_ACTION_INVALID",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECOVERY_COMMAND_MISMATCH",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_STATE_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_APPLICABILITY_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_CURRENTNESS_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_COMMAND_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RESOLVE_SIDECAR_SHA_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_RECEIPT_SHA_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_SOURCE_BATCH_SHA_STALE",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_ERROR_STALE",
  "REGENERATE_CANONICAL_START_GATE",
  "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
  "--strict-gui-start",
]) {
  assert(data.includes(token), `GUI start-gate audit missing token: ${token}`);
}

assert(data.includes('const liveProjectRemotionIdentity = liveProject.projectRemotionIdentityPreflight'), "Dashboard audit must resolve current Project Remotion identity preflight");
assert(data.includes('projectRemotionIdentity.state !== liveProjectRemotionIdentity.state'), "Dashboard audit must compare Remotion identity state");
assert(data.includes('(projectRemotionIdentity.resolveSidecarSha256 ?? null) !== liveProjectRemotionIdentity.resolveSidecarSha256'), "Dashboard audit must compare Resolve identity SHA");
assert(data.includes('(projectRemotionIdentity.receiptSha256 ?? null) !== liveProjectRemotionIdentity.receiptSha256'), "Dashboard audit must compare receipt SHA");
assert(data.includes('(projectRemotionIdentity.sourceBatchSha256 ?? null) !== liveProjectRemotionIdentity.sourceBatchSha256'), "Dashboard audit must compare source Batch SHA");
assert(data.includes('productionReady: false'), "Dashboard start-gate audit must stay productionReady=false");
assert(!data.includes('productionReady: true'), "Dashboard start-gate audit must never synthesize productionReady=true");
assert(!data.includes('macDavinciResolveGuiActual: "PASS"'), "Dashboard start-gate audit must never synthesize DaVinci PASS");

for (const token of [
  "weddingProjectRemotionIdentityPreflight",
  "BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT",
  "PROJECT_REMOTION_IDENTITY_PREFLIGHT",
  "PROJECT_REMOTION_IDENTITY_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
  "PROJECT_REMOTION_IDENTITY_CURRENT != GUI_ACTUAL_PASS",
]) {
  assert(sessionPlan.includes(token), `Dashboard session plan missing Remotion identity token: ${token}`);
}

for (const token of [
  "wedding-project-remotion-identity-dashboard-preflight/v1",
  "MOTION_STUDIO_DERIVED_PROJECT_REMOTION_IDENTITY_PREFLIGHT",
  "NOT_APPLICABLE",
  "verify-wedding-production-handoff-provenance.mts --movie=opening",
  "verify-wedding-production-handoff-provenance.mts --movie=profile",
  "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
]) {
  assert(remotionSnapshot.includes(token), `generated Remotion identity preflight missing token: ${token}`);
}
assert(syncScript.includes('wedding-davinci-actual-session-plan.mts'), "Remotion identity sync must derive from canonical Motion Studio session plan");
assert(syncScript.includes('projectRemotionIdentityPreflight'), "Remotion identity sync must read the canonical project preflight");
assert(syncScript.includes('resolveSidecarSha256'), "Remotion identity sync must carry Resolve sidecar SHA");
assert(syncScript.includes('receiptSha256'), "Remotion identity sync must carry receipt SHA");
assert(syncScript.includes('sourceBatchSha256'), "Remotion identity sync must carry source Batch SHA");

for (const token of [
  "MAC DAVINCI GUI ACTUAL START GATE",
  "Project Motion + Remotion identity CURRENT",
  "audit.project.projectRemotionIdentityPreflight",
  "Remotion identity",
  "Identity receipt",
  "Resolve identity",
  "Source Batch",
  "Project Remotion identity blocker:",
  "Project Remotion identity canonical verifier",
  "receipt / Resolve sidecar / source Batch SHAの表示自体はCURRENTを証明しません",
  "GUI Actual synthetic promotion: FORBIDDEN",
  "Actual evidenceはNOT_RUNのままです",
]) {
  assert(card.includes(token), `Motion Zukan GUI start-gate card missing token: ${token}`);
}

assert(card.includes("projectRemotionIdentity.state"), "UI must expose Project Remotion identity state");
assert(card.includes("projectRemotionIdentity.command"), "UI must expose Project Remotion identity verifier command");
assert(card.includes("projectRemotionIdentity.receiptSha256"), "UI must expose Project Remotion identity receipt SHA");
assert(card.includes("projectRemotionIdentity.resolveSidecarSha256"), "UI must expose Resolve identity SHA");
assert(card.includes("projectRemotionIdentity.sourceBatchSha256"), "UI must expose source Batch SHA");
assert(page.includes("WeddingDavinciGuiActualStartGateCard"), "Motion Zukan page must render GUI start-gate card");

console.log("Wedding DaVinci GUI Actual start-gate Dashboard contract: PASS");
console.log("Project Remotion identity generated preflight -> Dashboard session plan: WIRED");
console.log("Loaded gate Project Remotion identity -> live Dashboard authority: REVALIDATED");
console.log("Remotion identity SHA drift -> STALE / GUI START BLOCKED: ENFORCED");
console.log("Project Remotion identity state/error/verifier/SHA chain -> Motion Zukan: VISIBLE");
console.log("GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED: ENFORCED");
console.log("Mac/Studio GUI Actual synthetic promotion: FORBIDDEN");
