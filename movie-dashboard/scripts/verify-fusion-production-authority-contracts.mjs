import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src/pages/FusionNodeTranslator.tsx"), "utf8");
const recoverySource = fs.readFileSync(path.join(root, "src/lib/davinciWeddingProductionRecovery.ts"), "utf8");

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

requireText(recoverySource, 'wedding-davinci-production-recovery/v1', 'DaVinci recovery schema');
requireText(recoverySource, 'MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY', 'DaVinci recovery authority');
requireText(recoverySource, 'artifactPath: project.nextGate.artifactPath', 'artifact path propagation');
requireText(recoverySource, 'blockerCodes: [...project.nextGate.blockerCodes]', 'stable blocker propagation');
requireText(recoverySource, 'blockerActions: project.nextGate.blockerActions.map(cloneAction)', 'structured recovery action propagation');
requireText(recoverySource, 'canonicalRecovery: [...project.nextGate.recovery]', 'canonical recovery propagation');
requireText(recoverySource, 'palmierContractVersion: project.bridge.palmierContractVersion', 'Palmier contract provenance');
requireText(recoverySource, 'davinciContractVersion: project.bridge.davinciContractVersion', 'DaVinci contract provenance');
requireText(recoverySource, 'evidencePath: project.bridge.actualEvidencePath', 'DaVinci Actual evidence path propagation');
requireText(recoverySource, 'commands: {...project.bridge.actualCommands}', 'DaVinci Actual command propagation');
requireText(recoverySource, 'DAVINCI_RECOVERY_EXPORTED != RECOVERY_EXECUTED', 'recovery export fail-close guardrail');
requireText(recoverySource, 'DAVINCI_RECOVERY_ACTION_EXPORTED != DAVINCI_TIMELINE_MUTATED', 'timeline mutation fail-close guardrail');
requireText(recoverySource, 'MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT', 'Mac Actual NOT_RUN guardrail');
requireText(recoverySource, 'buildDaVinciWeddingProductionRecoveryJson', 'machine-readable DaVinci recovery export');

console.log('Fusion Wedding production authority contracts: PASS');
