import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const fusion = read("src/pages/FusionNodeTranslator.tsx");
const recovery = read("src/lib/davinciWeddingProductionRecovery.ts");
const gate = read("src/lib/palmierWeddingProductionGate.ts");
const studio = read("src/data/remotionStudioActualToolingEvidence.ts");

function requireAll(source, label, tokens) {
  for (const token of tokens) {
    if (!source.includes(token)) throw new Error(`${label} missing: ${token}`);
  }
}

requireAll(fusion, "Fusion UI", [
  "buildPalmierWeddingProductionGate",
  "WEDDING PRODUCTION AUTHORITY",
  "Fusion練習と本番DaVinci Actualを分離する",
  "const effectiveNextGate = project.effectiveNextGate",
  "EFFECTIVE NEXT GATE",
  "effectiveNextGate.authority",
  "effectiveNextGate.stage",
  "effectiveNextGate.artifactPath",
  "effectiveNextGate.blockerCodes",
  "effectiveNextGate.blockerActions",
  "effectiveNextGate.recovery",
  "CANONICAL WEDDING GATE",
  "project.nextGate.stage",
  "project.nextGate.artifactPath",
  "REMOTION PROJECT DEPENDENCY",
  "dependency.recoveryActions",
  'action.kind === "ROUTE"',
  "action.route",
  'action.kind === "COMMAND"',
  'action.kind === "HUMAN"',
  "REMOTION STUDIO TOOLING AUTHORITY",
  "studio.currentRepoState",
  "studio.summaryPath",
  "studio.evidencePath",
  "studio.statusCommand",
  "studio.strictCommand",
  "Tooling evidenceを表示・exportしてもStudio Actual verifiedにはなりません",
  "Element未採用ならWedding productionをBLOCKしません",
  "project.bridge.palmierCurrent",
  "project.bridge.davinciHandoffCurrent",
  "project.bridge.macDaVinciActualVerified",
  "project.bridge.finalDeliveryApproved",
  'project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"',
  "project.bridge.actualCommands.strict",
  "コマンド表示・initだけではActual verifiedになりません",
  "実際にResolve GUIで確認・exportしていない限り、このgateはPASSにしません",
  'to="/palmier-handoff"',
]);

requireAll(gate, "Wedding gate", [
  "resolvePalmierEffectiveNextGate",
  "effectiveNextGate",
  "SHA_BOUND_FINAL_RENDER",
  "CRITICAL_PATH_PRE_BUNDLE",
  "normalizeRecoverySnapshot",
  "remotionStudioToolingEvidence",
  "remotionStudioToolingDependency",
  "CANONICAL_NEXT_GATE_READY != EFFECTIVE_PRODUCTION_READY_WHEN_ADOPTED_DEPENDENCY_BLOCKS",
  "EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_ADOPTED_TOOLING_BLOCKER",
  "EFFECTIVE_NEXT_GATE_READY_REQUIRES_WEDDING_AND_ADOPTED_TOOLING_READY",
  "PRE_BUNDLE_RECOVERY_IS_NOT_FINAL_RENDER_SHA_BOUND",
  "SHA_BOUND_RECOVERY_EXPORTED != RECOVERY_EXECUTED",
]);

requireAll(studio, "Studio tooling evidence", [
  "MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_TOOLING_REFERENCE",
  "TOOLING_EVIDENCE_REFERENCED != STUDIO_ACTUAL_VERIFIED",
  "ELEMENT_NOT_ADOPTED_BY_PROJECT => TOOLING_ACTUAL_IS_NON_BLOCKING",
]);

requireAll(recovery, "DaVinci recovery", [
  "wedding-davinci-production-recovery/v3",
  "MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY",
  'effectiveNextGate: PalmierWeddingProductionProject["effectiveNextGate"]',
  "const effectiveNextGate = project.effectiveNextGate",
  "authority: effectiveNextGate.authority",
  "state: effectiveNextGate.state",
  "stage: effectiveNextGate.stage",
  "artifactPath: effectiveNextGate.artifactPath",
  "blockerCodes: [...effectiveNextGate.blockerCodes]",
  "blockerActions: effectiveNextGate.blockerActions.map(cloneEffectiveAction)",
  "recovery: [...effectiveNextGate.recovery]",
  "adoptedCandidateIds: [...effectiveNextGate.adoptedCandidateIds]",
  "EFFECTIVE_NEXT_GATE_EXPORTED != EFFECTIVE_GATE_COMPLETED",
  "EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_REMOTION_DEPENDENCY",
  "### Effective next gate",
  "### Canonical Wedding recovery",
  "REMOTION_STUDIO_TOOLING_REFERENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED",
  "REMOTION_STUDIO_DEPENDENCY_EXPORTED != DEPENDENCY_RECOVERY_EXECUTED",
  "REMOTION_STUDIO_DEPENDENCY_ROUTE_EXPORTED != RECOVERY_EXECUTED",
  "function markdownDependencyAction",
  'action.kind === "ROUTE" && action.route',
  "route=${action.route}",
  "ADOPTED_REMOTION_STUDIO_DEPENDENCY_BLOCKS_DAVINCI_PRODUCTION_UNTIL_READY",
  "MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT",
  "buildDaVinciWeddingProductionRecoveryJson",
  "buildDaVinciWeddingProductionRecoveryMarkdown",
]);

console.log("Fusion Wedding production authority contracts: PASS (effective gate + DaVinci recovery v3 + ROUTE preservation + GUI Actual fail-close)");
