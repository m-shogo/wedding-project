import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const helper = read("src/lib/palmierWeddingProductionGate.ts");
const page = read("src/pages/PalmierHandoff.tsx");

const requireText = (source, text, label) => {
  if (!source.includes(text)) throw new Error(`missing ${label}: ${text}`);
};

requireText(helper, "buildOpeningProductionStatusHandoff", "Opening canonical handoff dependency");
requireText(helper, "buildProfileProductionStatusHandoff", "Profile canonical handoff dependency");
requireText(helper, "AI_EDIT_FIX_READY != WEDDING_PRODUCTION_READY", "separate readiness authority guardrail");
requireText(helper, "PALMIER_CURRENT != DAVINCI_HANDOFF_CURRENT", "Palmier to DaVinci boundary guardrail");
requireText(helper, "DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED", "DaVinci Actual boundary guardrail");
requireText(helper, "MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED", "final approval boundary guardrail");
requireText(helper, "MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED", "Mac Actual fail-close guardrail");
requireText(helper, "nextGate: production.nextGate", "canonical next gate passthrough");
requireText(helper, "macDaVinciActualVerified: production.readiness.macDaVinciActualVerified", "Opening Actual readiness normalization");
requireText(helper, 'macDaVinciActualVerified: String(production.readiness.macDaVinciActual) === "ACTUAL_VERIFIED"', "Profile Actual readiness normalization");
requireText(helper, "bridge: buildBridge(production.palmierHandoff, production.davinciHandoff, deliveryReadiness)", "canonical Palmier-DaVinci bridge derivation");
requireText(helper, '"PALMIER_NOT_CURRENT"', "Palmier stale bridge state");
requireText(helper, '"DAVINCI_HANDOFF_NOT_CURRENT"', "DaVinci handoff stale bridge state");
requireText(helper, '"MAC_DAVINCI_ACTUAL_NOT_VERIFIED"', "Mac Actual bridge state");
requireText(helper, '"FINAL_DELIVERY_APPROVAL_REQUIRED"', "final approval bridge state");
requireText(helper, "actualEvidencePath: davinci.actualEvidence.path", "DaVinci Actual evidence path propagation");
requireText(helper, "actualCommands: {...davinci.actualEvidence.commands}", "DaVinci Actual commands propagation");
requireText(helper, "projects.every((project) => project.productionReady)", "cross-project readiness aggregation");
requireText(helper, "palmier-davinci-bridge:", "Markdown bridge export");
requireText(helper, "mac-davinci-actual-verified:", "Markdown Actual state export");

requireText(page, "buildPalmierWeddingProductionGate", "Palmier production gate integration");
requireText(page, "productionHandoffReady = editFixReady && weddingProductionGate.productionReady", "combined Palmier + production readiness");
requireText(page, "productionAuthority: weddingProductionGate", "JSON production authority export");
requireText(page, "Wedding Production Authority", "visible production authority card");
requireText(page, "project.nextGate.blockerCodes", "stable blocker code rendering");
requireText(page, "project.nextGate.recovery", "canonical recovery rendering");
requireText(page, "project.nextGate.actionTargets", "canonical action target routing");
requireText(page, "Palmier → DaVinci bridge", "visible Palmier-DaVinci bridge card");
requireText(page, "project.bridge.palmierCurrent", "visible Palmier currentness");
requireText(page, "project.bridge.davinciHandoffCurrent", "visible DaVinci handoff currentness");
requireText(page, "project.bridge.macDaVinciActualVerified", "visible Mac Actual verification");
requireText(page, "project.bridge.finalDeliveryApproved", "visible final approval state");
requireText(page, 'project.bridge.state === "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"', "Actual commands shown only at Mac Actual gate");
requireText(page, "project.bridge.actualEvidencePath", "visible Actual evidence path");
requireText(page, "Object.entries(project.bridge.actualCommands)", "visible canonical Actual commands");
requireText(page, "Mac / Resolve GUI Actualを実行していない限りverifiedへ昇格しません", "visible Actual fail-close warning");
requireText(page, "exportは状態を運ぶだけで、Human QAやMac DaVinci Actualを自動昇格しません", "visible fail-close explanation");

console.log("Palmier Wedding production gate contracts: PASS");
