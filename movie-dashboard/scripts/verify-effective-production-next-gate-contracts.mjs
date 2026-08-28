import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const gateSource = fs.readFileSync(path.join(root, "src/lib/palmierWeddingProductionGate.ts"), "utf8");
const recoverySource = fs.readFileSync(path.join(root, "src/lib/davinciWeddingProductionRecovery.ts"), "utf8");

const requireText = (haystack, text, label) => {
  if (!haystack.includes(text)) throw new Error(`missing ${label}: ${text}`);
};

for (const [text, label] of [
  ["export type PalmierEffectiveNextGate", "effective next gate type"],
  ["export function resolvePalmierEffectiveNextGate", "single effective next gate resolver"],
  ['if (nextGate.state !== "PRODUCTION_READY")', "Wedding blocker priority branch"],
  ['authority: "MOTION_STUDIO_WEDDING_PRODUCTION_GATE"', "Wedding blocker authority"],
  ['state: "WEDDING_PRODUCTION_BLOCKED"', "Wedding effective state"],
  ["if (toolingDependency.blocking)", "adopted Remotion blocker branch"],
  ['state: "REMOTION_STUDIO_TOOLING_BLOCKED"', "Remotion effective state"],
  ['stage: "remotionStudioToolingDependency"', "Remotion dependency stage"],
  ['artifactPath: toolingDependency.evidencePath', "Remotion evidence artifact"],
  ['`REMOTION_STUDIO_TOOLING:${toolingDependency.state}`', "stable Remotion dependency blocker code"],
  ['authority: null', "ready authority"],
  ['state: "PRODUCTION_READY"', "ready state"],
  ["effectiveNextGate: effective.effectiveNextGate", "project carrier"],
  ["EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_ADOPTED_TOOLING_BLOCKER", "Wedding-first guardrail"],
  ["EFFECTIVE_NEXT_GATE_READY_REQUIRES_WEDDING_AND_ADOPTED_TOOLING_READY", "combined-ready guardrail"],
  ["effective-next-authority:", "Palmier Markdown effective authority"],
  ["effective-next-stage:", "Palmier Markdown effective stage"],
  ["effective-next-blocker-codes:", "Palmier Markdown effective blockers"],
  ["effective-next-recovery-actions:", "Palmier Markdown effective actions"],
]) requireText(gateSource, text, label);

for (const [text, label] of [
  ['wedding-davinci-production-recovery/v2', "additive DaVinci recovery schema"],
  ['effectiveNextGate: PalmierWeddingProductionProject["effectiveNextGate"]', "DaVinci effective next gate type"],
  ["const effectiveNextGate = project.effectiveNextGate", "DaVinci effective next gate source"],
  ["authority: effectiveNextGate.authority", "effective authority propagation"],
  ["state: effectiveNextGate.state", "effective state propagation"],
  ["stage: effectiveNextGate.stage", "effective stage propagation"],
  ["artifactPath: effectiveNextGate.artifactPath", "effective artifact propagation"],
  ["blockerCodes: [...effectiveNextGate.blockerCodes]", "effective blocker propagation"],
  ["blockerActions: effectiveNextGate.blockerActions.map(cloneEffectiveAction)", "effective structured recovery propagation"],
  ["recovery: [...effectiveNextGate.recovery]", "effective canonical recovery propagation"],
  ["adoptedCandidateIds: [...effectiveNextGate.adoptedCandidateIds]", "adopted candidate propagation"],
  ["EFFECTIVE_NEXT_GATE_EXPORTED != EFFECTIVE_GATE_COMPLETED", "effective gate export guardrail"],
  ["EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_REMOTION_DEPENDENCY", "DaVinci Wedding-first guardrail"],
  ["### Effective next gate", "DaVinci Markdown effective gate section"],
  ["effective-next-authority:", "DaVinci Markdown authority"],
  ["effective-next-state:", "DaVinci Markdown state"],
  ["effective-next-artifact:", "DaVinci Markdown artifact"],
  ["effective-next-recovery-actions:", "DaVinci Markdown structured recovery"],
  ["### Canonical Wedding recovery", "canonical recovery remains separately visible"],
]) requireText(recoverySource, text, label);

const weddingBranch = gateSource.indexOf('if (nextGate.state !== "PRODUCTION_READY")');
const toolingBranch = gateSource.indexOf("if (toolingDependency.blocking)");
const readyBranch = gateSource.indexOf('state: "PRODUCTION_READY"', toolingBranch);
if (!(weddingBranch >= 0 && toolingBranch > weddingBranch && readyBranch > toolingBranch)) {
  throw new Error("effective next gate priority must be Wedding blocker -> adopted Remotion blocker -> ready");
}

console.log("Effective Wedding production next gate contracts: PASS");
