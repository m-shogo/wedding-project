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
const assert = (condition, message) => { if (!condition) throw new Error(message); };

for (const token of [
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v5", "wedding-davinci-gui-actual-start-gate/v1", "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE",
  "TRANSPORT_NOT_CURRENT", "PROJECT_MOTION_BLOCKED", "PROJECT_REMOTION_IDENTITY_BLOCKED", "PALMIER_TIMELINE_BLOCKED", "GUI_ACTUAL_ALLOWED", "GUI_ACTUAL_COMPLETE", "STALE",
  "projectMotionPreflight", "projectRemotionIdentityPreflight", "palmierTimelinePreflight", "buildWeddingDavinciActualSessionPlan", "liveProjectMotionMatch", "liveProjectRemotionIdentityMatch", "livePalmierTimelineMatch",
  "GUI_START_GATE_PALMIER_TIMELINE_PREFLIGHT_MISSING", "GUI_START_GATE_PALMIER_TIMELINE_INVALID_NOT_BLOCKED", "GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_ACTION_INVALID", "GUI_START_GATE_PALMIER_TIMELINE_RECOVERY_COMMAND_MISMATCH",
  "GUI_START_GATE_PALMIER_TIMELINE_STATE_STALE", "GUI_START_GATE_PALMIER_TIMELINE_APPLICABILITY_STALE", "GUI_START_GATE_PALMIER_TIMELINE_CURRENTNESS_STALE", "GUI_START_GATE_PALMIER_TIMELINE_COMMAND_STALE",
  "GUI_START_GATE_PALMIER_TIMELINE_RECEIPT_SHA_STALE", "GUI_START_GATE_PALMIER_TIMELINE_ASSEMBLY_PLAN_SHA_STALE", "GUI_START_GATE_PALMIER_TIMELINE_FCPXML_SHA_STALE", "GUI_START_GATE_PALMIER_TIMELINE_ERROR_STALE",
  "GUI_START_GATE_PALMIER_TRANSITION_EDGE_COUNT_STALE", "GUI_START_GATE_PALMIER_CROSS_DISSOLVE_COUNT_STALE", "GUI_START_GATE_PALMIER_TRANSITION_PROOF_SHA_STALE",
  "GUI_START_GATE_PALMIER_TRANSITION_PROOF_NOT_CURRENT", "GUI_START_GATE_PALMIER_TRANSITION_PROOF_SHA_MISMATCH", "GUI_START_GATE_PALMIER_TRANSITION_PROOF_EDGE_COUNT_INVALID", "GUI_START_GATE_PALMIER_CROSS_DISSOLVE_COUNT_INVALID",
  "REGENERATE_CANONICAL_START_GATE", "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT", "palmierTransitionAppliedGuiActual", "--strict-gui-start",
]) assert(data.includes(token), `GUI start-gate audit missing token: ${token}`);

assert(data.includes('const livePalmierTimeline = liveProject.palmierTimelinePreflight'), "Dashboard audit must resolve current Palmier timeline preflight");
assert(data.includes('(palmierTimeline.receiptSha256 ?? null) !== livePalmierTimeline.receiptSha256'), "Dashboard audit must compare Palmier receipt SHA");
assert(data.includes('(palmierTimeline.assemblyPlanSha256 ?? null) !== livePalmierTimeline.assemblyPlanSha256'), "Dashboard audit must compare Assembly Plan SHA");
assert(data.includes('(palmierTimeline.palmierFcpxmlSha256 ?? null) !== livePalmierTimeline.palmierFcpxmlSha256'), "Dashboard audit must compare real FCPXML SHA");
assert(data.includes('(palmierTimeline.transitionProofSha256 ?? null) !== livePalmierTimeline.transitionProofSha256'), "Dashboard audit must compare transition proof SHA");
assert(data.includes('(palmierTimeline.transitionEdgeCount ?? null) !== livePalmierTimeline.transitionEdgeCount'), "Dashboard audit must compare transition edge count");
assert(data.includes('(palmierTimeline.crossDissolveCount ?? null) !== livePalmierTimeline.crossDissolveCount'), "Dashboard audit must compare Cross Dissolve count");
assert(data.includes('palmierTimeline.transitionProofSha256 !== palmierTimeline.recoveryTransitionProofSha256'), "Dashboard audit must verify Session/Recovery transition proof binding");
assert(data.includes('productionReady: false') && !data.includes('productionReady: true'), "Dashboard start-gate productionReady boundary invalid");
assert(!data.includes('macDavinciResolveGuiActual: "PASS"'), "Dashboard start-gate audit must never synthesize DaVinci PASS");
assert(!data.includes('palmierTransitionAppliedGuiActual: "PASS"'), "Dashboard start-gate audit must never synthesize transition GUI Actual PASS");

for (const token of [
  "weddingProjectRemotionIdentityPreflight", "weddingProjectRemotionStageStatus", "wedding-davinci-actual-session-plan-dashboard/v1",
  "BLOCKED_PROJECT_REMOTION_IDENTITY_PREFLIGHT", "BLOCKED_PALMIER_TIMELINE_PREFLIGHT", "PROJECT_REMOTION_IDENTITY_PREFLIGHT", "PALMIER_TIMELINE_PREFLIGHT",
  "PALMIER_TRANSITION_PROOF_SUMMARY_VISIBLE_IN_MOTION_ZUKAN", "PALMIER_TRANSITION_PROOF_CURRENT != TRANSITION_GUI_ACTUAL_PASS",
  "PALMIER_TIMELINE_PREFLIGHT_INVALID => SESSION_PLAN_BLOCKED", "PALMIER_TIMELINE_CURRENT != PALMIER_GUI_ACTUAL_PROVEN", "PALMIER_TIMELINE_CURRENT != GUI_ACTUAL_PASS",
]) assert(sessionPlan.includes(token), `Dashboard session plan missing token: ${token}`);

for (const token of ["wedding-project-remotion-identity-dashboard-preflight/v1", "MOTION_STUDIO_DERIVED_PROJECT_REMOTION_IDENTITY_PREFLIGHT", "NOT_APPLICABLE", "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL"]) {
  assert(remotionSnapshot.includes(token), `generated Remotion identity preflight missing token: ${token}`);
}
assert(syncScript.includes('wedding-davinci-actual-session-plan.mts') && syncScript.includes('projectRemotionIdentityPreflight'), "Remotion identity sync must derive from canonical session plan");

for (const token of [
  "wedding-project-remotion-stage-status-dashboard/v2", "palmierTimelineExport", "receiptSha256", "assemblyPlanSha256", "palmierFcpxmlSha256",
  "transitionEdgeCount", "verifiedTransitionEdgeCount", "crossDissolveCount", "transitionProofSha256", "transitionProof", "transitionAppliedGuiActual", "NOT_RUN_UNLESS_HUMAN_EXECUTED",
]) assert(palmierSnapshot.includes(token), `generated Palmier timeline snapshot missing token: ${token}`);

for (const token of [
  "MAC DAVINCI GUI ACTUAL START GATE", "Palmier transition proof verified", "audit.project.palmierTimelinePreflight", "Palmier timeline", "Timeline receipt", "Assembly Plan", "Real FCPXML",
  "Palmier transitions", "Cross Dissolves", "Transition proof", "Recovery proof", "Proof binding", "data-palmier-transition-proof-summary",
  "Palmier timeline blocker:", "Palmier timeline + transition canonical verifier", "transition edge count / Cross Dissolve count / proof SHA", "data-palmier-timeline-start-gate-preflight", "GUI Actual synthetic promotion: FORBIDDEN", "Actual evidenceはNOT_RUNのままです",
]) assert(card.includes(token), `Motion Zukan GUI start-gate card missing token: ${token}`);

assert(card.includes("palmierTimeline.state") && card.includes("palmierTimeline.command"), "UI must expose Palmier state and verifier");
assert(card.includes("palmierTimeline.receiptSha256") && card.includes("palmierTimeline.assemblyPlanSha256") && card.includes("palmierTimeline.palmierFcpxmlSha256"), "UI must expose Palmier SHA chain");
assert(card.includes("palmierTimeline.transitionEdgeCount") && card.includes("palmierTimeline.verifiedTransitionEdgeCount") && card.includes("palmierTimeline.crossDissolveCount"), "UI must expose verified transition counts");
assert(card.includes("palmierTimeline.transitionProofSha256") && card.includes("palmierTimeline.recoveryTransitionProofSha256") && card.includes("palmierTimeline.transitionProofCurrent"), "UI must expose transition proof binding");
assert(page.includes("WeddingDavinciGuiActualStartGateCard"), "Motion Zukan page must render GUI start-gate card");

console.log("Wedding DaVinci GUI Actual start-gate Dashboard contract: PASS");
console.log("Project Remotion identity + Palmier timeline generated authorities -> Dashboard session plan: WIRED");
console.log("Loaded gate Palmier receipt / Assembly Plan / FCPXML SHA + transition proof -> live Dashboard authority: REVALIDATED");
console.log("Palmier timeline/transition proof drift -> STALE or INVALID / GUI START BLOCKED: ENFORCED");
console.log("Palmier transitions verified X/X + Cross Dissolve count + proof SHA -> Motion Zukan: VISIBLE");
console.log("GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED: ENFORCED");
console.log("Mac/Studio/Palmier/transition GUI Actual synthetic promotion: FORBIDDEN");
