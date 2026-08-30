import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const model = read("src/data/weddingMovieProductionCriticalPath.ts");
const audit = read("src/data/weddingDavinciGuiActualStartGateAudit.ts");
const criticalPathCard = read("src/components/WeddingMovieProductionCriticalPathCard.tsx");
const startGateCard = read("src/components/WeddingDavinciGuiActualStartGateCard.tsx");
const errors = [];
const need = (source, token, message) => {
  if (!source.includes(token)) errors.push(message);
};

need(model, 'WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ROUTE = "/movie-coach/motion-library#davinci-gui-actual-start-gate"', "critical path must route DaVinci finishing to canonical Motion Zukan Start Gate");
need(model, 'canonicalWeddingDavinciGuiActualStartGateArtifactPath', "critical path must import the canonical Start Gate artifact path authority");
need(model, 'defaultWeddingDavinciGuiActualStartGateAudits', "critical path must consume the Start Gate Audit command authority rather than rebuilding a parallel command");
need(model, 'return defaultWeddingDavinciGuiActualStartGateAudits[projectId].inspectCommand;', "critical path inspect command must be exactly the Start Gate Audit inspect command");
need(model, 'return defaultWeddingDavinciGuiActualStartGateAudits[projectId].strictGuiStartCommand;', "critical path strict command must be exactly the Start Gate Audit strict command");
need(model, 'artifactPath: canonicalWeddingDavinciGuiActualStartGateArtifactPath(projectId)', "critical path DaVinci action must expose the canonical per-project artifact path");
need(model, 'strictCommand: weddingDavinciGuiActualStrictStartGateCommand(projectId)', "critical path DaVinci action must expose the canonical strict GUI-start command");
need(model, 'stageName === "davinciFinishing"', "critical path missing davinciFinishing action target");
need(model, 'label: "DaVinci Actual Start Gateを開く"', "DaVinci action label must name the canonical Start Gate");
need(model, 'route: WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ROUTE', "davinciFinishing must use the canonical Start Gate route constant");
need(model, 'command: weddingDavinciGuiActualStartGateCommand(projectId)', "davinciFinishing must attach the project-specific canonical Start Gate inspect command");
need(model, 'canonical Session Planを読み込み、live Project Motion再検証とstrict GUI-start gateを通してからHuman Mac DaVinci Actualへ進む', "DaVinci action purpose must preserve Session Plan + Project Motion + strict start-gate ordering");
need(model, 'DAVINCI_START_GATE_LINK_VISIBLE != GUI_ACTUAL_STARTED', "critical-path model must not promote a visible route into GUI Actual evidence");
need(model, 'DAVINCI_START_GATE_COMMAND_VISIBLE != COMMAND_EXECUTED', "critical-path model must not treat the visible inspect command as executed");
need(model, 'DAVINCI_STRICT_START_GATE_COMMAND_VISIBLE != GUI_ACTUAL_ALLOWED', "critical-path model must not treat the visible strict command as GUI Actual permission");
need(model, 'DAVINCI_START_GATE_ARTIFACT_PATH_VISIBLE != CANONICAL_GATE_LOADED', "critical-path model must not treat a visible artifact path as a loaded canonical gate");

need(audit, 'out/handoff/wedding/${movieId}-davinci-gui-actual-start-gate.json', "Start Gate Audit must retain the canonical per-project artifact path");
need(audit, '--snapshot=out/handoff/wedding/wedding-davinci-actual-session-plan.json --output=${artifactPath} --write', "Start Gate Audit inspect command must save the canonical artifact from the canonical Session Plan");
need(audit, 'strict ? " --strict-gui-start" : ""', "Start Gate Audit must retain strict GUI-start command derivation from the same command authority");

need(criticalPathCard, 'type CriticalPathActionTarget', "critical-path card must model optional action commands");
need(criticalPathCard, 'artifactPath?: string;', "critical-path card must model the canonical Start Gate artifact path");
need(criticalPathCard, 'strictCommand?: string;', "critical-path card must model the strict GUI-start command separately from inspect/save");
need(criticalPathCard, 'artifact: {target.artifactPath}', "critical-path card must render the canonical artifact path when present");
need(criticalPathCard, '1. save / inspect', "critical-path card must label the artifact generation/inspection step");
need(criticalPathCard, '2. strict GUI-start gate', "critical-path card must label the strict GUI-start step after inspect/save");
need(criticalPathCard, '{target.command}', "critical-path card must display the already-canonical inspect command verbatim");
need(criticalPathCard, '{target.strictCommand}', "critical-path card must display the already-canonical strict command verbatim");
if (criticalPathCard.includes('cd motion-studio &amp;&amp; {target.command}')) {
  errors.push("critical-path card must not prepend a second motion-studio cd to the canonical command");
}
need(criticalPathCard, '<CriticalPathActionTargetView key={`${target.route}-${target.label}`} target={target} />', "current critical stage must render the Start Gate command-aware action target");
need(criticalPathCard, '<CriticalPathActionTargetView key={`${stage.name}-${target.route}-${target.label}`} target={target} compact />', "downstream DaVinci stage must also expose the Start Gate command before it becomes current");

need(startGateCard, 'WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR = "davinci-gui-actual-start-gate"', "Start Gate card must expose the anchor used by the critical path");
need(startGateCard, 'id={WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR}', "Start Gate card must bind the anchor to its rendered section");
need(startGateCard, 'canonical gate JSONを読み込む', "Start Gate must retain canonical Session Plan/gate loading UI");
need(startGateCard, 'Project Motion canonical verifier', "Start Gate must retain Project Motion verifier visibility");
need(startGateCard, 'GUI開始直前のstrict gate', "Start Gate must retain strict GUI-start verification");
need(startGateCard, 'Actual evidenceはNOT_RUNのまま', "Start Gate must preserve NOT_RUN evidence semantics when GUI was not performed");

if (model.includes('route: "/movie-coach/fusion"')) {
  errors.push("legacy /movie-coach/fusion route must not remain as the davinciFinishing action target");
}

if (errors.length) {
  console.error(`DaVinci critical-path Start Gate contract FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("DaVinci critical-path Start Gate contract OK: Critical Path consumes the Start Gate Audit inspect/strict command and artifact-path authority, renders the canonical save→strict sequence, and preserves Session Plan, Project Motion revalidation and NOT_RUN evidence boundaries.");
