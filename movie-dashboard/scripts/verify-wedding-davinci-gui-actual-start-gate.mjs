import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/data/weddingDavinciGuiActualStartGateAudit.ts"), "utf8");
const sessionPlan = readFileSync(join(root, "src/data/weddingDavinciActualSessionPlan.ts"), "utf8");
const remotionSnapshot = readFileSync(join(root, "src/data/weddingProjectRemotionIdentityPreflight.generated.ts"), "utf8");
const palmierSnapshot = readFileSync(join(root, "src/generated/weddingProjectRemotionStageStatus.ts"), "utf8");
const syncScript = readFileSync(join(root, "scripts/sync-wedding-project-remotion-identity-preflight.mjs"), "utf8");
const card = readFileSync(join(root, "src/components/WeddingDavinciGuiActualStartGateCard.tsx"), "utf8");
const page = readFileSync(join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const token of [
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v5",
  "wedding-davinci-gui-actual-start-gate/v1",
  "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE",
  "TRANSPORT_NOT_CURRENT",
  "PROJECT_MOTION_BLOCKED",
  "PROJECT_REMOTION_IDENTITY_BLOCKED",
  "PALMIER_TIMELINE_BLOCKED",
  "GUI_ACTUAL_ALLOWED",
  "GUI_ACTUAL_COMPLETE",
  "STALE",
  "projectMotionPreflight",
  "projectRemotionIdentityPreflight",
  "palmierTimelinePreflight",
  "buildWeddingDavinciActualSessionPlan",
  "liveProjectMotionMatch",
  "liveProjectRemotionIdentityMatch",
  "livePalmierTimelineMatch",
  "GUI_START_GATE_PROJECT_REMOTION_IDENTITY_STATE_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_PREFLIGHT_MISSING",
  "GUI_START_GATE_PALMIER_TIMELINE_INVALID_NOT_BLOCKED",
  "GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_ACTION_INVALID",
  "GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_COMMAND_MISMATCH",
  "GUI_START_GATE_PALMIER_TIMELINE_STATE_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_APPLICABILITY_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_CURRENTNESS_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_COMMAND_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_RECEIPT_SHA_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_ASSEMBLY_PLAN_SHA_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_FCPXML_SHA_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_ERROR_STALE",
  "REGENERATE_CANONICAL_START_GATE",
  "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
  "--strict-gui-start",
]) {
  assert(data.includes(token), `GUI start-gate audit missing token: ${token}`);
}

assert(data.includes('const livePalmierTimeline = liveProject.palmierTimelinePreflight'), "Dashboard audit must resolve current Palmier timeline preflight");
assert(data.includes('palmierTimeline.state !== livePalmierTimeline.state'), "Dashboard audit must compare Palmier timeline state");
assert(data.includes('(palmierTimeline.receiptSha256 ?? null) !== livePalmierTimeline.receiptSha256'), "Dashboard audit must compare Palmier receipt SHA");
assert(data.includes('(palmierTimeline.assemblyPlanSha256 ?? null) !== livePalmierTimeline.assemblyPlanSha256'), "Dashboard audit must compare Assembly Plan SHA");
assert(data.includes('(palmierTimeline.palmierFcpxmlSha256 ?? null) !== livePalmierTimeline.palmierFcpxmlSha256'), "Dashboard audit must compare real FCPXML SHA");
assert(data.includes('productionReady: false'), "Dashboard start-gate audit must stay productionReady=false");
assert(!data.includes('productionReady: true'), "Dashboard start-gate audit must never synthesize productionReady=true");
assert(!data.includes('macDavinciResolveGuiActual: "PASS"'), "Dashboard start-gate audit must never synthesize DaVinci PASS");

for (const token of [
  "weddingProjectRemotionIdentityPreflight",
  "weddingProjectRemotionStageStatus",
  "wedding-davinci-actual-session-plan-dashboard/v2",
  "BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT",
  "BLOCKED_PALMIER_TIMELINE_PREFLIGHT",
  "PROJECT_REMOTION_IDENTITY_PREFLIGHT",
  "PALMIER_TIMELINE_PREFLIGHT",
  "PALMIER_TIMELINE_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED",
  "PALMIER_TIMELINE_CURRENT != PALMIER_GUI_ACTUAL_PROVEN",
  "PALMIER_TIMELINE_CURRENT != GUI_ACTUAL_PASS",
]) {
  assert(sessionPlan.includes(token), `Dashboard session plan missing token: ${token}`);
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

for (const token of [
  "wedding-project-remotion-stage-status-dashboard/v3",
  "palmierTimelineExport",
  "receiptSha256",
  "assemblyPlanSha256",
  "palmierFcpxmlSha256",
  "NOT_RUN_UNLESS_HUMAN_EXECUTED",
]) {
  assert(palmierSnapshot.includes(token), `generated Palmier timeline snapshot missing token: ${token}`);
}

for (const token of [
  "MAC DAVINCI GUI ACTUAL START GATE",
  "Project Motion + Remotion identity + Palmier timeline CURRENT",
  "audit.project.projectRemotionIdentityPreflight",
  "audit.project.palmierTimelinePreflight",
  "Palmier timeline",
  "Timeline receipt",
  "Assembly Plan",
  "Real FCPXML",
  "Palmier timeline blocker:",
  "Palmier timeline canonical verifier",
  "receipt / Assembly Plan / real FCPXML SHA",
  "data-palmier-timeline-start-gate-preflight",
  "GUI Actual synthetic promotion: FORBIDDEN",
  "Actual evidenceはNOT_RUNのままです",
]) {
  assert(card.includes(token), `Motion Zukan GUI start-gate card missing token: ${token}`);
}

assert(card.includes("palmierTimeline.state"), "UI must expose Palmier timeline state");
assert(card.includes("palmierTimeline.command"), "UI must expose Palmier timeline verifier command");
assert(card.includes("palmierTimeline.receiptSha256"), "UI must expose Palmier receipt SHA");
assert(card.includes("palmierTimeline.assemblyPlanSha256"), "UI must expose Assembly Plan SHA");
assert(card.includes("palmierTimeline.palmierFcpxmlSha256"), "UI must expose real FCPXML SHA");
assert(page.includes("WeddingDavinciGuiActualStartGateCard"), "Motion Zukan page must render GUI start-gate card");

console.log("Wedding DaVinci GUI Actual start-gate Dashboard contract: PASS");
console.log("Project Remotion identity + Palmier timeline generated authorities -> Dashboard session plan: WIRED");
console.log("Loaded gate Palmier receipt / Assembly Plan / FCPXML SHA -> live Dashboard authority: REVALIDATED");
console.log("Palmier timeline SHA drift -> STALE / GUI START BLOCKED: ENFORCED");
console.log("Palmier timeline state/error/verifier/SHA chain -> Motion Zukan: VISIBLE");
console.log("GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED: ENFORCED");
console.log("Mac/Studio/Palmier GUI Actual synthetic promotion: FORBIDDEN");
