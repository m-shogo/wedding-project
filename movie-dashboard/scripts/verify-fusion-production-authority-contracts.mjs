import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src/pages/FusionNodeTranslator.tsx"), "utf8");

const requireText = (text, label) => {
  if (!source.includes(text)) throw new Error(`missing ${label}: ${text}`);
};

requireText('useProduction', 'selected movie production context');
requireText('buildPalmierWeddingProductionGate', 'canonical Wedding production authority');
requireText('showMovieSelector', 'movie-specific production authority selector');
requireText('WEDDING PRODUCTION AUTHORITY', 'visible production authority section');
requireText('Fusion練習と本番DaVinci Actualを分離する', 'learning versus Actual boundary');
requireText('project.bridge.palmierCurrent', 'Palmier current checkpoint');
requireText('project.bridge.davinciHandoffCurrent', 'DaVinci handoff checkpoint');
requireText('project.bridge.macDaVinciActualVerified', 'Mac Actual checkpoint');
requireText('project.bridge.finalDeliveryApproved', 'Final delivery checkpoint');
requireText('project.nextGate.stage', 'current production stage');
requireText('project.nextGate.artifactPath', 'current production artifact');
requireText('project.nextGate.blockerCodes', 'stable production blocker codes');
requireText('project.nextGate.blockerActions', 'structured production blocker actions');
requireText('action.kind === "ROUTE"', 'route recovery action rendering');
requireText('action.kind === "COMMAND"', 'command recovery action rendering');
requireText('action.kind === "HUMAN"', 'human recovery action fail-close rendering');
requireText('project.nextGate.recovery', 'canonical production recovery rendering');
requireText('Human action required · この画面からPASSへ昇格しません', 'human recovery fail-close warning');
requireText('project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"', 'Mac Actual gate condition');
requireText('project.bridge.actualEvidencePath', 'Actual evidence path at Mac gate');
requireText('実際にResolve GUIで確認・exportしていない限り、このgateはPASSにしません', 'Actual fail-close warning');
requireText('to="/palmier-handoff"', 'canonical production handoff navigation');

console.log('Fusion Wedding production authority contracts: PASS');
