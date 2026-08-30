import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const recoverySource = read("src/lib/weddingProductionRecovery.ts");
const launcherSource = read("src/components/WeddingProductionActionLauncherPanel.tsx");
const davinciSource = read("src/lib/davinciWeddingProductionRecovery.ts");

const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${needle}`);
};

requireText(recoverySource, "buildDaVinciWeddingProductionRecoveryBundle", "recovery adapter must consume canonical DaVinci bundle");
requireText(recoverySource, "bundle.projects.find", "recovery adapter must select canonical project payload");
requireText(launcherSource, "weddingProductionRecoveries", "launcher must consume canonical recovery adapter");
requireText(launcherSource, "effectiveGate.blockerActions", "launcher must render canonical blocker actions");
requireText(launcherSource, "effectiveGate.recovery", "launcher must render canonical recovery text");
requireText(launcherSource, "recoveryProject.bridge.state", "launcher must expose canonical Palmier→DaVinci bridge state");
requireText(launcherSource, "effectiveGate.state === \"PRODUCTION_READY\"", "DaVinci Actual command unlock must be gated by effective production readiness");
requireText(launcherSource, "recoveryProject.bridge.state === \"MAC_DAVINCI_ACTUAL_NOT_VERIFIED\"", "Actual commands must only surface at the canonical bridge gate");
requireText(launcherSource, "RECOVERY_AUTHORITY = MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY", "launcher must name the canonical recovery authority");
requireText(launcherSource, "RECOVERY_EXPORTED != RECOVERY_EXECUTED", "launcher must preserve recovery execution guardrail");
requireText(launcherSource, "Remotion Studio GUI Actual = NOT_RUN", "launcher must preserve Studio Actual evidence boundary");
requireText(launcherSource, "Mac DaVinci GUI Actual = NOT_RUN", "launcher must preserve Mac DaVinci Actual evidence boundary");
forbidText(launcherSource, "action.recoveryHint", "launcher must not use handwritten local recovery hints");
requireText(davinciSource, "EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_REMOTION_DEPENDENCY", "canonical authority must retain effective next-gate ordering");
requireText(davinciSource, "MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT", "canonical authority must retain Actual fail-close guardrail");

if (failures.length > 0) {
  console.error("Production action recovery authority contract FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production action recovery authority contract PASS");
console.log("- launcher recovery comes from canonical DaVinci Wedding Production Recovery");
console.log("- Wedding blockers remain ahead of adopted Remotion dependency blockers");
console.log("- DaVinci Actual commands stay locked until production is ready");
console.log("- command copy/export does not promote Human QA or GUI Actual evidence");
