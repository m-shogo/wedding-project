import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/data/weddingDavinciActualSessionPlan.ts"), "utf8");
const transportAudit = readFileSync(join(root, "src/data/weddingDavinciActualSessionPlanTransportAudit.ts"), "utf8");
const card = readFileSync(join(root, "src/components/WeddingDavinciDeliveryReadinessCard.tsx"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const token of [
  "wedding-davinci-actual-session-plan-dashboard/v1",
  "NOT_PROMOTED_BY_DASHBOARD",
  "Recovery sidecarをCURRENT化",
  "Project Motion provenanceを再検証",
  "Actual evidence templateを初期化",
  "MacのDaVinci ResolveでActual確認",
  "Current Actual evidenceをstrict検証",
  "Human final approvalを別証拠として開始",
  "projectMotionPreflight",
  "BLOCKED_PROJECT_MOTION_PREFLIGHT",
  "PROJECT_MOTION_PREFLIGHT_STATE_TRANSPORTED_WITH_SESSION_PLAN",
  "PROJECT_MOTION_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
  "PROJECT_MOTION_PREFLIGHT_CURRENT != GUI_ACTUAL_PASS",
  "EVIDENCE_TEMPLATE_EXISTS != GUI_ACTUAL_PASS",
  "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
]) {
  assert(data.includes(token), `session plan data missing token: ${token}`);
}

assert(data.includes('command: null'), "Mac GUI Actual must not expose an automation command");
assert(data.includes('productionReady: false as const'), "dashboard session plan must stay productionReady=false");
assert(!data.includes('productionReady: true'), "dashboard session plan must never synthesize productionReady=true");
assert(!data.includes('macDavinciResolveGuiActual: \"PASS\"'), "dashboard must never synthesize DaVinci Actual PASS");
assert(data.indexOf('kind: \"SAFE_PREP\"') < data.indexOf('kind: \"PROJECT_MOTION_PREFLIGHT\"'), "recovery must precede Project Motion preflight");
assert(data.indexOf('kind: \"PROJECT_MOTION_PREFLIGHT\"') < data.indexOf('kind: \"EVIDENCE_INIT\"'), "Project Motion preflight must precede evidence init");
assert(data.indexOf('kind: \"EVIDENCE_INIT\"') < data.indexOf('kind: \"MAC_GUI_ACTUAL\"'), "evidence init must precede GUI Actual");
assert(data.indexOf('kind: \"MAC_GUI_ACTUAL\"') < data.indexOf('kind: \"STRICT_VERIFY\"'), "GUI Actual must precede strict verification");
assert(data.indexOf('kind: \"STRICT_VERIFY\"') < data.indexOf('kind: \"HUMAN_FINAL_APPROVAL\"'), "strict verification must precede Human approval");

for (const token of [
  "wedding-davinci-actual-session-plan-transport-audit-dashboard/v3",
  "wedding-davinci-actual-session-plan/v1",
  "DERIVED_MAC_DAVINCI_ACTUAL_SESSION_PLAN",
  "CLI_REQUIRED",
  "SESSION_PLAN_CONTRACT_MISMATCH",
  "SESSION_PLAN_TRANSPORT_IDENTITY_MISSING",
  "SESSION_PLAN_TRANSPORT_IDENTITY_INVALID",
  "transportIdentityVerified",
  "recomputedIdentitySha256",
  "ACTUAL_RECOVERY_SHA_STALE",
  "EXPECTED_ACTUAL_EVIDENCE_SHA_STALE",
  "PROJECT_MOTION_PREFLIGHT_MISSING",
  "PROJECT_MOTION_PREFLIGHT_STATE_STALE",
  "PROJECT_MOTION_PREFLIGHT_APPLICABILITY_STALE",
  "PROJECT_MOTION_PREFLIGHT_CURRENTNESS_STALE",
  "PROJECT_MOTION_PREFLIGHT_COMMAND_STALE",
  "PROJECT_MOTION_PREFLIGHT_ERROR_STALE",
  "NOT_PROMOTED_BY_BROWSER_AUDIT",
  "--strict-current --snapshot <path>",
]) {
  assert(transportAudit.includes(token), `transport audit missing token: ${token}`);
}
assert(transportAudit.includes('const sha256 ='), "browser audit must recompute transport SHA-256");
assert(transportAudit.includes('JSON.stringify(transportBody)'), "browser SHA must bind the transported canonical body");
assert(transportAudit.includes('currentProject.projectMotionPreflight'), "browser audit must compare transported Project Motion preflight against live dashboard state");
assert(!transportAudit.includes('crypto.subtle'), "browser identity audit must remain synchronous for file-input flow");
assert(!transportAudit.includes('state: "CURRENT"'), "browser audit must never claim canonical CURRENT");
assert(!transportAudit.includes('productionReady: true'), "browser transport audit must never synthesize productionReady=true");

for (const token of [
  "buildWeddingDavinciActualSessionPlan",
  "TRANSPORTED SESSION PLAN AUDIT",
  "正本Session Plan JSONを監査",
  "Dashboard参照JSONを保存",
  "wedding-davinci-actual-session-plan-dashboard-reference.json",
  "wedding-davinci-actual-session-plan.mts --write",
  "HUMAN / MAC GUI",
]) {
  assert(card.includes(token), `Motion Zukan card missing token: ${token}`);
}

assert(card.includes("Browser一致だけではCURRENTにせず"), "UI must fail-close browser-only transport audit");
assert(card.includes("Dashboard参照JSONはUI表示用であり、transported strictの入力正本には使用しません"), "UI must distinguish dashboard reference from canonical transport file");
assert(card.includes("Evidence templateやこの画面の存在をActual PASSとして扱うことはありません"), "UI must state Actual evidence boundary");
assert(!card.includes("Actual Session Plan JSONを保存"), "dashboard must not label its reference export as the canonical session plan");

console.log("Wedding DaVinci Actual session plan dashboard contract: PASS");
console.log("Transported session-plan browser identity + Project Motion preflight: WIRED / FAIL-CLOSE");
console.log("Browser audit authority: CLI_REQUIRED, never CURRENT");
console.log("Dashboard reference JSON vs canonical transport JSON: DISTINGUISHED");
console.log("Mac/Studio GUI Actual synthetic promotion: FORBIDDEN");
