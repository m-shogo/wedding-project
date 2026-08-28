import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const source = read("src/pages/FusionNodeTranslator.tsx");
const recoverySource = read("src/lib/davinciWeddingProductionRecovery.ts");
const gateSource = read("src/lib/palmierWeddingProductionGate.ts");
const studioEvidenceSource = read("src/data/remotionStudioActualToolingEvidence.ts");

const requireText = (haystack, text, label) => {
  if (!haystack.includes(text)) throw new Error(`missing ${label}: ${text}`);
};

for (const [text, label] of [
  ["useProduction", "selected movie production context"],
  ["buildPalmierWeddingProductionGate", "canonical production authority"],
  ["showMovieSelector", "movie selector"],
  ["WEDDING PRODUCTION AUTHORITY", "production authority section"],
  ["Fusion練習と本番DaVinci Actualを分離する", "learning versus Actual boundary"],
  ["const effectiveNextGate = project.effectiveNextGate", "effective next gate source"],
  ["EFFECTIVE NEXT GATE", "effective next gate section"],
  ["effectiveNextGate.state", "effective state rendering"],
  ["effectiveNextGate.authority", "effective authority rendering"],
  ["effectiveNextGate.stage", "effective stage rendering"],
  ["effectiveNextGate.artifactPath", "effective artifact rendering"],
  ["effectiveNextGate.blockerCodes", "effective blocker rendering"],
  ["effectiveNextGate.blockerActions", "effective structured recovery rendering"],
  ["effectiveNextGate.recovery", "effective canonical recovery rendering"],
  ["CANONICAL WEDDING GATE", "canonical Wedding audit section"],
  ["project.nextGate.stage", "canonical Wedding stage audit"],
  ["project.nextGate.artifactPath", "canonical Wedding artifact audit"],
  ["project.blockingAuthorities", "blocking authority rendering"],
  ["Fusion独自判定ではなくPalmierと同じ中央resolverを使用します", "single resolver honesty note"],
  ["const dependency = project.remotionStudioToolingDependency", "Remotion dependency source"],
  ["REMOTION PROJECT DEPENDENCY", "Remotion dependency section"],
  ["dependency.state", "dependency state"],
  ["dependency.adoptedCandidateIds", "adopted candidate ids"],
  ["dependency.studioActualVerified", "Studio Actual state"],
  ["dependency.humanReviewed", "Human review state"],
  ["dependency.dependencyPromoted", "dependency promotion state"],
  ["dependency.recoveryActions", "dependency recovery actions"],
  ['action.kind === "ROUTE"', "route recovery UI"],
  ["action.route", "route target UI"],
  ['action.kind === "COMMAND"', "command recovery UI"],
  ['action.kind === "HUMAN"', "human recovery UI"],
  ["Fusion画面から自動昇格しません", "Human fail-close warning"],
  ["Wedding projectへ明示採用した場合だけ", "explicit adoption copy"],
  ["const studio = project.remotionStudioToolingEvidence", "tooling evidence source"],
  ["REMOTION STUDIO TOOLING AUTHORITY", "tooling authority section"],
  ["studio.currentRepoState", "tooling current state"],
  ["studio.candidateCount", "candidate count"],
  ["studio.checkAxesPerCandidate", "check count"],
  ["studio.humanReviewed", "tooling Human review"],
  ["studio.productionDependencyPromoted", "tooling promotion"],
  ["studio.summaryPath", "tooling summary path"],
  ["studio.evidencePath", "tooling evidence path"],
  ["studio.statusCommand", "tooling status command"],
  ["studio.strictCommand", "tooling strict command"],
  ["Tooling evidenceを表示・exportしてもStudio Actual verifiedにはなりません", "tooling fail-close copy"],
  ["Element未採用ならWedding productionをBLOCKしません", "tooling non-blocking copy"],
  ["project.bridge.palmierCurrent", "Palmier current checkpoint"],
  ["project.bridge.davinciHandoffCurrent", "DaVinci current checkpoint"],
  ["project.bridge.macDaVinciActualVerified", "Mac Actual checkpoint"],
  ["project.bridge.finalDeliveryApproved", "final approval checkpoint"],
  ['project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"', "Mac Actual gate condition"],
  ["project.bridge.actualEvidencePath", "Actual evidence path"],
  ["project.bridge.actualCommands.init", "Actual init command"],
  ["project.bridge.actualCommands.status", "Actual status command"],
  ["project.bridge.actualCommands.strict", "Actual strict command"],
  ["コマンド表示・initだけではActual verifiedになりません", "Actual command fail-close warning"],
  ["実際にResolve GUIで確認・exportしていない限り、このgateはPASSにしません", "Actual GUI fail-close warning"],
  ['to="/palmier-handoff"', "production handoff navigation"],
]) requireText(source, text, label);

for (const [text, label] of [
  ["resolvePalmierEffectiveNextGate", "effective next gate resolver"],
  ["effectiveNextGate", "effective next gate carrier"],
  ["SHA_BOUND_FINAL_RENDER", "SHA-bound recovery authority"],
  ["CRITICAL_PATH_PRE_BUNDLE", "pre-bundle recovery authority"],
  ["normalizeRecoverySnapshot", "recovery normalization"],
  ["remotionStudioToolingEvidence", "tooling evidence carrier"],
  ["remotionStudioToolingDependency", "tooling dependency carrier"],
  ["CANONICAL_NEXT_GATE_READY != EFFECTIVE_PRODUCTION_READY_WHEN_ADOPTED_DEPENDENCY_BLOCKS", "canonical/effective guardrail"],
  ["EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_ADOPTED_TOOLING_BLOCKER", "Wedding-first effective gate guardrail"],
  ["EFFECTIVE_NEXT_GATE_READY_REQUIRES_WEDDING_AND_ADOPTED_TOOLING_READY", "combined-ready guardrail"],
  ["PRE_BUNDLE_RECOVERY_IS_NOT_FINAL_RENDER_SHA_BOUND", "pre-bundle honesty guardrail"],
  ["SHA_BOUND_RECOVERY_EXPORTED != RECOVERY_EXECUTED", "recovery execution guardrail"],
]) requireText(gateSource, text, label);

for (const [text, label] of [
  ["MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_TOOLING_REFERENCE", "tooling reference authority"],
  ["TOOLING_EVIDENCE_REFERENCED != STUDIO_ACTUAL_VERIFIED", "tooling evidence fail-close"],
  ["ELEMENT_NOT_ADOPTED_BY_PROJECT => TOOLING_ACTUAL_IS_NON_BLOCKING", "unadopted non-blocking guardrail"],
]) requireText(studioEvidenceSource, text, label);

for (const [text, label] of [
  ["wedding-davinci-production-recovery/v2", "DaVinci recovery schema"],
  ["MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY", "DaVinci recovery authority"],
  ['effectiveNextGate: PalmierWeddingProductionProject["effectiveNextGate"]', "effective next gate type propagation"],
  ["const effectiveNextGate = project.effectiveNextGate", "effective gate recovery source"],
  ["authority: effectiveNextGate.authority", "effective authority propagation"],
  ["state: effectiveNextGate.state", "effective state propagation"],
  ["stage: effectiveNextGate.stage", "effective stage propagation"],
  ["artifactPath: effectiveNextGate.artifactPath", "effective artifact propagation"],
  ["blockerCodes: [...effectiveNextGate.blockerCodes]", "effective blocker propagation"],
  ["blockerActions: effectiveNextGate.blockerActions.map(cloneEffectiveAction)", "effective action propagation"],
  ["recovery: [...effectiveNextGate.recovery]", "effective recovery propagation"],
  ["adoptedCandidateIds: [...effectiveNextGate.adoptedCandidateIds]", "adopted candidate propagation"],
  ["EFFECTIVE_NEXT_GATE_EXPORTED != EFFECTIVE_GATE_COMPLETED", "effective gate export guardrail"],
  ["EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_REMOTION_DEPENDENCY", "DaVinci Wedding-first guardrail"],
  ["### Effective next gate", "effective gate Markdown"],
  ["### Canonical Wedding recovery", "canonical recovery audit Markdown"],
  ["REMOTION_STUDIO_TOOLING_REFERENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED", "Studio tooling export guardrail"],
  ["REMOTION_STUDIO_DEPENDENCY_EXPORTED != DEPENDENCY_RECOVERY_EXECUTED", "dependency export guardrail"],
  ["ADOPTED_REMOTION_STUDIO_DEPENDENCY_BLOCKS_DAVINCI_PRODUCTION_UNTIL_READY", "adopted dependency fail-close"],
  ["MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT", "Mac Actual NOT_RUN guardrail"],
  ["buildDaVinciWeddingProductionRecoveryJson", "machine-readable recovery export"],
  ["buildDaVinciWeddingProductionRecoveryMarkdown", "human-readable recovery export"],
]) requireText(recoverySource, text, label);

console.log("Fusion Wedding production authority contracts: PASS");
