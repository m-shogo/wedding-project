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
requireText(helper, "MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED", "Mac Actual fail-close guardrail");
requireText(helper, "nextGate: production.nextGate", "canonical next gate passthrough");
requireText(helper, "projects.every((project) => project.productionReady)", "cross-project readiness aggregation");

requireText(page, "buildPalmierWeddingProductionGate", "Palmier production gate integration");
requireText(page, "productionHandoffReady = editFixReady && weddingProductionGate.productionReady", "combined Palmier + production readiness");
requireText(page, "productionAuthority: weddingProductionGate", "JSON production authority export");
requireText(page, "Wedding Production Authority", "visible production authority card");
requireText(page, "project.nextGate.blockerCodes", "stable blocker code rendering");
requireText(page, "project.nextGate.recovery", "canonical recovery rendering");
requireText(page, "project.nextGate.actionTargets", "canonical action target routing");
requireText(page, "exportは状態を運ぶだけで、Human QAやMac DaVinci Actualを自動昇格しません", "visible fail-close explanation");

console.log("Palmier Wedding production gate contracts: PASS");
