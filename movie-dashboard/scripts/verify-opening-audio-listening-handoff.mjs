import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(dashboardRoot, "..");
const generatedPath = path.join(dashboardRoot, "src/data/openingAudioListeningStatus.generated.ts");
const handoffPath = path.join(dashboardRoot, "src/data/openingProductionStatusHandoff.ts");
const finalRenderGatePath = path.join(repoRoot, "motion-studio/scripts/init-opening-v1-final-render-review.mts");
const reviewPath = path.join(repoRoot, "motion-studio/scripts/opening-v1-audio-listening-review.mts");

const generated = fs.readFileSync(generatedPath, "utf8");
const handoff = fs.readFileSync(handoffPath, "utf8");
const finalRenderGate = fs.readFileSync(finalRenderGatePath, "utf8");
const review = fs.readFileSync(reviewPath, "utf8");
const errors = [];

for (const token of [
  '"state": "NOT_RUN"',
  '"humanAudioQaComplete": false',
  '"remotionStudioActual": "NOT_RUN"',
  '"macDaVinciActual": "NOT_RUN"',
  '"productionReady": false',
  '"OPENING_AUDIO_LISTENING_REVIEW_NOT_RUN"',
]) {
  if (!generated.includes(token)) errors.push(`fresh generated audio status lost fail-closed token: ${token}`);
}

for (const token of [
  'import {openingAudioListeningStatus} from "./openingAudioListeningStatus.generated";',
  'audioListening: {',
  'humanAudioQaComplete: openingAudioListeningStatus.humanAudioQaComplete',
  'remotionStudioActual: openingAudioListeningStatus.remotionStudioActual',
  'macDaVinciActual: openingAudioListeningStatus.macDaVinciActual',
  'productionReady: openingAudioListeningStatus.productionReady',
  '"BGM_RIGHTS_CLEARED != HUMAN_AUDIO_LISTENING_PASS"',
  '"PREVIEW_OR_BGM_SHA_CHANGED => HUMAN_AUDIO_LISTENING_REVIEW_STALE"',
  '"HUMAN_AUDIO_LISTENING_PASS != MAC_DAVINCI_ACTUAL_VERIFIED"',
  '"HUMAN_AUDIO_LISTENING_PASS != PRODUCTION_READY"',
]) {
  if (!handoff.includes(token)) errors.push(`Opening production handoff missing audio contract: ${token}`);
}

const audioGate = "'scripts/opening-v1-audio-listening-review.mts', '--strict'";
const renderGate = "'remotion', 'render', 'src/index-opening-v1.ts', 'OpeningV1'";
const audioIndex = finalRenderGate.indexOf(audioGate);
const renderIndex = finalRenderGate.indexOf(renderGate);
if (audioIndex < 0 || renderIndex < 0 || audioIndex >= renderIndex) {
  errors.push("Opening production render must require strict Human audio listening QA before Remotion final render");
}

for (const token of [
  "remotionStudioActual: 'NOT_RUN'",
  "macDaVinciActual: 'NOT_RUN'",
  "productionReady: false",
  "STALE_OPENING_AUDIO_REVIEW_PREVIEW_SHA",
  "STALE_OPENING_AUDIO_REVIEW_BGM_SHA",
]) {
  if (!review.includes(token)) errors.push(`Opening Human audio authority missing evidence guardrail: ${token}`);
}

if (errors.length > 0) {
  console.error(`Opening audio listening handoff FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Opening audio listening handoff OK: Motion Zukan receives explicit Human audio QA state/recovery while Studio Actual, Mac DaVinci Actual and productionReady remain fail-closed; preview/BGM SHA drift invalidates prior evidence.");
