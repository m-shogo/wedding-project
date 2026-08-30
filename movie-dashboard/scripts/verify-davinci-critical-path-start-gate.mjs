import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const model = read("src/data/weddingMovieProductionCriticalPath.ts");
const startGateCard = read("src/components/WeddingDavinciGuiActualStartGateCard.tsx");
const errors = [];
const need = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

need(model, 'WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ROUTE = "/movie-coach/motion-library#davinci-gui-actual-start-gate"', "critical path must route DaVinci finishing to canonical Motion Zukan Start Gate");
need(model, 'stageName === "davinciFinishing"', "critical path missing davinciFinishing action target");
need(model, 'label: "DaVinci Actual Start Gateを開く"', "DaVinci action label must name the canonical Start Gate");
need(model, 'route: WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ROUTE', "davinciFinishing must use the canonical Start Gate route constant");
need(model, 'canonical Session Planを読み込み、live Project Motion再検証とstrict GUI-start gateを通してからHuman Mac DaVinci Actualへ進む', "DaVinci action purpose must preserve Session Plan + Project Motion + strict start-gate ordering");
need(model, 'DAVINCI_START_GATE_LINK_VISIBLE != GUI_ACTUAL_STARTED', "critical-path model must not promote a visible route into GUI Actual evidence");

if (model.includes('route: "/movie-coach/fusion"')) {
  errors.push("legacy /movie-coach/fusion route must not remain as the davinciFinishing action target");
}

need(startGateCard, 'WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR = "davinci-gui-actual-start-gate"', "Start Gate card must expose the anchor used by the critical path");
need(startGateCard, 'id={WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR}', "Start Gate card must bind the anchor to its rendered section");
need(startGateCard, 'canonical gate JSONを読み込む', "Start Gate must retain canonical Session Plan/gate loading UI");
need(startGateCard, 'Project Motion canonical verifier', "Start Gate must retain Project Motion verifier visibility");
need(startGateCard, 'GUI開始直前のstrict gate', "Start Gate must retain strict GUI-start verification");
need(startGateCard, 'Actual evidenceはNOT_RUNのまま', "Start Gate must preserve NOT_RUN evidence semantics when GUI was not performed");

if (errors.length) {
  console.error(`DaVinci critical-path Start Gate contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("DaVinci critical-path Start Gate contract OK: davinciFinishing routes directly to the canonical Motion Zukan Start Gate while Session Plan, Project Motion revalidation, strict GUI-start verification and NOT_RUN evidence boundaries remain explicit.");
