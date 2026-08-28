import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src/pages/FusionNodeTranslator.tsx"), "utf8");
const recoverySource = fs.readFileSync(path.join(root, "src/lib/davinciWeddingProductionRecovery.ts"), "utf8");
const gateSource = fs.readFileSync(path.join(root, "src/lib/palmierWeddingProductionGate.ts"), "utf8");
const studioEvidenceSource = fs.readFileSync(path.join(root, "src/data/remotionStudioActualToolingEvidence.ts"), "utf8");

const requireText = (haystack, text, label) => {
  if (!haystack.includes(text)) throw new Error(`missing ${label}: ${text}`);
};

requireText(source, 'useProduction', 'selected movie production context');
requireText(source, 'buildPalmierWeddingProductionGate', 'canonical Wedding production authority');
requireText(source, 'showMovieSelector', 'movie-specific production authority selector');
requireText(source, 'WEDDING PRODUCTION AUTHORITY', 'visible production authority section');
requireText(source, 'Fusion練習と本番DaVinci Actualを分離する', 'learning versus Actual boundary');
requireText(source, 'project.bridge.palmierCurrent', 'Palmier current checkpoint');
requireText(source, 'project.bridge.davinciHandoffCurrent', 'DaVinci handoff checkpoint');
requireText(source, 'project.bridge.macDaVinciActualVerified', 'Mac Actual checkpoint');
requireText(source, 'project.bridge.finalDeliveryApproved', 'Final delivery checkpoint');
requireText(source, 'project.nextGate.stage', 'current production stage');
requireText(source, 'project.nextGate.artifactPath', 'current production artifact');
requireText(source, 'project.nextGate.blockerCodes', 'stable production blocker codes');
requireText(source, 'project.nextGate.blockerActions', 'structured production blocker actions');
requireText(source, 'action.kind === "ROUTE"', 'route recovery action rendering');
requireText(source, 'action.kind === "COMMAND"', 'command recovery action rendering');
requireText(source, 'action.kind === "HUMAN"', 'human recovery action fail-close rendering');
requireText(source, 'project.nextGate.recovery', 'canonical production recovery rendering');
requireText(source, 'Human action required · この画面からPASSへ昇格しません', 'human recovery fail-close warning');
requireText(source, 'project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"', 'Mac Actual gate condition');
requireText(source, 'project.bridge.actualEvidencePath', 'Actual evidence path at Mac gate');
requireText(source, 'project.bridge.actualCommands.init', 'Actual evidence init command');
requireText(source, 'project.bridge.actualCommands.status', 'Actual evidence status command');
requireText(source, 'project.bridge.actualCommands.strict', 'Actual evidence strict command');
requireText(source, 'コマンド表示・initだけではActual verifiedになりません', 'Actual command fail-close warning');
requireText(source, '実際にResolve GUIで確認・exportしていない限り、このgateはPASSにしません', 'Actual fail-close warning');
requireText(source, 'to="/palmier-handoff"', 'canonical production handoff navigation');

requireText(gateSource, 'SHA_BOUND_FINAL_RENDER', 'SHA-bound recovery authority');
requireText(gateSource, 'CRITICAL_PATH_PRE_BUNDLE', 'pre-bundle recovery authority');
requireText(gateSource, 'sourceRenderSha256', 'recovery render SHA provenance');
requireText(gateSource, 'normalizeRecoverySnapshot', 'recovery authority normalization');
requireText(gateSource, 'remotionStudioToolingEvidence', 'Remotion Studio tooling evidence carrier');
requireText(gateSource, 'PRE_BUNDLE_RECOVERY_IS_NOT_FINAL_RENDER_SHA_BOUND', 'pre-bundle honesty guardrail');
requireText(gateSource, 'SHA_BOUND_RECOVERY_EXPORTED != RECOVERY_EXECUTED', 'SHA-bound execution guardrail');

requireText(studioEvidenceSource, 'MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_TOOLING_REFERENCE', 'Studio tooling reference authority');
requireText(studioEvidenceSource, 'TOOLING_EVIDENCE_REFERENCED != STUDIO_ACTUAL_VERIFIED', 'Studio tooling fail-close guardrail');
requireText(studioEvidenceSource, 'ELEMENT_NOT_ADOPTED_BY_PROJECT => TOOLING_ACTUAL_IS_NON_BLOCKING', 'non-adopted tooling non-blocking guardrail');

requireText(recoverySource, 'wedding-davinci-production-recovery/v1', 'DaVinci recovery schema');
requireText(recoverySource, 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY', 'DaVinci recovery authority');
requireText(recoverySource, 'artifactPath: project.nextGate.artifactPath', 'artifact path propagation');
requireText(recoverySource, 'recoveryAuthority: recovery.authority', 'selected recovery authority propagation');
requireText(recoverySource, 'sourceRenderSha256: recovery.sourceRenderSha256', 'render SHA provenance propagation');
requireText(recoverySource, 'blockerCodes: [...recovery.blockerCodes]', 'authority-aware stable blocker propagation');
requireText(recoverySource, 'blockerActions: recovery.blockerActions.map(cloneAction)', 'authority-aware structured action propagation');
requireText(recoverySource, 'canonicalRecovery: [...recovery.canonicalRecovery]', 'authority-aware canonical recovery propagation');
requireText(recoverySource, 'recoveryGuardrails: [...recovery.guardrails]', 'recovery-specific guardrail propagation');
requireText(recoverySource, 'palmierContractVersion: project.bridge.palmierContractVersion', 'Palmier contract provenance');
requireText(recoverySource, 'davinciContractVersion: project.bridge.davinciContractVersion', 'DaVinci contract provenance');
requireText(recoverySource, 'evidencePath: project.bridge.actualEvidencePath', 'DaVinci Actual evidence path propagation');
requireText(recoverySource, 'commands: {...project.bridge.actualCommands}', 'DaVinci Actual command propagation');
requireText(recoverySource, 'const studio = project.remotionStudioToolingEvidence', 'Studio tooling evidence source');
requireText(recoverySource, 'authority: studio.authority', 'Studio tooling authority propagation');
requireText(recoverySource, 'summaryPath: studio.summaryPath', 'Studio tooling summary path propagation');
requireText(recoverySource, 'summarySchemaVersion: studio.summarySchemaVersion', 'Studio tooling summary schema propagation');
requireText(recoverySource, 'summaryAuthority: studio.summaryAuthority', 'Studio tooling summary authority propagation');
requireText(recoverySource, 'evidencePath: studio.evidencePath', 'Studio tooling evidence path propagation');
requireText(recoverySource, 'statusCommand: studio.statusCommand', 'Studio tooling status command propagation');
requireText(recoverySource, 'strictCommand: studio.strictCommand', 'Studio tooling strict command propagation');
requireText(recoverySource, 'candidateCount: studio.candidateCount', 'Studio tooling candidate count propagation');
requireText(recoverySource, 'checkAxesPerCandidate: studio.checkAxesPerCandidate', 'Studio tooling check axis count propagation');
requireText(recoverySource, 'currentRepoState: studio.currentRepoState', 'Studio tooling repo state propagation');
requireText(recoverySource, 'humanReviewed: studio.humanReviewed', 'Studio tooling Human review propagation');
requireText(recoverySource, 'productionDependencyPromoted: studio.productionDependencyPromoted', 'Studio tooling dependency promotion propagation');
requireText(recoverySource, 'guardrails: [...studio.guardrails]', 'Studio tooling guardrail propagation');
requireText(recoverySource, 'REMOTION_STUDIO_TOOLING_REFERENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED', 'DaVinci Studio tooling export fail-close guardrail');
requireText(recoverySource, 'REMOTION_STUDIO_TOOLING_NOT_ADOPTED => NON_BLOCKING_FOR_DAVINCI_RECOVERY', 'DaVinci non-adopted tooling non-blocking guardrail');
requireText(recoverySource, 'DAVINCI_RECOVERY_EXPORTED != RECOVERY_EXECUTED', 'recovery export fail-close guardrail');
requireText(recoverySource, 'DAVINCI_RECOVERY_ACTION_EXPORTED != DAVINCI_TIMELINE_MUTATED', 'timeline mutation fail-close guardrail');
requireText(recoverySource, 'SHA_BOUND_RECOVERY_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED', 'SHA-bound recovery is not Actual verification');
requireText(recoverySource, 'MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT', 'Mac Actual NOT_RUN guardrail');
requireText(recoverySource, 'buildDaVinciWeddingProductionRecoveryJson', 'machine-readable DaVinci recovery export');

console.log('Fusion Wedding production authority contracts: PASS');
